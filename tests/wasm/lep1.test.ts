import { beforeEach, describe, expect, it, vi } from "vitest";
import { RaptorQProxy } from "src/wasm/raptorq-proxy";
import { buildIndexFile, createSingleBlockLayout, generateIds } from "src/wasm/lep1";
import type { Layout } from "src/wasm/types";

vi.mock("src/internal/zstd", () => ({
  compress: vi.fn(async (s: string) => new TextEncoder().encode(s)),
}));
vi.mock("src/internal/hash", () => ({
  blake3HashBytes: vi.fn(async (u8: Uint8Array) => u8),
}));
vi.mock("src/wasm/raptorq-proxy", () => ({
  RaptorQProxy: { getInstance: vi.fn() },
}));

describe("LEP-1 helpers", () => {
  const fakeLayout: Layout = {
    transfer_length: 123,
    symbol_size: 64,
    num_source_blocks: 1,
    num_sub_blocks: 1,
    symbol_alignment: 8,
    source_blocks: [{ source_symbols: 10, sub_symbols: 1, sub_symbol_size: 64 }],
  };

  beforeEach(() => vi.resetAllMocks());

  it("delegates createSingleBlockLayout to RaptorQProxy singleton", async () => {
    const createLayoutMock = vi.fn().mockResolvedValue(fakeLayout);
    (RaptorQProxy.getInstance as unknown as vi.Mock).mockReturnValue({ createSingleBlockLayout: createLayoutMock });

    const input = new Uint8Array([1, 2, 3]);
    const layout = await createSingleBlockLayout(input);

    expect(RaptorQProxy.getInstance).toHaveBeenCalledTimes(1);
    expect(createLayoutMock).toHaveBeenCalledWith(input);
    expect(layout).toBe(fakeLayout);
  });

  it("builds index file with version and validates inputs", () => {
    const indexFile = buildIndexFile(["id1", "id2"], "sig");
    expect(indexFile).toEqual({ version: 1, layout_ids: ["id1", "id2"], layout_signature: "sig" });
    expect(() => buildIndexFile([], "sig")).toThrow(/layout_ids must not be empty/);
    expect(() => buildIndexFile(["id1"], "")).toThrow(/layout_signature must not be empty/);
  });
});
