import { createHash as createBlake3Hash } from "@lumera-protocol/sdk-js/compat/blake3";
import { toBase64 } from "./encoding.js";

/**
 * Computes the BLAKE3 hash of a Uint8Array.
 *
 * BLAKE3 is a cryptographic hash function that is faster than MD5, SHA-1, SHA-2,
 * and SHA-3, yet is just as secure as the latest standard SHA-3.
 *
 * This function is used for:
 * - Computing data_hash for file integrity verification
 * - Creating signatures for start and download operations
 * - Ensuring deterministic hashing across platforms
 *
 * @param data - The binary data to hash
 * @returns A Promise resolving to the hash as a Base64 string
 *
 * @example
 * ```typescript
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * const hash = await blake3Hash(data);
 * // Result: "oRNTIA..." (Base64 encoded string)
 * ```
 */
export async function blake3Hash(data: Uint8Array): Promise<string> {
  const hasher = await createBlake3Hash();
  hasher.update(data);
  const digest = hasher.digest();
  // Get the hash as Uint8Array and encode to Base64
  const hashBytes = digest instanceof Uint8Array ? digest : new Uint8Array(digest);
  return toBase64(hashBytes);
}

/**
 * Computes the BLAKE3 hash of a Uint8Array and returns it as a Uint8Array.
 * 
 * Similar to blake3Hash but returns the raw bytes instead of a hex string.
 * Useful when you need the hash in binary form for further processing.
 * 
 * @param data - The binary data to hash
 * @returns A Promise resolving to the 32-byte hash as a Uint8Array
 * 
 * @example
 * ```typescript
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * const hashBytes = await blake3HashBytes(data);
 * // Result: Uint8Array(32) [...]
 * ```
 */
export async function blake3HashBytes(data: Uint8Array): Promise<Uint8Array> {
  const hasher = await createBlake3Hash();
  hasher.update(data);
  const digest = hasher.digest();
  // Handle both Node.js and browser (both return Uint8Array or compatible)
  return digest instanceof Uint8Array ? digest : new Uint8Array(digest);
}

/**
 * Computes the BLAKE3 hash of a ReadableStream.
 *
 * This function processes the stream incrementally, making it suitable for
 * hashing large files without loading them entirely into memory.
 *
 * The stream will be fully consumed during hashing.
 *
 * @param stream - The ReadableStream to hash
 * @returns A Promise resolving to the hash as a Base64 string
 *
 * @example
 * ```typescript
 * const fileStream = file.stream();
 * const hash = await blake3HashStream(fileStream);
 * // Result: "oRNTIA..." (Base64 encoded string)
 * ```
 */
export async function blake3HashStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const hasher = await createBlake3Hash();
  const reader = stream.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      hasher.update(value);
    }
    const digest = hasher.digest();
    // Get the hash as Uint8Array and encode to Base64
    const hashBytes = digest instanceof Uint8Array ? digest : new Uint8Array(digest);
    return toBase64(hashBytes);
  } finally {
    reader.releaseLock();
  }
}

/**
 * Computes the BLAKE3 hash of a ReadableStream and returns it as a Uint8Array.
 * 
 * Similar to blake3HashStream but returns the raw bytes instead of a hex string.
 * Processes the stream incrementally for memory efficiency.
 * 
 * The stream will be fully consumed during hashing.
 * 
 * @param stream - The ReadableStream to hash
 * @returns A Promise resolving to the 32-byte hash as a Uint8Array
 * 
 * @example
 * ```typescript
 * const fileStream = file.stream();
 * const hashBytes = await blake3HashStreamBytes(fileStream);
 * // Result: Uint8Array(32) [...]
 * ```
 */
export async function blake3HashStreamBytes(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const hasher = await createBlake3Hash();
  const reader = stream.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      hasher.update(value);
    }
    const digest = hasher.digest();
    // Handle both Node.js and browser (both return Uint8Array or compatible)
    return digest instanceof Uint8Array ? digest : new Uint8Array(digest);
  } finally {
    reader.releaseLock();
  }
}