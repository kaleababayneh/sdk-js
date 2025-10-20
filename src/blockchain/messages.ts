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
 * Metadata for a Cascade action registration.
 * 
 * Contains all information required to register a Cascade storage action on-chain.
 */
export interface CascadeActionMetadata {
  /** Data hash (BLAKE3) of the file being stored */
  data_hash: string;
  /** Size of the file in bytes */
  file_size: number;
  /** RaptorQ block identifier (rq_ids_ic) */
  rq_ids_ic: number;
  /** Maximum RQ IDs for layout derivation (rq_ids_max) */
  rq_ids_max: number;
  /** Number of layout IDs (typically 50 for LEP-1) */
  layout_ids_count: number;
  /** Base64-encoded layout signature */
  layout_signature: string;
  /** Whether the action is public (empty download signature) or private */
  public: boolean;
}

/**
 * Build a MsgRegisterAction for Cascade storage.
 * 
 * Constructs an EncodeObject for registering a Cascade action on the Lumera blockchain.
 * This message type is used to initiate storage of data via the Cascade protocol.
 * 
 * @param metadata - Cascade action metadata
 * @param fee - Action fee in uLUME (as string, e.g., "100000")
 * @param creator - Address of the account creating the action
 * @returns EncodeObject ready for transaction signing
 * 
 * @example
 * ```typescript
 * const msg = buildMsgRegisterAction(
 *   {
 *     data_hash: "abc123...",
 *     file_size: 1024000,
 *     rq_ids_ic: 12345,
 *     rq_ids_max: 100000,
 *     layout_ids_count: 50,
 *     layout_signature: "base64signature==",
 *     public: false
 *   },
 *   "100000",
 *   "lumera1abc..."
 * );
 * 
 * const result = await client.signAndBroadcast(address, [msg], fee);
 * ```
 */
export function buildMsgRegisterAction(
  metadata: CascadeActionMetadata,
  fee: string,
  creator: string
): EncodeObject {
  return {
    typeUrl: "/lumera.action.v1.MsgRegisterAction",
    value: {
      creator,
      fee,
      metadata: {
        type: "cascade",
        data_hash: metadata.data_hash,
        file_size: metadata.file_size.toString(),
        rq_ids_ic: metadata.rq_ids_ic,
        rq_ids_max: metadata.rq_ids_max,
        layout_ids_count: metadata.layout_ids_count,
        layout_signature: metadata.layout_signature,
        public: metadata.public,
      },
    },
  };
}

/**
 * Calculate the fee for a Cascade action based on file size.
 * 
 * Computes the total fee required for a Cascade action using the action module's
 * fee schedule (base fee + per-KB fee).
 * 
 * @param fileSizeBytes - Size of the file in bytes
 * @param feeBase - Base fee in uLUME (from action params)
 * @param feePerKb - Per-kilobyte fee in uLUME (from action params)
 * @returns Total fee in uLUME as a string
 * 
 * @example
 * ```typescript
 * const params = await client.Action.getParams();
 * const fee = calculateCascadeFee(
 *   1024000, // 1MB file
 *   params.fee_base,
 *   params.fee_per_kb
 * );
 * console.log("Fee:", fee, "uLUME");
 * ```
 */
export function calculateCascadeFee(
  fileSizeBytes: number,
  feeBase: string,
  feePerKb: string
): string {
  const base = BigInt(feeBase);
  const perKb = BigInt(feePerKb);
  const kb = BigInt(Math.ceil(fileSizeBytes / 1024));
  const totalFee = base + perKb * kb;
  return totalFee.toString();
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
 *   buildMsgRegisterAction(metadata1, fee1, creator),
 *   buildMsgRegisterAction(metadata2, fee2, creator),
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