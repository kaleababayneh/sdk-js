import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SNApiClient, Task } from "src/cascade/client";
import { CascadeUploader } from "src/cascade/uploader";

const hoisted = vi.hoisted(() => {
  const blake3HashMock = vi.fn<[_input: Uint8Array], Promise<string>>();
  const toBase64Mock = vi.fn<(bytes: Uint8Array) => string>();
  const toCanonicalJsonBytesMock = vi.fn<(value: unknown) => Uint8Array>();
  const createSingleBlockLayoutMock = vi.fn<[_data: Uint8Array], Promise<Record<string, unknown>>>();
  const deriveLayoutIdsMock = vi.fn<[_rqIdsIc: number, _rqIdsMax: number, _count: number], number[]>();
  const buildIndexFileMock = vi.fn<[_layoutIds: number[], _signature: Uint8Array], Record<string, unknown>>();
  const waitForCompletionMock = vi.fn<[], Promise<Task>>();
  const TaskManagerMock = vi.fn(() => ({ waitForCompletion: waitForCompletionMock }));
  return {
    blake3HashMock,
    toBase64Mock,
    toCanonicalJsonBytesMock,
    createSingleBlockLayoutMock,
    deriveLayoutIdsMock,
    buildIndexFileMock,
    waitForCompletionMock,
    TaskManagerMock,
  };
});

vi.mock("src/internal/hash", () => ({
  blake3Hash: hoisted.blake3HashMock,
}));

vi.mock("src/internal/encoding", () => ({
  toBase64: hoisted.toBase64Mock,
  toCanonicalJsonBytes: hoisted.toCanonicalJsonBytesMock,
}));

vi.mock("src/wasm/lep1", () => ({
  createSingleBlockLayout: hoisted.createSingleBlockLayoutMock,
  generateIds: hoisted.deriveLayoutIdsMock,
  buildIndexFile: hoisted.buildIndexFileMock,
}));

vi.mock("src/cascade/task", () => ({
  TaskManager: hoisted.TaskManagerMock,
}));

const {
  blake3HashMock,
  toBase64Mock,
  toCanonicalJsonBytesMock,
  createSingleBlockLayoutMock,
  deriveLayoutIdsMock,
  buildIndexFileMock,
  waitForCompletionMock,
  TaskManagerMock,
} = hoisted;

describe("CascadeUploader", () => {
  beforeEach(() => {
    blake3HashMock.mockReset();
    blake3HashMock
      .mockResolvedValueOnce("layout-hash")
      .mockResolvedValueOnce("file-hash");

    toBase64Mock.mockReset();
    toBase64Mock.mockImplementation(
      (bytes) => `b64:${Array.from(bytes).join(",")}`,
    );

    toCanonicalJsonBytesMock.mockReset();
    toCanonicalJsonBytesMock.mockImplementation((value) =>
      new TextEncoder().encode(JSON.stringify(value)),
    );

    createSingleBlockLayoutMock.mockReset();
    createSingleBlockLayoutMock.mockResolvedValue({ layout: true });

    deriveLayoutIdsMock.mockReset();
    deriveLayoutIdsMock.mockReturnValue([11, 12, 13]);

    buildIndexFileMock.mockReset();
    buildIndexFileMock.mockReturnValue({
      version: 1,
      layout_ids: [11, 12, 13],
      layout_signature: "sig",
    });

    waitForCompletionMock.mockReset();
    waitForCompletionMock.mockResolvedValue({
      task_id: "task-abc",
      status: "completed",
    } as Task);

    TaskManagerMock.mockReset();
    TaskManagerMock.mockImplementation(() => ({
      waitForCompletion: waitForCompletionMock,
    }));
  });

  it("performs full upload workflow with mocked dependencies", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const startCascadeMock = vi.fn().mockResolvedValue({ taskId: "task-abc" });
    const snClient = {
      startCascade: startCascadeMock,
    } as unknown as SNApiClient;

    const uploader = new CascadeUploader(snClient, { layoutIdCount: 3 });

    const file = new Uint8Array([1, 2, 3, 4]);
    const params = {
      actionId: "action-1",
      rq_ids_ic: 5,
      rq_ids_max: 99,
      taskOptions: { pollInterval: 250 },
    };

    const result = await uploader.uploadFile(file, params);

    expect(createSingleBlockLayoutMock).toHaveBeenCalledWith(
      new Uint8Array([1, 2, 3, 4]),
    );
    expect(deriveLayoutIdsMock).toHaveBeenCalledWith(5, 99, 3);
    expect(buildIndexFileMock.mock.calls[0][0]).toEqual([11, 12, 13]);
    expect(blake3HashMock).toHaveBeenCalledTimes(2);
    expect(startCascadeMock).toHaveBeenCalledTimes(1);

    const startBody = startCascadeMock.mock.calls[0][0];
    expect(startBody.file).toBeInstanceOf(Blob);

    expect(TaskManagerMock).toHaveBeenCalledWith(
      snClient,
      "task-abc",
      params.taskOptions,
    );
    expect(waitForCompletionMock).toHaveBeenCalled();

    expect(result).toEqual({ task_id: "task-abc", status: "completed" });

    console.debug("cascade upload instrumentation", {
      startCalls: startCascadeMock.mock.calls.length,
      layoutIds: deriveLayoutIdsMock.mock.results[0]?.value,
      taskCallArgs: TaskManagerMock.mock.calls[0],
    });
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });
});