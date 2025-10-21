/**
 * CascadeUploader - High-level API for Cascade file uploads
 * 
 * This module provides a streamlined interface for uploading files to the
 * Cascade storage network. It orchestrates the complete upload workflow:
 * 
 * 1. File preprocessing (hashing, layout generation)
 * 2. Index file construction per LEP-1 specification
 * 3. Upload initiation via sn-api
 * 4. Task monitoring until completion
 * 
 * @example
 * ```typescript
 * const uploader = new CascadeUploader(snapiClient, blockchainParams);
 *
 * try {
 *   const result = await uploader.uploadFile(fileBlob, {
 *     actionId: 'action-123',
 *     rq_ids_max: 10000
 *   });
 *   console.log('Upload successful:', result);
 * } catch (error) {
 *   console.error('Upload failed:', error);
 * }
 * ```
 */

import type { SNApiClient, Task } from './client';
import type { CascadeChainPort } from './ports';
import { TaskManager, TaskManagerOptions } from './task';
import { blake3Hash } from '../internal/hash';
import { toBase64, toCanonicalJsonBytes } from '../internal/encoding';
import { createSingleBlockLayout, deriveLayoutIds, buildIndexFile } from '../wasm/lep1';

/**
 * Parameters required for a Cascade upload operation
 */
export interface UploadParams {
  /**
   * Optional task monitoring configuration
   */
  taskOptions?: TaskManagerOptions;
}

/**
 * Optional configuration for CascadeUploader
 */
export interface CascadeUploaderOptions {
  /**
   * Number of layout IDs to derive per LEP-1 specification
   * in practice, that's the same number as max_raptor_q_symbols
   * @default 50
   */
  layoutIdCount?: number;
}

/**
 * CascadeUploader manages the complete file upload workflow.
 * 
 * This class integrates all components of the storage layer to provide
 * a simple, high-level API for uploading files to Cascade. It handles:
 * 
 * - File hashing and integrity verification
 * - RaptorQ layout generation
 * - LEP-1 compliant index file construction
 * - Upload task initiation and monitoring
 * 
 * @remarks
 * The current implementation uses a simulated signature for `start_signature`.
 * In production, this should be replaced with a real wallet signature over
 * the BLAKE3 hash of the file data using ADR-036 signArbitrary.
 */
export class CascadeUploader {
  private readonly layoutIdCount: number;

  /**
   * Create a new CascadeUploader instance
   *
   * @param client - SNApiClient for making sn-api requests
   * @param chainPort - Port for accessing blockchain capabilities
   * @param options - Optional configuration
   */
  constructor(
    private readonly client: SNApiClient,
    private readonly chainPort: CascadeChainPort,
    options: CascadeUploaderOptions = {}
  ) {
    this.layoutIdCount = options.layoutIdCount ?? 50;
  }

