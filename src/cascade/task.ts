import type { SNApiClient, Task, TaskStatus } from './client';
import { HttpError } from '../internal/http';

const TERMINAL_SUCCESS_STATUSES = new Set<string>([
  'sdk:completed',
  'sdk:upload_completed',
]);

const TERMINAL_FAILURE_STATUSES = new Set<string>([
  'sdk:failed',
  'sdk:supernodes_unavailable',
  'sdk:registration_failure',
  'sdk:upload_failed',
  'sdk:processing_failed',
  'sdk:processing_timeout',
  'sdk:download_failure',
]);

/**
 * Options for TaskManager polling behavior
 */
export interface TaskManagerOptions {
  /**
   * Polling interval in milliseconds
   * @default 2000 (2 seconds)
   */
  pollInterval?: number;

  /**
   * Timeout in milliseconds before giving up on polling
   * @default 300000 (5 minutes)
   */
  timeout?: number;

  /**
   * Delay in milliseconds before performing the initial status check
   * to allow the backend time to register the task.
   * @default 500
   */
  initialStatusDelay?: number;

  /**
   * Maximum number of retries for the initial status check when the backend
   * responds with a 404.
   * @default 3
   */
  initialStatusRetryAttempts?: number;

  /**
   * Base delay in milliseconds between retries of the initial status check.
   * The actual delay grows linearly with each retry attempt.
   * @default 500
   */
  initialStatusRetryInterval?: number;
}

/**
 * TaskManager monitors the status of a Cascade task using a polling strategy.
 * 
 * This class provides a polling-based mechanism to track task completion,
 * serving as a fallback to the preferred SSE (Server-Sent Events) method.
 * It periodically queries the task status endpoint until the task reaches
 * a terminal state (completed or failed).
 * 
 * @example
 * ```typescript
 * const taskManager = new TaskManager(snapiClient, 'task-123');
 * 
 * try {
 *   const task = await taskManager.waitForCompletion();
 *   console.log('Task completed:', task);
 * } catch (error) {
 *   console.error('Task failed:', error);
 * }
 * ```
 */
export class TaskManager {
  private readonly pollInterval: number;
  private readonly timeout: number;
  private readonly initialStatusDelay: number;
  private readonly initialStatusRetryAttempts: number;
  private readonly initialStatusRetryInterval: number;

  /**
   * Create a new TaskManager
   * 
   * @param client - SNApiClient instance for making API requests
   * @param taskId - The ID of the task to monitor
   * @param options - Optional configuration for polling behavior
   */
  constructor(
    private readonly client: SNApiClient,
    private readonly taskId: string,
    options: TaskManagerOptions = {}
  ) {
    this.pollInterval = options.pollInterval ?? 2000; // 2 seconds default
    this.timeout = options.timeout ?? 300000; // 5 minutes default
    this.initialStatusDelay = options.initialStatusDelay ?? 500;
    this.initialStatusRetryAttempts = options.initialStatusRetryAttempts ?? 3;
    this.initialStatusRetryInterval = options.initialStatusRetryInterval ?? 500;
  }

