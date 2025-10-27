/**
 * Adapter implementing CascadeChainPort for blockchain operations.
 * 
 * This adapter bridges the Cascade layer and the Blockchain layer, providing a
 * minimal, decoupled interface for Cascade components to access blockchain capabilities.
 * 
 * @module blockchain/adapters/cascade-port
 */

import type { CascadeChainPort, CascadeActionParams, RequestActionTxInput, TxOutcome } from "../../cascade/ports";
import type { BlockchainClient } from "../interfaces";
import { lumera } from "../../codegen";

/**
 * Cache entry for action parameters with TTL.
 */
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * Configuration options for the BlockchainActionAdapter.
 */
export interface BlockchainActionAdapterOptions {
  /**
   * TTL (Time-To-Live) for cached action parameters in milliseconds.
   * Default: 300000 (5 minutes)
   * Set to 0 to disable caching.
   */
  paramsCacheTtlMs?: number;

  /**
   * Gas price to use for transactions (e.g., "0.025ulume").
   * If not provided, uses the blockchain client's default.
   */
  defaultGasPrice?: string;

  /**
   * Safety multiplier for gas estimation.
   * The simulated gas is multiplied by this factor to account for
   * state changes between simulation and execution.
   * Default: 1.3 (30% buffer)
   */
  gasMultiplier?: number;
}

/**
 * Adapter implementing CascadeChainPort using a BlockchainClient.
 * 
 * This adapter:
 * - Fetches and caches action parameters with a configurable TTL
 * - Provides a single-call transaction flow (simulate → sign → broadcast)
 * - Maps blockchain responses to plain DTOs for Cascade
 * 
 * @example
 * ```typescript
 * const adapter = new BlockchainActionAdapter(blockchainClient, signerAddress, {
 *   paramsCacheTtlMs: 300000, // 5 minutes
 *   defaultGasPrice: "0.025ulume",
 *   gasMultiplier: 1.3
 * });
 * 
 * // Cascade can now use the adapter
 * const params = await adapter.getActionParams();
 * const outcome = await adapter.requestActionTx({
 *   actionId: 'my-action',
 *   msg: { data_hash: '...', ... }
 * });
 * ```
 */
export class BlockchainActionAdapter implements CascadeChainPort {
  private paramsCache: CacheEntry<CascadeActionParams> | null = null;
  private paramsFetchPromise: Promise<CascadeActionParams> | null = null;
  private readonly paramsCacheTtlMs: number;
  private readonly defaultGasPrice: string;
  private readonly gasMultiplier: number;

  /**
   * Create a new blockchain action adapter.
   * 
   * @param blockchainClient - The blockchain client to use for queries and transactions
   * @param signerAddress - Address of the account that will sign transactions
   * @param options - Configuration options
   */
  constructor(
    private readonly blockchainClient: BlockchainClient,
    private readonly signerAddress: string,
    options: BlockchainActionAdapterOptions = {}
  ) {
    this.paramsCacheTtlMs = options.paramsCacheTtlMs ?? 300000; // Default 5 minutes
    this.defaultGasPrice = options.defaultGasPrice ?? "0.025ulume";
    this.gasMultiplier = options.gasMultiplier ?? 1.3;
  }

  /**
   * Get action module parameters with TTL caching and single-flight protection.
   * 
   * This method caches the action parameters for the configured TTL to avoid
   * repeated LCD queries. If multiple calls are made before the first completes,
   * they will all wait for and share the same underlying fetch promise (single-flight).
   * 
   * @returns Action parameters including max_raptor_q_symbols
   * @throws {Error} If the query fails
   */
  async getActionParams(): Promise<CascadeActionParams> {
    const now = Date.now();

    // Return cached value if still valid
    if (this.paramsCache && this.paramsCache.expiresAt > now) {
      return this.paramsCache.value;
    }

    // Single-flight: if a fetch is already in progress, wait for it
    if (this.paramsFetchPromise) {
      return this.paramsFetchPromise;
    }

    // Create new fetch promise
    this.paramsFetchPromise = this.fetchActionParams()
      .then((params) => {
        // Cache the result if TTL > 0
        if (this.paramsCacheTtlMs > 0) {
          this.paramsCache = {
            value: params,
            expiresAt: now + this.paramsCacheTtlMs,
          };
        }
        this.paramsFetchPromise = null;
        return params;
      })
      .catch((error) => {
        // Clear the promise on error so next call can retry
        this.paramsFetchPromise = null;
        throw error;
      });

    return this.paramsFetchPromise;
  }

