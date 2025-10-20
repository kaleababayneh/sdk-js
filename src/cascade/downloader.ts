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
import { toBase64 } from '../internal/encoding';
import { blake3Hash } from '../internal/hash';

/**
 * Parameters for a Cascade download operation
 */
export interface DownloadParams {
  /**
   * The blockchain action ID to download
   */
  actionId: string;
  
  /**
   * Whether this is a private download requiring authentication
   * @default false
   */
  isPrivate?: boolean;
  
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
   */
  constructor(private readonly client: SNApiClient) {}

  /**
   * Download a file from Cascade storage
   * 
   * This method orchestrates the complete download workflow:
   * 
   * 1. Prepares the download_auth signature (simulated for now)
   * 2. Initiates a download task via sn-api
   * 3. Monitors the task until the file is ready
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
   * const downloader = new CascadeDownloader(snapiClient);
   * 
   * // Download a public file
   * const stream = await downloader.downloadFile({
   *   actionId: 'action-123'
   * });
   * 
   * // Download a private file (requires authentication)
   * const privateStream = await downloader.downloadFile({
   *   actionId: 'action-456',
   *   isPrivate: true,
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
    // Step 1: Prepare download_auth signature
    // For private downloads, this should be a wallet signature over the action ID.
    // For public downloads, the signature can be empty or omitted.
    const downloadSignatureB64 = params.isPrivate
      ? await this.simulateDownloadSignature(params.actionId)
      : undefined;
    
    // Step 2: Initiate download task via sn-api
    const response = await this.client.requestDownload(
      params.actionId,
      {} // Empty body as per API spec
    );
    
    // Step 3: Monitor download task until ready
    const taskManager = new TaskManager(
      this.client,
      response.taskId!,
      params.taskOptions
    );
    
    // Wait for the download task to complete (file is ready)
    await taskManager.waitForCompletion();
    
    // Step 4: Retrieve the file stream
    const fileStream = await this.client.downloadFile(response.taskId!);
    
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
      isPrivate: false,
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
      isPrivate: true,
      taskOptions,
    });
  }

  /**
   * Simulate download signature generation
   * 
   * @remarks
   * In production, this should:
   * 1. Sign the action ID using ADR-036 signArbitrary with wallet
   * 2. Return Base64-encoded signature
   * 
   * For now, returns a placeholder signature.
   * 
   * @param actionId - The action ID to sign
   * @returns Promise resolving to Base64-encoded simulated signature
   */
  private async simulateDownloadSignature(actionId: string): Promise<string> {
    // Placeholder: In production, replace with actual wallet signing
    const actionIdBytes = new TextEncoder().encode(actionId);
    const hash = await blake3Hash(actionIdBytes);
    const simulatedSig = new Uint8Array(
      Buffer.from(`simulated_download_sig_${hash.slice(0, 16)}`, 'utf8')
    );
    
    return toBase64(simulatedSig);
  }
}