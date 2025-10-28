import { beforeEach, describe, expect, it, vi } from "vitest";
import { RaptorQProxy } from "src/wasm/raptorq-proxy";
import {
  buildIndexFile,
  createSingleBlockLayout,
  generateIds,
} from "src/wasm/lep1";
import type { Layout } from "src/wasm/types";

vi.mock("src/wasm/raptorq-proxy", () => {
  return {
    RaptorQProxy: {
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

  it("delegates createSingleBlockLayout to RaptorQProxy singleton", async () => {
    const createLayoutMock = vi.fn().mockResolvedValue(fakeLayout);
    (RaptorQProxy.getInstance as unknown as vi.Mock).mockReturnValue({
      createSingleBlockLayout: createLayoutMock,
    });

    const input = new Uint8Array([1, 2, 3]);
    const layout = await createSingleBlockLayout(input);

    expect(RaptorQProxy.getInstance).toHaveBeenCalledTimes(1);
    expect(createLayoutMock).toHaveBeenCalledWith(input);
    expect(layout).toBe(fakeLayout);
  });

  it("derives sequential layout IDs", async () => {
    const layoutFileB64 = "bGF5b3V0"; // "layout" in base64
    const layoutSignatureB64 = "c2lnbmF0dXJl"; // "signature" in base64
    const ids = await generateIds(layoutFileB64, layoutSignatureB64, 0, 5);
    expect(ids).toHaveLength(5);
    expect(ids.every((id: string) => typeof id === 'string')).toBe(true);
  });

  it("throws when generateIds receives invalid inputs", async () => {
    await expect(generateIds("", "sig", 0, 5)).rejects.toThrow(
      /layoutFile must not be empty/
    );
    await expect(generateIds("layout", "", 0, 5)).rejects.toThrow(
      /layoutSignature must not be empty/
    );
    await expect(generateIds("layout", "sig", 0, 0)).rejects.toThrow(
      /rq_ids_max must be positive/
    );
  });

  it("builds index file with version and validates inputs", () => {
    const signature = "c2lnbmF0dXJl"; // base64 encoded
    const layoutIds = ["id1", "id2", "id3"];

    const indexFile = buildIndexFile(layoutIds, signature);
    expect(indexFile).toEqual({
      version: 1,
      layout_ids: layoutIds,
      layout_signature: signature,
    });

    expect(() => buildIndexFile([], signature)).toThrow(
      /layout_ids must not be empty/
    );
    expect(() => buildIndexFile(layoutIds, "")).toThrow(
      /layout_signature must not be empty/
    );
  });
});