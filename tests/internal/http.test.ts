import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpClient, HttpError, type HttpClientConfig } from "src/internal/http";

const BASE_URL = "https://api.example.com";

function createClient(config: Partial<HttpClientConfig> = {}): HttpClient {
  return new HttpClient({
    baseUrl: BASE_URL,
    headers: { "X-Default": "true" },
    ...config,
  });
}

function createJsonResponse(
  data: unknown,
  init: ResponseInit = {}
): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(init.headers ?? {})),
    },
    ...init,
  });
}

describe("HttpClient", () => {
  let originalFetch: typeof fetch | undefined;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    fetchMock = vi.fn();
    Object.defineProperty(globalThis, "fetch", {
      value: fetchMock,
      writable: true,
      configurable: true,
    });
    if (typeof window !== "undefined") {
      Object.defineProperty(window, "fetch", {
        value: fetchMock,
        writable: true,
        configurable: true,
      });
    }
  });

  it("performs GET requests with query params and merges default headers", async () => {
    fetchMock.mockImplementation(async (input, init) => {
      expect(input).toBe(
        "https://api.example.com/resource?foo=bar&baz=1"
      );
      expect(init?.method).toBe("GET");
      expect(init?.headers).toMatchObject({
        "X-Default": "true",
        "X-Custom": "custom",
      });
      return createJsonResponse({ ok: true });
    });

    const client = createClient();
    const result = await client.get<{ ok: boolean }>("/resource", {
      params: { foo: "bar", baz: 1 },
      headers: { "X-Custom": "custom" },
    });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries on network errors with exponential backoff", async () => {
    const client = createClient({
      retry: { maxAttempts: 3, initialDelay: 25, backoffMultiplier: 2 },
    });

    const sleepSpy = vi
      .spyOn(HttpClient.prototype as unknown as { sleep(ms: number): Promise<void> }, "sleep")
      .mockResolvedValue();

    fetchMock
      .mockRejectedValueOnce(new TypeError("network down"))
      .mockResolvedValueOnce(createJsonResponse({ ok: true }));

    const result = await client.get<{ ok: boolean }>("/unstable");

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(sleepSpy).toHaveBeenCalledTimes(1);
    expect(sleepSpy).toHaveBeenCalledWith(25);
  });

  it("stops retrying on non-retryable HTTP errors", async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse(
        { error: "bad request" },
        { status: 400, statusText: "Bad Request" }
      )
    );

    const client = createClient();

    await expect(client.get("/bad")).rejects.toBeInstanceOf(HttpError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("exhausts retries for retryable HTTP errors and exposes response body", async () => {
    const errorBody = { error: "unavailable" };
    fetchMock.mockImplementation(() =>
      createJsonResponse(errorBody, { status: 503, statusText: "Service Unavailable" })
    );

    const client = createClient({
      retry: { maxAttempts: 2, initialDelay: 1 },
    });

    const sleepSpy = vi
      .spyOn(HttpClient.prototype as unknown as { sleep(ms: number): Promise<void> }, "sleep")
      .mockResolvedValue();

    await expect(client.get("/flaky")).rejects.toMatchObject({
      message: "HTTP 503: Service Unavailable",
      responseBody: errorBody,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(sleepSpy).toHaveBeenCalledTimes(1);
  });

  it("respects noRetry option and propagates original error", async () => {
    const networkError = new TypeError("socket closed");
    fetchMock.mockRejectedValue(networkError);

    const client = createClient();

    await expect(
      client.get("/no-retry", { noRetry: true })
    ).rejects.toMatchObject({
      message: "Network error: socket closed",
      statusCode: 0,
      retryable: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("aborts requests on timeout and raises HttpError", async () => {
    vi.useFakeTimers();

    fetchMock.mockImplementation((_, init) => {
      return new Promise<Response>((_, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    const client = createClient({
      timeout: 50,
      retry: { maxAttempts: 1 },
    });

    const promise = client.get("/timeout");
    await vi.advanceTimersByTimeAsync(51);

    await expect(promise).rejects.toMatchObject({
      message: "Request timeout after 50ms",
      retryable: true,
      statusCode: 0,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sets JSON body and default headers for POST requests", async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse({ created: true }, { status: 201 })
    );

    const client = createClient();

    const payload = { foo: "bar" };
    const result = await client.post("/items", payload);

    expect(result).toEqual({ created: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/items",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Default": "true",
        }),
        body: JSON.stringify(payload),
      })
    );
  });

  it("parses non-JSON error bodies gracefully", async () => {
    fetchMock.mockResolvedValue(
      new Response("Plain failure", {
        status: 502,
        statusText: "Bad Gateway",
        headers: { "content-type": "text/plain" },
      })
    );

    const client = createClient({
      retry: { maxAttempts: 1 },
    });

    await expect(client.get("/text-error")).rejects.toMatchObject({
      message: "HTTP 502: Bad Gateway",
      responseBody: "Plain failure",
    });
  });

  afterEach(() => {
    if (typeof window !== "undefined" && originalFetch !== undefined) {
      Object.defineProperty(window, "fetch", {
        value: originalFetch,
        writable: true,
        configurable: true,
      });
    }
    Object.defineProperty(globalThis, "fetch", {
      value: originalFetch,
      writable: true,
      configurable: true,
    });
  });
});