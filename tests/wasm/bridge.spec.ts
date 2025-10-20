import { beforeEach, describe, expect, it, vi } from "vitest";

type ModuleFactory = () => Promise<{
  init?: () => Promise<void>;
  create_single_block_layout: (data: Uint8Array) => unknown;
}>;

const moduleRef = vi.hoisted(() => ({
  current: undefined as ModuleFactory | undefined,
}));

vi.mock("rq-wasm", async () => {
  const factory = moduleRef.current;
  if (!factory) {
    throw new Error("Module factory not set");
  }
  return factory();
});

const loadBridge = async () => {
  const mod = await import("src/wasm/bridge");
  return mod.WasmBridge;
};

describe("WasmBridge", () => {
  const fakeLayout = { layout: true };

  beforeEach(() => {
    vi.resetModules();
    moduleRef.current = async () => ({
      init: vi.fn().mockResolvedValue(undefined),
      create_single_block_layout: vi.fn().mockReturnValue(fakeLayout),
    });
  });

  it("initializes lazily and memoizes the WASM module", async () => {
    const WasmBridge = await loadBridge();
    WasmBridge.resetInstance();

    const bridge = WasmBridge.getInstance();
    const result1 = await bridge.createSingleBlockLayout(new Uint8Array([1]));
    const result2 = await bridge.createSingleBlockLayout(new Uint8Array([2]));

    expect(result1).toBe(fakeLayout);
    expect(result2).toBe(fakeLayout);

    const impl = await moduleRef.current!();
    expect(impl.init).toHaveBeenCalledTimes(1);
    expect(impl.create_single_block_layout).toHaveBeenCalledTimes(2);
    expect(bridge.isInitialized()).toBe(true);
  });

  it("ensures concurrent calls share a single initialization", async () => {
    const initSpy = vi.fn().mockResolvedValue(undefined);
    const createSpy = vi.fn().mockReturnValue(fakeLayout);

    moduleRef.current = async () => ({
      init: initSpy,
      create_single_block_layout: createSpy,
    });

    const WasmBridge = await loadBridge();
    WasmBridge.resetInstance();

    const bridge = WasmBridge.getInstance();

    await Promise.all([
      bridge.createSingleBlockLayout(new Uint8Array([1])),
      bridge.createSingleBlockLayout(new Uint8Array([2])),
      bridge.createSingleBlockLayout(new Uint8Array([3])),
    ]);

    expect(initSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(3);
  });

  it("resets initialization promise after failure and retries successfully", async () => {
    let attempts = 0;

    const initSpy = vi.fn().mockResolvedValue(undefined);
    const createSpy = vi.fn().mockReturnValue(fakeLayout);

    moduleRef.current = async () => {
      attempts += 1;
      if (attempts === 1) {
        throw new Error("load fail");
      }
      return {
        init: initSpy,
        create_single_block_layout: createSpy,
      };
    };

    const WasmBridge = await loadBridge();
    WasmBridge.resetInstance();

    const bridge = WasmBridge.getInstance();

    await expect(
      bridge.createSingleBlockLayout(new Uint8Array([7]))
    ).rejects.toThrow(/Failed to initialize rq-wasm module: load fail/);

    await expect(
      bridge.createSingleBlockLayout(new Uint8Array([8]))
    ).resolves.toBe(fakeLayout);

    expect(initSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});