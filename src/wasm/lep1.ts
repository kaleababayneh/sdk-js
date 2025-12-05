/**
 * LEP-1 Helper Functions for RaptorQ Layout Operations
 *
 * This module implements the LEP-1 (Lumera Enhancement Proposal 1) specification
 * for RaptorQ layout generation and index file construction. LEP-1 defines how
 * Cascade uploads derive layout IDs and construct the index file metadata.
 *
 * @see https://github.com/LumeraProtocol/LEPs/blob/main/LEP-1.md
 */

import { RaptorQProxy } from './raptorq-proxy.js';
import type { Layout, IndexFile } from './types.js';
import { blake3HashBytes } from './../internal/hash.js';
import { compress } from './../internal/zstd.js';
import bs58 from 'bs58';

/**
 * Creates a single-block RaptorQ layout from file bytes.
 *
 * This function generates a deterministic RaptorQ layout suitable for encoding
 * the provided file data into a single source block. The layout is computed by
 * the rq-wasm library and includes all parameters needed for encoding and decoding.
 *
 * @param fileBytes - The complete file content as a Uint8Array
 * @returns A promise that resolves to the raw layout file bytes (JSON format)
 *
 * @throws {Error} If the WASM module fails to initialize or layout creation fails
 *
 * @remarks
 * - The layout generation is deterministic: identical input always produces identical output
 * - This is critical for LEP-1 compliance and data integrity verification
 * - The layout bytes are what should be signed for LEP-1 compliance
 * - Use parseLayoutFile() to parse the bytes into a Layout object if needed for verification
 *
 * @example
 * ```typescript
 * const fileData = new TextEncoder().encode('Hello, Lumera!');
 * const layoutBytes = await createSingleBlockLayout(fileData);
 *
 * // Parse if needed for verification
 * const layout = parseLayoutFile(layoutBytes);
 * console.log('Transfer length:', layout.transfer_length);
 * console.log('Symbol size:', layout.symbol_size);
 * ```
 */
export async function createSingleBlockLayout(fileBytes: Uint8Array): Promise<Uint8Array> {
  const proxy = RaptorQProxy.getInstance();
  return proxy.createSingleBlockLayout(fileBytes);
}

/**
 * Parses raw layout file bytes into a Layout object.
 *
 * This utility function decodes and parses the JSON layout file returned by
 * createSingleBlockLayout. It's useful when you need to inspect layout properties
 * for verification or debugging purposes.
 *
 * @param layoutBytes - The raw layout file bytes (UTF-8 encoded JSON)
 * @returns The parsed Layout object
 *
 * @throws {Error} If the bytes cannot be decoded or parsed as valid JSON
 *
 * @example
 * ```typescript
 * const layoutBytes = await createSingleBlockLayout(fileData);
 * const layout = parseLayoutFile(layoutBytes);
 * console.log('Transfer length:', layout.transfer_length);
 * console.log('Symbol size:', layout.symbol_size);
 * console.log('Number of source blocks:', layout.num_source_blocks);
 * ```
 */
export function parseLayoutFile(layoutBytes: Uint8Array): Layout {
  try {
    const layoutJson = new TextDecoder('utf-8').decode(layoutBytes);
    return JSON.parse(layoutJson) as Layout;
  } catch (error) {
    throw new Error(
      `Failed to parse layout file: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Derives a sequence of layout IDs according to LEP-1 specification.
 *
 * This function generates a deterministic sequence of layout IDs by:
 * 1. Creating layout_with_signature = Base64(layout_file) + "." + Base64(layout_signature)
 * 2. For each index i in [0, rq_ids_max):
 *    - counter_i = rq_ids_ic + i
 *    - layout_id_i = Base58(BLAKE3(zstd(layout_with_signature + "." + decimal(counter_i))))
 *
 * @param layoutFileB64 - The RaptorQ layout file as a Base64 string
 * @param layoutSignatureB64 - The cryptographic signature over the layout data as a Base64 string
 * @param rq_ids_ic - The initial counter value from blockchain action parameters
 * @param rq_ids_max - The number of layout IDs to generate
 * @returns A promise resolving to an array of Base58-encoded layout IDs
 *
 * @throws {Error} If rq_ids_max is zero or negative
 * @throws {Error} If layoutFile or layoutSignature is empty
 *
 * @remarks
 * - The derivation is deterministic and must match on-chain validation
 * - LEP-1 specifies count=50 for standard Cascade uploads
 * - Uses zstd compression, BLAKE3 hashing, and Base58 encoding
 *
 * @example
 * ```typescript
 * const layoutFile = new Uint8Array([...]);
 * const layoutSignature = new Uint8Array([...]);
 * const layoutIds = await generateIds(layoutFile, layoutSignature, 1000, 50);
 * console.log('First ID:', layoutIds[0]);
 * console.log('Last ID:', layoutIds[49]);
 * ```
 */
export async function generateIds(
  layoutFileB64: string,
  layoutSignatureB64: string,
  rq_ids_ic: number,
  rq_ids_max: number
): Promise<string[]> {
  // Validate inputs
  if (rq_ids_max <= 0) {
    throw new Error(`rq_ids_max must be positive, got ${rq_ids_max}`);
  }

  if (layoutFileB64.length === 0) {
    throw new Error("layoutFile must not be empty");
  }

  if (layoutSignatureB64.length === 0) {
    throw new Error("layoutSignature must not be empty");
  }

  // Create layout_with_signature = Base64(layout_file) + "." + Base64(layout_signature)
  const layoutWithSignature = `${layoutFileB64}.${layoutSignatureB64}`;

  // Generate layout IDs
  const layoutIds: string[] = [];
  for (let i = 0; i < rq_ids_max; i++) {
    const counter = rq_ids_ic + i;
    // Create the input string: layout_with_signature + "." + counter
    const input = `${layoutWithSignature}.${counter}`;

    // Compress with zstd
    const compressed = await compress(input);

    // Hash with BLAKE3 (get bytes directly for Base58 encoding)
    const hashBytes = await blake3HashBytes(compressed);

    // Encode with Base58
    const layoutId = bs58.encode(hashBytes);
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
 * - layout_ids must be derived using {@link generateIds}
 * - layout_signature is computed by signing the canonical JSON bytes of the layout
 *   using ADR-036 signArbitrary with the uploader's wallet
 * - The index file must be serialized deterministically (canonical JSON) for on-chain verification
 *
 * @example
 * ```typescript
 * // Typical LEP-1 workflow
 * const layoutIds = await generateIds(layoutFile, layoutSignature, rq_ids_ic, rq_ids_max);
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
  layout_ids: string[],
  layout_signature: string
): IndexFile {
  // Validate inputs
  if (layout_ids.length === 0) {
    throw new Error("layout_ids must not be empty");
  }

  if (layout_signature.length === 0) {
    throw new Error("layout_signature must not be empty");
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
export type { Layout, IndexFile, SourceBlock } from "./types.js";
