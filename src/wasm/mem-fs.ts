/**
 * In-Memory Virtual Filesystem for WASM RaptorQ Operations
 * 
 * This module provides an in-memory filesystem implementation that the RaptorQ
 * WASM module uses for file I/O operations. All data is stored in RAM and is
 * not persistent across page reloads.
 * 
 * @remarks
 * The WASM module calls global sync functions (window.syncReadChunk, etc.)
 * which are registered by this module. This allows the Rust code to perform
 * synchronous file operations while maintaining compatibility with browser environments.
 */

// In-memory storage structures
const memFiles = new Map<string, Uint8Array>();
const memMetadata = new Map<string, { size: number }>();
const memDirs = new Set<string>(['/']); // Always include root

// Expose for debugging in browser DevTools
if (typeof window !== 'undefined') {
  (window as any).memFiles = memFiles;
  (window as any).memMetadata = memMetadata;
  (window as any).memDirs = memDirs;
}

/**
 * Get the size of a file in bytes.
 * 
 * @param path - The file path
 * @returns The file size in bytes, or 0 if file doesn't exist
 */
export function getFileSize(path: string): number {
  const meta = memMetadata.get(path);
  return meta ? meta.size : 0;
}

/**
 * Synchronously check if a directory exists.
 * 
 * @param path - The directory path
 * @returns True if the directory exists, false otherwise
 */
export function syncDirExists(path: string): boolean {
  return memDirs.has(path);
}

/**
 * Read a chunk of data from a file asynchronously.
 * 
 * @param path - The file path
 * @param offset - The byte offset to start reading from
 * @param length - The number of bytes to read
 * @returns A promise resolving to the file data
 */
export async function readFileChunk(
  path: string,
  offset: number,
  length: number
): Promise<Uint8Array> {
  const data = memFiles.get(path) || new Uint8Array(0);
  if (offset >= data.length) return new Uint8Array(0);
  const available = Math.min(length, data.length - offset);
  return data.slice(offset, offset + available);
}

/**
 * Write a chunk of data to a file asynchronously.
 * 
 * @param path - The file path
 * @param offset - The byte offset to start writing at
 * @param data - The data to write
 */
export async function writeFileChunk(
  path: string,
  offset: number,
  data: Uint8Array
): Promise<void> {
  let file = memFiles.get(path) || new Uint8Array(0);
  
  // Expand file if necessary
  if (offset + data.length > file.length) {
    const newFile = new Uint8Array(offset + data.length);
    newFile.set(file, 0);
    file = newFile;
  }
  
  file.set(data, offset);
  memFiles.set(path, file);
  memMetadata.set(path, { size: file.length });
}

/**
 * Flush file changes (no-op for in-memory storage).
 * 
 * @param path - The file path
 */
export async function flushFile(path: string): Promise<void> {
  // No-op for in-memory storage
}

/**
 * Recursively create a directory path.
 * 
 * @param path - The directory path to create
 */
export async function createDirAll(path: string): Promise<void> {
  memDirs.add(path);
}

/**
 * Check if a directory exists asynchronously.
 * 
 * @param path - The directory path
 * @returns A promise resolving to true if directory exists
 */
export async function dirExists(path: string): Promise<boolean> {
  return memDirs.has(path);
}

/**
 * Clear all in-memory storage.
 * 
 * @remarks
 * Useful for testing or cleanup operations.
 */
export function clearStorage(): void {
  memFiles.clear();
  memMetadata.clear();
  memDirs.clear();
  memDirs.add('/'); // Always include root
}

/**
 * Initialize global sync functions for WASM module.
 * 
 * @remarks
 * This must be called before using the WASM module to ensure the Rust
 * code can call the filesystem functions synchronously.
 */
export function initializeGlobalFunctions(): void {
  if (typeof window === 'undefined') {
    return; // Only needed in browser environment
  }

  /**
   * Synchronous read chunk (called from Rust)
   */
  (window as any).syncReadChunk = function(
    path: string,
    offset: number,
    length: number
  ): Uint8Array {
    const data = memFiles.get(path) || new Uint8Array(0);
    if (offset >= data.length) return new Uint8Array(0);
    const available = Math.min(length, data.length - offset);
    return data.slice(offset, offset + available);
  };

  /**
   * Synchronous write chunk (called from Rust)
   */
  (window as any).syncWriteChunk = function(
    path: string,
    offset: number,
    data: Uint8Array
  ): boolean {
    let file = memFiles.get(path) || new Uint8Array(0);
    
    if (offset + data.length > file.length) {
      const newFile = new Uint8Array(offset + data.length);
      newFile.set(file, 0);
      file = newFile;
    }
    
    file.set(new Uint8Array(data), offset);
    memFiles.set(path, file);
    memMetadata.set(path, { size: file.length });
    return true;
  };

  /**
   * Synchronous flush (no-op for memory)
   */
  (window as any).syncFlushFile = function(path: string): boolean {
    return true;
  };

  /**
   * Synchronous create directory (called from Rust)
   */
  (window as any).syncCreateDirAll = function(path: string): boolean {
    memDirs.add(path);
    return true;
  };

  /**
   * Synchronous directory exists check (called from Rust)
   */
  (window as any).syncDirExists = function(path: string): boolean {
    return memDirs.has(path);
  };
}