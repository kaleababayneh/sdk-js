/**
 * Lumera SDK - Main entry point
 *
 * @module @lumera/sdk-js
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
  CosmjsRestBlockchainClient,
  type BlockchainClientOptions 
} from "./blockchain/client";

// Blockchain layer - transaction client
export { CosmjsTxClient, type BroadcastResult } from "./blockchain/cosmjs";

// Blockchain layer - query clients
export { RestActionQuery, RestSupernodeQuery } from "./blockchain/rest";

// Blockchain layer - message builders and helpers
export {
  buildMsgRegisterAction,
  calculateCascadeFee,
  buildBatchMessages,
  estimateGas,
  type CascadeActionMetadata,
} from "./blockchain/messages";

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

// Storage layer - Cascade uploader and downloader
export {
  CascadeUploader,
  type UploadParams,
  type CascadeUploaderOptions,
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