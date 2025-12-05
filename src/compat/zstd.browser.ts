/**
 * Browser zstd compressor.
 *
 * For determinism, use @bokuweb/zstd-wasm (compressible WASM) instead of zstd-codec,
 * which does not match the Go/DataDog reference output for LEP-1 ID derivation.
 *
 * This keeps the same API: compress(data, level=3) -> Uint8Array.
 */
type Compress = (input: Uint8Array, level?: number) => Uint8Array;

const toUint8 = (data: ArrayBufferView | ArrayBuffer): Uint8Array => {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
};

// We lazy-load and init @bokuweb/zstd-wasm because it needs to fetch/instantiate WASM.
let bokuReady: Promise<Compress> | null = null;

async function ensureBokuwebLoaded(): Promise<Compress> {
  if (!bokuReady) {
    bokuReady = (async () => {
      // Let the package choose the right browser entry and wasm asset.
      const zstd = (await import('@bokuweb/zstd-wasm')) as {
        init?: (path?: string) => Promise<void>;
        compress: (buf: Uint8Array, level?: number) => Uint8Array;
      };

      if (typeof zstd.init === 'function') {
        // In bundler environments, init() without a path resolves the wasm internally.
        await zstd.init();
      }

      if (typeof zstd.compress !== 'function') {
        throw new Error('@bokuweb/zstd-wasm does not expose compress()');
      }

      return (input: Uint8Array, level = 3) =>
        new Uint8Array(zstd.compress(input, level));
    })();
  }
  return bokuReady;
}

/**
 * Compress bytes at the given zstd level (default 3).
 * Returns a new Uint8Array containing the compressed payload.
 */
export async function compress(
  data: ArrayBufferView | ArrayBuffer,
  level = 3
): Promise<Uint8Array> {
  const inputBytes = toUint8(data);
  const compressor = await ensureBokuwebLoaded();
  return compressor(inputBytes, level);
}