  /**
   * Upload a file to Cascade storage
   *
   * This method orchestrates the complete upload workflow:
   *
   * 1. Fetches action parameters from the blockchain (max_raptor_q_symbols)
   * 2. Generates a random initial counter (rq_ids_ic) for layout ID derivation
   * 3. Converts the file to bytes and calculates data_hash (BLAKE3)
   * 4. Generates a single-block RaptorQ layout using rq-wasm
   * 5. Derives layout IDs per LEP-1 specification
   * 6. Constructs the index file with layout metadata
   * 7. Registers the action on-chain via single-call transaction flow
   * 8. Simulates the start_signature (placeholder for wallet integration)
   * 9. Initiates upload via sn-api with multipart form data
   * 10. Monitors the upload task until completion
   * 11. Returns the completed task details
   *
   * @param file - The file to upload (as Blob, ArrayBuffer, or Uint8Array)
   * @param params - Upload parameters including action ID
   * @returns Promise resolving to the completed upload task
   * @throws {Error} If any step of the upload workflow fails
   *
   * @example
   * ```typescript
   * const uploader = new CascadeUploader(snapiClient, chainPort);
   *
   * // Upload from a file input
   * const fileInput = document.querySelector('input[type="file"]');
   * const file = fileInput.files[0];
   *
   * const result = await uploader.uploadFile(file, {
   *   actionId: 'action-123',
   *   taskOptions: {
   *     pollInterval: 2000,
   *     timeout: 300000
   *   }
   * });
   *
   * console.log('Upload complete:', result);
   * ```
   */
  async uploadFile(
    file: Blob | ArrayBuffer | Uint8Array,
    params: UploadParams
  ): Promise<Task> {
    // Step 1: Get action params from blockchain
    const actionParams = await this.chainPort.getActionParams();
    const rq_ids_max = actionParams.max_raptor_q_symbols;
    
    // Step 2: Generate random initial counter for layout ID derivation
    const rq_ids_ic = Math.floor(Math.random() * rq_ids_max);
    
    // Step 3: Convert file to bytes
    const fileBytes = await this.toBytes(file);
    
    // Step 4: Calculate data_hash using BLAKE3
    const dataHash = await blake3Hash(fileBytes);
    
    // Step 5: Generate LEP-1 layout using rq-wasm
    const layout = await createSingleBlockLayout(fileBytes);
    
    // Step 6: Derive layout IDs per LEP-1 specification
    const layoutIds = deriveLayoutIds(
      rq_ids_ic,
      rq_ids_max,
      this.layoutIdCount
    );
    
    // Step 7: Build index_file
    // In production, layout_signature should be computed by signing the canonical
    // JSON bytes of the layout using ADR-036 signArbitrary with the uploader's wallet.
    // For now, we simulate with a placeholder signature.
    const layoutSignature = await this.simulateLayoutSignature(layout);
    const indexFile = buildIndexFile(layoutIds, layoutSignature);
    
    // Step 8: Register the action on-chain
    const txOutcome = await this.chainPort.requestActionTx({
      actionId: params.actionId,
      msg: {
        data_hash: dataHash,
        file_size: fileBytes.length,
        rq_ids_ic,
        rq_ids_max,
        layout_ids_count: this.layoutIdCount,
        layout_signature: toBase64(layoutSignature),
        public: false, // TODO: Make this configurable
      },
      memo: `Cascade upload: ${params.actionId}`,
    });
    
    console.debug('Action registered on-chain:', txOutcome);
    
    // Step 9: Prepare start_signature
    // In production, this should be a wallet signature over BLAKE3(file_bytes).
    // For now, we simulate with a placeholder.
    const startSignatureB64 = await this.simulateStartSignature(fileBytes);
    
    // Step 10: Convert index file to Base64 for transmission
    const indexFileBytes = toCanonicalJsonBytes(indexFile);
    const indexFileB64 = toBase64(indexFileBytes);
    
    // Step 11: Initiate upload via sn-api
    // Convert file to Blob if needed for FormData
    let fileBlob: Blob;
    if (file instanceof Blob) {
      fileBlob = file;
    } else {
      const normalizedBytes =
        fileBytes.byteOffset === 0 && fileBytes.byteLength === fileBytes.buffer.byteLength
          ? fileBytes
          : fileBytes.slice();
      const copy = new Uint8Array(normalizedBytes);
      fileBlob = new Blob([copy.buffer], { type: "application/octet-stream" });
    }

    console.debug("CascadeUploader.uploadFile startCascade", {
      inputType: file instanceof Blob ? "Blob" : file.constructor?.name ?? typeof file,
      blobSize: fileBlob.size,
      blobType: fileBlob.type || "application/octet-stream",
    });

    const response = await this.client.startCascade({
      file: fileBlob,
      // Note: The actual API might require additional fields like action_id and signature
      // These would be included in the FormData within the SNApiClient implementation
    });
    
    // Step 12: Monitor upload task until completion
    const taskManager = new TaskManager(
      this.client,
      response.taskId!,
      params.taskOptions
    );
    
    const completedTask = await taskManager.waitForCompletion();
    
    return completedTask;
  }

  /**
   * Convert various file formats to Uint8Array
   * 
   * @param file - File in any supported format
   * @returns Promise resolving to Uint8Array of file contents
   */
  private async toBytes(
    file: Blob | ArrayBuffer | Uint8Array
  ): Promise<Uint8Array> {
    if (file instanceof Uint8Array) {
      return file;
    }
    
    if (file instanceof ArrayBuffer) {
      return new Uint8Array(file);
    }
    
    // Blob
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  /**
   * Simulate layout signature generation
   * 
   * @remarks
   * In production, this should:
   * 1. Serialize layout to canonical JSON bytes
   * 2. Sign using ADR-036 signArbitrary with wallet
   * 3. Return the signature bytes
   * 
   * For now, returns a placeholder signature.
   * 
   * @param layout - The RaptorQ layout to sign
   * @returns Promise resolving to simulated signature bytes
   */
  private async simulateLayoutSignature(layout: any): Promise<Uint8Array> {
    // Placeholder: In production, replace with actual wallet signing
    const canonicalBytes = toCanonicalJsonBytes(layout);
    const hash = await blake3Hash(canonicalBytes);
    
    // Return a deterministic but simulated signature
    return new Uint8Array(Buffer.from(`simulated_layout_sig_${hash.slice(0, 16)}`, 'utf8'));
  }

  /**
   * Simulate start signature generation
   * 
   * @remarks
   * In production, this should:
   * 1. Compute BLAKE3(file_bytes)
   * 2. Sign the hash using ADR-036 signArbitrary with wallet
   * 3. Return Base64-encoded signature
   * 
   * For now, returns a placeholder signature.
   * 
   * @param fileBytes - The file data to sign
   * @returns Promise resolving to Base64-encoded simulated signature
   */
  private async simulateStartSignature(fileBytes: Uint8Array): Promise<string> {
    // Placeholder: In production, replace with actual wallet signing
    const hash = await blake3Hash(fileBytes);
    const simulatedSig = new Uint8Array(
      Buffer.from(`simulated_start_sig_${hash.slice(0, 16)}`, 'utf8')
    );
    
    return toBase64(simulatedSig);
  }
}