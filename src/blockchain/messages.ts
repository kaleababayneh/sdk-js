/**
 * Transaction message builders for Lumera blockchain.
 * 
 * Provides helper functions to construct properly typed and formatted Cosmos SDK messages
 * for Lumera-specific operations, particularly for the Action module (Cascade operations).
 * 
 * @module blockchain/messages
 */

import type { EncodeObject } from "@cosmjs/proto-signing";

/**
 * Metadata for building a Sense action message.
 *
 * This is the input format for constructing MsgRequestAction/MsgFinalizeAction.
 * Uses `number` types (not `bigint`) as required by protobuf encoding.
 * 
 * Note: For queried metadata from the blockchain, see `SenseMetadata` in interfaces.ts
 */
export interface SenseActionMetadata {
  /** Data hash - required for RequestAction */
  data_hash: string;
  /** DD and fingerprints IC - required for RequestAction */
  dd_and_fingerprints_ic: number;
  /** Collection ID - optional for RequestAction */
  collection_id?: string;
  /** Group ID - optional for RequestAction */
  group_id?: string;
  /** DD and fingerprints max - added by Keeper */
  dd_and_fingerprints_max?: number;
  /** DD and fingerprints IDs - required for FinalizeAction */
  dd_and_fingerprints_ids?: string[];
  /** Signatures - required for FinalizeAction */
  signatures?: string;
}

/**
 * Metadata for building a Cascade action message.
 *
 * This is the input format for constructing MsgRequestAction/MsgFinalizeAction.
 * Uses `number` types (not `bigint`) as required by protobuf encoding.
 * 
 * Note: For queried metadata from the blockchain, see `CascadeMetadata` in interfaces.ts
 */
export interface CascadeActionMetadata {
  /** Data hash - required for RequestAction */
  data_hash: string;
  /** File name - required for RequestAction */
  file_name: string;
  /** RaptorQ IDs IC - required for RequestAction */
  rq_ids_ic: number;
  /** RaptorQ IDs max - added by Keeper */
  rq_ids_max?: number;
  /** RaptorQ IDs - required for FinalizeAction */
  rq_ids_ids?: string[];
  /** Signatures - required for RequestAction */
  signatures: string;
  /** Whether the action is publicly visible */
  public: boolean;
}

/**
 * Build a MsgRequestAction for Cascade storage.
 *
 * Constructs an EncodeObject for requesting a Cascade action on the Lumera blockchain.
 * This message type is used to initiate storage of data via the Cascade protocol.
 *
 * @param metadata - Cascade action metadata (will be JSON serialized)
 * @param price - Action price in uLUME (as string, e.g., "100000")
 * @param expirationTime - Action expiration time (Unix timestamp as string)
 * @param creator - Address of the account creating the action
 * @returns EncodeObject ready for transaction signing
 *
 * @example
 * ```typescript
 * const msg = buildMsgRequestAction(
 *   {
 *     data_hash: "abc123...",
 *     file_name: "example.txt",
 *     rq_ids_ic: 12345,
 *     signatures: "base64signature==",
 *     public: false
 *   },
 *   "100000",
 *   "1735689600",
 *   "lumera1abc..."
 * );
 *
 * const result = await client.signAndBroadcast(address, [msg], fee);
 * ```
 */
export function buildMsgRequestAction(
  metadata: CascadeActionMetadata | SenseActionMetadata,
  price: string,
  expirationTime: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.action.v1.MsgRequestAction",
    value: {
      creator,
      actionType: "data_hash" in metadata && "rq_ids_ic" in metadata ? "cascade" : "sense",
      metadata: JSON.stringify(metadata),
      price,
      expirationTime,
    },
  };
}

/**
 * Build a MsgFinalizeAction.
 *
 * Constructs an EncodeObject for finalizing an action on the Lumera blockchain.
 * This message must be sent by a supernode address.
 *
 * @param actionId - The ID of the action to finalize
 * @param actionType - Type of action ("cascade" or "sense")
 * @param metadata - Action-specific metadata (will be JSON serialized)
 * @param creator - Supernode address finalizing the action
 * @returns EncodeObject ready for transaction signing
 *
 * @example
 * ```typescript
 * const msg = buildMsgFinalizeAction(
 *   "action123",
 *   "cascade",
 *   { rq_ids_ids: ["id1", "id2", "id3"] },
 *   "lumera1supernode..."
 * );
 *
 * const result = await client.signAndBroadcast(address, [msg], fee);
 * ```
 */
export function buildMsgFinalizeAction(
  actionId: string,
  actionType: string,
  metadata: Partial<CascadeActionMetadata> | Partial<SenseActionMetadata>,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.action.v1.MsgFinalizeAction",
    value: {
      creator,
      actionId,
      actionType,
      metadata: JSON.stringify(metadata),
    },
  };
}

/**
 * Build a MsgApproveAction.
 *
 * Constructs an EncodeObject for approving an action on the Lumera blockchain.
 *
 * @param actionId - The ID of the action to approve
 * @param creator - Address of the account approving the action
 * @returns EncodeObject ready for transaction signing
 *
 * @example
 * ```typescript
 * const msg = buildMsgApproveAction("action123", "lumera1abc...");
 * const result = await client.signAndBroadcast(address, [msg], fee);
 * ```
 */
