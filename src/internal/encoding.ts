import { createHash } from "crypto";

export function toCanonicalJson(obj: Record<string, unknown>): string {
  // simplistic deterministic JSON (replace with robust canonicalizer if you have nested objects)
  const keys = Object.keys(obj).sort();
  const ordered: Record<string, unknown> = {};
  for (const k of keys) ordered[k] = obj[k];
  return JSON.stringify(ordered);
}

export function toB64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

export async function blake3hex(bytes: Uint8Array): Promise<string> {
  // NOTE: replace with real blake3; using sha256 as a buildable placeholder
  if (typeof window === "undefined") {
    const h = createHash("sha256").update(bytes).digest("hex");
    return h;
  } else {
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
}
