import { beforeEach, describe, expect, it, vi } from "vitest";
import { WasmBridge } from "src/wasm/bridge";
import {
  buildIndexFile,
  createSingleBlockLayout,
  generateIds,
} from "src/wasm/lep1";
import type { Layout } from "src/wasm/types";

vi.mock("src/wasm/bridge", () => {
  return {
    WasmBridge: {
      getInstance: vi.fn(),
    },
  };
});

describe("LEP-1 helpers", () => {
  const fakeLayout: Layout = {
    transfer_length: 123,
    symbol_size: 64,
    num_source_blocks: 1,
    num_sub_blocks: 1,
    symbol_alignment: 8,
    source_blocks: [
      {
        source_symbols: 10,
        sub_symbols: 1,
        sub_symbol_size: 64,
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("delegates createSingleBlockLayout to WasmBridge singleton", async () => {
    const createLayoutMock = vi.fn().mockResolvedValue(fakeLayout);
    (WasmBridge.getInstance as unknown as vi.Mock).mockReturnValue({
      createSingleBlockLayout: createLayoutMock,
    });

    const input = new Uint8Array([1, 2, 3]);
    const layout = await createSingleBlockLayout(input);

    expect(WasmBridge.getInstance).toHaveBeenCalledTimes(1);
    expect(createLayoutMock).toHaveBeenCalledWith(input);
    expect(layout).toBe(fakeLayout);
  });

  it("derives sequential layout IDs with wrap-around", () => {
    const ids = generateIds(8, 10);
    expect(ids).toEqual([8, 9, 0, 1, 2]);
  });

  it("throws when generateIds receives invalid inputs", () => {
    expect(() => generateIds(0, 0)).toThrow(
      /rq_ids_max must be positive/
    );
    expect(() => generateIds(0, -1)).toThrow(
      /count must be non-negative/
    );
  });

  it("builds index file with version and validates inputs", () => {
    const signature = new Uint8Array([1, 2, 3]);
    const layoutIds = [1, 2, 3];

    const indexFile = buildIndexFile(layoutIds, signature);
    expect(indexFile).toEqual({
      version: 1,
      layout_ids: layoutIds,
      layout_signature: signature,
    });

    expect(() => buildIndexFile([], signature)).toThrow(
      /layout_ids must not be empty/
    );
    expect(() => buildIndexFile(layoutIds, new Uint8Array())).toThrow(
      /layout_signature must not be empty/
    );
  });
});