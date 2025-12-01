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
import type { CascadeChainPort, TxPrompter } from './ports';
import { TaskManager, TaskManagerOptions } from './task';
import { blake3Hash } from '../internal/hash';
import { toBase64, fromBase64, toCanonicalJsonBytes } from '../internal/encoding';
import { createSingleBlockLayout, generateIds, generateIdsFromCombined, buildIndexFile } from '../wasm/lep1';
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
 * Result of file preparation
 */
export interface PreparedFile {
  /** File content as bytes */
  fileBytes: Uint8Array;
  /** BLAKE3 hash of file bytes (Base64 encoded) */
  dataHash: string;
}

/**
 * Result of action registration
 */
export interface RegisteredAction {
  /** Action ID returned from blockchain transaction */
  actionId: string;
  /** Auth signature for upload (Base64 encoded) */
  authSignature: string;
}

/**
 * Parameters for registering an action
 */
export interface RegisterActionParams {
  /** File name */
  fileName?: string;
  /** Whether storage is public or private */
  isPublic?: boolean;
  /** Expiration time for action (Unix timestamp in seconds) */
  expirationTime: string;
  /** Optional callback for signature prompts */
  signaturePrompter?: SignaturePrompter;
  /** Optional callback for transaction prompts */
  txPrompter?: TxPrompter;
}

/**
 * Parameters for sending file to supernodes
 */
export interface SendFileParams {
  /** Optional task monitoring configuration */
  taskOptions?: TaskManagerOptions;
}

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

  /**
   * Optional callback used to wrap transaction submission in a user gesture.
   * Provide this when integrating with wallets (like Keplr) that require
   * transactions to originate from explicit user actions.
   */
  txPrompter?: TxPrompter;
}

/**
 * Optional configuration for CascadeUploader
 */
export interface CascadeUploaderOptions {
}

/**
 * Result of a complete upload operation
 */
export interface UploadResult {
  /** Action ID from blockchain registration */
  actionId: string;
  /** Completed upload task */
  task: Task;
  /** Task ID (convenience accessor for task.taskId) */
  taskId?: string;
  /** Task status (convenience accessor for task.status) */
  status?: string;
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
   * Step 1: Prepare file for upload
   *
   * Converts the file to bytes and calculates its BLAKE3 hash.
   * This is required before registering an action or creating an auth signature.
   *
   * @param file - The file to prepare (as Blob, ArrayBuffer, or Uint8Array)
   * @returns Promise resolving to prepared file data
   *
   * @example
   * ```typescript
   * const prepared = await uploader.prepareFile(fileBlob);
   * console.log('File hash:', prepared.dataHash);
   * ```
   */
  async prepareFile(
    file: Blob | ArrayBuffer | Uint8Array
  ): Promise<PreparedFile> {
    // Step 3: Convert file to bytes
    const fileBytes = await this.toBytes(file);
    console.debug('CascadeUploader.prepareFile fileBytes', { length: fileBytes.length });
    
    // Step 4: Calculate data_hash using BLAKE3
    const dataHash = await blake3Hash(fileBytes);
    console.debug('CascadeUploader.prepareFile dataHash', { dataHash });

    return { fileBytes, dataHash };
  }

