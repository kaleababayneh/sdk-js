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
import { toBase64, fromBase64, toCanonicalJsonBytes } from '../internal/encoding';
import { createSingleBlockLayout, generateIds, buildIndexFile } from '../wasm/lep1';
import type { UniversalSigner, ArbitrarySignResponse } from '../wallets/signer';
import { createDefaultSignaturePrompter } from '../wallets/prompter';

export type CascadeSignatureKind = "layout" | "index" | "auth";

export interface SignaturePromptContext {
  kind: CascadeSignatureKind;
  chainId: string;
  signerAddress: string;
  data: string;
}

export type SignaturePrompter = (
  context: SignaturePromptContext,
  sign: () => Promise<ArbitrarySignResponse>
) => Promise<ArbitrarySignResponse>;

/**
 * Parameters required for a Cascade upload operation
 */
export interface UploadParams {
  /**
   * File name
   */
  fileName?: string;

  /**
   * Cascade is public or private storage
   */
  isPublic?: boolean;

  /**
   * Expiration time for action (Unix timestamp in seconds)
   * The action will be invalid after this time and action fee refunded (not transaction fee!).
   */
  expirationTime: string;

  /**
   * Optional task monitoring configuration
   */
  taskOptions?: TaskManagerOptions;

  /**
   * Optional callback used to wrap wallet signature requests in a user gesture.
   * Provide this when integrating with wallets (like Keplr) that require
   * interactions to originate from explicit user actions.
   */
  signaturePrompter?: SignaturePrompter;
}

/**
 * Optional configuration for CascadeUploader
 */
export interface CascadeUploaderOptions {
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
 */
export class CascadeUploader {

  /**
   * Create a new CascadeUploader instance
   *
   * @param client - SNApiClient for making sn-api requests
   * @param chainPort - Port for accessing blockchain capabilities
   * @param signerAddress - Bech32 address of the signer
   * @param signer - Universal signer for signing operations
   * @param chainId - Chain ID for signing operations
   * @param options - Optional configuration
   */
  constructor(
    private readonly client: SNApiClient,
    private readonly chainPort: CascadeChainPort,
    private readonly signerAddress: string,
    private readonly signer: UniversalSigner,
    private readonly chainId: string,
    options: CascadeUploaderOptions = {}
  ) {}

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
   * 8. Signs hash of file bytes to create start_signature
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
    const uploadStartMs = Date.now();
    // Use default prompter if none provided (only in browser environments)
    const signaturePrompter = params.signaturePrompter ||
      (typeof window !== 'undefined' && typeof document !== 'undefined'
        ? createDefaultSignaturePrompter()
        : undefined);

    // Step 1: Get action params from blockchain
    const actionParams = await this.chainPort.getActionParams();
    const rq_ids_max = actionParams.max_raptor_q_symbols;

    console.debug('CascadeUploader.uploadFile actionParams', { actionParams });
    
    // Step 2: Generate random initial counter for layout ID derivation
    const rq_ids_ic = Math.floor(Math.random() * rq_ids_max);
    
    console.debug('CascadeUploader.uploadFile generated rq_ids_ic', { rq_ids_ic });

    // Step 3: Convert file to bytes
    const fileBytes = await this.toBytes(file);

    console.debug('CascadeUploader.uploadFile fileBytes', { length: fileBytes.length });
    
    // Step 4: Calculate data_hash using BLAKE3
    // returns Base64-encoded string
    const dataHash64 = await blake3Hash(fileBytes);

    console.debug('CascadeUploader.uploadFile dataHash64', { dataHash64 });

    // Step 5: Generate LEP-1 layout using rq-wasm
    // Returns raw layout file bytes (JSON format)
    const layoutBytes = await createSingleBlockLayout(fileBytes);
    const layoutBytesB64 = toBase64(layoutBytes);

    console.debug('CascadeUploader.uploadFile layoutBytes', { length: layoutBytes.length });
    
    // Sign the layout using wallet (ADR-036 signArbitrary)
    const layoutSignatureResponse = await this.requestSignature(
      "layout",
      layoutBytesB64,
      signaturePrompter,
      uploadStartMs
    );
    const layoutSignatureB64 = layoutSignatureResponse.signature; // this is already Base64

    console.debug('CascadeUploader.uploadFile layoutSignatureB64', { layoutSignatureB64 });
    
