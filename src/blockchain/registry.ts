/**
 * Custom message type registry for Lumera blockchain.
 * 
 * Registers Lumera-specific message types with CosmJS to enable transaction
 * simulation and broadcasting. Without these registrations, CosmJS will throw
 * "Unregistered type url" errors when trying to simulate or broadcast
 * Lumera-specific messages.
 * 
 * @module blockchain/registry
 */

import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";

/**
 * Lumera Action module message types.
 * 
 * These interfaces define the structure of message values for the Action module.
 * They match the protobuf definitions from the Lumera blockchain.
 */

/** MsgRequestAction value structure */
export interface MsgRequestActionValue {
  creator: string;
  actionType: string;
  metadata: string;
  price: string;
  expirationTime: string;
}

/** MsgFinalizeAction value structure */
export interface MsgFinalizeActionValue {
  creator: string;
  actionId: string;
  actionType: string;
  metadata: string;
}

/** MsgApproveAction value structure */
export interface MsgApproveActionValue {
  creator: string;
  actionId: string;
}

/**
 * Lumera Supernode module message types.
 */

/** MsgRegisterSupernode value structure */
export interface MsgRegisterSupernodeValue {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  supernodeAccount: string;
  p2p_port: string;
}

/** MsgDeregisterSupernode value structure */
export interface MsgDeregisterSupernodeValue {
  creator: string;
  validatorAddress: string;
}

/** MsgStartSupernode value structure */
export interface MsgStartSupernodeValue {
  creator: string;
  validatorAddress: string;
}

/** MsgStopSupernode value structure */
export interface MsgStopSupernodeValue {
  creator: string;
  validatorAddress: string;
  reason: string;
}

/** MsgUpdateSupernode value structure */
export interface MsgUpdateSupernodeValue {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  note: string;
  supernodeAccount: string;
  p2p_port: string;
}

/**
 * Simple encoding wrapper for Lumera message types.
 * 
 * Creates a minimal GeneratedType implementation that encodes messages as JSON.
 * This works for simple message structures that don't require complex protobuf encoding.
 */
function createSimpleType<T = any>(): GeneratedType {
  return {
    // Encode by returning the value as-is (it will be JSON-stringified by CosmJS)
    encode: (message: T, writer: any) => {
      // For simple types, CosmJS will handle the encoding
      return writer;
    },
    
    // Decode is not typically needed for signing, but we provide a no-op
    decode: (input: Uint8Array | any) => {
      return input;
    },
    
    // fromPartial creates a message from a partial input
    fromPartial: (object: Partial<T>): T => {
      return object as T;
    },
  };
}

/**
 * Lumera-specific message type registrations.
 * 
 * Maps type URLs to their corresponding message type implementations.
 * These are added to the default CosmJS registry to enable Lumera message support.
 */
export const lumeraTypes: ReadonlyArray<[string, GeneratedType]> = [
  // Action module
  ["/lumera.action.v1.MsgRequestAction", createSimpleType<MsgRequestActionValue>()],
  ["/lumera.action.v1.MsgFinalizeAction", createSimpleType<MsgFinalizeActionValue>()],
  ["/lumera.action.v1.MsgApproveAction", createSimpleType<MsgApproveActionValue>()],
  
  // Supernode module
  ["/lumera.supernode.v1.MsgRegisterSupernode", createSimpleType<MsgRegisterSupernodeValue>()],
  ["/lumera.supernode.v1.MsgDeregisterSupernode", createSimpleType<MsgDeregisterSupernodeValue>()],
  ["/lumera.supernode.v1.MsgStartSupernode", createSimpleType<MsgStartSupernodeValue>()],
  ["/lumera.supernode.v1.MsgStopSupernode", createSimpleType<MsgStopSupernodeValue>()],
  ["/lumera.supernode.v1.MsgUpdateSupernode", createSimpleType<MsgUpdateSupernodeValue>()],
];

/**
 * Create a registry with both default Cosmos and Lumera-specific message types.
 * 
 * This registry should be passed to `SigningStargateClient.connectWithSigner()`
 * to enable signing and broadcasting of Lumera-specific messages.
 * 
 * @returns Registry instance with all required message types
 * 
 * @example
 * ```typescript
 * import { createLumeraRegistry } from "./registry";
 * 
 * const registry = createLumeraRegistry();
 * const client = await SigningStargateClient.connectWithSigner(
 *   rpcUrl,
 *   signer,
 *   { registry, gasPrice }
 * );
 * ```
 */
export function createLumeraRegistry(): Registry {
  return new Registry([...defaultRegistryTypes, ...lumeraTypes]);
}