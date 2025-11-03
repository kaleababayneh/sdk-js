/**
 * Platform-agnostic HTTP client for the Internal Layer.
 * Supports Node.js (undici) and browser (native fetch) environments.
 * 
 * Features:
 * - Automatic retries with exponential backoff
 * - Configurable timeouts via AbortController
 * - Keep-alive connections (via undici in Node.js)
 * - Context-rich error handling
 * - JSON request/response handling
 * 
 * @module internal/http
 */

/**
 * HTTP client configuration options
 */
export interface HttpClientConfig {
  /** Base URL for all requests */
  baseUrl: string;
  /** Default headers to include in all requests */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Retry configuration */
  retry?: RetryConfig;
}

/**
 * Retry configuration options
 */
export interface RetryConfig {
  /** Maximum number of retry attempts (default: 3) */
  maxAttempts?: number;
  /** Initial delay in milliseconds before first retry (default: 1000) */
  initialDelay?: number;
  /** Maximum delay in milliseconds between retries (default: 30000) */
  maxDelay?: number;
  /** Backoff multiplier for exponential backoff (default: 2) */
  backoffMultiplier?: number;
  /** HTTP status codes that should trigger a retry (default: [408, 429, 500, 502, 503, 504]) */
  retryableStatusCodes?: number[];
}

/**
 * HTTP error with context information
 * 
 * Provides detailed error information including HTTP status, endpoint,
 * and whether the error is retryable.
 */
export class HttpError extends Error {
  /**
   * Create a new HttpError
   * 
   * @param message - Error message
   * @param statusCode - HTTP status code (0 for network/timeout errors)
   * @param endpoint - The endpoint that failed
   * @param retryable - Whether this error should trigger a retry
   * @param responseBody - Optional response body for debugging
   */
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
    public readonly retryable: boolean,
    public readonly responseBody?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/**
 * Request options for individual HTTP requests
 */
export interface RequestOptions {
  /** Query parameters to append to the URL */
  params?: Record<string, string | number | boolean>;
  /** Additional headers (merged with default headers) */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds (overrides default) */
  timeout?: number;
  /** Disable automatic retries for this request */
  noRetry?: boolean;
  /** External AbortSignal to cancel the request */
  signal?: AbortSignal;
}

/**
 * Platform-agnostic HTTP client with automatic retries, timeouts, and exponential backoff.
 *
 * Uses undici's fetch in Node.js for keep-alive connection pooling,
 * and native fetch API in browsers.
 *
 * @example
 * ```typescript
 * const client = new HttpClient({
 *   baseUrl: 'https://api.example.com',
 *   headers: { 'Authorization': 'Bearer token' },
 *   timeout: 10000,
 *   retry: {
 *     maxAttempts: 3,
 *     initialDelay: 1000,
 *   }
 * });
 *
 * // Make a GET request
 * const data = await client.get('/users/123');
 *
 * // Make a POST request
 * const result = await client.post('/users', { name: 'John' });
 * ```
 */
type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

interface RetryPolicyConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableStatusCodes: number[];
}

interface HttpClientResolvedConfig {
  baseUrl: string;
  headers: Record<string, string>;
  timeout: number;
  retry: RetryPolicyConfig;
}

export class HttpClient {
  private readonly config: HttpClientResolvedConfig;
  private fetchImpl?: FetchFn;

  /**
   * Create a new HttpClient
   *
   * @param config - HTTP client configuration
   */
  constructor(config: HttpClientConfig) {
    this.config = {
      baseUrl: config.baseUrl,
      headers: { ...(config.headers ?? {}) },
      timeout: config.timeout ?? 30000,
      retry: {
        maxAttempts: config.retry?.maxAttempts ?? 3,
        initialDelay: config.retry?.initialDelay ?? 1000,
        maxDelay: config.retry?.maxDelay ?? 30000,
        backoffMultiplier: config.retry?.backoffMultiplier ?? 2,
        retryableStatusCodes: config.retry?.retryableStatusCodes ?? [408, 429, 500, 502, 503, 504],
      },
    };
  }

  /**
   * Get the base URL for this client
   *
   * @returns The base URL
   */
  get baseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Get the fetch implementation (lazy initialization)
   * Uses undici in Node.js, native fetch in browsers
   */
  private async getFetch(): Promise<FetchFn> {
    if (this.fetchImpl) {
      return this.fetchImpl;
    }

    const isBrowser = typeof window !== "undefined" && typeof window.fetch === "function";

    if (isBrowser) {
      this.fetchImpl = window.fetch.bind(window);
      console.debug("[HttpClient] using browser fetch implementation");
    } else {
      const { fetch: undiciFetch } = await import("undici");
      this.fetchImpl = (async (input, init) => {
        const response = await undiciFetch(input as any, init as any);
        return response as unknown as Response;
      }) as FetchFn;
      console.debug("[HttpClient] using undici fetch implementation");
    }

    return this.fetchImpl;
  }

