import { beforeEach, describe, expect, it, vi } from "vitest";

// Create mocks for the rq-library-wasm package
const sessionMock = {
  get_recommended_block_size: vi.fn().mockReturnValue(1024 * 1024), // 1MB
  create_metadata: vi.fn().mockResolvedValue({ success: true }),
  free: vi.fn(),
};

const initMock = vi.fn().mockResolvedValue(undefined);
const RaptorQSessionMock: any = vi.fn(() => sessionMock);
RaptorQSessionMock.version = vi.fn().mockReturnValue("1.0.0");

// Mock filesystem functions
const mockFileSystem = new Map<string, Uint8Array>();

const writeFileChunkMock = vi.fn().mockImplementation(async (path: string, offset: number, data: Uint8Array) => {
  mockFileSystem.set(path, data);
});

const readFileChunkMock = vi.fn().mockImplementation(async (path: string, offset: number, length: number) => {
  const data = mockFileSystem.get(path);
  if (!data) throw new Error(`File not found: ${path}`);
  return data.slice(offset, offset + length);
});

const getFileSizeMock = vi.fn().mockImplementation((path: string) => {
  const data = mockFileSystem.get(path);
  if (!data) throw new Error(`File not found: ${path}`);
  return data.length;
});

// Mock the rq-library-wasm package
vi.mock("rq-library-wasm", () => ({
  default: initMock,
  RaptorQSession: RaptorQSessionMock,
  writeFileChunk: writeFileChunkMock,
  readFileChunk: readFileChunkMock,
  getFileSize: getFileSizeMock,
  createDirAll: vi.fn(),
  dirExists: vi.fn().mockReturnValue(true),
  syncDirExists: vi.fn().mockReturnValue(true),
  flushFile: vi.fn(),
}));

// Mock the WASM URL import
vi.mock("rq-library-wasm/rq_library_bg.wasm?url", () => ({
  default: "/mocked/path/to/wasm",
}));

const loadProxy = async () => {
  const mod = await import("../../src/wasm/raptorq-proxy.js");
  return mod.RaptorQProxy;
};