  /**
   * Wait for the task to complete by polling its status
   * 
   * This method periodically checks the task status until it reaches a terminal
   * state (completed or failed). It will continue polling at the configured
   * interval until either:
   * - The task completes successfully (resolves with task details)
   * - The task fails (rejects with error)
   * - The timeout is reached (rejects with timeout error)
   * 
   * @returns Promise resolving to the completed task details
   * @throws {Error} If the task fails or times out
   * 
   * @example
   * ```typescript
   * const taskManager = new TaskManager(client, 'task-123', {
   *   pollInterval: 1000,  // Poll every second
   *   timeout: 60000       // 1 minute timeout
   * });
   * 
   * try {
   *   const task = await taskManager.waitForCompletion();
   *   console.log('Task completed successfully');
   * } catch (error) {
   *   console.error('Task did not complete:', error.message);
   * }
   * ```
   */
  async waitForCompletion(): Promise<Task> {
    const startTime = Date.now();

    if (this.initialStatusDelay > 0) {
      console.debug('TaskManager initial status delay', {
        taskId: this.taskId,
        delay: this.initialStatusDelay,
      });
      await this.sleep(this.initialStatusDelay);
    }

    let status: TaskStatus | undefined;
    let retries = 0;

    while (true) {
      try {
        status = await this.client.getTaskStatus(this.taskId);

        console.debug('TaskManager initial status fetch', {
          taskId: this.taskId,
          status: status?.status,
          rawStatus: status,
        });

        if (retries > 0) {
          console.debug('TaskManager initial status recovered after retries', {
            taskId: this.taskId,
            retries,
          });
        }

        break;
      } catch (error) {
        const isRetryable404 =
          error instanceof HttpError &&
          error.statusCode === 404 &&
          retries < this.initialStatusRetryAttempts;

        if (!isRetryable404) {
          throw error;
        }

        retries += 1;
        const retryDelay = this.initialStatusRetryInterval * retries;

        console.debug('TaskManager initial status retry after 404', {
          taskId: this.taskId,
          attempt: retries,
          retryDelay,
        });

        await this.sleep(retryDelay);
      }
    }

    if (!status) {
      throw new Error(`Unable to determine initial status for task ${this.taskId}`);
    }

    while (true) {
      if (Date.now() - startTime > this.timeout) {
        throw new Error(
          `Task ${this.taskId} timed out after ${this.timeout}ms`
        );
      }

      // Extract the actual status string from the response
      // The API may return a single status object or the status field directly
      const currentStatus = this.extractStatus(status);

      console.debug('TaskManager evaluating status', {
        taskId: this.taskId,
        status: currentStatus,
        rawStatus: status,
      });

      if (currentStatus && TERMINAL_SUCCESS_STATUSES.has(currentStatus)) {
        console.debug('TaskManager observed terminal success status', {
          taskId: this.taskId,
          status: currentStatus,
        });
        // Fetch full task details on completion
        return await this.client.getTask(this.taskId);
      }

      if (currentStatus && TERMINAL_FAILURE_STATUSES.has(currentStatus)) {
        console.debug('TaskManager observed failure status', {
          taskId: this.taskId,
          status: currentStatus,
          rawStatus: status,
        });

        let failedTask: Task | undefined;
        try {
          failedTask = await this.client.getTask(this.taskId);
        } catch {
          // Ignore errors while fetching full task details; fall back to status payload.
        }

        // When status is an array or SSE string, find the failed item to extract error message
        let statusPayload: unknown = status;
        
        if (typeof statusPayload === 'string' && statusPayload.includes('data:')) {
          // Parse SSE data to find the failed item
          const lines = statusPayload.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data:')) {
              const jsonStr = trimmed.substring(5).trim();
              if (jsonStr) {
                try {
                  const parsed = JSON.parse(jsonStr);
                  if (parsed && typeof parsed === 'object' &&
                      typeof parsed.status === 'string' &&
                      TERMINAL_FAILURE_STATUSES.has(parsed.status)) {
                    statusPayload = parsed;
                    break;
                  }
                } catch (e) {
                  // Continue to next line
                }
              }
            }
          }
        } else if (Array.isArray(statusPayload)) {
          const failedItem = statusPayload.find((item: any) =>
            item && typeof item === 'object' &&
            typeof item.status === 'string' &&
            TERMINAL_FAILURE_STATUSES.has(item.status)
          );
          if (failedItem) {
            statusPayload = failedItem;
          }
        }

        const failureReason =
          this.extractErrorMessage(failedTask) ??
          this.extractErrorMessage(statusPayload) ??
          'Unknown error';

        throw new Error(
          `Task failed with status ${failedTask?.status ?? currentStatus}: ${failureReason}`
        );
      }

      // Wait for the next poll interval before checking again
      await this.sleep(this.pollInterval);

      if (Date.now() - startTime > this.timeout) {
        throw new Error(
          `Task ${this.taskId} timed out after ${this.timeout}ms`
        );
      }

      status = await this.client.getTaskStatus(this.taskId);

