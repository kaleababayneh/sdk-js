/**
 * RaptorQ WASM Proxy
 *
 * This module provides a proxy layer to the RaptorQ WASM library (rq-library-wasm).
 * It handles initialization, in-memory filesystem operations, and provides a clean
 * interface for RaptorQ operations.
 */

import type { Layout } from "./types.js";

// Lazy-load rq-library-wasm to avoid eager evaluation of browser-only code (window)
let _rqMod: typeof import("rq-library-wasm") | null = null;
async function getRqModule() {
  if (!_rqMod) {
    // Shim window for Node.js — rq-library-wasm's browser_fs_mem.js expects it
    if (typeof globalThis.window === "undefined") {
      (globalThis as any).window = globalThis;
    }
    _rqMod = await import("rq-library-wasm");
  }
  return _rqMod;
}

async function getWasmSource(): Promise<any> {
  if (typeof window === "undefined") {
    // Node.js: read the .wasm file from disk as a buffer
    const { readFileSync } = await import("node:fs");
    // Use require.resolve if available (CJS), otherwise createRequire (ESM)
    let wasmPath: string;
    if (typeof require !== "undefined" && typeof require.resolve === "function") {
      wasmPath = require.resolve("rq-library-wasm/rq_library_bg.wasm");
    } else {
      const { createRequire } = await import("node:module");
      // @ts-ignore - import.meta.url is only available in ESM
      const req = createRequire(import.meta.url);
      wasmPath = req.resolve("rq-library-wasm/rq_library_bg.wasm");
    }
    return readFileSync(wasmPath);
  } else {
    // Browser: use the Vite ?url import
    const mod = await import("rq-library-wasm/rq_library_bg.wasm?url");
    return mod.default;
  }
}

/**
 * Proxy to the rq-library-wasm package for RaptorQ operations.
 * 
 * This class handles initialization of the WASM module and provides a clean API 
 * for creating RaptorQ layouts using in-memory filesystem operations.
 * 
 * @remarks
 * The proxy implements the singleton pattern to ensure only one WASM instance
 * is created. Files are stored in browser's in-memory filesystem before processing.
 * 
 * @example
 * ```typescript
 * const proxy = RaptorQProxy.getInstance();
 * await proxy.initialize();
 * 
 * // Create a layout from file data
 * const layoutBytes = await proxy.createSingleBlockLayout(fileBytes);
 * ```
 */
export class RaptorQProxy {
  private static instance: RaptorQProxy | null = null;
  private initPromise: Promise<void> | null = null;
  private initialized: boolean = false;

  /**
   * Default RaptorQ session parameters
   */
  private static readonly DEFAULT_SYMBOL_SIZE = 65535; // 64KB - 1
  private static readonly DEFAULT_REDUNDANCY_FACTOR = 6;
  private static readonly DEFAULT_MAX_MEMORY_MB = 4096n; // 4GB
  private static readonly DEFAULT_CONCURRENCY_LIMIT = 1n;
  private static readonly DEFAULT_BLOCK_SIZE = 1280 * 1024 * 1024; // 1,280 MiB

  /**
   * Private constructor to enforce singleton pattern.
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the RaptorQProxy.
   * 
   * @returns The RaptorQProxy singleton instance
   */
  public static getInstance(): RaptorQProxy {
    if (!RaptorQProxy.instance) {
      RaptorQProxy.instance = new RaptorQProxy();
    }
    return RaptorQProxy.instance;
  }

  /**
   * Resets the singleton instance.
   * 
   * @remarks
   * Primarily useful for testing purposes. Should not be used in production code.
   * 
   * @internal
   */
  public static resetInstance(): void {
    RaptorQProxy.instance = null;
  }

  /**
   * Ensures the WASM module is initialized.
   *
   * @remarks
   * This method is idempotent - multiple calls will only initialize once.
   *
   * @private
   */
  private async ensureInitialized(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initialize();
    await this.initPromise;
  }

  /**
   * Initializes the WASM module.
   *
   * @remarks
   * This loads the WASM module using the rq-library-wasm package.
   * The package handles all platform-specific initialization automatically.
   *
   * @throws {Error} If the WASM module cannot be loaded
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Pass the wasmUrl to the init function for browser environments
      // The init() function will use the URL to fetch the WASM module
      const wasmSource = await getWasmSource();
      const rq = await getRqModule();
      await rq.default(wasmSource);
      this.initialized = true;
    } catch (error) {
      this.initPromise = null;
      throw new Error(
        `Failed to initialize WASM module: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Creates a RaptorQ session with the specified parameters.
   * 
   * @param symbolSize - Size of each symbol in bytes (default: 65535)
   * @param redundancyFactor - Redundancy factor for encoding (default: 10)
   * @param maxMemoryMb - Maximum memory in MB (default: 1024)
   * @param concurrencyLimit - Concurrency limit (default: 4)
   * @returns A new RaptorQSession instance
   * 
   * @throws {Error} If WASM module is not initialized
   */
  public async createSession(
    symbolSize: number = RaptorQProxy.DEFAULT_SYMBOL_SIZE,
    redundancyFactor: number = RaptorQProxy.DEFAULT_REDUNDANCY_FACTOR,
    maxMemoryMb: bigint = RaptorQProxy.DEFAULT_MAX_MEMORY_MB,
    concurrencyLimit: bigint = RaptorQProxy.DEFAULT_CONCURRENCY_LIMIT
  ): Promise<InstanceType<Awaited<ReturnType<typeof getRqModule>>["RaptorQSession"]>> {
    await this.ensureInitialized();
    const rq = await getRqModule();

    return new rq.RaptorQSession(
      symbolSize,
      redundancyFactor,
      maxMemoryMb,
      concurrencyLimit
    );
  }

