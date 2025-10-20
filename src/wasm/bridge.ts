/// <reference path="../types/wasm.d.ts" />

/**
 * WASM Bridge for Custom RaptorQ WASM Integration
 *
 * This module provides a bridge to the custom RaptorQ WASM library, handling lazy initialization
 * and providing a clean interface for RaptorQ operations. The bridge is designed to
 * work in both Node.js and browser environments.
 */

import type { Layout } from "./types.js";

/**
 * Type definition for the WASM module interface.
 *
 * @remarks
 * The WASM module provides RaptorQ encoding/decoding capabilities.
 * This interface defines the expected API surface.
 */
interface RqWasmModule {
  /**
   * Creates a single-block RaptorQ layout for the given data.
   *
   * @param data - The file bytes to create a layout for
   * @returns The RaptorQ layout configuration
   */
  create_single_block_layout(data: Uint8Array): Layout;
}

/**
 * Bridge to the rq-wasm library for RaptorQ operations.
 * 
 * This class handles lazy initialization of the WASM module and provides
 * a clean, promise-based API for RaptorQ layout generation. It implements
 * the singleton pattern to ensure only one WASM instance is created.
 * 
 * @remarks
 * The bridge is designed to work in both Node.js and browser environments.
 * In browsers, it's recommended to run this in a Web Worker to avoid
 * blocking the main thread during initialization.
 * 
 * @example
 * ```typescript
 * const bridge = WasmBridge.getInstance();
 * const layout = await bridge.createSingleBlockLayout(fileBytes);
 * ```
 */
export class WasmBridge {
  private static instance: WasmBridge | null = null;
  private wasmModule: RqWasmModule | null = null;
  private initPromise: Promise<void> | null = null;

  /**
   * Private constructor to enforce singleton pattern.
   * Use {@link getInstance} to obtain the bridge instance.
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the WasmBridge.
   * 
   * @returns The WasmBridge singleton instance
   * 
   * @example
   * ```typescript
   * const bridge = WasmBridge.getInstance();
   * ```
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
   * This is primarily useful for testing purposes to ensure a clean state
   * between test runs. Should not be used in production code.
   * 
   * @internal
   */
  public static resetInstance(): void {
    WasmBridge.instance = null;
  }

  /**
   * Initializes the WASM module if not already initialized.
   * 
   * @remarks
   * This method is idempotent - multiple calls will only initialize once.
   * The initialization is done lazily on the first call to any bridge method.
   * 
   * @throws {Error} If the rq-wasm module cannot be loaded
   * 
   * @private
   */
  private async ensureInitialized(): Promise<void> {
    // If already initialized, return immediately
    if (this.wasmModule) {
      return;
    }

    // If initialization is in progress, wait for it
    if (this.initPromise) {
      return this.initPromise;
    }

    // Start initialization
    this.initPromise = this.initialize();
    await this.initPromise;
  }

  /**
   * Performs the actual WASM module initialization.
   *
   * @remarks
   * This method loads the custom WASM module from public/wasm directory.
   * In browsers, it dynamically imports /wasm/rq_library.js which handles WASM loading.
   * In Node.js, it reads the files from the filesystem and instantiates the module.
   *
   * @private
   */
  private async initialize(): Promise<void> {
    try {
      // Detect environment
      const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
      
      if (isBrowser) {
        // Browser environment: access globally loaded WASM module from window
        // The script tag in index.html loads /wasm/rq_library.js into window.rq_library
        const globalWasm = (window as any).rq_library;
        
        if (!globalWasm) {
          throw new Error('WASM module not found on window.rq_library. Ensure /wasm/rq_library.js is loaded via script tag.');
        }
        
        // Call the default export init function with the path to the wasm file
        await globalWasm.default('/wasm/rq_library_bg.wasm');
        
        // The module's exports are available on the initialized wasm object
        this.wasmModule = globalWasm as unknown as RqWasmModule;
      } else {
        // Node.js environment: read files from filesystem
        const fs = await import('fs');
        const path = await import('path');
        
        // Determine current file location - works in both ESM and CJS
        let currentDir: string;
        
        // Use a function to isolate import.meta usage and avoid TS errors in CJS
        const getModuleDir = async (): Promise<string> => {
          // In CommonJS, __dirname is available as a global
          // In ESM, we need to derive it from import.meta.url
          if (typeof __dirname !== 'undefined') {
            return __dirname;
          }
          
          // ESM path: dynamically construct the import.meta reference
          const { fileURLToPath } = await import('url');
          const metaUrl = new Function('return import.meta.url')() as string;
          const filename = fileURLToPath(metaUrl);
          return path.dirname(filename);
        };
        
        currentDir = await getModuleDir();
        const publicWasmDir = path.resolve(currentDir, '../../../public/wasm');
        
        // Read the WASM file
        const wasmPath = path.join(publicWasmDir, 'rq_library_bg.wasm');
        const wasmBuffer = fs.readFileSync(wasmPath);
        
        // Import the JS module
        const jsModulePath = path.join(publicWasmDir, 'rq_library.js');
        const initWasm = await import(/* @vite-ignore */ jsModulePath);
        
        // Initialize with the WASM buffer
        await initWasm.default(wasmBuffer);
        
        this.wasmModule = initWasm as unknown as RqWasmModule;
      }
    } catch (error) {
      this.initPromise = null; // Reset to allow retry
      throw new Error(
        `Failed to initialize WASM module: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Creates a single-block RaptorQ layout from file bytes.
   * 
   * This method generates a RaptorQ layout suitable for encoding the provided
   * data into a single source block. The layout includes all parameters needed
   * for subsequent encoding and decoding operations.
   * 
   * @param fileBytes - The file content as a Uint8Array
   * @returns A promise that resolves to the RaptorQ layout
   * 
   * @throws {Error} If the WASM module is not initialized or layout creation fails
   * 
   * @remarks
   * The layout generation is deterministic - the same input bytes will always
   * produce the same layout. This is critical for LEP-1 compliance.
   * 
   * @example
   * ```typescript
   * const bridge = WasmBridge.getInstance();
   * const fileBytes = new Uint8Array([...]); // Your file data
   * const layout = await bridge.createSingleBlockLayout(fileBytes);
   * console.log('Symbol size:', layout.symbol_size);
   * ```
   */
  public async createSingleBlockLayout(fileBytes: Uint8Array): Promise<Layout> {
    await this.ensureInitialized();
    
    if (!this.wasmModule) {
      throw new Error('WASM module not initialized');
    }

    try {
      return this.wasmModule.create_single_block_layout(fileBytes);
    } catch (error) {
      throw new Error(
        `Failed to create RaptorQ layout: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Checks if the WASM module is currently initialized.
   * 
   * @returns True if the module is initialized, false otherwise
   * 
   * @remarks
   * This is primarily useful for diagnostic purposes or to avoid
   * triggering initialization when checking readiness.
   */
  public isInitialized(): boolean {
    return this.wasmModule !== null;
  }
}