  /**
   * Step 2: Register action on blockchain
   *
   * This method performs the complete action registration workflow:
   * - Fetches action parameters from blockchain
   * - Generates RaptorQ layout and signs it
   * - Builds LEP-1 index file and signs it
   * - Creates auth signature for upload
   * - Registers the action on-chain via transaction
   *
   * @param preparedFile - Result from prepareFile()
   * @param params - Registration parameters
   * @returns Promise resolving to registered action details
   *
   * @example
   * ```typescript
   * const prepared = await uploader.prepareFile(fileBlob);
   * const registered = await uploader.registerAction(prepared, {
   *   fileName: 'document.pdf',
   *   isPublic: true,
   *   expirationTime: '1234567890'
   * });
   * ```
   */
  async registerAction(
    preparedFile: PreparedFile,
    params: RegisterActionParams
  ): Promise<RegisteredAction> {
    const operationStartMs = Date.now();
    const signaturePrompter = params.signaturePrompter;
    const prompterWithReset = signaturePrompter as SignaturePrompter & { reset?: () => void };

    try {
      // Version indicator - immediately shows which SDK version is running
      console.log('🚀 CascadeUploader [VERSION 4] - MEMORY & PARAMS FIX', {
        version: 'SDK_V4_ALL_PARAMS_FIXED',
        timestamp: new Date().toISOString(),
        features: [
          'Signing raw JSON layout (not base64)',
          'Fixed block size: 1280 MiB',
          'Fixed memory limit: 8192 MB',
          'All RaptorQ params match Go SDK'
        ]
      });

      const { fileBytes, dataHash } = preparedFile;

      // Step 1: Get action params from blockchain
      const actionParams = await this.chainPort.getActionParams();
      const rq_ids_max = actionParams.max_raptor_q_symbols;
      console.debug('CascadeUploader.registerAction actionParams', { actionParams });
      
      // Step 2: Use fixed initial counter to match Go SDK implementation
      // IMPORTANT: The Go SDK (used by sn-api-manager) hardcodes ic=6
      // We must match this for ID generation to be consistent between browser and supernode
      const rq_ids_ic = 6; // Fixed value matching Go SDK's client.go line 286
      console.log('🔧 Using fixed rq_ids_ic=6 to match Go SDK', { rq_ids_ic, rq_ids_max });

      // Step 5: Generate LEP-1 layout using rq-wasm
      const layoutBytes = await createSingleBlockLayout(fileBytes);

      // CRITICAL DEBUGGING: Log raw WASM output
      const rawLayoutString = new TextDecoder().decode(layoutBytes);
      console.log('🔬 RAW WASM LAYOUT OUTPUT [VERSION 3]:', {
        rawLength: layoutBytes.length,
        rawPreview: rawLayoutString.substring(0, 200),
        isJSON: rawLayoutString.trim().startsWith('{'),
        firstBytes: Array.from(layoutBytes.slice(0, 20))
          .map(b => b.toString(16).padStart(2, '0'))
          .join(' ')
      });

      // Remove whitespace from WASM output to match Go's compact json.Marshal()
      // WASM outputs pretty-printed JSON; we need compact format for signature matching
      let compactLayoutBytes: Uint8Array;
      let compactLayoutJSON: string;
      let layoutObj: any;
      try {
        layoutObj = JSON.parse(rawLayoutString);

        // CRITICAL: Check the structure of the layout object
        console.log('🔬 PARSED LAYOUT STRUCTURE:', {
          hasBlocks: 'blocks' in layoutObj,
          blocksLength: layoutObj.blocks?.length,
          firstBlockKeys: layoutObj.blocks?.[0] ? Object.keys(layoutObj.blocks[0]).sort() : null,
          firstBlock: layoutObj.blocks?.[0],
          // Check if keys are in specific order
          keysInOrder: JSON.stringify(Object.keys(layoutObj.blocks?.[0] || {})),
          // CRITICAL: Check exact layout values
          transferLength: layoutObj.transfer_length,
          symbolSize: layoutObj.symbol_size,
          numSourceBlocks: layoutObj.num_source_blocks,
          // Check block details
          blockDetails: layoutObj.blocks?.[0] ? {
            blockId: layoutObj.blocks[0].block_id,
            numSourceSymbols: layoutObj.blocks[0].num_source_symbols,
            symbolBound: layoutObj.blocks[0].symbol_bound
          } : null
        });

        compactLayoutJSON = JSON.stringify(layoutObj); // Compact, no whitespace
        compactLayoutBytes = new TextEncoder().encode(compactLayoutJSON);

        // Compare raw vs compact
        console.log('🔬 LAYOUT COMPACTION:', {
          rawLength: rawLayoutString.length,
          compactLength: compactLayoutJSON.length,
          reduction: rawLayoutString.length - compactLayoutJSON.length,
          compactPreview: compactLayoutJSON.substring(0, 200)
        });
      } catch (error) {
        throw new Error(`Failed to parse WASM layout output: ${error instanceof Error ? error.message : String(error)}`);
      }
      const layoutBytesB64 = toBase64(compactLayoutBytes);

      console.log('🔼 JS SDK LAYOUT DETAILS (compact JSON):', {
        rawWasmLength: layoutBytes.length,
        compactLength: compactLayoutBytes.length,
        layoutBytesB64,
        layoutJSON: compactLayoutJSON,
        startsWithZstdMagic: layoutBytesB64.startsWith('KLUv/')
      });
      console.debug('CascadeUploader.registerAction layoutBytesB64', { layoutBytesB64 });

      // Sign the layout using wallet (ADR-036 signArbitrary)
      // IMPORTANT: Sign the actual layout JSON string, not its base64 encoding!
      // The signature must be over the raw content for consistency with Go SDK
      console.log('📝 SIGNING LAYOUT [VERSION 3]:', {
        VERSION: 'SDK_V3_SIGNATURE_DEBUG',
        timestamp: new Date().toISOString(),
        signingData: compactLayoutJSON,
        signingDataLength: compactLayoutJSON.length,
        layoutBytesB64: layoutBytesB64,
        layoutB64Length: layoutBytesB64.length
      });
      const layoutSignatureResponse = await this.requestSignature(
        "layout",
        compactLayoutJSON,  // Sign the actual JSON string, not base64!
        signaturePrompter,
        operationStartMs
      );
      const layoutSignatureB64 = layoutSignatureResponse.signature;
      console.log('✍️ LAYOUT SIGNATURE RECEIVED [VERSION 3]:', {
        VERSION: 'SDK_V3_SIGNATURE_DEBUG',
        layoutSignatureB64,
        signatureLength: layoutSignatureB64.length,
        // Decode to see raw bytes
        signatureHex: (() => {
          try {
            const bytes = fromBase64(layoutSignatureB64);
            return Array.from(bytes.slice(0, 32))
              .map(b => b.toString(16).padStart(2, '0'))
              .join(' ') + '...';
          } catch (e) {
            return 'decode-error';
          }
        })(),
        timestamp: new Date().toISOString()
      });
      console.debug('CascadeUploader.registerAction layoutSignatureB64', { layoutSignatureB64 });
      
      // Step 6: Generate LAYOUT IDs (for the index file's layout_ids field)
      // These are needed for the index file structure, but NOT for storage
      console.log('🔑 GENERATING LAYOUT IDs [VERSION 3]:', {
        VERSION: 'SDK_V3_LAYOUT_ID_DEBUG',
        input: {
          layoutBytesB64: layoutBytesB64.substring(0, 50) + '...',
          layoutBytesB64Length: layoutBytesB64.length,
          layoutSignatureB64: layoutSignatureB64,
          rq_ids_ic: rq_ids_ic,
          rq_ids_max: rq_ids_max
        },
        // The combined input that will be used for ID generation
        combinedInput: `${layoutBytesB64}.${layoutSignatureB64}`,
        combinedLength: `${layoutBytesB64}.${layoutSignatureB64}`.length,
        timestamp: new Date().toISOString()
      });

      const layoutIds = await generateIds(
        layoutBytesB64,
        layoutSignatureB64,
        rq_ids_ic,
        rq_ids_max
      );

      console.log('🔑 LAYOUT IDs GENERATED:', {
        count: layoutIds.length,
        firstId: layoutIds[0],
        lastId: layoutIds[layoutIds.length - 1],
        sample: layoutIds.slice(0, 3)
      });

      console.debug('CascadeUploader.registerAction layoutIds', { layoutIds });

      // Step 7: Build index_file
      const indexFile = buildIndexFile(layoutIds, layoutSignatureB64);
      const indexFileBytes = toCanonicalJsonBytes(indexFile);
      const indexFileB64 = toBase64(indexFileBytes);
      const indexFileString = new TextDecoder().decode(indexFileBytes);

      console.log('📄 INDEX FILE DETAILS [VERSION 3]:', {
        VERSION: 'SDK_V3_INDEX_DEBUG',
        indexFile: indexFile,  // The actual object
        indexFileString: indexFileString,  // The JSON string
        indexFileB64: indexFileB64,
        indexFileB64Length: indexFileB64.length,
        layoutIdsCount: layoutIds.length,
        firstLayoutId: layoutIds[0],
        lastLayoutId: layoutIds[layoutIds.length - 1],
        layoutSignatureInIndex: layoutSignatureB64,
        // Check if the layout_ids match what we expect
        layoutIdsPreview: layoutIds.slice(0, 3).concat(['...']),
        // CRITICAL: Check exact JSON formatting
        indexJsonByteCount: indexFileBytes.length,
        indexJsonFirstBytes: Array.from(indexFileBytes.slice(0, 50))
          .map(b => String.fromCharCode(b))
          .join(''),
        // Check if it matches Go's json.Marshal format
        indexKeysOrder: Object.keys(indexFile),
        hasVersion: 'version' in indexFile,
        timestamp: new Date().toISOString()
      });

      console.debug('CascadeUploader.registerAction indexFile', { indexFileB64 });

      const indexSignatureResponse = await this.requestSignature(
        "index",
        indexFileString,
        signaturePrompter,
        operationStartMs
      );
      const indexWithSignature = `${indexFileB64}.${indexSignatureResponse.signature}`;
      console.debug('CascadeUploader.registerAction indexWithSignature', { indexWithSignature });

      // Step 7b: Generate INDEX IDs to debug what the supernode SHOULD generate
      // NOTE: These aren't sent anywhere - the supernode generates its own from the signatures field
      // IMPORTANT: Pass the already-combined string, not separate parts!
      // Go SDK passes the full "index_b64.signature" string, not separate components
      const debugIndexIds = await generateIdsFromCombined(
        indexWithSignature,  // Already "index_b64.signature"
        rq_ids_ic,
        rq_ids_max
      );

      console.log('🔍 DEBUG: Expected Index IDs that supernode should generate:', {
        indexIds: debugIndexIds,
        fromInput: `${indexFileB64}.${indexSignatureResponse.signature}`,
        ic: rq_ids_ic,
        max: rq_ids_max,
        firstId: debugIndexIds[0],
        lastId: debugIndexIds[debugIndexIds.length - 1],
        count: debugIndexIds.length
      });
      
      // Step 8: Prepare auth_signature for upload
      const authSignatureResponse = await this.requestSignature(
        "auth",
        dataHash,
        signaturePrompter,
        operationStartMs
      );
      const authSignature = authSignatureResponse.signature;
      console.debug('CascadeUploader.registerAction authSignature', { authSignature });

      // Step 9: Register the action on-chain
      console.log('🚀 SENDING TO BLOCKCHAIN:', {
        data_hash: dataHash,
        rq_ids_ic,
        rq_ids_max,
        signatures: indexWithSignature,
        signaturesLength: indexWithSignature.length,
        indexFileB64Length: indexFileB64.length,
        indexSigLength: indexSignatureResponse.signature.length,
        public: params.isPublic,
      });

      const txOutcome = await this.chainPort.requestActionTx({
        msg: {
          data_hash: dataHash,
          file_name: params.fileName,
          rq_ids_ic,
          signatures: indexWithSignature,
          public: params.isPublic,
        },
        expirationTime: params.expirationTime,
        txPrompter: params.txPrompter,
      }, fileBytes.length);
      console.debug('CascadeUploader.registerAction tx outcome:', txOutcome);
      
      if (!txOutcome.actionId) {
        throw new Error(
          'Failed to extract action ID from transaction outcome. ' +
          'The transaction may not have emitted an action_registered event.'
        );
      }
      const actionId = txOutcome.actionId;
      console.debug('CascadeUploader.registerAction actionId', { actionId });

      return { actionId, authSignature };
    } finally {
      if (prompterWithReset?.reset) {
        console.debug('CascadeUploader.registerAction invoking signaturePrompter.reset');
        try {
          prompterWithReset.reset();
        } catch (resetError) {
          console.warn('CascadeUploader.registerAction signaturePrompter.reset threw', { resetError });
        }
      }
    }
  }

