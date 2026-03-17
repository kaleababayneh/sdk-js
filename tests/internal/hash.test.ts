import { describe, expect, it, vi, beforeEach } from "vitest";
import { blake3Hash, blake3HashBytes, blake3HashStream, blake3HashStreamBytes } from "src/internal/hash";

const toUint8 = (value: string): Uint8Array => new TextEncoder().encode(value);

vi.mock("@lumera-protocol/sdk-js/compat/blake3", () => ({
  createHash: async () => {
    const chunks: Uint8Array[] = [];
    return {
      update(data: Uint8Array) {
        chunks.push(data instanceof Uint8Array ? data : new Uint8Array(data));
      },
      digest() {
        const total = chunks.reduce((n, c) => n + c.length, 0);
        const out = new Uint8Array(total);
        let offset = 0;
        for (const c of chunks) {
          out.set(c, offset);
          offset += c.length;
        }
        return out;
      },
    };
  },
}));

describe("hash utilities", () => {
  beforeEach(() => vi.clearAllMocks());

  it("computes deterministic blake3 hash base64 string", async () => {
    const result = await blake3Hash(toUint8("lumera"));
    expect(result).toBe(Buffer.from("lumera").toString("base64"));
  });

  it("computes blake3 hash bytes", async () => {
    const result = await blake3HashBytes(toUint8("sdk"));
    expect(Array.from(result)).toEqual(Array.from(Buffer.from("sdk")));
  });

  it("computes hash over ReadableStream (base64)", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(toUint8("chunk-1"));
        controller.enqueue(toUint8("chunk-2"));
        controller.close();
      },
    });
    const result = await blake3HashStream(stream);
    expect(result).toBe(Buffer.from("chunk-1chunk-2").toString("base64"));
  });

  it("computes hash bytes over ReadableStream", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(toUint8("alpha"));
        controller.enqueue(toUint8("beta"));
        controller.close();
      },
    });
    const result = await blake3HashStreamBytes(stream);
    expect(Array.from(result)).toEqual(Array.from(Buffer.from("alphabeta")));
  });
});
