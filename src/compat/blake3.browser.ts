import loadBlake3 from 'blake3/browser-async';
import wasmUrl from 'blake3/dist/wasm/web/blake3_js_bg.wasm?url';

let blake3Instance: any = null;
let wasmLoaded: Promise<void> | null = null;

async function ensureLoaded() {
  if (!wasmLoaded) {
    wasmLoaded = (async () => {
      // Load WASM by passing the fetched WASM binary to the loader
      blake3Instance = await loadBlake3(fetch(wasmUrl));
    })();
  }
  await wasmLoaded;
}

export async function createHash() {
  await ensureLoaded();
  return blake3Instance.createHash();
}