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
   * Returns `null` if simulation is unavailable (e.g., when gRPC reflection
   * service is not available). In this case, callers should use a fallback
   * gas estimate or rely on alternative broadcasting methods.
   *
   * @param address - Signer's address
   * @param msgs - Transaction messages to simulate
   * @param memo - Optional transaction memo
   * @returns Estimated gas amount, or null if simulation is unavailable
   * @throws {Error} If simulation fails for reasons other than unavailability
   */
  simulate(
    address: string,
    msgs: readonly EncodeObject[],
    memo?: string
  ): Promise<bigint | null>;

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

  /**
   * Query a transaction by hash.
   *
   * Retrieves the full transaction details including events from the blockchain.
   * This is useful for extracting information from transaction events after broadcasting.
   *
   * @param txHash - Transaction hash (hex string)
   * @returns Transaction response with full details including events
   * @throws {Error} If the query fails or transaction is not found
   */
  getTx?(txHash: string): Promise<DeliverTxResponse>;
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
 * CascadeMetadata interface.
 *
 * Metadata for CASCADE action types returned from blockchain queries.
 * Includes file information, RaptorQ encoding parameters, and signatures.
 * 
 * Note: Uses `bigint` for numeric fields as returned from blockchain queries.
 * For building transaction messages, see `CascadeActionMetadata` in messages.ts
 */
export interface CascadeMetadata {
  /** Hash of the data being stored */
  data_hash: string;
  /** Original filename */
  file_name: string;
  /** RaptorQ IDs initial count */
  rq_ids_ic: bigint;
  /** RaptorQ IDs maximum count */
  rq_ids_max: bigint;
  /** Array of RaptorQ IDs */
  rq_ids_ids: string[];
  /** Signatures for verification */
  signatures: string;
  /** Whether the data is public */
  public: boolean;
}

/**
 * SenseMetadata interface.
 *
 * Metadata for SENSE action types returned from blockchain queries.
 * Includes data hash, collection information, and fingerprints.
 * 
 * Note: Uses `bigint` for numeric fields as returned from blockchain queries.
 * For building transaction messages, see `SenseActionMetadata` in messages.ts
 */
export interface SenseMetadata {
  /** Hash of the data being sensed */
  data_hash: string;
  /** DD and fingerprints initial count */
  dd_and_fingerprints_ic: bigint;
  /** Collection ID for grouping */
  collection_id: string;
  /** Group ID within collection */
  group_id: string;
  /** DD and fingerprints maximum count */
  dd_and_fingerprints_max: bigint;
  /** Array of DD and fingerprint IDs */
  dd_and_fingerprints_ids: string[];
  /** Signatures for verification */
  signatures: string;
}

/**
 * ActionState enum represents the various states an action can be in.
 */
export enum ActionState {
  UNSPECIFIED = "ACTION_STATE_UNSPECIFIED",
  PENDING = "ACTION_STATE_PENDING",
  PROCESSING = "ACTION_STATE_PROCESSING",
  DONE = "ACTION_STATE_DONE",
  APPROVED = "ACTION_STATE_APPROVED",
  REJECTED = "ACTION_STATE_REJECTED",
  FAILED = "ACTION_STATE_FAILED",
  EXPIRED = "ACTION_STATE_EXPIRED",
}

/**
 * ActionType enum represents the various types of actions that can be performed.
 */
export enum ActionType {
  UNSPECIFIED = "ACTION_TYPE_UNSPECIFIED",
  SENSE = "ACTION_TYPE_SENSE",
  CASCADE = "ACTION_TYPE_CASCADE",
}

/**
 * Action record from the blockchain.
 *
 * Represents a registered action's current state on-chain.
 */
export interface ActionRecord {
  /** Creator address */
  creator: string;
  /** Unique action identifier */
  actionID: string;
  /** Action type */
  actionType: ActionType;
  /** Action-specific metadata (deserialized based on action type) */
  metadata: CascadeMetadata | SenseMetadata;
  /** Price as a Coin (string representation) */
  price: string;
  /** Expiration time (Unix timestamp) */
  expirationTime: number;
  /** Current action state */
  state: ActionState;
  /** Block height when action was created */
  blockHeight: number;
  /** List of supernode validator addresses */
  superNodes: string[];
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

