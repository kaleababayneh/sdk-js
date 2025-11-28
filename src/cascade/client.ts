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
 * Maps to POST /api/v1/actions/cascade
 */
export type StartCascadeBody = operations["startCascade"]["requestBody"]["content"]["multipart/form-data"];
export type StartCascadeFile = StartCascadeBody["file"] | Blob | Uint8Array | ArrayBuffer;
export type StartCascadeRequest = {
  actionId: string;
  signature: string;
  file?: StartCascadeFile;
};

/**
 * Response from starting a Cascade action
 */
export type StartCascadeResponse = operations["startCascade"]["responses"]["202"]["content"]["application/json"];

/**
 * Request body for requesting a download
 * Maps to POST /api/v1/actions/cascade/{action_id}/downloads
 */
export type RequestDownloadBody = {
  /** Authentication signature for download (Base64 encoded) */
  signature: string;
};

/**
 * Response from requesting a download
 */
export type RequestDownloadResponse = operations["requestCascadeDownload"]["responses"]["200"]["content"]["application/json"];

/**
 * Task information
 * Maps to GET /api/v1/actions/cascade/tasks/{task_id}
 */
export type Task = operations["getCascadeTask"]["responses"]["200"]["content"]["application/json"];

/**
 * Task status information
 * Maps to GET /api/v1/actions/cascade/tasks/{task_id}/status
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
   * Initiates a new Cascade storage action by uploading a file with required authentication.
   * Maps to: POST /api/v1/actions/cascade
   *
   * @param body - Request body containing the action ID, signature, and file to upload
   * @returns Promise resolving to the response with task ID
   * @throws {HttpError} If the request fails
   *
   * @example
   * ```typescript
   * const response = await client.startCascade({
   *   actionId: 'action-123',
   *   signature: 'base64_signature',
   *   file: myFile
   * });
   * console.log('Started task:', response.task_id);
   * ```
   */
  async startCascade(body: StartCascadeRequest): Promise<StartCascadeResponse> {
    const formData = new FormData();

    // Append required action_id parameter
    formData.append("action_id", body.actionId);
    
    // Append required signature parameter
    formData.append("signature", body.signature);

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
        actionId: body.actionId,
        hasSignature: true,
        hasFile: true,
        fileType:
          normalizedFile instanceof Blob
            ? normalizedFile.type || "application/octet-stream"
            : "string",
        fileSize: normalizedFile instanceof Blob ? normalizedFile.size : undefined,
      });
    } else {
      console.debug("SNApiClient.startCascade FormData", {
        actionId: body.actionId,
        hasSignature: true,
        hasFile: false
      });
    }

    // Use HttpClient's requestRaw for FormData upload
    const response = await this.http.requestRaw(
      "POST",
      "/api/v1/actions/cascade",
      formData,
      { noRetry: true }
    );

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
   * Get information about a specific task
   *
   * Retrieves detailed information about a Cascade task, including
   * its status and progress.
   * Maps to: GET /api/v1/actions/cascade/tasks/{task_id}
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
    return this.http.get(`/api/v1/actions/cascade/tasks/${taskId}`);
  }

  /**
   * Get the status of a specific task
   *
   * Retrieves just the status information for a Cascade task,
   * which is lighter weight than getting the full task details.
   * Maps to: GET /api/v1/actions/cascade/tasks/{task_id}/status
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
    return this.http.get(`/api/v1/actions/cascade/tasks/${taskId}/status`);
  }

  /**
   * Request a download for a specific Cascade action
   *
   * Initiates a download task for a previously stored Cascade action.
   * Maps to: POST /api/v1/actions/cascade/{action_id}/downloads
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
    console.debug('SNApiClient.requestDownload', { actionId, body });
    return this.http.post(`/api/v1/actions/cascade/${actionId}/downloads`, body);
  }

  /**
   * Download the file associated with a task
   *
   * Downloads the file data as a ReadableStream for efficient streaming
   * of large files without loading them entirely into memory.
   * Maps to: GET /api/v1/downloads/cascade/{task_id}/file
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
    // Use HttpClient's requestRaw for streaming response
    const response = await this.http.requestRaw(
      "GET",
      `/api/v1/downloads/cascade/${taskId}/file`,
      undefined,
      { noRetry: true }
    );

    if (!response.body) {
      throw new Error('Response body is null');
    }

    return response.body;
  }

  /**
   * Watch download task status via Server-Sent Events (SSE)
   *
   * Creates an EventSource connection to monitor task status updates in real-time.
   * The SSE stream will emit events until the task completes or fails.
   * Maps to: GET /api/v1/downloads/cascade/{task_id}/status
   *
   * @param taskId - The task ID to watch
   * @returns EventSource instance for receiving status updates
   *
   * @example
   * ```typescript
   * const eventSource = client.watchDownloadTask('task-456');
   *
   * eventSource.addEventListener('sdk:completed', (event) => {
   *   console.log('Task completed:', event.data);
   *   eventSource.close();
   * });
   *
   * eventSource.addEventListener('error', (event) => {
   *   console.error('Task error:', event);
   *   eventSource.close();
   * });
   * ```
   */
  watchDownloadTask(taskId: string): EventSource {
    // Use HttpClient's public baseUrl getter
    const url = `${this.http.baseUrl}/api/v1/downloads/cascade/${taskId}/status`;
    return new EventSource(url);
  }
}