  /**
   * Internal method to fetch action parameters from the blockchain.
   */
  private async fetchActionParams(): Promise<CascadeActionParams> {
    const params = await this.blockchainClient.Action.getParams();
    
    // Parse max_raptor_q_symbols from string to number
    const maxRaptorQSymbols = parseInt(params.max_raptor_q_symbols, 10);
    
    if (isNaN(maxRaptorQSymbols) || maxRaptorQSymbols <= 0) {
      throw new Error(
        `Invalid max_raptor_q_symbols: ${params.max_raptor_q_symbols}`
      );
    }

    return {
      max_raptor_q_symbols: maxRaptorQSymbols,
    };
  }

  /**
   * Request an action transaction (single-call: simulate → sign → broadcast).
   *
   * This method orchestrates the complete transaction flow:
   * 1. Fetches the action fee from the blockchain based on file size
   * 2. Builds the RequestAction message with the provided payload
   * 3. Simulates the transaction to get the exact gas required
   * 4. Calculates the fee based on simulated gas and gas price
   * 5. Signs the transaction
   * 6. Broadcasts the transaction
   * 7. Returns the transaction outcome
   *
   * @param input - Transaction input parameters
   * @param fileSize - Size of the file in bytes
   * @returns Transaction outcome with hash, height, code, gas, and fee
   * @throws {Error} If any step fails (simulation, signing, or broadcast)
   *
   * @example
   * ```typescript
   * const outcome = await adapter.requestActionTx({
   *   actionId: 'cascade-123',
   *   msg: {
   *     data_hash: 'abc...',
   *     file_name: 'example.txt',
   *     rq_ids_ic: 100,
   *     signatures: 'sig...',
   *     public: false
   *   }
   * }, 1024000); // 1MB file
   *
   * console.log(`TX ${outcome.txHash} succeeded with code ${outcome.code}`);
   * ```
   */
  async requestActionTx(input: RequestActionTxInput, fileSize: number): Promise<TxOutcome> {
    // Step 1: Fetch action fee from blockchain based on data size
    const feeInfo = await this.blockchainClient.Action.getActionFee(fileSize);
    const priceAmount = feeInfo.amount;
    const metadata = input.msg as any; // Type assertion for the metadata payload

    // Step 3: Build the RequestAction message using the new fromPartial API
    const msg = {
      typeUrl: '/lumera.action.v1.MsgRequestAction',
      value: lumera.action.v1.MsgRequestAction.fromPartial({
        creator: this.signerAddress,
        actionType: "cascade",
        metadata: JSON.stringify({
          data_hash: metadata.data_hash,
          file_name: metadata.file_name,
          rq_ids_ic: metadata.rq_ids_ic,
          signatures: metadata.signatures,
          public: metadata.public,
        }),
        price: priceAmount+"ulume",
        expirationTime: input.expirationTime,
      }),
    };

    console.log("Built MsgRequestAction:", msg);

    // Step 4: Simulate to get exact gas
    const gasEstimate = await this.blockchainClient.Tx.simulate(
      this.signerAddress,
      [msg],
      input.memo
    );

    // Apply safety multiplier
    const gasWithBuffer = BigInt(Math.ceil(Number(gasEstimate) * this.gasMultiplier));

    // Step 5: Calculate transaction fee from gas
    const gasPrice = input.gasPrice ?? this.defaultGasPrice;
    const gasPriceNum = parseFloat(gasPrice.replace(/[^0-9.]/g, ''));
    const denom = gasPrice.replace(/[0-9.]/g, '');
    const txFeeAmount = Math.ceil(Number(gasWithBuffer) * gasPriceNum).toString();

    // Step 6: Sign and broadcast
    if (!this.blockchainClient.Tx.signAndBroadcast) {
      throw new Error("Transaction client does not support signAndBroadcast");
    }
    
    const result = await this.blockchainClient.Tx.signAndBroadcast(
      this.signerAddress,
      [msg],
      {
        amount: [{ denom, amount: txFeeAmount }],
        gas: gasWithBuffer.toString(),
      },
      input.memo ?? ""
    );

    // Step 7: Map to TxOutcome DTO
    return {
      txHash: result.txHash,
      height: result.height.toString(),
      code: result.response.code,
      gasUsed: result.response.gasUsed.toString(),
      feePaid: txFeeAmount,
      rawLog: result.response.rawLog,
    };
  }

  /**
   * Invalidate the cached action parameters.
   * 
   * Forces the next call to getActionParams() to fetch fresh data from the blockchain.
   * Useful if you know the parameters have changed on-chain.
   */
  invalidateCache(): void {
    this.paramsCache = null;
  }

  /**
   * Check if the cache is currently valid.
   * 
   * @returns true if cached params exist and haven't expired, false otherwise
   */
  isCacheValid(): boolean {
    return this.paramsCache !== null && this.paramsCache.expiresAt > Date.now();
  }
}