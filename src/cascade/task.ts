import type { SNApiClient, Task, TaskStatus } from './client';

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

    while (true) {
      // Check if we've exceeded the timeout
      if (Date.now() - startTime > this.timeout) {
        throw new Error(
          `Task ${this.taskId} timed out after ${this.timeout}ms`
        );
      }

      // Get current task status
      const status = await this.client.getTaskStatus(this.taskId);

      // Check if task has reached a terminal state
      if (status.status === 'completed') {
        // Fetch full task details on completion
        return await this.client.getTask(this.taskId);
      }

      if (status.status === 'failed') {
        // Construct context-rich error message
        const errorMessage = (status as any).error || (status as any).message || 'Unknown error';
        throw new Error(
          `Task ${this.taskId} failed: ${errorMessage}`
        );
      }

      // Wait for the next poll interval before checking again
      await this.sleep(this.pollInterval);
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
      
      // Set up timeout
      const timeoutId = setTimeout(() => {
        eventSource.close();
        reject(new Error(
          `Download task ${this.taskId} timed out after ${this.timeout}ms`
        ));
      }, this.timeout);

      // Listen for completion event
      eventSource.addEventListener('sdk:completed', (event) => {
        clearTimeout(timeoutId);
        eventSource.close();
        console.debug('Download task completed:', this.taskId);
        resolve();
      });

      // Listen for error events
      eventSource.addEventListener('error', (event) => {
        clearTimeout(timeoutId);
        eventSource.close();
        
        // Check if this is a connection error or a task error
        const errorMessage = (event as any).data
          ? JSON.parse((event as any).data).message || 'Unknown error'
          : 'Connection error or stream closed';
        
        reject(new Error(
          `Download task ${this.taskId} failed: ${errorMessage}`
        ));
      });

      // Handle generic EventSource errors (connection issues)
      eventSource.onerror = (event) => {
        // Only handle if not already closed
        if (eventSource.readyState === EventSource.CLOSED) {
          clearTimeout(timeoutId);
          reject(new Error(
            `Download task ${this.taskId} connection closed unexpectedly`
          ));
        }
      };
    });
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