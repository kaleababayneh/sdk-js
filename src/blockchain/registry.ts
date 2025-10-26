/**
 * Custom message type registry for Lumera blockchain.
 *
 * This module now uses the Telescope-generated protobuf registry and Amino types
 * from the codegen directory, providing automatic support for all Lumera and Cosmos message types.
 *
 * @module blockchain/registry
 */

import { Registry } from "@cosmjs/proto-signing";
import { AminoTypes, defaultRegistryTypes } from "@cosmjs/stargate";
import { lumeraProtoRegistry, lumeraAminoConverters } from "../codegen/lumera/client";

/**
 * Create a registry with both default Cosmos and Lumera-specific message types.
 *
 * Uses Telescope-generated protobuf types for automatic type safety and support
 * for all Lumera blockchain messages. This registry should be passed to
 * `SigningStargateClient.connectWithSigner()` to enable signing and broadcasting
 * of Lumera-specific messages.
 *
 * @returns Registry instance with all required message types automatically registered
 *
 * @example
 * ```typescript
 * import { createRegistry } from "@lumera/sdk-js";
 *
 * const registry = createRegistry();
 * const client = await SigningStargateClient.connectWithSigner(
 *   rpcUrl,
 *   signer,
 *   { registry, gasPrice }
 * );
 * ```
 */
export function createRegistry(): Registry {
  return new Registry([...defaultRegistryTypes, ...lumeraProtoRegistry]);
}

/**
 * Create Amino types for Ledger hardware wallet support.
 *
 * Uses Telescope-generated Amino converters to provide Amino encoding/decoding
 * for all Lumera message types. This is required for Ledger hardware wallet
 * compatibility and for broadcasting transactions in Amino JSON format.
 *
 * @returns AminoTypes instance with all Lumera Amino converters automatically configured
 *
 * @example
 * ```typescript
 * import { createAminoTypes } from "@lumera/sdk-js";
 *
 * const aminoTypes = createAminoTypes();
 * const client = await SigningStargateClient.connectWithSigner(
 *   rpcUrl,
 *   signer,
 *   { aminoTypes }
 * );
 * ```
 */
export function createAminoTypes(): AminoTypes {
  return new AminoTypes(lumeraAminoConverters);
}

/**
 * @deprecated Use `createRegistry()` instead. This function is maintained for backward compatibility
 * and will be removed in v2.0.0. The new `createRegistry()` function uses Telescope-generated
 * protobuf types instead of manual implementations.
 *
 * @see {@link createRegistry} for the recommended approach
 */
export function createLumeraRegistry(): Registry {
  return createRegistry();
}