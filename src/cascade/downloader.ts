/**
 * CascadeDownloader - High-level API for Cascade file downloads
 * 
 * This module provides a streamlined interface for downloading files from the
 * Cascade storage network. It orchestrates the complete download workflow:
 * 
 * 1. Authentication signature preparation (for private files)
 * 2. Download task initiation via sn-api
 * 3. Task monitoring until file is ready
 * 4. File stream retrieval
 * 
 * @example
 * ```typescript
 * const downloader = new CascadeDownloader(snapiClient);
 * 
 * try {
 *   const stream = await downloader.downloadFile('action-123');
 *   // Process the stream...
 *   const reader = stream.getReader();
 *   while (true) {
 *     const { done, value } = await reader.read();
 *     if (done) break;
 *     // Handle chunk...
 *   }
 * } catch (error) {
 *   console.error('Download failed:', error);
 * }
 * ```
 */

import type { SNApiClient } from './client';
import { TaskManager, TaskManagerOptions } from './task';
import type { UniversalSigner } from '../wallets/signer';

/**
 * Parameters for a Cascade download operation
 */
export interface DownloadParams {
  /**
   * The blockchain action ID to download
   */
  actionId: string;
  
  /**
   * Optional task monitoring configuration
   */
  taskOptions?: TaskManagerOptions;
}

/**
 * CascadeDownloader manages the complete file download workflow.
 * 
 * This class integrates the SNApiClient and TaskManager to provide
 * a simple, high-level API for downloading files from Cascade. It handles:
 * 
 * - Download authentication for private files
 * - Download task initiation
 * - Task status monitoring until file is ready
 * - File stream retrieval
 * 
 * @remarks
 * The current implementation uses a simulated signature for `download_auth`.
 * In production, this should be replaced with a real wallet signature over
 * the action ID using ADR-036 signArbitrary for private downloads.
 */
export class CascadeDownloader {
  /**
   * Create a new CascadeDownloader instance
   *
   * @param client - SNApiClient for making sn-api requests
   * @param signerAddress - Bech32 address of the signer
   * @param signer - Universal signer for signing operations
   * @param chainId - Chain ID for signing operations
   */
  constructor(
    private readonly client: SNApiClient,
    private readonly signerAddress: string,
    private readonly signer: UniversalSigner,
    private readonly chainId: string
  ) {}

  /**
   * Download a file from Cascade storage
   *
   * This method orchestrates the complete download workflow:
   *
   * 1. Prepares the download_auth signature (for private downloads)
   * 2. Initiates a download task via sn-api
   * 3. Monitors the task using SSE until the file is ready
   * 4. Retrieves and returns the file as a ReadableStream
   *
   * The returned stream can be processed incrementally, making it suitable
   * for large files without loading them entirely into memory.
   *
   * @param params - Download parameters including action ID and options
   * @returns Promise resolving to a ReadableStream of the file data
   * @throws {Error} If any step of the download workflow fails
   *
   * @example
   * ```typescript
   * const downloader = new CascadeDownloader(snapiClient, signerAddress, signer, chainId);
   *
   * // Download a public file
   * const stream = await downloader.downloadFile({
   *   actionId: 'action-123'
   * });
   *
   * // Download a private file (requires authentication)
   * const privateStream = await downloader.downloadFile({
   *   actionId: 'action-456',
   *   taskOptions: {
   *     pollInterval: 2000,
   *     timeout: 300000
   *   }
   * });
   *
   * // Process the stream
   * const reader = stream.getReader();
   * const chunks: Uint8Array[] = [];
   *
   * while (true) {
   *   const { done, value } = await reader.read();
   *   if (done) break;
   *   chunks.push(value);
   * }
   *
   * // Combine chunks into a single Uint8Array
   * const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
   * const fileData = new Uint8Array(totalLength);
   * let offset = 0;
   * for (const chunk of chunks) {
   *   fileData.set(chunk, offset);
   *   offset += chunk.length;
   * }
   * ```
   */
  async downloadFile(params: DownloadParams): Promise<ReadableStream> {
    // Step 1: Prepare download_auth signature (always required by sn-api)
    // We sign the action ID using ADR-36 via the configured wallet. On the
    // server side, this is validated using VerifyStringRawOrADR36, which
    // accepts both raw and ADR-36 style signatures.
    const downloadSignatureB64 = await this.simulateDownloadSignature(params.actionId);
    
    // Step 2: Initiate download task via sn-api, including the signature
    const response = await this.client.requestDownload(params.actionId, {
      signature: downloadSignatureB64,
    });

    const rawResponse: any = response as any;
    const downloadTaskId =
      rawResponse?.taskId ?? rawResponse?.task_id ?? rawResponse?.id;

    if (!downloadTaskId) {
      throw new Error(
        "sn-api download request did not return a task identifier (expected one of taskId, task_id, or id)"
      );
    }
    
    // Step 3: Monitor download task until ready using SSE
    const taskManager = new TaskManager(
      this.client,
      downloadTaskId,
      params.taskOptions
    );
    
    // Use SSE-based monitoring for real-time status updates
    await taskManager.waitForDownloadCompletion();
    
    // Step 4: Retrieve the file stream
    const fileStream = await this.client.downloadFile(downloadTaskId);
    
    return fileStream;
  }

  /**
   * Convenience method to download a file by action ID
   * 
   * This is a shorthand for calling downloadFile with just an action ID.
   * Defaults to public download (no authentication).
   * 
   * @param actionId - The blockchain action ID to download
   * @param taskOptions - Optional task monitoring configuration
   * @returns Promise resolving to a ReadableStream of the file data
   * 
   * @example
   * ```typescript
   * const downloader = new CascadeDownloader(snapiClient);
   * const stream = await downloader.download('action-123');
   * ```
   */
  async download(
    actionId: string,
    taskOptions?: TaskManagerOptions
  ): Promise<ReadableStream> {
    return this.downloadFile({
      actionId,
      taskOptions,
    });
  }

  /**
   * Convenience method to download a private file
   * 
   * This is a shorthand for downloading a file that requires authentication.
   * 
   * @param actionId - The blockchain action ID to download
   * @param taskOptions - Optional task monitoring configuration
   * @returns Promise resolving to a ReadableStream of the file data
   * 
   * @example
   * ```typescript
   * const downloader = new CascadeDownloader(snapiClient);
   * const stream = await downloader.downloadPrivate('action-456');
   * ```
   */
  async downloadPrivate(
    actionId: string,
    taskOptions?: TaskManagerOptions
  ): Promise<ReadableStream> {
    return this.downloadFile({
      actionId,
      taskOptions,
    });
  }

  /**
   * Generate download signature for private file authentication
   *
   * Signs the action ID using ADR-036 signArbitrary with the wallet.
   * This signature authenticates the download request for private files.
   *
   * @param actionId - The action ID to sign
   * @returns Promise resolving to Base64-encoded signature
   */
  private async simulateDownloadSignature(actionId: string): Promise<string> {
    const signatureResponse = await this.signer.signArbitrary(
      this.chainId,
      this.signerAddress,
      actionId
    );
    return signatureResponse.signature;
  }
}
