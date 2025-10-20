import { createHash as createBlake3Hash } from "blake3";

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
 * @returns A Promise resolving to the hash as a hexadecimal string
 * 
 * @example
 * ```typescript
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * const hash = await blake3Hash(data);
 * // Result: "a13b5320..." (64 character hex string)
 * ```
 */
export async function blake3Hash(data: Uint8Array): Promise<string> {
  const hasher = createBlake3Hash();
  hasher.update(data);
  return hasher.digest("hex");
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
  const hasher = createBlake3Hash();
  hasher.update(data);
  return hasher.digest();
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
 * @returns A Promise resolving to the hash as a hexadecimal string
 * 
 * @example
 * ```typescript
 * const fileStream = file.stream();
 * const hash = await blake3HashStream(fileStream);
 * // Result: "a13b5320..." (64 character hex string)
 * ```
 */
export async function blake3HashStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const hasher = createBlake3Hash();
  const reader = stream.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      hasher.update(value);
    }
    return hasher.digest("hex");
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
  const hasher = createBlake3Hash();
  const reader = stream.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      hasher.update(value);
    }
    return hasher.digest();
  } finally {
    reader.releaseLock();
  }
}