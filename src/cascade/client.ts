import type { BlockchainClient } from "../blockchain/interfaces";
import { toCanonicalJson, toB64 } from "../internal/encoding";
import { blake3Hash } from "../internal/hash";
import { HttpClient } from "../internal/http";
import type { operations } from "../types/snapi.gen";

// ============================================================================
// Type Aliases for SN-API Operations
// ============================================================================

/**
 * Request body for starting a Cascade action
 * Maps to POST /api/actions/cascade
 */
export type StartCascadeBody = operations["startCascade"]["requestBody"]["content"]["multipart/form-data"];
export type StartCascadeFile = StartCascadeBody["file"] | Blob | Uint8Array | ArrayBuffer;
export type StartCascadeRequest = { file?: StartCascadeFile };

/**
 * Response from starting a Cascade action
 */
export type StartCascadeResponse = operations["startCascade"]["responses"]["200"]["content"]["application/json"];

/**
 * Request body for requesting a download
 * Maps to POST /api/actions/cascade/{action_id}/downloads
 */
export type RequestDownloadBody = Record<string, never>; // No body params in spec

/**
 * Response from requesting a download
 */
export type RequestDownloadResponse = operations["requestCascadeDownload"]["responses"]["200"]["content"]["application/json"];

/**
 * Task information
 * Maps to GET /api/actions/cascade/tasks/{task_id}
 */
export type Task = operations["getCascadeTask"]["responses"]["200"]["content"]["application/json"];

/**
 * Task status information
 * Maps to GET /api/actions/cascade/tasks/{task_id}/status
 */
export type TaskStatus = operations["getCascadeTaskStatus"]["responses"]["200"]["content"]["application/json"];

// ============================================================================
// SNApiClient - Typed REST Client for sn-api
// ============================================================================

/**
 * Typed REST client for interacting with sn-api endpoints.
 * 
 * This client provides a thin, type-safe wrapper around the HttpClient
 * for Cascade storage operations. It maps directly to the sn-api REST
 * endpoints defined in the OpenAPI specification.
 * 
 * @example
 * ```typescript
 * const httpClient = new HttpClient({ baseUrl: 'https://sn-api.example.com' });
 * const client = new SNApiClient(httpClient);
 * 
 * // Start a cascade action
 * const response = await client.startCascade({ file: fileBlob });
 * console.log('Task ID:', response.taskId);
 * 
 * // Check task status
 * const status = await client.getTaskStatus(response.taskId);
 * console.log('Status:', status.status);
 * ```
 */
