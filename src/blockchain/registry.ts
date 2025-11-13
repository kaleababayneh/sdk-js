/**
 * Registry and Amino types for Lumera blockchain.
 *
 * This module re-exports the Telescope-generated registry and Amino type functions
 * from the codegen directory. For new code, use the generated functions directly
 * from `../codegen/lumera/client`.
 *
 * @module blockchain/registry
 */

// Re-export the generated registry components for convenience
export {
  lumeraProtoRegistry,
  lumeraAminoConverters,
  getSigningLumeraClientOptions,
  getSigningLumeraClient,
  /**
   * @deprecated Use `getSigningLumeraClientOptions()` from `../codegen/lumera/client` instead.
   * This provides both registry and aminoTypes in a single call.
   *
   * This function will be removed in v2.0.0.
   *
   * @example
   * ```typescript
   * import { getSigningLumeraClientOptions } from "@lumera-protocol/sdk-js/codegen/lumera/client";
   *
   * const { registry, aminoTypes } = getSigningLumeraClientOptions();
   * const client = await SigningStargateClient.connectWithSigner(
   *   rpcUrl,
   *   signer,
   *   { registry, aminoTypes, gasPrice }
   * );
   * ```
   */
  getSigningLumeraClientOptions as createLumeraRegistry
} from "../codegen/lumera/client";