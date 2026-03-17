import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TaskManager } from "src/cascade/task";
import type { SNApiClient, Task, TaskStatus } from "src/cascade/client";

const createSnApiMock = () => ({
  getTaskStatus: vi.fn<[_taskId: string], Promise<TaskStatus>>(),
  getTask: vi.fn<[_taskId: string], Promise<Task>>(),
});

describe("TaskManager", () => {
  let snapi: ReturnType<typeof createSnApiMock>;

  beforeEach(() => {
    vi.restoreAllMocks();
    snapi = createSnApiMock();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("polls until task completes and returns task details", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const statusSequence: TaskStatus[] = [
      { status: "sdk:started" },
      { status: "sdk:processing" },
      { status: "sdk:completed" },
    ];
    snapi.getTaskStatus.mockImplementation(async () => statusSequence.shift() ?? { status: "sdk:completed" });
    const taskResult = { task_id: "done", status: "sdk:completed" } as Task;
    snapi.getTask.mockResolvedValue(taskResult);

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-1", {
      pollInterval: 1000,
      timeout: 10000,
    });

    const promise = manager.waitForCompletion();

    // Drive three polling rounds
    await vi.advanceTimersByTimeAsync(1000);
    await vi.advanceTimersByTimeAsync(1000);
    await vi.advanceTimersByTimeAsync(1000);

    const result = await promise;

    expect(snapi.getTaskStatus).toHaveBeenCalledTimes(3);
    expect(snapi.getTask).toHaveBeenCalledWith("task-1");
    expect(result).toBe(taskResult);

    console.debug("task manager completion", {
      polls: snapi.getTaskStatus.mock.calls.length,
      finalStatus: result.status,
    });
    expect(debugSpy).toHaveBeenCalledWith("task manager completion", {
      polls: 3,
      finalStatus: "sdk:completed",
    });
    debugSpy.mockRestore();
  });

  it("throws when task status transitions to failed", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    snapi.getTaskStatus
      .mockResolvedValueOnce({ status: "sdk:started" })
      .mockResolvedValueOnce({ status: "sdk:failed", error: "boom" });

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-2", {
      pollInterval: 500,
      timeout: 5000,
    });

    const promise = manager.waitForCompletion();
    const assertion = expect(promise).rejects.toThrowError("Task failed with status sdk:failed: boom");

    await vi.advanceTimersByTimeAsync(500);
    await vi.advanceTimersByTimeAsync(500);

    await assertion;

    console.debug("task manager failure", {
      polls: snapi.getTaskStatus.mock.calls.length,
      lastStatus: snapi.getTaskStatus.mock.results.at(-1)?.value,
    });
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it("handles raw SSE formatted string with terminal status", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    // Simulate API returning raw SSE data as a string (like in real scenario)
    const sseData = `data: {"id":19,"task_id":"2228e481","status":"sdk:started","data":{},"created_at":"2025-11-06T20:37:36.280406332Z"}

data: {"id":21,"task_id":"2228e481","status":"sdk:supernodes_found","data":{"count":0,"total":1},"created_at":"2025-11-06T20:37:36.345750272Z"}

data: {"id":20,"task_id":"2228e481","status":"sdk:failed","data":{"error":"no eligible supernodes to register"},"created_at":"2025-11-06T20:37:36.345795577Z"}
`;
    
    snapi.getTaskStatus
      .mockResolvedValueOnce({ status: "sdk:started" })
      .mockResolvedValueOnce(sseData as any);

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-sse", {
      pollInterval: 500,
      timeout: 5000,
    });

    const promise = manager.waitForCompletion();
    const assertion = expect(promise).rejects.toThrowError("Task failed with status sdk:failed: no eligible supernodes to register");

    await vi.advanceTimersByTimeAsync(500);
    await vi.advanceTimersByTimeAsync(500);

    await assertion;
    
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it("handles array of status updates and detects terminal status", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    // Simulate API returning an array of status updates like in the real SSE data
    const statusUpdates = [
      { id: 7, task_id: "64f51324", status: "sdk:started", data: {}, created_at: "2025-11-05T07:09:04.58830324Z" },
      { id: 9, task_id: "64f51324", status: "sdk:supernodes_found", data: { count: 0, total: 1 }, created_at: "2025-11-05T07:09:04.656348227Z" },
      { id: 8, task_id: "64f51324", status: "sdk:failed", data: { error: "no eligible supernodes to register" }, created_at: "2025-11-05T07:09:04.656384986Z" }
    ];
    
    snapi.getTaskStatus
      .mockResolvedValueOnce({ status: "sdk:started" })
      .mockResolvedValueOnce(statusUpdates as any);

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-array", {
      pollInterval: 500,
      timeout: 5000,
    });

    const promise = manager.waitForCompletion();
    const assertion = expect(promise).rejects.toThrowError("Task failed with status sdk:failed: no eligible supernodes to register");

    await vi.advanceTimersByTimeAsync(500);
    await vi.advanceTimersByTimeAsync(500);

    await assertion;
    
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it("times out when task never reaches terminal state", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    snapi.getTaskStatus.mockResolvedValue({ status: "sdk:processing" });

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-3", {
      pollInterval: 200,
      timeout: 1000,
    });

    const promise = manager.waitForCompletion();
    const assertion = expect(promise).rejects.toThrowError("Task task-3 timed out after 1000ms");

    await vi.advanceTimersByTimeAsync(1000);
    await vi.runAllTimersAsync();

    await assertion;

    console.debug("task manager timeout", {
      polls: snapi.getTaskStatus.mock.calls.length,
      elapsed: snapi.getTaskStatus.mock.calls.length * 200,
    });
    expect(debugSpy).toHaveBeenCalledWith("task manager timeout", {
      polls: snapi.getTaskStatus.mock.calls.length,
      elapsed: snapi.getTaskStatus.mock.calls.length * 200,
    });
    debugSpy.mockRestore();
  });
});