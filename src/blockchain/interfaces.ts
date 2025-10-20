/**
 * Core interfaces for the Blockchain Layer.
 * 
 * This module defines the public API surface for blockchain interactions,
 * supporting adapter implementations (CosmJS + REST/LCD initially, with
 * future support for gRPC-web without breaking changes).
 * 
 * @module blockchain/interfaces
 */

import type { EncodeObject } from "@cosmjs/proto-signing";
import type { StdFee, DeliverTxResponse } from "@cosmjs/stargate";

/**
 * Transaction client interface.
 * 
 * Provides methods for transaction simulation, broadcasting, and signing.
 * Implementations handle the underlying transport (e.g., Tendermint RPC via CosmJS).
 */
export interface TxClient {
  /**
   * Simulate a transaction to estimate gas usage.
   * 
   * Performs a dry-run of the transaction without broadcasting it,
   * returning the estimated gas amount needed for execution.
   * 
   * @param address - Signer's address
   * @param msgs - Transaction messages to simulate
   * @param memo - Optional transaction memo
   * @returns Estimated gas amount
   * @throws {Error} If simulation fails
   */
  simulate(
    address: string,
    msgs: readonly EncodeObject[],
    memo?: string
  ): Promise<bigint>;

  /**
   * Broadcast a pre-signed transaction.
   * 
   * Sends a signed transaction to the blockchain. This is a low-level method;
   * prefer using signAndBroadcast for most use cases.
   * 
   * @param signedTx - Signed transaction bytes
   * @param mode - Broadcast mode ("sync", "async", or "block")
   * @returns Broadcast result with transaction hash and optional height
   * @throws {Error} If broadcast fails
   */
  broadcast(
    signedTx: Uint8Array,
    mode?: "sync" | "async" | "block"
  ): Promise<{ txHash: string; height?: bigint }>;

  /**
   * Sign and broadcast a transaction in one step.
   * 
   * This is the recommended method for sending transactions. Handles the entire
   * transaction lifecycle: signing with the wallet and broadcasting to the chain.
   * 
   * @param signerAddress - Address of the transaction signer
   * @param messages - Array of Cosmos messages to include in the transaction
   * @param fee - Transaction fee (gas amount and denomination)
   * @param memo - Optional transaction memo
   * @param timeoutHeight - Optional transaction timeout height
   * @returns Broadcast result with full delivery response
   * @throws {Error} If signing or broadcasting fails
   */
  signAndBroadcast?(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo?: string,
    timeoutHeight?: bigint
  ): Promise<{
    txHash: string;
    height: bigint;
    response: DeliverTxResponse;
  }>;
}

/**
 * Action module parameters.
 *
 * Contains configuration for the action module including fee schedule.
 */
export interface ActionParams {
  /** Base fee for action registration in uLUME */
  fee_base: string;
  /** Per-kilobyte fee in uLUME */
  fee_per_kb: string;
  /** Maximum number of RaptorQ symbols allowed */
  max_raptor_q_symbols: string;
}

/**
 * Action record from the blockchain.
 * 
 * Represents a registered action's current state on-chain.
 */
export interface ActionRecord {
  /** Unique action identifier */
  id: string;
  /** Current status (e.g., "pending", "completed", "failed") */
  status: string;
  /** Action-specific metadata (type depends on action type) */
  metadata: unknown;
}

/**
 * Action module query client interface.
 * 
 * Provides read-only access to action module state via LCD/REST.
 */
export interface ActionQuery {
  /**
   * Get action module parameters.
   * 
   * Retrieves the current module parameters including fee schedule and constraints.
   * 
   * @returns Action module parameters
   * @throws {Error} If the query fails
   */
  getParams(): Promise<ActionParams>;

  /**
   * Get an action record by ID.
   * 
   * Retrieves the details of a specific action from the blockchain.
   * 
   * @param actionId - The unique identifier of the action
   * @returns Action record details
   * @throws {Error} If the query fails or action is not found
   */
  getAction(actionId: string): Promise<ActionRecord>;
}

/**
 * Supernode module parameters.
 *
 * Contains configuration for the supernode module.
 */
export interface SupernodeParams {
  [key: string]: unknown;
}

/**
 * Supernode module query client interface.
 * 
 * Provides read-only access to supernode module state via LCD/REST.
 */
export interface SupernodeQuery {
  /**
   * Get supernode module parameters.
   * 
   * Retrieves the current module parameters.
   * 
   * @returns Supernode module parameters
   * @throws {Error} If the query fails
   */
  getParams(): Promise<SupernodeParams>;
}

/**
 * Blockchain client facade.
 * 
 * The main entry point for all blockchain operations, composing transaction
 * and query clients into a unified interface. This is the primary API surface
 * exposed to SDK users.
 * 
 * @example
 * ```typescript
 * // Query action parameters
 * const params = await blockchain.Action.getParams();
 * 
 * // Simulate a transaction
 * const gas = await blockchain.Tx.simulate(address, [msg]);
 * 
 * // Sign and broadcast
 * const result = await blockchain.Tx.signAndBroadcast(
 *   address,
 *   [msg],
 *   { amount: [{ denom: "ulume", amount: "5000" }], gas: "200000" }
 * );
 * ```
 */
export interface BlockchainClient {
  /** Transaction operations (simulate, broadcast, sign) */
  readonly Tx: TxClient;

  /** Action module queries (params, action records) */
  readonly Action: ActionQuery;

  /** Supernode module queries (params) */
  readonly Supernode: SupernodeQuery;

  /**
   * Get the chain ID.
   * 
   * Returns the identifier for the blockchain network (e.g., "lumera-testnet-2").
   * 
   * @returns Chain ID
   */
  getChainId(): Promise<string>;

  /**
   * Get the signer's address.
   * 
   * Returns the bech32 address of the account associated with this client.
   * 
   * @returns Bech32 address
   */
  getAddress(): Promise<string>;
}