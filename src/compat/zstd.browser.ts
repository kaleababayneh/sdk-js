// @ts-ignore - zstd-codec doesn't have TypeScript definitions
import { ZstdCodec } from 'zstd-codec';

const toUint8 = (data: ArrayBufferView | ArrayBuffer): Uint8Array => {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
};

let zstdReady: Promise<any> | null = null;
let cachedCompressor: any = null;

function ensureZstdLoaded(): Promise<any> {
  if (!zstdReady) {
    zstdReady = new Promise((resolve, reject) => {
      console.log('🔧 Loading zstd-codec WASM...');
      try {
        ZstdCodec.run((zstd: any) => {
          console.log('✅ zstd-codec loaded successfully');
          // Create a single compressor instance to reuse for deterministic compression
          cachedCompressor = new zstd.Simple();
          resolve(zstd);
        });
      } catch (error) {
        console.error('❌ Failed to load zstd-codec:', error);
        reject(error);
      }
    });
  }
  return zstdReady;
}

export async function compress(data: ArrayBufferView | ArrayBuffer, level = 3): Promise<Uint8Array> {
  const inputBytes = toUint8(data);

  // Load WASM module and ensure compressor is initialized
  await ensureZstdLoaded();

  // IMPORTANT: Reuse the same compressor instance for deterministic output
  // Creating a new compressor each time can lead to non-deterministic compression
  if (!cachedCompressor) {
    throw new Error('ZSTD compressor not initialized');
  }

  // Compress using the cached compressor instance
  const compressed = cachedCompressor.compress(inputBytes, level);

  return new Uint8Array(compressed);
}