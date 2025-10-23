/**
 * Browser shim for @mongodb-js/zstd that skips native compression.
 * Returns the provided data unchanged so browser builds avoid bundling
 * the native `.node` binary that Vite cannot load.
 */
const DEV_LOG_PREFIX = '[zstd-browser]';

function normalizeToUint8Array(data: ArrayBufferView | ArrayBuffer): Uint8Array {
  if (data instanceof Uint8Array) {
    return data;
  }
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}

export async function compress(
  data: ArrayBufferView | ArrayBuffer,
  level = 0,
): Promise<Uint8Array> {
  if (typeof console !== 'undefined' && import.meta.env.DEV) {
    console.info(
      `${DEV_LOG_PREFIX} Returning input data unchanged (requested level: %o)`,
      level,
    );
  }
  const normalized = normalizeToUint8Array(data);
  return new Uint8Array(normalized);
}