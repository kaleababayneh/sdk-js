import { beforeEach, describe, expect, it, vi } from "vitest";

type ModuleFactory = () => Promise<{
  default: (wasmBuffer?: any) => Promise<void>;
  RaptorQSession: any;
}>;

const fakeLayout = new Uint8Array([1, 2, 3]);

const moduleRef = vi.hoisted(() => ({
  current: undefined as ModuleFactory | undefined,
  sessionMock: undefined as any,
}));

// Mock fetch for browser environment
global.fetch = vi.fn();

// Mock dynamic import for WASM module
vi.mock("/wasm/rq_library.js", async () => {
  const factory = moduleRef.current;
  if (!factory) {
    throw new Error("Module factory not set");
  }
  return factory();
});

// Mock in-memory filesystem functions
vi.mock("src/wasm/mem-fs", () => ({
  initializeGlobalFunctions: vi.fn(),
  writeFileChunk: vi.fn().mockResolvedValue(undefined),
  readFileChunk: vi.fn().mockResolvedValue(fakeLayout),
  getFileSize: vi.fn().mockReturnValue(fakeLayout.length),
  createDirAll: vi.fn().mockResolvedValue(undefined),
}));

const loadBridge = async () => {
  const mod = await import("src/wasm/bridge");
  return mod.WasmBridge;
};

describe("WasmBridge", () => {
  beforeEach(() => {
    vi.resetModules();
    
    // Mock RaptorQSession
    const sessionMock = {
      create_metadata: vi.fn().mockResolvedValue(undefined),
      free: vi.fn(),
    };
    
    moduleRef.sessionMock = sessionMock;
    
    // Set up default mock for WASM module
    moduleRef.current = async () => ({
      default: vi.fn().mockResolvedValue(undefined),
      RaptorQSession: vi.fn(() => sessionMock),
    });
    
    // Mock fetch to return a successful response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
    });
  });

  it("initializes lazily and memoizes the WASM module", async () => {
    const WasmBridge = await loadBridge();
    WasmBridge.resetInstance();

    const bridge = WasmBridge.getInstance();
    const result1 = await bridge.createSingleBlockLayout(new Uint8Array([1]));
    const result2 = await bridge.createSingleBlockLayout(new Uint8Array([2]));

    expect(result1).toEqual(fakeLayout);
    expect(result2).toEqual(fakeLayout);

    const impl = await moduleRef.current!();
    expect(impl.default).toHaveBeenCalledTimes(1);
    expect(moduleRef.sessionMock.create_metadata).toHaveBeenCalledTimes(2);
    expect(bridge.isInitialized()).toBe(true);
  });

  it("ensures concurrent calls share a single initialization", async () => {
    const WasmBridge = await loadBridge();
    WasmBridge.resetInstance();

    const bridge = WasmBridge.getInstance();

    await Promise.all([
      bridge.createSingleBlockLayout(new Uint8Array([1])),
      bridge.createSingleBlockLayout(new Uint8Array([2])),
      bridge.createSingleBlockLayout(new Uint8Array([3])),
    ]);

    const impl = await moduleRef.current!();
    expect(impl.default).toHaveBeenCalledTimes(1);
    expect(moduleRef.sessionMock.create_metadata).toHaveBeenCalledTimes(3);
  });

  it("resets initialization promise after failure and retries successfully", async () => {
    let attempts = 0;

    // Mock fetch to fail on first attempt
    (global.fetch as any).mockImplementation(() => {
      attempts += 1;
      if (attempts === 1) {
        return Promise.resolve({
          ok: false,
          statusText: "Not Found",
        });
      }
      return Promise.resolve({
        ok: true,
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
      });
    });

    const WasmBridge = await loadBridge();
    WasmBridge.resetInstance();

    const bridge = WasmBridge.getInstance();

    await expect(
      bridge.createSingleBlockLayout(new Uint8Array([7]))
    ).rejects.toThrow(/Failed to initialize WASM module/);

    await expect(
      bridge.createSingleBlockLayout(new Uint8Array([8]))
    ).resolves.toEqual(fakeLayout);

    const impl = await moduleRef.current!();
    expect(impl.default).toHaveBeenCalledTimes(1);
    expect(moduleRef.sessionMock.create_metadata).toHaveBeenCalledTimes(1);
  });
});