import { beforeEach, describe, expect, it, vi } from "vitest";

const sessionMock = {
  get_recommended_block_size: vi.fn().mockReturnValue(1024 * 1024),
  create_metadata: vi.fn(),
  free: vi.fn(),
};

const initMock = vi.fn().mockResolvedValue(undefined);
const RaptorQSessionMock: any = vi.fn(() => sessionMock);
RaptorQSessionMock.version = vi.fn().mockReturnValue("1.0.0");

const mockFileSystem = new Map<string, Uint8Array>();
const writeFileChunkMock = vi.fn(async (path: string, _offset: number, data: Uint8Array) => {
  mockFileSystem.set(path, data);
});
const readFileChunkMock = vi.fn(async (path: string, offset: number, length: number) => {
  const data = mockFileSystem.get(path);
  if (!data) throw new Error(`File not found: ${path}`);
  return data.slice(offset, offset + length);
});
const getFileSizeMock = vi.fn((path: string) => mockFileSystem.get(path)?.length ?? 0);

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

vi.mock("rq-library-wasm/rq_library_bg.wasm?url", () => ({ default: "/mocked/path/to/wasm" }));

const loadProxy = async () => (await import("../../src/wasm/raptorq-proxy.js")).RaptorQProxy;

describe("RaptorQProxy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    mockFileSystem.clear();
    initMock.mockResolvedValue(undefined);
    sessionMock.create_metadata.mockImplementation(async (_in: string, layoutPath: string) => {
      const len = Number((_in && mockFileSystem.get(_in)?.length) || 0);
      const layout = { transfer_length: len, symbol_size: 65535, num_source_blocks: 1, num_sub_blocks: 1, symbol_alignment: 8, source_blocks: [{ source_symbols: 2, sub_symbols: 1, sub_symbol_size: 8 }] };
      mockFileSystem.set(layoutPath, new TextEncoder().encode(JSON.stringify(layout)));
      return { success: true };
    });
    RaptorQSessionMock.version = vi.fn().mockReturnValue("1.0.0");
  });

  it("initializes lazily and memoizes the WASM module", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();
    const proxy = RaptorQProxy.getInstance();

    const result1 = await proxy.createSingleBlockLayout(new Uint8Array(100));
    const result2 = await proxy.createSingleBlockLayout(new Uint8Array(200));

    expect(initMock).toHaveBeenCalledTimes(1);
    expect(RaptorQSessionMock).toHaveBeenCalledWith(65535, 6, 4096n, 1n);
    expect(result1).toBeInstanceOf(Uint8Array);
    expect(result2).toBeInstanceOf(Uint8Array);
  });

  it("creates a session with default parameters", async () => {
    const RaptorQProxy = await loadProxy();
    RaptorQProxy.resetInstance();
    const proxy = RaptorQProxy.getInstance();
    await proxy.createSession();
    expect(RaptorQSessionMock).toHaveBeenCalledWith(65535, 6, 4096n, 1n);
  });
});
