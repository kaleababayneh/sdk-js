const toUint8 = (data: ArrayBufferView | ArrayBuffer): Uint8Array => {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
};

export async function compress(data: ArrayBufferView | ArrayBuffer, _level = 0): Promise<Uint8Array> {
  return toUint8(data);
}