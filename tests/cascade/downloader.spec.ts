import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReadableStream } from "node:stream/web";
import { CascadeDownloader } from "src/cascade/downloader";
import type { SNApiClient } from "src/cascade/client";

const hoisted = vi.hoisted(() => {
  const waitForCompletionMock = vi.fn<[], Promise<void>>();
  const TaskManagerMock = vi.fn(() => ({
    waitForCompletion: waitForCompletionMock,
  }));
  const blake3HashMock = vi.fn<[_input: Uint8Array], Promise<string>>();
  const toBase64Mock = vi.fn<(bytes: Uint8Array) => string>();
  return { waitForCompletionMock, TaskManagerMock, blake3HashMock, toBase64Mock };
});

const { waitForCompletionMock, TaskManagerMock, blake3HashMock, toBase64Mock } = hoisted;

vi.mock("src/cascade/task", () => ({
  TaskManager: TaskManagerMock,
}));

vi.mock("src/internal/hash", () => ({
  blake3Hash: blake3HashMock,
}));

vi.mock("src/internal/encoding", () => ({
  toBase64: toBase64Mock,
}));

describe("CascadeDownloader", () => {
  beforeEach(() => {
    waitForCompletionMock.mockReset();
    waitForCompletionMock.mockResolvedValue();
    TaskManagerMock.mockReset();
    TaskManagerMock.mockImplementation(() => ({
      waitForCompletion: waitForCompletionMock,
    }));
    blake3HashMock.mockReset();
    blake3HashMock.mockResolvedValue("hash");
    toBase64Mock.mockReset();
    toBase64Mock.mockImplementation((bytes) => `b64:${Array.from(bytes).join(",")}`);
  });

  const getLatestTaskManagerInstance = () =>
    TaskManagerMock.mock.results.at(-1)?.value as { waitForCompletion: ReturnType<typeof vi.fn> } | undefined;

  it("performs public download without signature", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const requestDownloadMock = vi.fn().mockResolvedValue({ taskId: "task-1" });
    const stream = new ReadableStream<Uint8Array>();
    const downloadFileMock = vi.fn().mockResolvedValue(stream);

    const snClient = {
      requestDownload: requestDownloadMock,
      downloadFile: downloadFileMock,
    } as unknown as SNApiClient;

    const downloader = new CascadeDownloader(snClient);
    const result = await downloader.downloadFile({ actionId: "action-1" });

    const taskInstance = getLatestTaskManagerInstance();
    expect(taskInstance).toBeDefined();

    expect(requestDownloadMock).toHaveBeenCalledWith("action-1", {});
    expect(TaskManagerMock).toHaveBeenCalledWith(snClient, "task-1", undefined);
    expect(waitForCompletionMock).toHaveBeenCalled();
    expect(downloadFileMock).toHaveBeenCalledWith("task-1");
    expect(result).toBe(stream);

    console.debug("cascade download instrumentation", {
      signatureGenerated: false,
      requestCalls: requestDownloadMock.mock.calls.length,
      taskId: "task-1",
    });
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it("performs private download with simulated signature", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const requestDownloadMock = vi.fn().mockResolvedValue({ taskId: "task-2" });
    const downloadFileMock = vi.fn().mockResolvedValue(new ReadableStream<Uint8Array>());

    const snClient = {
      requestDownload: requestDownloadMock,
      downloadFile: downloadFileMock,
    } as unknown as SNApiClient;

    const downloader = new CascadeDownloader(snClient);
    const result = await downloader.downloadPrivate("action-priv", { pollInterval: 500 });

    const taskInstance = getLatestTaskManagerInstance();
    expect(taskInstance).toBeDefined();

    expect(blake3HashMock).toHaveBeenCalledWith(new TextEncoder().encode("action-priv"));
    expect(toBase64Mock).toHaveBeenCalled();
    expect(requestDownloadMock).toHaveBeenCalledWith("action-priv", {});
    expect(TaskManagerMock).toHaveBeenCalledWith(snClient, "task-2", { pollInterval: 500 });
    expect(waitForCompletionMock).toHaveBeenCalled();
    expect(downloadFileMock).toHaveBeenCalledWith("task-2");
    expect(result).toBeInstanceOf(ReadableStream);

    console.debug("private download instrumentation", {
      signature: toBase64Mock.mock.results[0]?.value,
      polls: waitForCompletionMock.mock.calls.length,
    });
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });
});