import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SNApiClient, Task } from "src/cascade/client";
import { CascadeUploader } from "src/cascade/uploader";

const hoisted = vi.hoisted(() => {
  const blake3HashMock = vi.fn<[_input: Uint8Array], Promise<string>>();
  const toBase64Mock = vi.fn<(bytes: Uint8Array) => string>();
  const toCanonicalJsonBytesMock = vi.fn<(value: unknown) => Uint8Array>();
  const createSingleBlockLayoutMock = vi.fn<[_data: Uint8Array], Promise<Uint8Array>>();
  const generateIdsMock = vi.fn<[_layoutB64: string, _layoutSigB64: string, _rqIdsIc: number, _rqIdsMax: number], Promise<string[]>>();
  const buildIndexFileMock = vi.fn<[_layoutIds: string[], _signature: string], Record<string, unknown>>();
  const waitForCompletionMock = vi.fn<[], Promise<Task>>();
  const TaskManagerMock = vi.fn(() => ({ waitForCompletion: waitForCompletionMock }));
  return {
    blake3HashMock,
    toBase64Mock,
    toCanonicalJsonBytesMock,
    createSingleBlockLayoutMock,
    generateIdsMock,
    buildIndexFileMock,
    waitForCompletionMock,
    TaskManagerMock,
  };
});

vi.mock("src/internal/hash", () => ({
  blake3Hash: hoisted.blake3HashMock,
  blake3HashBytes: vi.fn(async (u8: Uint8Array) => u8),
}));
vi.mock("src/internal/encoding", () => ({ toBase64: hoisted.toBase64Mock, toCanonicalJsonBytes: hoisted.toCanonicalJsonBytesMock }));
vi.mock("src/wasm/lep1", () => ({
  createSingleBlockLayout: hoisted.createSingleBlockLayoutMock,
  generateIds: hoisted.generateIdsMock,
  buildIndexFile: hoisted.buildIndexFileMock,
}));
vi.mock("src/cascade/task", () => ({ TaskManager: hoisted.TaskManagerMock }));

describe("CascadeUploader", () => {
  beforeEach(() => {
    hoisted.blake3HashMock.mockReset();
    hoisted.blake3HashMock.mockResolvedValue("file-hash");

    hoisted.toBase64Mock.mockReset();
    hoisted.toBase64Mock.mockImplementation((bytes) => `b64:${Array.from(bytes).join(",")}`);

    hoisted.toCanonicalJsonBytesMock.mockReset();
    hoisted.toCanonicalJsonBytesMock.mockImplementation((value) => new TextEncoder().encode(JSON.stringify(value)));

    hoisted.createSingleBlockLayoutMock.mockReset();
    hoisted.createSingleBlockLayoutMock.mockResolvedValue(new TextEncoder().encode('{"transfer_length":4}'));

    hoisted.generateIdsMock.mockReset();
    hoisted.generateIdsMock.mockResolvedValue(["id-1", "id-2", "id-3"]);

    hoisted.buildIndexFileMock.mockReset();
    hoisted.buildIndexFileMock.mockReturnValue({ version: 1, layout_ids: ["id-1", "id-2", "id-3"], layout_signature: "sig" });

    hoisted.waitForCompletionMock.mockReset();
    hoisted.waitForCompletionMock.mockResolvedValue({ task_id: "task-abc", status: "completed" } as Task);

    hoisted.TaskManagerMock.mockReset();
    hoisted.TaskManagerMock.mockImplementation(() => ({ waitForCompletion: hoisted.waitForCompletionMock }));
  });

  it("performs full upload workflow with mocked dependencies", async () => {
    const startCascadeMock = vi.fn().mockResolvedValue({ task_id: "task-abc" });
    const snClient = { startCascade: startCascadeMock } as unknown as SNApiClient;

    const chainPort = {
      getActionParams: vi.fn().mockResolvedValue({ max_raptor_q_symbols: 10, svc_challenge_count: 2, svc_min_chunks_for_challenge: 1 }),
      requestActionTx: vi.fn().mockResolvedValue({ actionId: "action-1" }),
    } as any;

    const signer = {
      signArbitrary: vi.fn().mockResolvedValue({ signature: "sig" }),
    } as any;

    const uploader = new CascadeUploader(snClient, chainPort, "lumera1x", signer, "lumera-testnet-2");

    const result = await uploader.uploadFile(new Uint8Array([1, 2, 3, 4]), {
      fileName: "x.bin",
      isPublic: false,
      expirationTime: "9999999999",
      taskOptions: { pollInterval: 250 },
    });

    expect(chainPort.getActionParams).toHaveBeenCalled();
    expect(chainPort.requestActionTx).toHaveBeenCalled();
    expect(startCascadeMock).toHaveBeenCalledTimes(1);
    expect(hoisted.TaskManagerMock).toHaveBeenCalledWith(snClient, "task-abc", { pollInterval: 250 });
    expect(result).toEqual({ task_id: "task-abc", status: "completed" });
  });
});