  /**
   * Perform a GET request
   * 
   * @param path - Request path (relative to baseUrl)
   * @param options - Request options
   * @returns Response data
   * @throws {HttpError} If the request fails
   */
  async get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  /**
   * Perform a POST request
   * 
   * @param path - Request path (relative to baseUrl)
   * @param body - Request body (will be JSON stringified)
   * @param options - Request options
   * @returns Response data
   * @throws {HttpError} If the request fails
   */
  async post<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, body, options);
  }

  /**
   * Perform a PUT request
   * 
   * @param path - Request path (relative to baseUrl)
   * @param body - Request body (will be JSON stringified)
   * @param options - Request options
   * @returns Response data
   * @throws {HttpError} If the request fails
   */
  async put<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, body, options);
  }

  /**
   * Perform a DELETE request
   * 
   * @param path - Request path (relative to baseUrl)
   * @param options - Request options
   * @returns Response data
   * @throws {HttpError} If the request fails
   */
  async delete<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  /**
   * Perform a PATCH request
   * 
   * @param path - Request path (relative to baseUrl)
   * @param body - Request body (will be JSON stringified)
   * @param options - Request options
   * @returns Response data
   * @throws {HttpError} If the request fails
   */
  async patch<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, body, options);
  }

  /**
   * Perform an HTTP request with streaming response support
   *
   * Returns the raw Response object for streaming or custom handling.
   * The caller is responsible for reading and closing the response body.
   *
   * @param method - HTTP method
   * @param path - Request path
   * @param body - Request body
   * @param options - Request options
   * @returns Raw Response object
   * @throws {HttpError} If the request fails
   */
  async requestRaw(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<Response> {
    const url = this.buildUrl(path, options?.params);
    const headers = { ...this.config.headers, ...options?.headers };
    const timeout = options?.timeout ?? this.config.timeout;
    const noRetry = options?.noRetry ?? false;

    // Prepare body and set Content-Type if needed
    let requestBody: BodyInit | undefined;
    if (body !== undefined) {
      if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer || body instanceof URLSearchParams) {
        // For FormData, Blob, ArrayBuffer, URLSearchParams, pass through directly
        // The browser/fetch will set the correct Content-Type automatically
        requestBody = body as BodyInit;
      } else if (body instanceof Uint8Array) {
        // Convert Uint8Array to Blob for compatibility
        // Create a new Uint8Array copy to ensure it's backed by ArrayBuffer
        const copy = new Uint8Array(body);
        requestBody = new Blob([copy.buffer]);
      } else if (typeof body === 'string') {
        requestBody = body;
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'text/plain';
        }
      } else {
        // For plain objects, JSON stringify
        requestBody = JSON.stringify(body);
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json';
        }
      }
    }

    const makeRequest = async (signal: AbortSignal): Promise<Response> => {
      const fetchFn = await this.getFetch();
      return fetchFn(url, {
        method,
        headers,
        body: requestBody,
        signal,
      });
    };

    if (noRetry) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      if (options?.signal) {
        options.signal.addEventListener('abort', () => controller.abort(), { once: true });
      }

      try {
        const response = await makeRequest(controller.signal);
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          let errorBody: unknown;
          try {
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
              errorBody = await response.json();
            } else {
              errorBody = await response.text();
            }
          } catch {
            errorBody = undefined;
          }
          
          const isRetryable = this.config.retry.retryableStatusCodes.includes(response.status);
          throw new HttpError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            url,
            isRetryable,
            errorBody
          );
        }
        
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (controller.signal.aborted) {
          if (options?.signal?.aborted) {
            throw new HttpError('Request cancelled', 0, url, false);
          }
          throw new HttpError(`Request timeout after ${timeout}ms`, 0, url, true);
        }
        
        if (error instanceof Error && error.name === 'TypeError') {
          throw new HttpError(`Network error: ${error.message}`, 0, url, true);
        }
        
        throw error;
      }
    } else {
      // For retry logic with raw responses, we need to handle it carefully
      // as the response body can only be read once
      throw new Error('Retry is not supported for raw/streaming requests. Use noRetry: true option.');
    }
  }

  /**
   * Perform an HTTP request
   *
   * @param method - HTTP method
   * @param path - Request path
   * @param body - Request body
   * @param options - Request options
   * @returns Response data
   */
  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const headers = { ...this.config.headers, ...options?.headers };
    const timeout = options?.timeout ?? this.config.timeout;
    const noRetry = options?.noRetry ?? false;

    // Prepare body and set Content-Type if needed
    let requestBody: BodyInit | undefined;
    if (body !== undefined) {
      if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer || body instanceof URLSearchParams) {
        // For FormData, Blob, ArrayBuffer, URLSearchParams, pass through directly
        // The browser/fetch will set the correct Content-Type automatically
        requestBody = body as BodyInit;
      } else if (body instanceof Uint8Array) {
        // Convert Uint8Array to Blob for compatibility
        // Create a new Uint8Array copy to ensure it's backed by ArrayBuffer
        const copy = new Uint8Array(body);
        requestBody = new Blob([copy.buffer]);
      } else if (typeof body === 'string') {
        requestBody = body;
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'text/plain';
        }
      } else {
        // For plain objects, JSON stringify
        requestBody = JSON.stringify(body);
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json';
        }
      }
    }

    const makeRequest = async (signal: AbortSignal): Promise<Response> => {
      const fetchFn = await this.getFetch();
      return fetchFn(url, {
        method,
        headers,
        body: requestBody,
        signal,
      });
    };

    if (noRetry) {
      return this.executeWithTimeout(makeRequest, url, timeout, options?.signal);
    } else {
      return this.executeWithRetry(makeRequest, url, timeout, options?.signal);
    }
  }

  /**
   * Execute a request with timeout support
   * 
   * @param makeRequest - Function that performs the request
   * @param url - Request URL
   * @param timeout - Timeout in milliseconds
   * @param externalSignal - External abort signal
   * @returns Response data
   */
  private async executeWithTimeout<T>(
    makeRequest: (signal: AbortSignal) => Promise<Response>,
    url: string,
    timeout: number,
    externalSignal?: AbortSignal
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // If external signal is provided, abort when it aborts
    if (externalSignal) {
      externalSignal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    try {
      const response = await makeRequest(controller.signal);
      clearTimeout(timeoutId);
      return this.handleResponse<T>(response, url);
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Check if request was aborted due to timeout or external signal
      if (controller.signal.aborted) {
        if (externalSignal?.aborted) {
          throw new HttpError('Request cancelled', 0, url, false);
        }
        throw new HttpError(`Request timeout after ${timeout}ms`, 0, url, true);
      }
      
      // Network errors are retryable
      if (error instanceof Error && error.name === 'TypeError') {
        throw new HttpError(`Network error: ${error.message}`, 0, url, true);
      }
      
      throw error;
    }
  }

  /**
   * Execute a request with retry logic and exponential backoff
   * 
   * @param makeRequest - Function that performs the request
   * @param url - Request URL
   * @param timeout - Timeout in milliseconds
   * @param externalSignal - External abort signal
   * @returns Response data
   */
  private async executeWithRetry<T>(
    makeRequest: (signal: AbortSignal) => Promise<Response>,
    url: string,
    timeout: number,
    externalSignal?: AbortSignal
  ): Promise<T> {
    let attempt = 0;
    let lastError: Error | undefined;

    while (attempt < this.config.retry.maxAttempts) {
      attempt++;

      try {
        return await this.executeWithTimeout(makeRequest, url, timeout, externalSignal);
      } catch (error) {
        lastError = error as Error;

        // Don't retry if error is not retryable
        if (error instanceof HttpError && !error.retryable) {
          throw error;
        }

        // Don't retry if external signal is aborted
        if (externalSignal?.aborted) {
          throw error;
        }

        // If this was the last attempt, throw
        if (attempt >= this.config.retry.maxAttempts) {
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          this.config.retry.initialDelay * Math.pow(this.config.retry.backoffMultiplier, attempt - 1),
          this.config.retry.maxDelay
        );

        // Wait before retrying
        await this.sleep(delay);
      }
    }

    if (lastError) {
      throw lastError;
    }

    throw new Error("Request failed after retries without error details");
  }

  /**
   * Handle HTTP response and parse body
   * 
   * @param response - Fetch Response object
   * @param url - Request URL
   * @returns Parsed response data
   */
  private async handleResponse<T>(response: Response, url: string): Promise<T> {
    console.debug("[HttpClient] handleResponse", {
      url,
      status: response.status,
      ok: response.ok,
      contentLength: response.headers.get("content-length"),
    });

    const isRetryable = this.config.retry.retryableStatusCodes.includes(response.status);

    if (!response.ok) {
      let errorBody: unknown;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          errorBody = await response.json();
        } else {
          errorBody = await response.text();
        }
      } catch {
        // Failed to parse error body
        errorBody = undefined;
      }

      throw new HttpError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        url,
        isRetryable,
        errorBody
      );
    }

    // Handle empty responses (204 No Content, etc.)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    // For non-JSON responses, return as text
    return response.text() as T;
  }

  /**
   * Build full URL from path and query parameters
   * 
   * @param path - Request path
   * @param params - Query parameters
   * @returns Full URL
   */
  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(path, this.config.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  /**
   * Sleep for a specified duration
   * 
   * @param ms - Duration in milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}