describe("RaptorQProxy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    mockFileSystem.clear();
    
    // Reset mock implementations
    initMock.mockResolvedValue(undefined);
    sessionMock.get_recommended_block_size.mockReturnValue(1024 * 1024);
    sessionMock.create_metadata.mockResolvedValue({ success: true });
    
    // Mock layout file creation
    writeFileChunkMock.mockImplementation(async (path: string, offset: number, data: Uint8Array) => {
      mockFileSystem.set(path, data);
      // If this is a layout file being written by create_metadata, simulate it
      if (path.includes('layout')) {
        const layout = {
          transfer_length: 100,
          symbol_size: 65535,
          num_source_blocks: 1,
          num_sub_blocks: 1,
          symbol_alignment: 8,
          source_blocks: [{
            source_symbols: 2,
            sub_symbols: 1,
            sub_symbol_size: 8
          }]
        };
        mockFileSystem.set(path, new TextEncoder().encode(JSON.stringify(layout)));
      }
    });
    
    // Re-setup the version static method after clearAllMocks
    RaptorQSessionMock.version = vi.fn().mockReturnValue("1.0.0");
  });

  it("initializes lazily and memoizes the WASM module", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();
    
    // Create two layouts
    const result1 = await proxy.createSingleBlockLayout(new Uint8Array(100));
    const result2 = await proxy.createSingleBlockLayout(new Uint8Array(200));

    // Verify init was only called once
    expect(initMock).toHaveBeenCalledTimes(1);
    expect(initMock).toHaveBeenCalledWith("/mocked/path/to/wasm");
    
    // Verify sessions were created twice (once per layout)
    expect(RaptorQSessionMock).toHaveBeenCalledTimes(2);
    expect(RaptorQSessionMock).toHaveBeenCalledWith(65535, 10, 1024n, 4n);
    
    // Verify session methods were called
    expect(sessionMock.get_recommended_block_size).toHaveBeenCalledTimes(2);
    expect(sessionMock.free).toHaveBeenCalledTimes(2);
    
    // Verify results are valid layout JSON
    expect(result1).toBeInstanceOf(Uint8Array);
    expect(result2).toBeInstanceOf(Uint8Array);
    
    const layout1 = JSON.parse(new TextDecoder().decode(result1));
    const layout2 = JSON.parse(new TextDecoder().decode(result2));
    
    expect(layout1).toHaveProperty("transfer_length", 100);
    expect(layout2).toHaveProperty("transfer_length", 200);
    
    expect(proxy.isInitialized()).toBe(true);
  });

  it("ensures concurrent calls share a single initialization", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();

    // Create three layouts concurrently
    await Promise.all([
      proxy.createSingleBlockLayout(new Uint8Array(100)),
      proxy.createSingleBlockLayout(new Uint8Array(200)),
      proxy.createSingleBlockLayout(new Uint8Array(300)),
    ]);

    // Verify init was only called once despite concurrent calls
    expect(initMock).toHaveBeenCalledTimes(1);
    
    // Verify sessions were created three times
    expect(RaptorQSessionMock).toHaveBeenCalledTimes(3);
    
    // Verify session methods were called for each layout
    expect(sessionMock.get_recommended_block_size).toHaveBeenCalledTimes(3);
    expect(sessionMock.free).toHaveBeenCalledTimes(3);
  });

  it("resets initialization promise after failure and retries successfully", async () => {
    let attempts = 0;

    // Mock init to fail on first attempt
    initMock.mockImplementation(() => {
      attempts += 1;
      if (attempts === 1) {
        return Promise.reject(new Error("WASM load failed"));
      }
      return Promise.resolve(undefined);
    });

    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();

    // First attempt should fail
    await expect(
      proxy.createSingleBlockLayout(new Uint8Array(100))
    ).rejects.toThrow(/Failed to initialize WASM module/);

    // Second attempt should succeed
    const result = await proxy.createSingleBlockLayout(new Uint8Array(200));
    
    expect(result).toBeInstanceOf(Uint8Array);
    const layout = JSON.parse(new TextDecoder().decode(result));
    expect(layout).toHaveProperty("transfer_length", 200);

    // Verify init was called twice (once failed, once succeeded)
    expect(initMock).toHaveBeenCalledTimes(2);
    
    // Verify session was only created once (after successful init)
    expect(RaptorQSessionMock).toHaveBeenCalledTimes(1);
    expect(sessionMock.free).toHaveBeenCalledTimes(1);
  });

  it("creates a session with default parameters", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();
    const session = await proxy.createSession();

    expect(initMock).toHaveBeenCalledTimes(1);
    expect(RaptorQSessionMock).toHaveBeenCalledWith(65535, 10, 1024n, 4n);
    expect(session).toBe(sessionMock);
  });

  it("creates a session with custom parameters", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();
    const session = await proxy.createSession(32768, 20, 2048n, 8n);

    expect(RaptorQSessionMock).toHaveBeenCalledWith(32768, 20, 2048n, 8n);
    expect(session).toBe(sessionMock);
  });

  it("gets recommended block size", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();
    const blockSize = await proxy.getRecommendedBlockSize(10 * 1024 * 1024);

    expect(sessionMock.get_recommended_block_size).toHaveBeenCalledWith(10 * 1024 * 1024);
    expect(blockSize).toBe(1024 * 1024);
    expect(sessionMock.free).toHaveBeenCalled();
  });

  it("gets library version", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();
    const version = await proxy.getVersion();

    expect(RaptorQSessionMock.version).toHaveBeenCalled();
    expect(version).toBe("1.0.0");
  });

  it("returns singleton instance", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const instance1 = RaptorQProxy.getInstance();
    const instance2 = RaptorQProxy.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("reports initialization status correctly", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();

    const proxy = RaptorQProxy.getInstance();
    
    expect(proxy.isInitialized()).toBe(false);
    
    await proxy.initialize();
    
    expect(proxy.isInitialized()).toBe(true);
  });
});