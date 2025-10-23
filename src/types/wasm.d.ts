declare module "/wasm/rq_library.js" {
  interface RaptorQModule {
    default(moduleOrPath?: unknown): Promise<unknown>;
    [exportName: string]: unknown;
  }

  const module: RaptorQModule;
  export default module;
}

// Vite's ?url import suffix
declare module "*?url" {
  const url: string;
  export default url;
}