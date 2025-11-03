/**
 * Converts a JavaScript object to its canonical JSON representation as a Uint8Array.
 * 
 * This function ensures deterministic serialization by:
 * - Recursively sorting all object keys alphabetically
 * - Removing all insignificant whitespace
 * - Producing identical byte sequences for equivalent objects
 * 
 * This is critical for creating reproducible signatures as required by LEP-1.
 * 
 * @param obj - The object to canonicalize
 * @returns A Uint8Array containing the UTF-8 encoded canonical JSON
 * 
 * @example
 * ```typescript
 * const obj = { b: 2, a: { z: 1, y: 2 } };
 * const canonical = toCanonicalJsonBytes(obj);
 * // Result: Uint8Array of '{"a":{"y":2,"z":1},"b":2}'
 * ```
 */
export function toCanonicalJsonBytes(obj: unknown): Uint8Array {
  const canonicalString = canonicalizeValue(obj);
  return new TextEncoder().encode(canonicalString);
}

/**
 * Internal helper to recursively canonicalize any JSON value.
 */
function canonicalizeValue(value: unknown): string {
  if (value === null) {
    return "null";
  }
  
  if (value === undefined) {
    return "null";
  }
  
  if (typeof value === "boolean" || typeof value === "number") {
    return JSON.stringify(value);
  }
  
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  
  if (Array.isArray(value)) {
    const elements = value.map(item => canonicalizeValue(item));
    return "[" + elements.join(",") + "]";
  }
  
  if (typeof value === "object") {
    const keys = Object.keys(value).sort();
    const pairs = keys.map(key => {
      const canonicalKey = JSON.stringify(key);
      const canonicalValue = canonicalizeValue((value as Record<string, unknown>)[key]);
      return canonicalKey + ":" + canonicalValue;
    });
    return "{" + pairs.join(",") + "}";
  }
  
  // Fallback for unsupported types
  return "null";
}

/**
 * Encodes a Uint8Array to a Base64 string using RFC 4648 standard encoding.
 * 
 * Uses the standard Base64 alphabet with no line wrapping or padding modifications.
 * This ensures cross-platform compatibility and adherence to the RFC 4648 specification.
 * 
 * @param bytes - The binary data to encode
 * @returns A Base64-encoded string
 * 
 * @example
 * ```typescript
 * const data = new Uint8Array([72, 101, 108, 108, 111]);
 * const encoded = toBase64(data);
 * // Result: "SGVsbG8="
 * ```
 */
export function toBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return Buffer.from(bytes).toString("base64");
  } else {
    // Browser environment
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}

/**
 * Decodes a Base64 string to a Uint8Array using RFC 4648 standard decoding.
 * 
 * Handles standard Base64 alphabet and properly processes padding.
 * 
 * @param base64String - The Base64-encoded string to decode
 * @returns The decoded binary data as a Uint8Array
 * @throws {Error} If the input is not a valid Base64 string
 * 
 * @example
 * ```typescript
 * const decoded = fromBase64("SGVsbG8=");
 * // Result: Uint8Array([72, 101, 108, 108, 111])
 * ```
 */
export function fromBase64(base64String: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return new Uint8Array(Buffer.from(base64String, "base64"));
  } else {
    // Browser environment
    const binary = atob(base64String);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}

/**
 * @deprecated Use toCanonicalJsonBytes instead for canonical JSON serialization
 */
export function toCanonicalJson(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj).sort();
  const ordered: Record<string, unknown> = {};
  for (const k of keys) ordered[k] = obj[k];
  return JSON.stringify(ordered);
}

/**
 * @deprecated Use toBase64 instead
 */
export function toB64(bytes: Uint8Array): string {
  return toBase64(bytes);
}

/**
 * Safely serializes an object to JSON, converting BigInt values to strings.
 *
 * This function ensures that BigInt values are converted to strings during JSON
 * serialization to prevent precision loss and JSON serialization errors. This is
 * critical when working with blockchain data that may contain large numbers.
 *
 * @param obj - The object to serialize
 * @returns A JSON string with all BigInt values converted to strings
 *
 * @example
 * ```typescript
 * const data = { height: 123456789012345678901n, amount: "1000" };
 * const json = safeJsonStringify(data);
 * // Result: '{"height":"123456789012345678901","amount":"1000"}'
 * ```
 */
export function safeJsonStringify(obj: any): string {
  return JSON.stringify(obj, (_, value) => {
    // Convert BigInt to string to prevent precision loss
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  });
}