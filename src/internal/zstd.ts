import { compress as zstdCompress } from "@lumera-protocol/sdk-js/compat/zstd";

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

  // Verify compression is working (zstd magic bytes: 0x28 0xB5 0x2F 0xFD)
  const hasZstdMagic = compressed.length >= 4 &&
    compressed[0] === 0x28 &&
    compressed[1] === 0xB5 &&
    compressed[2] === 0x2F &&
    compressed[3] === 0xFD;

  console.log('🗜️ zstd.compress', {
    inputLength: bytes.length,
    compressedLength: compressed.length,
    hasZstdMagic,
    firstBytes: Array.from(compressed.slice(0, 4)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '),
    sample: data.length > 50 ? data.substring(0, 50) + '...' : data
  });

  // Return as Uint8Array for consistency with the API
  return compressed;
}