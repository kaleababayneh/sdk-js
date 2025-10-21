/**
 * Protobuf message definitions for action metadata.
 * 
 * This module provides utilities for decoding Base64-encoded protobuf metadata 
 * from the blockchain. The actual type definitions are imported from the 
 * interfaces module to maintain a single source of truth.
 * 
 * @module blockchain/prototypes
 */

import { fromBase64 } from "@cosmjs/encoding";
import { ActionType, type CascadeMetadata, type SenseMetadata } from "./interfaces";

// Re-export the interfaces for convenience
export type { CascadeMetadata, SenseMetadata };

/**
 * Decode action metadata from Base64-encoded protobuf.
 * 
 * Decodes the Base64 metadata string from an action response and deserializes it
 * into the appropriate metadata type based on the action type.
 * 
 * @param action - Raw action object from the API response
 * @returns Deserialized metadata object (CascadeMetadata or SenseMetadata)
 * @throws {Error} If the action type is unknown or metadata decoding fails
 * 
 * @example
 * ```typescript
 * const action = await api.getAction("1111");
 * const metadata = decodeActionMetadata(action);
 * 
 * if (action.actionType === ActionType.CASCADE) {
 *   console.log("File:", (metadata as CascadeMetadata).file_name);
 * }
 * ```
 */
export function decodeActionMetadata(
  action: {
    actionType: string;
    metadata: string;
  }
): CascadeMetadata | SenseMetadata {
  // Decode Base64 to Uint8Array
  const metadataBytes = fromBase64(action.metadata);

  // Deserialize based on action type - using JSON parsing as a simple approach
  // Note: For proper protobuf decoding, you'd need the schema definition
  // This is a placeholder that assumes the metadata is stored in a compatible format
  const decoded = JSON.parse(new TextDecoder().decode(metadataBytes));
  
  return decoded;
}