    // Step 6: Generate layout IDs using the new algorithm
    const layoutIds = await generateIds(
      layoutBytesB64,
      layoutSignatureB64,
      rq_ids_ic,
      rq_ids_max
    );

    console.debug('CascadeUploader.uploadFile layoutIds', { layoutIds });
    
    // Step 7: Build index_file
    const indexFile = buildIndexFile(layoutIds, layoutSignatureB64);

    console.debug('CascadeUploader.uploadFile built indexFile', { indexFile });

    const indexFileBytes = toCanonicalJsonBytes(indexFile);
    const indexFileB64 = toBase64(indexFileBytes);

    console.debug('CascadeUploader.uploadFile indexFile', { length: indexFileBytes.length });
    
    const indexSignatureResponse = await this.requestSignature(
      "index",
      indexFileB64,
      signaturePrompter,
      uploadStartMs
    );
    const indexWithSignature = `${indexFileB64}.${indexSignatureResponse.signature}`; // indexSignatureResponse.signature is Base64

    console.debug('CascadeUploader.uploadFile indexWithSignature', { length: indexWithSignature });

    // Step 8: Register the action on-chain
    const txOutcome = await this.chainPort.requestActionTx({
      msg: {
        data_hash: dataHash64,
        file_name: params.fileName,
        rq_ids_ic,
        signature: indexWithSignature,
        public: params.isPublic,
      },
      expirationTime: params.expirationTime
    }, fileBytes.length);
    
    console.debug('Action registered on-chain:', txOutcome);
    
    // Extract action ID from transaction outcome
    // The action ID should be in the transaction events or response
    const actionId = (txOutcome as any).actionId || (txOutcome as any).action_id;
    if (!actionId) {
      throw new Error('Failed to extract action ID from transaction outcome');
    }

    console.debug('CascadeUploader.uploadFile actionId', { actionId });
    
    // Step 9: Prepare auth_signature for upload
    // Use wallet signature over BLAKE3(file_bytes)
    const authSignatureResponse = await this.requestSignature(
      "auth",
      dataHash64,
      signaturePrompter,
      uploadStartMs
    );
    const authSignature = authSignatureResponse.signature;

    console.debug('CascadeUploader.uploadFile authSignature', { authSignature });
    
    // Step 10: Initiate upload via sn-api
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
      actionId,
      inputType: file instanceof Blob ? "Blob" : file.constructor?.name ?? typeof file,
      blobSize: fileBlob.size,
      blobType: fileBlob.type || "application/octet-stream",
    });

    // Step 10: Initiate upload via sn-api with required fields
    const response = await this.client.startCascade({
      actionId,
      signature: authSignature,
      file: fileBlob,
    });

    console.debug('CascadeUploader.uploadFile startCascade response', { response });
    
    // Step 11: Monitor upload task until completion
    const taskManager = new TaskManager(
      this.client,
      response.task_id!,
      params.taskOptions
    );

    console.debug('CascadeUploader.uploadFile taskManager created', { taskId: response.task_id });
    
    const completedTask = await taskManager.waitForCompletion();

    console.debug('CascadeUploader.uploadFile upload completed', { completedTask });
    
    return completedTask;
  }

  private async requestSignature(
    kind: CascadeSignatureKind,
    data: string,
    prompter: SignaturePrompter | undefined,
    uploadStartMs: number
  ): Promise<ArbitrarySignResponse> {
    const context: SignaturePromptContext = {
      kind,
      chainId: this.chainId,
      signerAddress: this.signerAddress,
      data,
    };

    console.debug('CascadeUploader.uploadFile signature requested', {
      kind,
      viaPrompter: Boolean(prompter),
      elapsedMs: Date.now() - uploadStartMs,
      chainId: this.chainId,
      signerAddress: this.signerAddress,
    });

    let invoked = false;
    const sign = async (): Promise<ArbitrarySignResponse> => {
      if (invoked) {
        throw new Error("signArbitrary has already been invoked for this request");
      }
      invoked = true;
      return this.signer.signArbitrary(this.chainId, this.signerAddress, data);
    };

    const response = prompter ? await prompter(context, sign) : await sign();

    console.debug('CascadeUploader.uploadFile signature received', {
      kind,
      elapsedMs: Date.now() - uploadStartMs,
      signerAddress: this.signerAddress,
    });

    return response;
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
}