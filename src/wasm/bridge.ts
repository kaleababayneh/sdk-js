/**
 * WASM Bridge for RaptorQ WASM Integration
 *
 * This module provides a bridge to the RaptorQ WASM library, handling initialization,
 * session management, and providing a clean interface for RaptorQ operations. The bridge
 * is designed to work in both Node.js and browser environments.
 */

import type { Layout } from "./types.js";
import { initializeGlobalFunctions, writeFileChunk, readFileChunk, getFileSize, createDirAll } from "./mem-fs.js";

/**
 * Type definitions for the WASM module exports based on rq_library.d.ts
 */
export interface RaptorQSession {
  free(): void;
  create_metadata(input_path: string, layout_file: string, block_size: number): Promise<any>;
  encode_file(input_path: string, output_dir: string, block_size: number): Promise<any>;
  decode_symbols(symbols_dir: string, output_path: string, layout_path: string): Promise<any>;
  get_recommended_block_size(file_size: number): number;
}

export interface RaptorQSessionConstructor {
  new (
    symbol_size: number,
    redundancy_factor: number,
    max_memory_mb: bigint,
    concurrency_limit: bigint
  ): RaptorQSession;
  version(): string;
}

export interface WasmModule {
  default: (module_or_path?: any) => Promise<any>;
  RaptorQSession: RaptorQSessionConstructor;
}

/**
 * Result from encode_file operation
 */
export interface EncodeResult {
  symbolsDirectory: string;
  layoutFilePath: string;
}

/**
 * Result from create_metadata operation
 */
export interface MetadataResult {
  layoutFilePath: string;
}

/**
 * Bridge to the rq-wasm library for RaptorQ operations.
 * 
 * This class handles initialization of the WASM module, manages the in-memory
 * filesystem, and provides a clean API for creating RaptorQ sessions and
 * performing encoding/decoding operations.
 * 
 * @remarks
 * The bridge implements the singleton pattern to ensure only one WASM instance
 * is created. It works in both Node.js and browser environments.
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
  private wasmModule: WasmModule | null = null;
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
    if (this.initialized && this.wasmModule) {
      return;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initialize();
    await this.initPromise;
  }

  /**
   * Initializes the WASM module and filesystem.
   * 
   * @remarks
   * This loads the WASM module and sets up the in-memory filesystem
   * with global functions that the WASM module can call.
   * 
   * @throws {Error} If the WASM module cannot be loaded
   */
  public async initialize(): Promise<void> {
    if (this.initialized && this.wasmModule) {
      return;
    }

    try {
      const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
      
      if (isBrowser) {
        // Initialize global filesystem functions for WASM to call
        initializeGlobalFunctions();
        
        // Browser: dynamically import the WASM module
        const wasmPath = '/wasm/rq_library.js';
        const module = await import(/* @vite-ignore */ wasmPath) as WasmModule;
        
        // Initialize WASM with the path to the .wasm file
        await module.default('/wasm/rq_library_bg.wasm');
        
        this.wasmModule = module;
      } else {
        // Node.js: load from filesystem
        const fs = await import('fs');
        const path = await import('path');
        const { pathToFileURL } = await import('url');
        
        // Determine module directory
        let currentDir: string;
        if (typeof __dirname !== 'undefined') {
          currentDir = __dirname;
        } else {
          const { fileURLToPath } = await import('url');
          const metaUrl = new Function('return import.meta.url')() as string;
          currentDir = path.dirname(fileURLToPath(metaUrl));
        }
        
        const publicWasmDir = path.resolve(currentDir, '../../../public/wasm');
        const wasmPath = path.join(publicWasmDir, 'rq_library_bg.wasm');
        const jsModulePath = path.join(publicWasmDir, 'rq_library.js');
        
        // Read WASM file
        const wasmBuffer = fs.readFileSync(wasmPath);
        
        // Import JS module
        const fileUrl = pathToFileURL(jsModulePath).href;
        const module = await import(fileUrl) as WasmModule;
        
        // Initialize with WASM buffer
        await module.default(wasmBuffer);
        
        this.wasmModule = module;
      }
      
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
    
    if (!this.wasmModule) {
      throw new Error('WASM module not initialized');
    }
    
    return new this.wasmModule.RaptorQSession(
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
   * @returns A promise that resolves to the RaptorQ layout
   * 
   * @throws {Error} If layout creation fails
   * 
   * @remarks
   * This method writes the file to in-memory storage, creates metadata,
   * then reads the layout back from the generated metadata file.
   */
  public async createSingleBlockLayout(fileBytes: Uint8Array): Promise<Layout> {
    await this.ensureInitialized();
    
    try {
      // Create a session for metadata generation
      const session = await this.createSession();
      
      // Write file to in-memory filesystem
      const inputPath = '/input_file';
      const layoutPath = '/layout.json';
      
      await writeFileChunk(inputPath, 0, fileBytes);
      
      // Create metadata with block_size = 0 (auto)
      await session.create_metadata(inputPath, layoutPath, 0);
      
      // Read the layout file
      const layoutSize = getFileSize(layoutPath);
      const layoutBytes = await readFileChunk(layoutPath, 0, layoutSize);
      const layoutJson = new TextDecoder('utf-8').decode(layoutBytes);
      const layout = JSON.parse(layoutJson) as Layout;
      
      // Clean up session
      session.free();
      
      return layout;
    } catch (error) {
      throw new Error(
        `Failed to create RaptorQ layout: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Encodes a file using RaptorQ encoding.
   * 
   * @param fileBytes - The file content to encode
   * @param outputDir - Directory path for encoded symbols
   * @param blockSize - Block size (0 for auto)
   * @returns Encoding result with symbol directory and layout file path
   * 
   * @throws {Error} If encoding fails
   */
  public async encodeFile(
    fileBytes: Uint8Array,
    outputDir: string = '/encoded',
    blockSize: number = 0
  ): Promise<EncodeResult> {
    await this.ensureInitialized();
    
    try {
      const session = await this.createSession();
      
      const inputPath = '/input_file';
      await writeFileChunk(inputPath, 0, fileBytes);
      await createDirAll(outputDir);
      
      const result = await session.encode_file(inputPath, outputDir, blockSize);
      
      session.free();
      
      return result as EncodeResult;
    } catch (error) {
      throw new Error(
        `Failed to encode file: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Decodes symbols back into the original file.
   * 
   * @param symbolsDir - Directory containing encoded symbols
   * @param outputPath - Path for the decoded output file
   * @param layoutPath - Path to the layout JSON file
   * @returns Decode result
   * 
   * @throws {Error} If decoding fails
   */
  public async decodeSymbols(
    symbolsDir: string,
    outputPath: string,
    layoutPath: string
  ): Promise<any> {
    await this.ensureInitialized();
    
    try {
      const session = await this.createSession();
      
      const result = await session.decode_symbols(symbolsDir, outputPath, layoutPath);
      
      session.free();
      
      return result;
    } catch (error) {
      throw new Error(
        `Failed to decode symbols: ${error instanceof Error ? error.message : String(error)}`
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
    
    if (!this.wasmModule) {
      throw new Error('WASM module not initialized');
    }
    
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
    
    if (!this.wasmModule) {
      throw new Error('WASM module not initialized');
    }
    
    return this.wasmModule.RaptorQSession.version();
  }

  /**
   * Checks if the WASM module is currently initialized.
   * 
   * @returns True if the module is initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.initialized && this.wasmModule !== null;
  }
}