  /**
   * Create auth signature for an existing action
   *
   * This is useful when you already have an action ID and need to create
   * a new auth signature for uploading the file. Uses a single signature prompt.
   *
   * @param actionId - Existing action ID from blockchain
   * @param dataHash - BLAKE3 hash of file (from prepareFile)
   * @returns Promise resolving to auth signature (Base64 encoded)
   *
   * @example
   * ```typescript
   * const prepared = await uploader.prepareFile(fileBlob);
   * const authSig = await uploader.makeAuthSignature(
   *   'action-123',
   *   prepared.dataHash
   * );
   * ```
   */
  async makeAuthSignature(
    actionId: string,
    dataHash: string
  ): Promise<string> {
    const operationStartMs = Date.now();
    
    console.debug('CascadeUploader.makeAuthSignature', { actionId, dataHash });
    
    // Create a single signature prompter with custom message
    const singleSignaturePrompter = createDefaultSignaturePrompter();
    
    const authSignatureResponse = await this.requestSignature(
      "auth",
      dataHash,
      singleSignaturePrompter,
      operationStartMs
    );
    
    console.debug('CascadeUploader.makeAuthSignature created', {
      actionId,
      signature: authSignatureResponse.signature
    });
    
    return authSignatureResponse.signature;
  }

  /**
   * Step 3: Send file to supernodes
   *
   * Initiates the upload via sn-api and monitors the task until completion.
   *
   * @param actionId - Action ID from registerAction()
   * @param authSignature - Auth signature from registerAction() or makeAuthSignature()
   * @param file - Original file or fileBytes from prepareFile()
   * @param params - Send parameters
   * @returns Promise resolving to completed upload task
   *
   * @example
   * ```typescript
   * const task = await uploader.sendFileToSupernodes(
   *   registered.actionId,
   *   registered.authSignature,
   *   fileBlob,
   *   { taskOptions: { timeout: 300000 } }
   * );
   * ```
   */
  async sendFileToSupernodes(
    actionId: string,
    authSignature: string,
    file: Blob | ArrayBuffer | Uint8Array,
    params: SendFileParams = {}
  ): Promise<Task> {
    // Step 10: Convert file to Blob if needed for FormData
    const fileBytes = await this.toBytes(file);
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

    console.debug("CascadeUploader.sendFileToSupernodes startCascade", {
      actionId,
      inputType: file instanceof Blob ? "Blob" : file.constructor?.name ?? typeof file,
      blobSize: fileBlob.size,
      blobType: fileBlob.type || "application/octet-stream",
    });

    // Step 11: Initiate upload via sn-api with required fields
    const response = await this.client.startCascade({
      actionId,
      signature: authSignature,
      file: fileBlob,
    });
    console.debug('CascadeUploader.sendFileToSupernodes startCascade response', { response });
    
    // Step 12: Monitor upload task until completion
    const taskManager = new TaskManager(
      this.client,
      response.task_id!,
      params.taskOptions
    );
    console.debug('CascadeUploader.sendFileToSupernodes taskManager created', { taskId: response.task_id });
    
    const completedTask = await taskManager.waitForCompletion();
    console.debug('CascadeUploader.sendFileToSupernodes upload completed', { completedTask });
    
    return completedTask;
  }

