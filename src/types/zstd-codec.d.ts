declare module "zstd-codec" {
  // The library exposes a ZstdCodec namespace that provides a `run` helper
  // which asynchronously loads the WASM module and passes a module instance
  // into the callback. We keep this intentionally loose-typed since the
  // browser compat shim only needs `new zstd.Simple().compress(...)`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const ZstdCodec: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run(cb: (zstd: any) => void): void;
  };
}

