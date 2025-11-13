/**
 * Transaction message utilities for Lumera blockchain.
 *
 * This module provides utility functions for transaction message handling.
 * For building messages, use the Telescope-generated message composers:
 *
 * ```typescript
 * import { lumera } from '@lumera-protocol/sdk-js';
 *
 * // Action messages
 * lumera.action.v1.MessageComposer.withTypeUrl.requestAction({...});
 * lumera.action.v1.MessageComposer.withTypeUrl.finalizeAction({...});
 *
 * // Supernode messages
 * lumera.supernode.v1.MessageComposer.withTypeUrl.registerSupernode({...});
 * ```
 *
 * See [`MIGRATION.md`](../../../MIGRATION.md) for complete migration guide.
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
 * Calculate the fee for a Cascade action based on file size.
 *
 * Applies ceiling rounding per kilobyte and returns the total fee as a string in uLUME.
 *
 * @param fileSizeBytes - File size in bytes
 * @param feeBase - Base fee component as a string
 * @param feePerKb - Per-kilobyte fee component as a string
 * @returns Total fee (base + per-KB component) as a string
 */
export function calculateCascadeFee(
  fileSizeBytes: number,
  feeBase: string,
  feePerKb: string
): string {
  const kbUnit = 1024n;
  const fileSize = BigInt(fileSizeBytes);
  const baseFee = BigInt(feeBase);
  const perKbFee = BigInt(feePerKb);
  const kbCount = fileSize === 0n ? 0n : (fileSize + kbUnit - 1n) / kbUnit;
  const total = baseFee + perKbFee * kbCount;
  return total.toString();
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