  /**
   * Upload a file to Cascade storage (unified workflow)
   *
   * This method orchestrates the complete upload workflow by calling:
   * 1. prepareFile() - Convert to bytes and hash
   * 2. registerAction() - Generate layout, register on-chain (handles prompter reset internally)
   * 3. sendFileToSupernodes() - Upload and monitor
   *
   * @param file - The file to upload (as Blob, ArrayBuffer, or Uint8Array)
   * @param params - Upload parameters
   * @returns Promise resolving to the upload result with actionId and task details
   * @throws {Error} If any step of the upload workflow fails
   *
   * @example
   * ```typescript
   * const uploader = new CascadeUploader(snapiClient, chainPort);
   *
   * const result = await uploader.uploadFile(file, {
   *   fileName: 'document.pdf',
   *   isPublic: true,
   *   expirationTime: '1234567890',
   *   taskOptions: {
   *     pollInterval: 2000,
   *     timeout: 300000
   *   }
   * });
   *
   * console.log('Upload complete:', result.actionId, result.status);
   * ```
   */
  async uploadFile(
    file: Blob | ArrayBuffer | Uint8Array,
    params: UploadParams
  ): Promise<UploadResult> {
    // Step 1: Prepare file
    const preparedFile = await this.prepareFile(file);

    // Step 2: Register action (handles prompter reset internally)
    const registeredAction = await this.registerAction(preparedFile, {
      fileName: params.fileName,
      isPublic: params.isPublic,
      expirationTime: params.expirationTime,
      signaturePrompter: params.signaturePrompter,
      txPrompter: params.txPrompter,
    });

    // Step 3: Send file to supernodes
    const task = await this.sendFileToSupernodes(
      registeredAction.actionId,
      registeredAction.authSignature,
      file,
      { taskOptions: params.taskOptions }
    );

    return {
      actionId: registeredAction.actionId,
      task,
      taskId: task.taskId,
      status: task.status,
    };
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