export class SNApiClient {
  /**
   * Create a new SNApiClient
   * 
   * @param http - HttpClient instance for making REST requests
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Start a new Cascade storage action
   * 
   * Initiates a new Cascade storage action by uploading a file.
   * Maps to: POST /api/actions/cascade
   * 
   * @param body - Request body containing the file to upload
   * @returns Promise resolving to the response with task ID
   * @throws {HttpError} If the request fails
   * 
   * @example
   * ```typescript
   * const response = await client.startCascade({ file: myFile });
   * console.log('Started task:', response.taskId);
   * ```
   */
  async startCascade(body: StartCascadeRequest): Promise<StartCascadeResponse> {
    const formData = new FormData();

    if (body.file !== undefined) {
      const normalizedFile = this.normalizeFilePart(body.file);

      if (normalizedFile instanceof Blob) {
        const fileName =
          "name" in normalizedFile ? (normalizedFile as File).name ?? "upload.bin" : "upload.bin";
        formData.append("file", normalizedFile, fileName);
      } else {
        formData.append("file", normalizedFile);
      }

      console.debug("SNApiClient.startCascade FormData", {
        hasFile: true,
        fileType:
          normalizedFile instanceof Blob
            ? normalizedFile.type || "application/octet-stream"
            : "string",
        fileSize: normalizedFile instanceof Blob ? normalizedFile.size : undefined,
      });
    } else {
      console.debug("SNApiClient.startCascade FormData", { hasFile: false });
    }

    const response = await fetch(`${this.http["config"].baseUrl}/api/actions/cascade`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  private normalizeFilePart(file: StartCascadeFile): Blob | string {
    if (file instanceof Blob) {
      return file;
    }

    if (typeof file === "string") {
      return file;
    }

    if (file instanceof Uint8Array) {
      const normalizedBytes =
        file.byteOffset === 0 && file.byteLength === file.buffer.byteLength
          ? file
          : file.slice();
      const copy = new Uint8Array(normalizedBytes);
      return new Blob([copy.buffer], { type: "application/octet-stream" });
    }

    if (file instanceof ArrayBuffer) {
      return new Blob([file.slice(0)], { type: "application/octet-stream" });
    }

    throw new Error("Unsupported file type for startCascade request");
  }

  /**
   * Request a download for a specific Cascade action
   * 
   * Initiates a download task for a previously stored Cascade action.
   * Maps to: POST /api/actions/cascade/{action_id}/downloads
   * 
   * @param actionId - The action ID to download
   * @param body - Request body (currently unused in spec)
   * @returns Promise resolving to the response with download task ID
   * @throws {HttpError} If the request fails
   * 
   * @example
   * ```typescript
   * const response = await client.requestDownload('action-123', {});
   * console.log('Download task:', response.taskId);
   * ```
   */
  async requestDownload(
    actionId: string,
    body: RequestDownloadBody
  ): Promise<RequestDownloadResponse> {
    return this.http.post(`/api/actions/cascade/${actionId}/downloads`, body);
  }

  /**
   * Get information about a specific task
   * 
   * Retrieves detailed information about a Cascade task, including
   * its status and progress.
   * Maps to: GET /api/actions/cascade/tasks/{task_id}
   * 
   * @param taskId - The task ID to query
   * @returns Promise resolving to task information
   * @throws {HttpError} If the request fails
   * 
   * @example
   * ```typescript
   * const task = await client.getTask('task-456');
   * console.log('Task status:', task.status);
   * console.log('Progress:', task.progress);
   * ```
   */
  async getTask(taskId: string): Promise<Task> {
    return this.http.get(`/api/actions/cascade/tasks/${taskId}`);
  }

  /**
   * Get the status of a specific task
   * 
   * Retrieves just the status information for a Cascade task,
   * which is lighter weight than getting the full task details.
   * Maps to: GET /api/actions/cascade/tasks/{task_id}/status
   * 
   * @param taskId - The task ID to query
   * @returns Promise resolving to task status
   * @throws {HttpError} If the request fails
   * 
   * @example
   * ```typescript
   * const status = await client.getTaskStatus('task-456');
   * if (status.status === 'completed') {
   *   console.log('Task completed!');
   * }
   * ```
   */
  async getTaskStatus(taskId: string): Promise<TaskStatus> {
    return this.http.get(`/api/actions/cascade/tasks/${taskId}/status`);
  }

  /**
   * Download the file associated with a task
   * 
   * Downloads the file data as a ReadableStream for efficient streaming
   * of large files without loading them entirely into memory.
   * Maps to: GET /api/downloads/cascade/{task_id}/file
   * 
   * @param taskId - The task ID to download
   * @returns Promise resolving to a ReadableStream of the file data
   * @throws {HttpError} If the request fails
   * 
   * @example
   * ```typescript
   * const stream = await client.downloadFile('task-456');
   * // Stream can be piped to a file or processed in chunks
   * const reader = stream.getReader();
   * while (true) {
   *   const { done, value } = await reader.read();
   *   if (done) break;
   *   // Process chunk...
   * }
   * ```
   */
  async downloadFile(taskId: string): Promise<ReadableStream> {
    // For streaming responses, we need to use fetch directly
    const response = await fetch(
      `${this.http['config'].baseUrl}/api/downloads/cascade/${taskId}/file`,
      {
        method: 'GET',
        headers: this.http['config'].headers,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    return response.body;
  }
}

// ============================================================================
// Legacy Cascade Client (to be refactored)
// ============================================================================

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
    const data_hash = await blake3Hash(fileBytes);

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
    const hashHex = await blake3Hash(bytes);
    const data = new TextEncoder().encode(hashHex);
    const addr = await this.opts.wallet?.getAddress();
    const sig = await this.opts.wallet?.signArbitrary(await this.opts.chain.getChainId(), addr!, data);
    return toB64(sig!);
  }

  async requestDownload(params: { actionId: string; downloadSignatureB64?: string }) {
    const r = await this.fetch(`${this.opts.snapiBaseUrl}/api/actions/cascade/${params.actionId}/downloads`, {
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
    const r = await this.fetch(`${this.opts.snapiBaseUrl}/api/actions/cascade`, { method: "POST", body });
    const j = await r.json();
    return { taskId: j.task_id as string };
  }
}