  /**
   * Get the action fee for a given data size.
   *
   * Queries the blockchain to calculate the required fee for an action
   * based on the size of the data being stored.
   *
   * @param dataSize - Size of the data in bytes
   * @returns Object containing the fee amount as a string
   * @throws {Error} If the query fails
   */
  getActionFee(dataSize: number): Promise<{ amount: string }>;
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
 * SuperNodeState enum represents the various states a supernode can be in.
 */
export enum SuperNodeState {
  UNSPECIFIED = "SUPERNODE_STATE_UNSPECIFIED",
  ACTIVE = "SUPERNODE_STATE_ACTIVE",
  DISABLED = "SUPERNODE_STATE_DISABLED",
  STOPPED = "SUPERNODE_STATE_STOPPED",
  PENALIZED = "SUPERNODE_STATE_PENALIZED",
}

/**
 * SuperNodeStateRecord represents a state change record for a supernode.
 */
export interface SuperNodeStateRecord {
  /** Current state */
  state: SuperNodeState;
  /** Block height when state changed */
  height: number;
}

/**
 * Evidence defines the evidence structure for the supernode module.
 */
export interface Evidence {
  /** Reporter address */
  reporterAddress: string;
  /** Validator address */
  validatorAddress: string;
  /** Action ID related to the evidence */
  actionId: string;
  /** Type of evidence */
  evidenceType: string;
  /** Description of the evidence */
  description: string;
  /** Severity level */
  severity: number;
  /** Block height when evidence was submitted */
  height: number;
}

/**
 * IPAddressHistory tracks historical IP addresses for a supernode.
 */
export interface IPAddressHistory {
  /** IP address */
  address: string;
  /** Block height when this IP was recorded */
  height: number;
}

/**
 * MetricsAggregate contains aggregated metrics for a supernode.
 */
export interface MetricsAggregate {
  /** Map of metric names to values */
  metrics: Record<string, number>;
  /** Number of reports aggregated */
  reportCount: number;
  /** Block height of the aggregate */
  height: number;
}

/**
 * SupernodeAccountHistory tracks historical supernode account changes.
 */
export interface SupernodeAccountHistory {
  /** Account address */
  account: string;
  /** Block height when this account was active */
  height: number;
}

/**
 * SuperNode record from the blockchain.
 *
 * Represents a supernode's current state on-chain.
 */
export interface SupernodeRecord {
  /** Validator address */
  validatorAddress: string;
  /** State history records */
  states: SuperNodeStateRecord[];
  /** Evidence records */
  evidence: Evidence[];
  /** Previous IP addresses */
  prevIpAddresses: IPAddressHistory[];
  /** Optional note */
  note: string;
  /** Aggregated metrics */
  metrics: MetricsAggregate;
  /** Supernode account address */
  supernodeAccount: string;
  /** P2P port */
  p2pPort: string;
  /** Previous supernode accounts */
  prevSupernodeAccounts: SupernodeAccountHistory[];
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

  /**
   * Get a supernode by validator address.
   *
   * Retrieves the details of a specific supernode from the blockchain.
   *
   * @param validatorAddress - The validator address of the supernode
   * @returns Supernode record details
   * @throws {Error} If the query fails or supernode is not found
   */
  getSupernode(validatorAddress: string): Promise<SupernodeRecord>;

  /**
   * Get a supernode by supernode address.
   *
   * Retrieves the details of a specific supernode by its supernode account address.
   *
   * @param supernodeAddress - The supernode account address
   * @returns Supernode record details
   * @throws {Error} If the query fails or supernode is not found
   */
  getSupernodeByAddress(supernodeAddress: string): Promise<SupernodeRecord>;

  /**
   * List all supernodes.
   *
   * Retrieves a list of all registered supernodes from the blockchain.
   *
   * @returns Array of supernode records
   * @throws {Error} If the query fails
   */
  listSupernodes(): Promise<SupernodeRecord[]>;
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