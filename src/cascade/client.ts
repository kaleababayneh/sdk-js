import type { BlockchainClient } from "../blockchain/interfaces";
import { toCanonicalJson, toB64, blake3hex } from "../internal/encoding";

export type CascadeMetadata = {
  data_hash: string;
  file_name: string;
  rq_ids_ic: number;
  rq_ids_signature: string; // Base64(index_file) signature or field per chain spec
  public: boolean;
};

export type CascadeClientOptions = {
  chain: BlockchainClient;
  snapiBaseUrl: string;
  wallet?: {
    signArbitrary: (chainId: string, address: string, data: Uint8Array) => Promise<Uint8Array>; // ADR-036
    getAddress: () => Promise<string>;
  };
  fetchImpl?: typeof fetch;
};

export class LumeraCascadeClient {
  private fetch: typeof fetch;
  constructor(private readonly opts: CascadeClientOptions) {
    this.fetch = opts.fetchImpl ?? fetch;
  }

  async buildMetadataFromFile(file: Blob | ArrayBuffer, cfg?: { public?: boolean }) {
    const publicFlag = cfg?.public ?? false;
    const fileBytes = file instanceof Blob ? new Uint8Array(await file.arrayBuffer()) : new Uint8Array(file);
    const data_hash = await blake3hex(fileBytes);

    // TODO: rq-wasm single-block layout + LEP-1 index/sign
    const rq_ids_ic = Math.floor(Math.random() * 100) + 1;
    const index_file_b64 = toB64(new TextEncoder().encode(toCanonicalJson({ version: 1, layout_ids: [], layout_signature: "" })));
    const index_sig_b64 = index_file_b64; // replace with wallet signature over bytes

    const meta: CascadeMetadata = {
      data_hash,
      file_name: "file",
      rq_ids_ic,
      rq_ids_signature: index_sig_b64,
      public: publicFlag
    };

    const p = await this.opts.chain.Action.getParams();
    const sizeKB = Math.ceil(fileBytes.length / 1024);
    const price = String(BigInt(p.fee_base) + BigInt(p.fee_per_kb) * BigInt(sizeKB));
    const expiration = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // placeholder

    return { meta, price, expiration, artifacts: { indexFileB64: index_file_b64, indexSignatureB64: index_sig_b64 } };
  }

  async buildStartSignature(file: Blob | ArrayBuffer) {
    const bytes = file instanceof Blob ? new Uint8Array(await file.arrayBuffer()) : new Uint8Array(file);
    const hashHex = await blake3hex(bytes);
    const data = new TextEncoder().encode(hashHex);
    const addr = await this.opts.wallet?.getAddress();
    const sig = await this.opts.wallet?.signArbitrary(await this.opts.chain.getChainId(), addr!, data);
    return toB64(sig!);
  }

  async requestDownload(params: { actionId: string; downloadSignatureB64?: string }) {
    const r = await this.fetch(`${this.opts.snapiBaseUrl}/api/v1/actions/cascade/${params.actionId}/downloads`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ signature: params.downloadSignatureB64 ?? "" })
    });
    const j = await r.json();
    return { taskId: j.task_id as string };
  }

  async startCascade(params: { actionId: string; file: Blob | ReadableStream<Uint8Array> | ArrayBuffer; startSignatureB64: string }) {
    const body = new FormData();
    body.set("action_id", params.actionId);
    body.set("signature", params.startSignatureB64);
    if (params.file instanceof Blob) body.set("file", params.file);
    else if (params.file instanceof ArrayBuffer) body.set("file", new Blob([params.file]));
    const r = await this.fetch(`${this.opts.snapiBaseUrl}/api/v1/actions/cascade`, { method: "POST", body });
    const j = await r.json();
    return { taskId: j.task_id as string };
  }
}