  /**
   * Creates a single-block RaptorQ layout from file bytes.
   *
   * This generates metadata for a file by:
   * 1. Writing the file bytes to the in-memory filesystem
   * 2. Creating a RaptorQ session
   * 3. Calling create_metadata to generate the layout
   * 4. Reading the layout file from in-memory filesystem
   * 5. Cleaning up temporary files
   *
   * @param fileBytes - The file content as a Uint8Array
   * @returns A promise that resolves to the raw layout file bytes (JSON format)
   *
   * @throws {Error} If layout creation fails
   *
   * @remarks
   * **IMPORTANT**: The file MUST be loaded into in-memory FS before creating RaptorQSession.
   * This method follows the correct workflow:
   * - Save file to in-memory FS
   * - Create session
   * - Call create_metadata
   * - Read and return the layout file
   */
  public async createSingleBlockLayout(fileBytes: Uint8Array): Promise<Uint8Array> {
    await this.ensureInitialized();
    
    // Generate unique temporary paths to avoid conflicts
    const timestamp = Date.now();
    const inputPath = `/temp_input_${timestamp}.bin`;
    const layoutPath = `/temp_layout_${timestamp}.json`;
    
    try {
      const rq = await getRqModule();

      // Step 1: Write file bytes to in-memory FS
      // IMPORTANT: File must be in FS before creating session!
      await rq.writeFileChunk(inputPath, 0, fileBytes);

      // Step 2: Create a session for metadata generation
      const session = await this.createSession();

      // Step 3: Call create_metadata to generate the layout
      // block_size = 0 means auto-calculate
      const metadata = await session.create_metadata(inputPath, layoutPath, 0);

      // Step 4: Read the layout file from in-memory FS
      const layoutSize = rq.getFileSize(layoutPath);
      const layoutBytes = await rq.readFileChunk(layoutPath, 0, layoutSize);
      
      // Step 5: Clean up
      session.free();
      
      // Note: We could delete the temp files here, but the in-memory FS
      // will be cleared on page reload anyway
      
      return layoutBytes;
    } catch (error) {
      throw new Error(
        `Failed to create RaptorQ layout: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Gets the recommended block size for a given file size.
   * 
   * @param fileSize - The file size in bytes
   * @returns The recommended block size
   * 
   * @throws {Error} If WASM module is not initialized
   */
  public async getRecommendedBlockSize(fileSize: number): Promise<number> {
    await this.ensureInitialized();
    
    const session = await this.createSession();
    const blockSize = session.get_recommended_block_size(fileSize);
    session.free();
    
    return blockSize;
  }

  /**
   * Gets the RaptorQ library version.
   * 
   * @returns The library version string
   * 
   * @throws {Error} If WASM module is not initialized
   */
  public async getVersion(): Promise<string> {
    await this.ensureInitialized();
    
    const rq = await getRqModule();
    return rq.RaptorQSession.version();
  }

  /**
   * Checks if the WASM module is currently initialized.
   * 
   * @returns True if the module is initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.initialized;
  }
}

/**
 * Parse layout file bytes into a Layout object.
 * 
 * @param layoutBytes - The raw layout file bytes (JSON format)
 * @returns The parsed Layout object
 * @throws {Error} If parsing fails
 */
export function parseLayoutFile(layoutBytes: Uint8Array): Layout {
  const text = new TextDecoder().decode(layoutBytes);
  return JSON.parse(text) as Layout;
}

// Re-export types for convenience
export type { RaptorQSession } from "rq-library-wasm";

// Re-export filesystem utilities as lazy async wrappers
export async function writeFileChunk(...args: Parameters<typeof import("rq-library-wasm").writeFileChunk>) {
  const rq = await getRqModule();
  return rq.writeFileChunk(...args);
}
export async function readFileChunk(...args: Parameters<typeof import("rq-library-wasm").readFileChunk>) {
  const rq = await getRqModule();
  return rq.readFileChunk(...args);
}
export async function getFileSize(...args: Parameters<typeof import("rq-library-wasm").getFileSize>) {
  const rq = await getRqModule();
  return rq.getFileSize(...args);
}
export async function createDirAll(...args: Parameters<typeof import("rq-library-wasm").createDirAll>) {
  const rq = await getRqModule();
  return rq.createDirAll(...args);
}
export async function dirExists(...args: Parameters<typeof import("rq-library-wasm").dirExists>) {
  const rq = await getRqModule();
  return rq.dirExists(...args);
}
export async function syncDirExists(...args: Parameters<typeof import("rq-library-wasm").syncDirExists>) {
  const rq = await getRqModule();
  return rq.syncDirExists(...args);
}
export async function flushFile(...args: Parameters<typeof import("rq-library-wasm").flushFile>) {
  const rq = await getRqModule();
  return rq.flushFile(...args);
}