import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  blake3Hash,
  blake3HashBytes,
  blake3HashStream,
  blake3HashStreamBytes,
} from "src/internal/hash";

const toUint8 = (value: string): Uint8Array =>
  new TextEncoder().encode(value);

const concatChunks = (chunks: Uint8Array[]): Uint8Array => {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
};

vi.mock("blake3", () => {
  return {
    createHash: () => {
      const chunks: Uint8Array[] = [];
      return {
        update(data: Uint8Array) {
          chunks.push(
            data instanceof Uint8Array ? data : new Uint8Array(data)
          );
        },
        digest(encoding?: "hex") {
          const combined = concatChunks(chunks);
          if (encoding === "hex") {
            return Buffer.from(combined).toString("hex");
          }
          return Buffer.from(combined);
        },
      };
    },
  };
});

describe("hash utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("computes deterministic blake3 hash hex string", async () => {
    const result = await blake3Hash(toUint8("lumera"));
    expect(result).toBe(Buffer.from("lumera").toString("hex"));
  });

  it("computes blake3 hash bytes", async () => {
    const result = await blake3HashBytes(toUint8("sdk"));
    expect(Array.from(result)).toEqual(Array.from(Buffer.from("sdk")));
  });

  it("computes hash over ReadableStream (hex)", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(toUint8("chunk-1"));
        controller.enqueue(toUint8("chunk-2"));
        controller.close();
      },
    });

    const result = await blake3HashStream(stream);
    const expected = Buffer.from("chunk-1chunk-2").toString("hex");
    expect(result).toBe(expected);
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
    const expected = Buffer.from("alphabeta");
    expect(Array.from(result)).toEqual(Array.from(expected));
  });
});