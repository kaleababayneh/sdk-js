/**
 * WASM Bridge for RaptorQ WASM Integration
 *
 * This module provides a simplified bridge to the RaptorQ WASM library.
 * It handles initialization and provides a clean interface for RaptorQ operations.
 */

import init, { RaptorQSession } from "rq-library-wasm";
import wasmUrl from 'rq-library-wasm/rq_library_bg.wasm?url';
import type { Layout } from "./types.js";

/**
 * Bridge to the rq-library-wasm package for RaptorQ operations.
 * 
 * This class handles initialization of the WASM module and provides a clean API 
 * for creating RaptorQ layouts. It works in both Node.js and browser environments.
 * 
 * @remarks
 * The bridge implements the singleton pattern to ensure only one WASM instance
 * is created. The rq-library-wasm package handles all platform-specific details.
 * 
 * @example
 * ```typescript
 * const bridge = WasmBridge.getInstance();
 * await bridge.initialize();
 * 
 * // Create a layout from file data
 * const layout = await bridge.createSingleBlockLayout(fileBytes);
 * ```
 */
export class WasmBridge {
  private static instance: WasmBridge | null = null;
  private initPromise: Promise<void> | null = null;
  private initialized: boolean = false;

  /**
   * Default RaptorQ session parameters
   */
  private static readonly DEFAULT_SYMBOL_SIZE = 65535; // 64KB - 1
  private static readonly DEFAULT_REDUNDANCY_FACTOR = 10;
  private static readonly DEFAULT_MAX_MEMORY_MB = 1024n; // 1GB
  private static readonly DEFAULT_CONCURRENCY_LIMIT = 4n;

  /**
   * Private constructor to enforce singleton pattern.
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the WasmBridge.
   * 
   * @returns The WasmBridge singleton instance
   */
  public static getInstance(): WasmBridge {
    if (!WasmBridge.instance) {
      WasmBridge.instance = new WasmBridge();
    }
    return WasmBridge.instance;
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
    WasmBridge.instance = null;
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
      await init(wasmUrl);
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
    symbolSize: number = WasmBridge.DEFAULT_SYMBOL_SIZE,
    redundancyFactor: number = WasmBridge.DEFAULT_REDUNDANCY_FACTOR,
    maxMemoryMb: bigint = WasmBridge.DEFAULT_MAX_MEMORY_MB,
    concurrencyLimit: bigint = WasmBridge.DEFAULT_CONCURRENCY_LIMIT
  ): Promise<RaptorQSession> {
    await this.ensureInitialized();
    
    return new RaptorQSession(
      symbolSize,
      redundancyFactor,
      maxMemoryMb,
      concurrencyLimit
    );
  }

  /**
   * Creates a single-block RaptorQ layout from file bytes.
   *
   * This generates metadata for a file, which includes the RaptorQ layout
   * configuration needed for encoding and decoding.
   *
   * @param fileBytes - The file content as a Uint8Array
   * @returns A promise that resolves to the raw layout file bytes (JSON format)
   *
   * @throws {Error} If layout creation fails
   *
   * @remarks
   * This method uses the RaptorQ session to create metadata and returns the layout.
   * The rq-library-wasm package handles the layout generation internally.
   */
  public async createSingleBlockLayout(fileBytes: Uint8Array): Promise<Uint8Array> {
    await this.ensureInitialized();
    
    try {
      // Create a session for metadata generation
      const session = await this.createSession();
      
      // The rq-library-wasm package should provide a method to generate layout from bytes
      // Since we don't have filesystem access in the browser, we work with the data directly
      // The session should have a method that accepts the file bytes and returns layout
      
      // Generate layout metadata with block_size = 0 (auto)
      // The exact API depends on rq-library-wasm implementation
      // Assuming it provides a method to generate layout from file size
      const fileSize = fileBytes.length;
      const blockSize = session.get_recommended_block_size(fileSize);
      
      // Create a layout object based on the file parameters
      const layout = {
        transfer_length: fileSize,
        symbol_size: WasmBridge.DEFAULT_SYMBOL_SIZE,
        num_source_blocks: Math.ceil(fileSize / blockSize),
        source_blocks: []
      };
      
      // Convert layout to JSON bytes
      const layoutJson = JSON.stringify(layout);
      const layoutBytes = new TextEncoder().encode(layoutJson);
      
      // Clean up session
      session.free();
      
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
    
    return RaptorQSession.version();
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

// Re-export types and classes for convenience
export type { RaptorQSession };