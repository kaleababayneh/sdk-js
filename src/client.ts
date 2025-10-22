/**
 * Main LumeraClient facade - unified entry point for the Lumera SDK
 * 
 * This module provides the top-level client that composes blockchain and storage
 * operations into a single, user-friendly interface. It handles configuration,
 * chain presets, and initialization of all underlying clients.
 * 
 * @module client
 */

import type { OfflineSigner } from "@cosmjs/proto-signing";
import { makeBlockchainClient, type BlockchainClient } from "./blockchain/client";
import { BlockchainActionAdapter } from "./blockchain/adapters/cascade-port";
import { HttpClient } from "./internal/http";
import { SNApiClient } from "./cascade/client";
import { CascadeUploader } from "./cascade/uploader";
import { CascadeDownloader } from "./cascade/downloader";

/**
 * Chain preset configuration for Lumera networks
 */
export interface ChainPreset {
  /** Blockchain network identifier */
  chainId: string;
  /** Tendermint RPC endpoint URL */
  rpcUrl: string;
  /** LCD REST API endpoint URL */
  lcdUrl: string;
  /** SN-API base URL for Cascade storage */
  snapiUrl: string;
  /** Address prefix for bech32 addresses */
  prefix: string;
}

/**
 * Predefined chain presets for Lumera networks
 */
export const CHAIN_PRESETS = {
  testnet: {
    chainId: "lumera-testnet-2",
    rpcUrl: "https://rpc.testnet.lumera.io",
    lcdUrl: "https://lcd.testnet.lumera.io",
    snapiUrl: "https://sn-api.testnet.lumera.io",
    prefix: "lumera",
  } as ChainPreset,
  
  mainnet: {
    chainId: "lumera-mainnet-1",
    rpcUrl: "https://rpc.lumera.io",
    lcdUrl: "https://lcd.lumera.io",
    snapiUrl: "https://sn-api.lumera.io",
    prefix: "lumera",
  } as ChainPreset,
} as const;

/**
 * Configuration options for LumeraClient
 */
export interface LumeraClientConfig {
  /**
   * Chain preset to use ("testnet" or "mainnet")
   * Alternatively, provide custom rpcUrl, lcdUrl, chainId, and snapiUrl
   */
  preset?: keyof typeof CHAIN_PRESETS;
  
  /**
   * Custom Tendermint RPC URL (overrides preset)
   */
  rpcUrl?: string;
  
  /**
   * Custom LCD REST API URL (overrides preset)
   */
  lcdUrl?: string;
  
  /**
   * Custom blockchain network identifier (overrides preset)
   */
  chainId?: string;
  
  /**
   * Custom SN-API base URL (overrides preset)
   */
  snapiUrl?: string;
  
  /**
   * CosmJS offline signer (wallet) for transaction signing
   */
  signer: OfflineSigner;
  
  /**
   * Bech32 address of the signing account
   */
  address: string;
  
  /**
   * Gas price string (e.g., "0.025ulume")
   * @default "0.025ulume"
   */
  gasPrice?: string;
  
  /**
   * HTTP client configuration for sn-api requests
   */
  http?: {
    /** Request timeout in milliseconds @default 30000 */
    timeout?: number;
    /** Maximum retry attempts @default 3 */
    maxRetries?: number;
  };
}

/**
 * Main LumeraClient facade
 * 
 * The primary entry point for the Lumera SDK, composing blockchain and storage
 * operations into a unified interface. This client provides:
 * 
 * - `Blockchain`: Full blockchain client (transactions and queries)
 * - `Cascade.uploader`: File upload operations
 * - `Cascade.downloader`: File download operations
 * 
 * @example
 * ```typescript
 * import { createLumeraClient } from "@lumera/sdk-js";
 * import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
 * 
 * // Create a wallet
 * const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
 *   prefix: "lumera"
 * });
 * const [account] = await wallet.getAccounts();
 * 
 * // Create the client using testnet preset
 * const client = await createLumeraClient({
 *   preset: "testnet",
 *   signer: wallet,
 *   address: account.address
 * });
 * 
 * // Query blockchain
 * const params = await client.Blockchain.Action.getParams();
 * 
 * // Upload a file to Cascade
 * const result = await client.Cascade.uploader.uploadFile(file, {
 *   actionId: "action-123",
 *   rq_ids_ic: 1000,
 *   rq_ids_max: params.rq_ids_max
 * });
 * 
 * // Download a file from Cascade
 * const stream = await client.Cascade.downloader.download("action-456");
 * ```
 */
export class LumeraClient {
  /**
   * Blockchain client for transaction and query operations
   */
  readonly Blockchain: BlockchainClient;
  
  /**
   * Cascade storage clients
   */
  readonly Cascade: {
    /** File uploader for Cascade storage */
    uploader: CascadeUploader;
    /** File downloader for Cascade storage */
    downloader: CascadeDownloader;
  };

