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
      { status: "pending" },
      { status: "processing" },
      { status: "completed" },
    ];
    snapi.getTaskStatus.mockImplementation(async () => statusSequence.shift() ?? { status: "completed" });
    const taskResult = { task_id: "done", status: "completed" } as Task;
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
      finalStatus: "completed",
    });
    debugSpy.mockRestore();
  });

  it("throws when task status transitions to failed", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    snapi.getTaskStatus
      .mockResolvedValueOnce({ status: "pending" })
      .mockResolvedValueOnce({ status: "failed", error: "boom" });

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-2", {
      pollInterval: 500,
      timeout: 5000,
    });

    const promise = manager.waitForCompletion();

    await vi.advanceTimersByTimeAsync(500);
    await vi.advanceTimersByTimeAsync(500);

    await expect(promise).rejects.toThrowError("Task task-2 failed: boom");

    console.debug("task manager failure", {
      polls: snapi.getTaskStatus.mock.calls.length,
      lastStatus: snapi.getTaskStatus.mock.results.at(-1)?.value,
    });
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it("times out when task never reaches terminal state", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    snapi.getTaskStatus.mockResolvedValue({ status: "pending" });

    const manager = new TaskManager(snapi as unknown as SNApiClient, "task-3", {
      pollInterval: 200,
      timeout: 1000,
    });

    const promise = manager.waitForCompletion();

    await vi.advanceTimersByTimeAsync(1000);
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrowError("Task task-3 timed out after 1000ms");

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