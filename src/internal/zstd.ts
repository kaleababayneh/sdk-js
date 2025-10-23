import { compress as zstdCompress } from "@lumera/sdk-js/compat/zstd";

/**
 * Compress a string using ZSTD compression
 * @param data - The string to compress
 * @returns The compressed data as a Uint8Array
 */
export async function compress(data: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(data);
  // Compress with level 3 (balances speed and compression ratio)
  const compressed = await zstdCompress(bytes, 3);
  // Return as Uint8Array for consistency with the API
  return compressed;
}