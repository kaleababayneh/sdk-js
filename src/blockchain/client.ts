import { SigningStargateClient, GasPrice, type EncodeObject } from "@cosmjs/stargate";
import type { OfflineSigner } from "@cosmjs/proto-signing";
import type { TxClient, ActionQuery, SupernodeQuery, BlockchainClient } from "./interfaces";

export class CosmjsTxClient implements TxClient {
  constructor(private readonly sg: SigningStargateClient) {}
  async simulate(address: string, msgs: readonly EncodeObject[], memo = ""): Promise<bigint> {
    const gas = await this.sg.simulate(address, msgs, memo);
    return BigInt(gas);
    // NOTE: sequence/accountNumber handling is internal to SigningStargateClient + signer
  }
  async broadcast(signedTx: Uint8Array, mode: "sync" | "async" | "block" = "sync") {
    const res = await this.sg.broadcastTx(signedTx);
    return { txHash: res.transactionHash, height: BigInt(res.height ?? 0) };
  }
}

export class RestActionQuery implements ActionQuery {
  constructor(private readonly lcdBase: string) {}
  async getParams() {
    const r = await fetch(`${this.lcdBase}/lumera/action/v1/params`);
    const j = await r.json();
    return {
      rq_ids_max: Number(j.params?.rq_ids_max ?? 100),
      fee_base: j.params?.fee_base ?? "0",
      fee_per_kb: j.params?.fee_per_kb ?? "0",
    };
  }
  async getAction(actionId: string) {
    const r = await fetch(`${this.lcdBase}/lumera/action/v1/action/${actionId}`);
    const j = await r.json();
    return { id: j.action?.id, status: j.action?.status, metadata: j.action?.metadata };
  }
}

export class RestSupernodeQuery implements SupernodeQuery {
  constructor(private readonly lcdBase: string) {}
  async getParams() {
    const r = await fetch(`${this.lcdBase}/lumera/supernode/v1/params`);
    return r.json();
  }
}

export class CosmjsRestBlockchainClient implements BlockchainClient {
  constructor(
    public readonly Tx: TxClient,
    public readonly Action: ActionQuery,
    public readonly Supernode: SupernodeQuery,
    private readonly chainId: string,
    private readonly bech32: string,
  ) {}
  async getChainId() { return this.chainId; }
  async getAddress() { return this.bech32; }
}

export async function makeBlockchainClient(opts: {
  rpcUrl: string;
  lcdUrl: string;
  chainId: string;
  signer: OfflineSigner;
  address: string;
  gasPrice?: string; // e.g. "0.025ulume"
}): Promise<BlockchainClient> {
  const sg = await SigningStargateClient.connectWithSigner(opts.rpcUrl, opts.signer, {
    gasPrice: opts.gasPrice ? GasPrice.fromString(opts.gasPrice) : undefined,
  });
  const tx = new CosmjsTxClient(sg);
  const action = new RestActionQuery(opts.lcdUrl);
  const supernode = new RestSupernodeQuery(opts.lcdUrl);
  return new CosmjsRestBlockchainClient(tx, action, supernode, opts.chainId, opts.address);
}
