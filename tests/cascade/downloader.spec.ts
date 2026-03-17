import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SNApiClient } from "src/cascade/client";
import { CascadeDownloader } from "src/cascade/downloader";

const hoisted = vi.hoisted(() => ({
  waitForDownloadCompletionMock: vi.fn<[], Promise<void>>(),
  TaskManagerMock: vi.fn(),
}));

vi.mock("src/cascade/task", () => ({
  TaskManager: hoisted.TaskManagerMock,
}));

describe("CascadeDownloader", () => {
  beforeEach(() => {
    hoisted.waitForDownloadCompletionMock.mockReset();
    hoisted.waitForDownloadCompletionMock.mockResolvedValue();
    hoisted.TaskManagerMock.mockReset();
    hoisted.TaskManagerMock.mockImplementation(() => ({
      waitForDownloadCompletion: hoisted.waitForDownloadCompletionMock,
    }));
  });

  it("performs download and includes signature", async () => {
    const requestDownloadMock = vi.fn().mockResolvedValue({ taskId: "task-1" });
    const stream = new ReadableStream<Uint8Array>();
    const downloadFileMock = vi.fn().mockResolvedValue(stream);

    const snClient = { requestDownload: requestDownloadMock, downloadFile: downloadFileMock } as unknown as SNApiClient;
    const signer = { signArbitrary: vi.fn().mockResolvedValue({ signature: "sig-b64" }) } as any;

    const downloader = new CascadeDownloader(snClient, "lumera1x", signer, "lumera-testnet-2");
    const result = await downloader.download("action-1", { pollInterval: 250 });

    expect(requestDownloadMock).toHaveBeenCalledWith("action-1", { signature: "sig-b64" });
    expect(hoisted.TaskManagerMock).toHaveBeenCalledWith(snClient, "task-1", { pollInterval: 250 });
    expect(hoisted.waitForDownloadCompletionMock).toHaveBeenCalled();
    expect(downloadFileMock).toHaveBeenCalledWith("task-1");
    expect(result).toBe(stream);
  });
});
