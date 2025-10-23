import { compress as zstdCompress } from "@mongodb-js/zstd";

export async function compress(data: ArrayBufferView | ArrayBuffer, level = 3): Promise<Uint8Array> {
  const view = data instanceof ArrayBuffer ? new Uint8Array(data) :
              data instanceof Uint8Array ? data :
              new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  const buffer = Buffer.from(view);
  const out = await zstdCompress(buffer, level);
  return new Uint8Array(out);
}