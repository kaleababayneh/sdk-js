import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SNApiClient } from "../../src/cascade/client";

const createHttpStub = () => ({
  config: { baseUrl: "https://snapi.test", headers: { Authorization: "Bearer token" } },
  baseUrl: "https://snapi.test",
  post: vi.fn(),
  get: vi.fn(),
  requestRaw: vi.fn(),
});

describe("SNApiClient", () => {
  const originalFetch = globalThis.fetch;
  let httpStub: ReturnType<typeof createHttpStub>;

  beforeEach(() => {
    vi.restoreAllMocks();
    httpStub = createHttpStub();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("startCascade uploads multipart form data via fetch", async () => {
    const mockResponse = new Response(JSON.stringify({ taskId: "task-123" }), { status: 200 });
    httpStub.requestRaw.mockResolvedValue(mockResponse);

    const client = new SNApiClient(httpStub as any);
    const file = new Blob([new Uint8Array([1, 2, 3])], { type: "application/octet-stream" });
    const result = await client.startCascade({ actionId: "action-123", signature: "test-signature", file });

    const [method, path, body, options] = httpStub.requestRaw.mock.calls[0];
    expect(method).toBe("POST");
    expect(path).toBe("/api/v1/actions/cascade");
    expect(body).toBeInstanceOf(FormData);
    expect(options).toEqual({ noRetry: true });
    expect(result).toEqual({ taskId: "task-123" });
  });

  it("requestDownload delegates to HttpClient.post with v1 path", async () => {
    const client = new SNApiClient(httpStub as any);
    httpStub.post.mockResolvedValue({ taskId: "download-1" });

    const result = await client.requestDownload("action-xyz", { signature: "sig" });

    expect(httpStub.post).toHaveBeenCalledWith("/api/v1/actions/cascade/action-xyz/downloads", { signature: "sig" });
    expect(result).toEqual({ taskId: "download-1" });
  });

  it("getTask and getTaskStatus delegate to HttpClient.get", async () => {
    const client = new SNApiClient(httpStub as any);
    const task = { task_id: "abc", status: "pending" };
    const history = [{ status: "sdk:started" }, { status: "sdk:processing" }];

    httpStub.get.mockResolvedValueOnce(task).mockResolvedValueOnce(history);

    const taskResult = await client.getTask("abc");
    const statusResult = await client.getTaskStatus("abc");

    expect(httpStub.get).toHaveBeenNthCalledWith(1, "/api/v1/actions/cascade/tasks/abc");
    expect(httpStub.get).toHaveBeenNthCalledWith(2, "/api/v1/actions/cascade/tasks/abc/history");
    expect(taskResult).toBe(task);
    expect(statusResult).toEqual(history[1]);
  });

  it("downloadFile uses v1 file endpoint", async () => {
    const streamResponse = new Response("file-bytes", { status: 200 });
    httpStub.requestRaw.mockResolvedValue(streamResponse);

    const client = new SNApiClient(httpStub as any);
    const stream = await client.downloadFile("task-stream");

    expect(httpStub.requestRaw).toHaveBeenCalledWith("GET", "/api/v1/downloads/cascade/task-stream/file", undefined, { noRetry: true });
    expect(stream).toBe(streamResponse.body);
  });
});