export function buildMsgApproveAction(
  actionId: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.action.v1.MsgApproveAction",
    value: {
      creator,
      actionId,
    },
  };
}

/**
 * Build a MsgRegisterSupernode.
 *
 * Constructs an EncodeObject for registering a supernode on the Lumera blockchain.
 *
 * @param validatorAddress - Validator address
 * @param ipAddress - IP address of the supernode
 * @param supernodeAccount - Supernode account address
 * @param p2pPort - P2P port
 * @param creator - Address of the account creating the registration
 * @returns EncodeObject ready for transaction signing
 */
export function buildMsgRegisterSupernode(
  validatorAddress: string,
  ipAddress: string,
  supernodeAccount: string,
  p2pPort: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.supernode.v1.MsgRegisterSupernode",
    value: {
      creator,
      validatorAddress,
      ipAddress,
      supernodeAccount,
      p2p_port: p2pPort,
    },
  };
}

/**
 * Build a MsgDeregisterSupernode.
 *
 * Constructs an EncodeObject for deregistering a supernode from the Lumera blockchain.
 *
 * @param validatorAddress - Validator address
 * @param creator - Address of the account requesting deregistration
 * @returns EncodeObject ready for transaction signing
 */
export function buildMsgDeregisterSupernode(
  validatorAddress: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernode",
    value: {
      creator,
      validatorAddress,
    },
  };
}

/**
 * Build a MsgStartSupernode.
 *
 * Constructs an EncodeObject for starting a supernode on the Lumera blockchain.
 *
 * @param validatorAddress - Validator address
 * @param creator - Address of the account starting the supernode
 * @returns EncodeObject ready for transaction signing
 */
export function buildMsgStartSupernode(
  validatorAddress: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.supernode.v1.MsgStartSupernode",
    value: {
      creator,
      validatorAddress,
    },
  };
}

/**
 * Build a MsgStopSupernode.
 *
 * Constructs an EncodeObject for stopping a supernode on the Lumera blockchain.
 *
 * @param validatorAddress - Validator address
 * @param reason - Reason for stopping the supernode
 * @param creator - Address of the account stopping the supernode
 * @returns EncodeObject ready for transaction signing
 */
export function buildMsgStopSupernode(
  validatorAddress: string,
  reason: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.supernode.v1.MsgStopSupernode",
    value: {
      creator,
      validatorAddress,
      reason,
    },
  };
}

/**
 * Build a MsgUpdateSupernode.
 *
 * Constructs an EncodeObject for updating a supernode on the Lumera blockchain.
 *
 * @param validatorAddress - Validator address
 * @param ipAddress - New IP address
 * @param note - Update note
 * @param supernodeAccount - New supernode account address
 * @param p2pPort - New P2P port
 * @param creator - Address of the account updating the supernode
 * @returns EncodeObject ready for transaction signing
 */
export function buildMsgUpdateSupernode(
  validatorAddress: string,
  ipAddress: string,
  note: string,
  supernodeAccount: string,
  p2pPort: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.supernode.v1.MsgUpdateSupernode",
    value: {
      creator,
      validatorAddress,
      ipAddress,
      note,
      supernodeAccount,
      p2p_port: p2pPort,
    },
  };
}

/**
 * Build a batch of messages for a multi-message transaction.
 * 
 * Helper function to construct multiple messages that will be included
 * in a single transaction. Useful for atomic operations.
 * 
 * @param messages - Array of message builders or EncodeObjects
 * @returns Array of EncodeObjects ready for signing
 * 
 * @example
 * ```typescript
 * const msgs = buildBatchMessages([
 *   buildMsgRequestAction(metadata1, price1, expTime1, creator),
 *   buildMsgRequestAction(metadata2, price2, expTime2, creator),
 * ]);
 * 
 * const result = await client.signAndBroadcast(address, msgs, totalFee);
 * ```
 */
export function buildBatchMessages(
  messages: (EncodeObject | (() => EncodeObject))[]
): EncodeObject[] {
  return messages.map((msg) => (typeof msg === "function" ? msg() : msg));
}

/**
 * Estimate gas for a transaction based on message count.
 * 
 * Provides a rough gas estimate based on the number of messages.
 * For accurate estimates, use the `simulate` method instead.
 * 
 * @param messageCount - Number of messages in the transaction
 * @param baseGas - Base gas amount (default: 100000)
 * @param gasPerMessage - Gas per additional message (default: 50000)
 * @returns Estimated gas amount
 * 
 * @example
 * ```typescript
 * const estimatedGas = estimateGas(2); // 2 messages
 * console.log("Estimated gas:", estimatedGas);
 * ```
 */
export function estimateGas(
  messageCount: number,
  baseGas = 100000,
  gasPerMessage = 50000
): number {
  return baseGas + gasPerMessage * Math.max(0, messageCount - 1);
}