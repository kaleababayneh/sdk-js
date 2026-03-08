/**
 * LEP-5 Availability Commitment - Merkle tree construction and challenge index derivation.
 *
 * This module implements the client-side commitment logic for the Storage
 * Verification Challenge (SVC). It builds a BLAKE3 Merkle tree over file chunks,
 * derives deterministic challenge indices from the root, and produces an
 * AvailabilityCommitment that gets submitted on-chain during cascade registration.
 *
 * Must produce identical commitments to the Go implementation in
 * supernode/pkg/cascadekit/commitment.go.
 *
 * @module cascade/commitment
 */

import { blake3HashBytes } from '../internal/hash';
import type { AvailabilityCommitment } from '../codegen/lumera/action/v1/metadata';
import { HashAlgo } from '../codegen/lumera/action/v1/metadata';

/** Default chunk size: 256 KiB */
export const DEFAULT_CHUNK_SIZE = 262144;

/** Minimum number of bytes for commitment (below this, skip SVC) */
export const MIN_TOTAL_SIZE = 4;

/** Commitment type string matching the Go constant */
export const COMMITMENT_TYPE = "lep5/chunk-merkle/v1";

/** Default SVC challenge count (matches chain default) */
export const DEFAULT_SVC_CHALLENGE_COUNT = 8;

/** Default minimum chunks for challenge (matches chain default) */
export const DEFAULT_SVC_MIN_CHUNKS_FOR_CHALLENGE = 4;

/**
 * Select the chunk size for a given file.
 * Starts at DEFAULT_CHUNK_SIZE and halves until there are at least minChunks chunks.
 */
export function selectChunkSize(fileSize: number, minChunks: number): number {
  let chunkSize = DEFAULT_CHUNK_SIZE;
  while (chunkSize > 1 && Math.ceil(fileSize / chunkSize) < minChunks) {
    chunkSize = Math.floor(chunkSize / 2);
  }
  return chunkSize;
}

/**
 * Split file bytes into chunks of the given size.
 */
export function chunkBytes(data: Uint8Array, chunkSize: number): Uint8Array[] {
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < data.length; offset += chunkSize) {
    chunks.push(data.subarray(offset, Math.min(offset + chunkSize, data.length)));
  }
  return chunks;
}

/**
 * Hash a leaf node: BLAKE3(0x00 || index_be32 || data)
 * Must match lumera/x/action/v1/merkle.HashLeaf
 */
export async function hashLeaf(index: number, data: Uint8Array): Promise<Uint8Array> {
  const buf = new Uint8Array(1 + 4 + data.length);
  buf[0] = 0x00; // leaf domain separator
  buf[1] = (index >>> 24) & 0xff;
  buf[2] = (index >>> 16) & 0xff;
  buf[3] = (index >>> 8) & 0xff;
  buf[4] = index & 0xff;
  buf.set(data, 5);
  return blake3HashBytes(buf);
}

/**
 * Hash an internal node: BLAKE3(0x01 || left || right)
 * Must match lumera/x/action/v1/merkle.HashNode
 */
export async function hashNode(left: Uint8Array, right: Uint8Array): Promise<Uint8Array> {
  const buf = new Uint8Array(1 + left.length + right.length);
  buf[0] = 0x01; // internal node domain separator
  buf.set(left, 1);
  buf.set(right, 1 + left.length);
  return blake3HashBytes(buf);
}

/**
 * Build a Merkle tree from leaf hashes.
 * Returns all levels: tree[0] = leaves, tree[last] = [root].
 */
export async function buildTree(leafHashes: Uint8Array[]): Promise<Uint8Array[][]> {
  if (leafHashes.length === 0) {
    throw new Error("cannot build tree from zero leaves");
  }

  const levels: Uint8Array[][] = [leafHashes];
  let current = leafHashes;

  while (current.length > 1) {
    const next: Uint8Array[] = [];
    for (let i = 0; i < current.length; i += 2) {
      if (i + 1 < current.length) {
        next.push(await hashNode(current[i], current[i + 1]));
      } else {
        // Odd node: promote to next level
        next.push(current[i]);
      }
    }
    levels.push(next);
    current = next;
  }

  return levels;
}

/**
 * Derive deterministic challenge indices from the Merkle root.
 * Uses BLAKE3(root || uint32be(counter)) mod numChunks.
 * Must match supernode/pkg/cascadekit/commitment.go:deriveSimpleIndices
 */
export async function deriveIndices(
  root: Uint8Array,
  numChunks: number,
  challengeCount: number
): Promise<number[]> {
  const indices: number[] = [];
  const seen = new Set<number>();
  let counter = 0;

  while (indices.length < challengeCount && indices.length < numChunks) {
    // BLAKE3(root || uint32be(counter))
    const buf = new Uint8Array(root.length + 4);
    buf.set(root, 0);
    buf[root.length] = (counter >>> 24) & 0xff;
    buf[root.length + 1] = (counter >>> 16) & 0xff;
    buf[root.length + 2] = (counter >>> 8) & 0xff;
    buf[root.length + 3] = counter & 0xff;

    const h = await blake3HashBytes(buf);

    // Use first 8 bytes as uint64 mod numChunks
    // DataView for big-endian reading
    const view = new DataView(h.buffer, h.byteOffset, h.byteLength);
    const hi32 = view.getUint32(0, false); // big-endian
    const lo32 = view.getUint32(4, false);
    // Compute (hi32 * 2^32 + lo32) mod numChunks using BigInt for precision
    const val = (BigInt(hi32) << 32n) | BigInt(lo32);
    const idx = Number(val % BigInt(numChunks));

    if (!seen.has(idx)) {
      seen.add(idx);
      indices.push(idx);
    }
    counter++;

    // Safety: avoid infinite loop if numChunks < challengeCount
    if (counter > challengeCount * 100) {
      break;
    }
  }

  return indices;
}

/**
 * Build an AvailabilityCommitment from file bytes.
 *
 * @param fileBytes - Raw file content
 * @param challengeCount - Number of challenge indices (from chain params, default 8)
 * @param minChunks - Minimum chunks for SVC (from chain params, default 4)
 * @returns The commitment (or undefined if file is too small) and the Merkle tree levels
 */
export async function buildCommitment(
  fileBytes: Uint8Array,
  challengeCount: number = DEFAULT_SVC_CHALLENGE_COUNT,
  minChunks: number = DEFAULT_SVC_MIN_CHUNKS_FOR_CHALLENGE,
): Promise<{ commitment: AvailabilityCommitment; tree: Uint8Array[][] } | undefined> {
  if (fileBytes.length < MIN_TOTAL_SIZE) {
    return undefined;
  }

  const chunkSize = selectChunkSize(fileBytes.length, minChunks);
  const chunks = chunkBytes(fileBytes, chunkSize);
  const numChunks = chunks.length;

  // Hash all leaves
  const leafHashes: Uint8Array[] = [];
  for (let i = 0; i < chunks.length; i++) {
    leafHashes.push(await hashLeaf(i, chunks[i]));
  }

  // Build tree
  const tree = await buildTree(leafHashes);
  const root = tree[tree.length - 1][0];

  // Derive challenge indices
  const challengeIndices = await deriveIndices(root, numChunks, challengeCount);

  const commitment: AvailabilityCommitment = {
    commitmentType: COMMITMENT_TYPE,
    hashAlgo: HashAlgo.HASH_ALGO_BLAKE3,
    chunkSize,
    totalSize: BigInt(fileBytes.length),
    numChunks,
    root,
    challengeIndices,
  };

  return { commitment, tree };
}
