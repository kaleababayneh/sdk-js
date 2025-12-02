import { ZstdCodec } from 'zstd-codec';

const toUint8 = (data: ArrayBufferView | ArrayBuffer): Uint8Array => {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
};

let zstdReady: Promise<any> | null = null;

function ensureZstdLoaded(): Promise<any> {
  if (!zstdReady) {
    zstdReady = new Promise((resolve, reject) => {
      ZstdCodec.run((zstd: any) => {
        resolve(zstd);
      });
    });
  }
  return zstdReady;
}

export async function compress(data: ArrayBufferView | ArrayBuffer, level = 3): Promise<Uint8Array> {
  const inputBytes = toUint8(data);

  // Load WASM module
  const zstd = await ensureZstdLoaded();

  // Create Simple compressor and compress at specified level
  const simple = new zstd.Simple();
  const compressed = simple.compress(inputBytes, level);

  return new Uint8Array(compressed);
}
