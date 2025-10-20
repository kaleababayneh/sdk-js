/**
 * LEP-1 Helper Functions for RaptorQ Layout Operations
 * 
 * This module implements the LEP-1 (Lumera Enhancement Proposal 1) specification
 * for RaptorQ layout generation and index file construction. LEP-1 defines how
 * Cascade uploads derive layout IDs and construct the index file metadata.
 * 
 * @see https://github.com/LumeraProtocol/LEPs/blob/main/LEP-1.md
 */

import { WasmBridge } from './bridge.js';
import type { Layout, IndexFile } from './types.js';

/**
 * Creates a single-block RaptorQ layout from file bytes.
 * 
 * This function generates a deterministic RaptorQ layout suitable for encoding
 * the provided file data into a single source block. The layout is computed by
 * the rq-wasm library and includes all parameters needed for encoding and decoding.
 * 
 * @param fileBytes - The complete file content as a Uint8Array
 * @returns A promise that resolves to the RaptorQ layout configuration
 * 
 * @throws {Error} If the WASM module fails to initialize or layout creation fails
 * 
 * @remarks
 * - The layout generation is deterministic: identical input always produces identical output
 * - This is critical for LEP-1 compliance and data integrity verification
 * - The layout is used to derive the 50 layout IDs required by LEP-1
 * 
 * @example
 * ```typescript
 * const fileData = new TextEncoder().encode('Hello, Lumera!');
 * const layout = await createSingleBlockLayout(fileData);
 * console.log('Transfer length:', layout.transfer_length);
 * console.log('Symbol size:', layout.symbol_size);
 * ```
 */
export async function createSingleBlockLayout(fileBytes: Uint8Array): Promise<Layout> {
  const bridge = WasmBridge.getInstance();
  return bridge.createSingleBlockLayout(fileBytes);
}

/**
 * Derives a sequence of layout IDs according to LEP-1 specification.
 * 
 * This function generates a deterministic sequence of layout IDs by applying
 * modular arithmetic with wrapping. Each ID is computed as:
 * `layout_id[i] = (rq_ids_ic + i) % rq_ids_max`
 * 
 * @param rq_ids_ic - The initial counter value from blockchain action parameters
 * @param rq_ids_max - The maximum layout ID value from blockchain action parameters
 * @param count - The number of layout IDs to generate (typically 50 for LEP-1)
 * @returns An array of derived layout IDs
 * 
 * @throws {Error} If rq_ids_max is zero or negative
 * @throws {Error} If count is negative
 * 
 * @remarks
 * - The derivation is deterministic and must match on-chain validation
 * - Wrapping ensures IDs stay within the valid range [0, rq_ids_max)
 * - LEP-1 specifies count=50 for standard Cascade uploads
 * - The initial counter (rq_ids_ic) is obtained from blockchain action parameters
 * 
 * @example
 * ```typescript
 * // Typical LEP-1 usage: derive 50 layout IDs
 * const layoutIds = deriveLayoutIds(1000, 10000, 50);
 * console.log('First ID:', layoutIds[0]);  // 1000
 * console.log('Last ID:', layoutIds[49]);   // 1049
 * 
 * // Example with wrapping
 * const wrappedIds = deriveLayoutIds(9990, 10000, 50);
 * console.log('First ID:', wrappedIds[0]);   // 9990
 * console.log('11th ID:', wrappedIds[10]);   // 0 (wrapped)
 * ```
 */
export function deriveLayoutIds(
  rq_ids_ic: number,
  rq_ids_max: number,
  count: number
): number[] {
  // Validate inputs
  if (rq_ids_max <= 0) {
    throw new Error(`rq_ids_max must be positive, got ${rq_ids_max}`);
  }
  
  if (count < 0) {
    throw new Error(`count must be non-negative, got ${count}`);
  }

  // Generate layout IDs with modular arithmetic
  const layoutIds: number[] = [];
  for (let i = 0; i < count; i++) {
    const layoutId = (rq_ids_ic + i) % rq_ids_max;
    layoutIds.push(layoutId);
  }

  return layoutIds;
}

/**
 * Constructs the index file for a LEP-1 Cascade upload.
 * 
 * The index file contains metadata about the RaptorQ layout and includes
 * a cryptographic signature to ensure data integrity. It must be serialized
 * using canonical JSON when computing signatures or transmitting to the chain.
 * 
 * @param layout_ids - Array of derived layout IDs (typically 50 for LEP-1)
 * @param layout_signature - Cryptographic signature over the layout data (Base64-encoded bytes)
 * @returns The constructed index file object
 * 
 * @throws {Error} If layout_ids is empty
 * @throws {Error} If layout_signature is empty
 * 
 * @remarks
 * - The version is currently fixed at 1 per LEP-1 specification
 * - layout_ids must be derived using {@link deriveLayoutIds}
 * - layout_signature is computed by signing the canonical JSON bytes of the layout
 *   using ADR-036 signArbitrary with the uploader's wallet
 * - The index file must be serialized deterministically (canonical JSON) for on-chain verification
 * 
 * @example
 * ```typescript
 * // Typical LEP-1 workflow
 * const layoutIds = deriveLayoutIds(rq_ids_ic, rq_ids_max, 50);
 * 
 * // Sign the layout (done by wallet via ADR-036 signArbitrary)
 * const layoutBytes = canonicalJsonBytes(layout);
 * const signature = await wallet.signArbitrary(chainId, signerAddress, layoutBytes);
 * const signatureBytes = fromBase64(signature.signature);
 * 
 * // Build the index file
 * const indexFile = buildIndexFile(layoutIds, signatureBytes);
 * ```
 */
export function buildIndexFile(
  layout_ids: number[],
  layout_signature: Uint8Array
): IndexFile {
  // Validate inputs
  if (layout_ids.length === 0) {
    throw new Error('layout_ids must not be empty');
  }
  
  if (layout_signature.length === 0) {
    throw new Error('layout_signature must not be empty');
  }

  // Construct the index file per LEP-1 specification
  return {
    version: 1, // LEP-1 version
    layout_ids,
    layout_signature,
  };
}

/**
 * Re-export types for convenience
 */
export type { Layout, IndexFile, SourceBlock } from './types.js';