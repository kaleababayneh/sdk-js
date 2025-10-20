import { describe, expect, it } from "vitest";
import {
  fromBase64,
  toB64,
  toBase64,
  toCanonicalJson,
  toCanonicalJsonBytes,
} from "src/internal/encoding";

const decoder = new TextDecoder();

describe("encoding utilities", () => {
  it("produces deterministic canonical JSON bytes for nested objects", () => {
    const input = { b: 2, a: { z: 1, y: 2 } };
    const canonicalBytes = toCanonicalJsonBytes(input);
    const canonicalString = decoder.decode(canonicalBytes);

    expect(canonicalString).toBe('{"a":{"y":2,"z":1},"b":2}');
  });

  it("treats undefined values as null in canonical JSON", () => {
    const input = { foo: undefined, bar: null };
    const canonicalString = decoder.decode(toCanonicalJsonBytes(input));

    expect(canonicalString).toBe('{"bar":null,"foo":null}');
  });

  it("serializes arrays and primitives without extra whitespace", () => {
    const input = { arr: [1, true, "hi", { z: 3, a: 1 }] };
    const canonicalString = decoder.decode(toCanonicalJsonBytes(input));

    expect(canonicalString).toBe('{"arr":[1,true,"hi",{"a":1,"z":3}]}');
  });

  it("encodes bytes to RFC 4648 Base64 string in Node environments", () => {
    const helloBytes = new Uint8Array([72, 101, 108, 108, 111]);
    expect(toBase64(helloBytes)).toBe("SGVsbG8=");
    expect(toB64(helloBytes)).toBe("SGVsbG8=");
  });

  it("decodes Base64 strings to original bytes", () => {
    const decoded = fromBase64("SGVsbG8=");
    expect(Array.from(decoded)).toEqual([72, 101, 108, 108, 111]);
  });

  it("handles empty input for Base64 helpers", () => {
    const empty = new Uint8Array();
    const encoded = toBase64(empty);
    expect(encoded).toBe("");
    expect(Array.from(fromBase64(encoded))).toEqual([]);
  });

  it("keeps deprecated toCanonicalJson helper deterministic", () => {
    const input = { gamma: 3, alpha: 1, beta: 2 };
    const canonical = toCanonicalJson(input);
    expect(canonical).toBe('{"alpha":1,"beta":2,"gamma":3}');
  });
});