      console.debug('TaskManager polled status update', {
        taskId: this.taskId,
        status: this.extractStatus(status),
        rawStatus: status,
      });
    }
  }

  /**
   * Wait for download task completion using Server-Sent Events (SSE)
   *
   * This method provides real-time monitoring of download task status via SSE,
   * which is more efficient than polling. It listens for the `sdk:completed` event
   * to detect task completion, and handles error events appropriately.
   *
   * @returns Promise resolving when the task completes successfully
   * @throws {Error} If the task fails or the connection closes unexpectedly
   *
   * @example
   * ```typescript
   * const taskManager = new TaskManager(client, 'task-123');
   *
   * try {
   *   await taskManager.waitForDownloadCompletion();
   *   console.log('Download task completed successfully');
   * } catch (error) {
   *   console.error('Download task failed:', error.message);
   * }
   * ```
   */
  async waitForDownloadCompletion(): Promise<void> {
    return new Promise((resolve, reject) => {
      const eventSource = this.client.watchDownloadTask(this.taskId);
      let settled = false;

      const finalize = (onSettle: () => void) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeoutId);
        eventSource.close();
        onSettle();
      };

      const timeoutId = setTimeout(() => {
        finalize(() => {
          reject(
            new Error(
              `Download task ${this.taskId} timed out after ${this.timeout}ms`
            )
          );
        });
      }, this.timeout);

      const handleSuccess = (status: string, event: unknown) => {
        finalize(() => {
          console.debug('Download task completed', {
            taskId: this.taskId,
            status,
            payload: this.parseEventPayload(event),
          });
          resolve();
        });
      };

      const handleFailure = async (status: string, event: unknown) => {
        if (settled) {
          return;
        }

        let failureStatus = status;
        let failureReason =
          this.extractErrorMessage(this.parseEventPayload(event)) ?? 'Unknown error';

        try {
          const failedTask = await this.client.getTask(this.taskId);
          failureStatus = failedTask?.status ?? failureStatus;
          failureReason =
            this.extractErrorMessage(failedTask) ??
            failureReason;
        } catch {
          // Ignore secondary errors when fetching task details.
        }

        finalize(() => {
          reject(
            new Error(
              `Download task ${this.taskId} failed with status ${failureStatus}: ${failureReason}`
            )
          );
        });
      };

      const attachListeners = (
        statuses: Set<string>,
        listener: (status: string, event: unknown) => void
      ) => {
        for (const status of statuses) {
          eventSource.addEventListener(status, (event) => {
            listener(status, event);
          });
        }
      };

      attachListeners(TERMINAL_SUCCESS_STATUSES, (status, event) => {
        handleSuccess(status, event);
      });

      attachListeners(TERMINAL_FAILURE_STATUSES, (status, event) => {
        void handleFailure(status, event);
      });

      eventSource.addEventListener('error', (event) => {
        if (eventSource.readyState === EventSource.CLOSED) {
          finalize(() => {
            reject(
              new Error(
                `Download task ${this.taskId} connection closed unexpectedly`
              )
            );
          });
          return;
        }

        void handleFailure('error', event);
      });
    });
  }

  private parseEventPayload(event: unknown): unknown {
    if (!event || typeof event !== 'object') {
      return undefined;
    }

    const data = (event as { data?: unknown }).data;

    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    }

    return data;
  }

  /**
   * Extract status string from the API response
   *
   * The API may return different response structures:
   * - Simple object with status field: { status: "sdk:failed" }
   * - Array of status updates: [{ status: "sdk:failed", ... }]
   * - Raw SSE format string with multiple "data:" lines
   * - Status directly as string
   *
   * @param value - The API response value
   * @returns The status string, or undefined if not found
   */
  private extractStatus(value: unknown): string | undefined {
    if (typeof value === 'string') {
      // Check if this is raw SSE data (contains "data:" prefix)
      if (value.includes('data:')) {
        return this.parseSSEData(value);
      }
      return value;
    }

    if (!value || typeof value !== 'object') {
      return undefined;
    }

    // Handle array of status updates - find the most recent or any terminal status
    if (Array.isArray(value)) {
      // First, look for any terminal status (success or failure)
      for (const item of value) {
        const status = this.extractStatus(item);
        if (status && (TERMINAL_SUCCESS_STATUSES.has(status) || TERMINAL_FAILURE_STATUSES.has(status))) {
          return status;
        }
      }
      
      // If no terminal status found, return the last status in the array
      if (value.length > 0) {
        return this.extractStatus(value[value.length - 1]);
      }
      
      return undefined;
    }

    // Handle object with status field
    const obj = value as { status?: unknown };
    if ('status' in obj && typeof obj.status === 'string') {
      return obj.status;
    }

    return undefined;
  }

  /**
   * Parse SSE (Server-Sent Events) formatted data
   *
   * SSE format is:
   * data: {"status": "sdk:started", ...}
   *
   * data: {"status": "sdk:failed", ...}
   *
   * @param sseData - Raw SSE formatted string
   * @returns The extracted status string, or undefined
   */
  private parseSSEData(sseData: string): string | undefined {
    const lines = sseData.split('\n');
    const statusObjects: Array<{ status?: string; data?: any }> = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('data:')) {
        const jsonStr = trimmed.substring(5).trim();
        if (jsonStr) {
          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed && typeof parsed === 'object') {
              statusObjects.push(parsed);
            }
          } catch (e) {
            console.warn('Failed to parse SSE data line:', jsonStr, e);
          }
        }
      }
    }

    // First, look for any terminal status (success or failure)
    for (const obj of statusObjects) {
      if (obj.status && (TERMINAL_SUCCESS_STATUSES.has(obj.status) || TERMINAL_FAILURE_STATUSES.has(obj.status))) {
        return obj.status;
      }
    }

    // If no terminal status found, return the last status
    if (statusObjects.length > 0) {
      const lastObj = statusObjects[statusObjects.length - 1];
      return lastObj.status;
    }

    return undefined;
  }

  private extractErrorMessage(value: unknown): string | undefined {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }

    if (!value || typeof value !== 'object') {
      return undefined;
    }

    const candidate = value as {
      data?: unknown;
      error?: unknown;
      message?: unknown;
    };

    if (candidate.data && typeof candidate.data === 'object') {
      const nested = candidate.data as {
        error?: unknown;
        message?: unknown;
      };

      if (typeof nested.error === 'string' && nested.error.trim()) {
        return nested.error.trim();
      }

      if (typeof nested.message === 'string' && nested.message.trim()) {
        return nested.message.trim();
      }
    }

    if (typeof candidate.error === 'string' && candidate.error.trim()) {
      return candidate.error.trim();
    }

    if (typeof candidate.message === 'string' && candidate.message.trim()) {
      return candidate.message.trim();
    }

    return undefined;
  }

  /**
   * Sleep for a specified duration
   *
   * @param ms - Duration in milliseconds
   * @returns Promise that resolves after the specified duration
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}