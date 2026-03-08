/**
 * Lumera SDK - Main entry point
 *
 * @module @lumera-protocol/sdk-js
 */

// Main client - unified facade
export {
  LumeraClient,
  createLumeraClient,
  CHAIN_PRESETS,
  type LumeraClientConfig,
  type ChainPreset,
} from "./client";

// Blockchain layer - interfaces and types
export * from "./blockchain/interfaces";

// Blockchain layer - client factory and implementations
export {
  makeBlockchainClient,
  CosmjsRpcBlockchainClient,
  type BlockchainClientOptions
} from "./blockchain/client";

// Blockchain layer - transaction client
export { CosmjsTxClient, type BroadcastResult } from "./blockchain/cosmjs";

// Blockchain layer - message utilities
export {
  buildBatchMessages,
  estimateGas,
  calculateCascadeFee,
  type CascadeActionMetadata,
  type SenseActionMetadata,
} from "./blockchain/messages";

// Blockchain layer - message registry
export { createLumeraRegistry } from "./blockchain/registry";

// Storage layer - SNApiClient and types
export {
  SNApiClient,
  type StartCascadeBody,
  type StartCascadeResponse,
  type RequestDownloadBody,
  type RequestDownloadResponse,
  type Task,
  type TaskStatus,
} from "./cascade/client";
// Storage layer - Cascade chain port (for dependency injection)
export type {
  CascadeChainPort,
  CascadeActionParams,
  RequestActionTxInput,
  TxOutcome,
} from "./cascade/ports";

// Storage layer - LEP-5 availability commitment
export {
  buildCommitment,
  selectChunkSize,
  deriveIndices,
  hashLeaf,
  hashNode,
  buildTree,
  DEFAULT_CHUNK_SIZE,
  MIN_TOTAL_SIZE,
  COMMITMENT_TYPE,
  DEFAULT_SVC_CHALLENGE_COUNT,
  DEFAULT_SVC_MIN_CHUNKS_FOR_CHALLENGE,
} from "./cascade/commitment";

// Codegen - LEP-5 types
export {
  AvailabilityCommitment,
  ChunkProof,
  HashAlgo,
} from "./codegen/lumera/action/v1/metadata";

// Blockchain adapter for Cascade port
export { BlockchainActionAdapter } from "./blockchain/adapters/cascade-port";
export type { BlockchainActionAdapterOptions } from "./blockchain/adapters/cascade-port";


// Storage layer - Cascade uploader and downloader
export {
  CascadeUploader,
  type UploadParams,
  type CascadeUploaderOptions,
  type SignaturePrompter,
  type SignaturePromptContext,
  type CascadeSignatureKind,
  type PreparedFile,
  type RegisteredAction,
  type RegisterActionParams,
  type SendFileParams,
} from "./cascade/uploader";

export {
  CascadeDownloader,
  type DownloadParams,
} from "./cascade/downloader";

// Storage layer - Task manager
export {
  TaskManager,
  type TaskManagerOptions,
} from "./cascade/task";

// Internal layer - HTTP client
export { HttpClient, type HttpClientConfig, type RequestOptions, HttpError } from "./internal/http";

// WASM layer - RaptorQ proxy and LEP-1 helpers
export { RaptorQProxy } from "./wasm/raptorq-proxy";
export type {
  RaptorQSession,
} from "./wasm/raptorq-proxy";

export {
  createSingleBlockLayout,
  generateIds,
  buildIndexFile,
  type Layout,
  type IndexFile,
  type SourceBlock,
} from "./wasm/lep1";

// Wallet utilities - Signature prompter
export {
  createDefaultSignaturePrompter,
  createBatchedSignaturePrompter,
  defaultSignaturePrompter,
  createDefaultTxPrompter,
  type TxPrompter,
  type TxPromptContext,
} from "./wallets/prompter";

// Wallet utilities - Keplr adapter
export { getKeplrSigner, isKeplrAvailable } from "./wallets/keplr";