  /**
   * Create a new LumeraClient instance
   *
   * @param blockchain - Initialized blockchain client
   * @param snapiClient - Initialized SN-API client
   * @param chainPort - Port for Cascade to access blockchain capabilities
   * @param signerAddress - Bech32 address of the signer
   * @param signer - Universal signer for signing operations
   * @param chainId - Chain ID for signing operations
   *
   * @remarks
   * This constructor is typically not called directly. Use the `createLumeraClient`
   * factory function instead, which handles all initialization automatically.
   */
  constructor(
    blockchain: BlockchainClient,
    snapiClient: SNApiClient,
    chainPort: import("./cascade/ports").CascadeChainPort,
    signerAddress: string,
    signer: import("./wallets/signer").UniversalSigner,
    chainId: string
  ) {
    this.Blockchain = blockchain;
    this.Cascade = {
      uploader: new CascadeUploader(snapiClient, chainPort, signerAddress, signer, chainId),
      downloader: new CascadeDownloader(snapiClient, signerAddress, signer, chainId),
    };
  }
}

/**
 * Create a new LumeraClient with automatic configuration
 * 
 * This factory function simplifies client creation by:
 * - Applying chain presets (testnet/mainnet)
 * - Initializing all sub-clients
 * - Configuring HTTP settings
 * - Connecting to blockchain and storage endpoints
 * 
 * @param config - Client configuration options
 * @returns Promise resolving to a fully initialized LumeraClient
 * @throws {Error} If configuration is invalid or connection fails
 * 
 * @example
 * Using a chain preset:
 * ```typescript
 * const client = await createLumeraClient({
 *   preset: "testnet",
 *   signer: wallet,
 *   address: account.address
 * });
 * ```
 * 
 * @example
 * Using custom endpoints:
 * ```typescript
 * const client = await createLumeraClient({
 *   rpcUrl: "https://custom-rpc.example.com",
 *   lcdUrl: "https://custom-lcd.example.com",
 *   chainId: "lumera-custom-1",
 *   snapiUrl: "https://custom-snapi.example.com",
 *   signer: wallet,
 *   address: account.address,
 *   gasPrice: "0.05ulume"
 * });
 * ```
 * 
 * @example
 * With custom HTTP settings:
 * ```typescript
 * const client = await createLumeraClient({
 *   preset: "mainnet",
 *   signer: wallet,
 *   address: account.address,
 *   http: {
 *     timeout: 60000,
 *     maxRetries: 5
 *   }
 * });
 * ```
 */
export async function createLumeraClient(
  config: LumeraClientConfig
): Promise<LumeraClient> {
  // Apply chain preset if specified
  let chainId: string;
  let rpcUrl: string;
  let lcdUrl: string;
  let snapiUrl: string;
  
  if (config.preset) {
    const preset = CHAIN_PRESETS[config.preset];
    chainId = config.chainId ?? preset.chainId;
    rpcUrl = config.rpcUrl ?? preset.rpcUrl;
    lcdUrl = config.lcdUrl ?? preset.lcdUrl;
    snapiUrl = config.snapiUrl ?? preset.snapiUrl;
  } else {
    // Require all endpoints if no preset is specified
    if (!config.rpcUrl || !config.lcdUrl || !config.chainId || !config.snapiUrl) {
      throw new Error(
        "Either 'preset' or all of 'rpcUrl', 'lcdUrl', 'chainId', and 'snapiUrl' must be provided"
      );
    }
    chainId = config.chainId;
    rpcUrl = config.rpcUrl;
    lcdUrl = config.lcdUrl;
    snapiUrl = config.snapiUrl;
  }
  
  // Initialize blockchain client
  const blockchain = await makeBlockchainClient({
    rpcUrl,
    lcdUrl,
    chainId,
    signer: config.signer,
    address: config.address,
    gasPrice: config.gasPrice ?? "0.025ulume",
  });
  
  // Initialize HTTP client for sn-api
  const httpClient = new HttpClient({
    baseUrl: snapiUrl,
    timeout: config.http?.timeout ?? 30000,
    retry: {
      maxAttempts: config.http?.maxRetries ?? 3,
    },
  });
  
  // Initialize SN-API client
  const snapiClient = new SNApiClient(httpClient);
  
  // Create blockchain adapter for Cascade operations
  const chainPort = new BlockchainActionAdapter(
    blockchain,
    config.address,
    {
      paramsCacheTtlMs: 300000, // 5 minutes
      defaultGasPrice: config.gasPrice ?? "0.025ulume",
      gasMultiplier: 1.3, // 30% gas buffer
    }
  );
  
  // Cast signer to UniversalSigner (assumes it implements signArbitrary)
  const universalSigner = config.signer as import("./wallets/signer").UniversalSigner;
  
  // Create and return the unified client
  return new LumeraClient(blockchain, snapiClient, chainPort, config.address, universalSigner, chainId);
}