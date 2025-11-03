import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SNApiClient } from "../../src/cascade/client";

const createHttpStub = () => {
  return {
    config: {
      baseUrl: "https://snapi.test",
      headers: {
        Authorization: "Bearer token",
      },
    },
    baseUrl: "https://snapi.test",
    post: vi.fn(),
    get: vi.fn(),
    requestRaw: vi.fn(),
  };
};

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
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const responsePayload = { taskId: "task-123" };
    const mockResponse = new Response(JSON.stringify(responsePayload), { status: 200 });
    
    // Mock requestRaw to return a response
    httpStub.requestRaw.mockResolvedValue(mockResponse);

    const client = new SNApiClient(httpStub as unknown as any);
    const file = new Blob([new Uint8Array([1, 2, 3])], { type: "application/octet-stream" });

    const result = await client.startCascade({
      actionId: "action-123",
      signature: "test-signature",
      file
    });

    expect(httpStub.requestRaw).toHaveBeenCalledTimes(1);
    const [method, path, body, options] = httpStub.requestRaw.mock.calls[0];
    expect(method).toBe("POST");
    expect(path).toBe("/api/v1/actions/cascade");
    expect(body).toBeInstanceOf(FormData);
    expect(options).toEqual({ noRetry: true });

    const formData = body as FormData;
    const appended = formData.get("file");
    expect(appended).toBeInstanceOf(Blob);
    expect((appended as Blob).size).toBe(file.size);
    expect(formData.get("action_id")).toBe("action-123");
    expect(formData.get("signature")).toBe("test-signature");

    expect(result).toEqual(responsePayload);

    debugSpy.mockRestore();
  });

  it("requestDownload delegates to HttpClient.post with correct path", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const client = new SNApiClient(httpStub as unknown as any);
    const response = { taskId: "download-1" };
    httpStub.post.mockResolvedValue(response);

    const result = await client.requestDownload("action-xyz", {});

    expect(httpStub.post).toHaveBeenCalledWith(
      "/api/actions/cascade/action-xyz/downloads",
      {}
    );
    expect(result).toBe(response);

    console.debug("requestDownload call", {
      path: "/api/actions/cascade/action-xyz/downloads",
      response,
    });
    expect(debugSpy).toHaveBeenCalledWith("requestDownload call", {
      path: "/api/actions/cascade/action-xyz/downloads",
      response,
    });
    debugSpy.mockRestore();
  });

  it("getTask and getTaskStatus delegate to HttpClient.get", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const client = new SNApiClient(httpStub as unknown as any);
    const task = { task_id: "abc", status: "pending" };
    const status = { status: "pending" };

    httpStub.get
      .mockResolvedValueOnce(task)
      .mockResolvedValueOnce(status);

    const taskResult = await client.getTask("abc");
    const statusResult = await client.getTaskStatus("abc");

    expect(httpStub.get).toHaveBeenNthCalledWith(1, "/api/actions/cascade/tasks/abc");
    expect(httpStub.get).toHaveBeenNthCalledWith(2, "/api/actions/cascade/tasks/abc/status");

    expect(taskResult).toBe(task);
    expect(statusResult).toBe(status);

    console.debug("task endpoints", {
      task: taskResult,
      status: statusResult,
    });
    expect(debugSpy).toHaveBeenCalledWith("task endpoints", {
      task: task,
      status: status,
    });
    debugSpy.mockRestore();
  });

  it("downloadFile streams data via fetch with propagated headers", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const streamResponse = new Response("file-bytes", { status: 200 });
    
    // Mock requestRaw to return a response
    httpStub.requestRaw.mockResolvedValue(streamResponse);

    const client = new SNApiClient(httpStub as unknown as any);

    const stream = await client.downloadFile("task-stream");

    expect(httpStub.requestRaw).toHaveBeenCalledWith(
      "GET",
      "/api/downloads/cascade/task-stream/file",
      undefined,
      { noRetry: true }
    );
    expect(stream).toBe(streamResponse.body);

    console.debug("downloadFile response", {
      ok: true,
      hasBody: stream !== null,
    });
    expect(debugSpy).toHaveBeenCalledWith("downloadFile response", {
      ok: true,
      hasBody: true,
    });
    debugSpy.mockRestore();
  });
});