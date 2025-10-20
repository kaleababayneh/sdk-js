import { beforeEach, describe, expect, it, vi } from "vitest";
import { RestActionQuery, RestSupernodeQuery } from "src/blockchain/rest";

const HttpClientMock = vi.hoisted(() =>
  vi.fn(() => ({
    get: vi.fn(),
  }))
);

vi.mock("src/internal/http", () => ({
  HttpClient: HttpClientMock,
}));

const createActionQuery = () => {
  const query = new RestActionQuery("https://lcd.testnet");
  const instance = HttpClientMock.mock.results.at(-1)?.value as { get: ReturnType<typeof vi.fn> } | undefined;
  if (!instance) {
    throw new Error("HttpClient mock was not invoked for RestActionQuery");
  }
  return { query, httpGet: instance.get };
};

const createSupernodeQuery = () => {
  const query = new RestSupernodeQuery("https://lcd.testnet");
  const instance = HttpClientMock.mock.results.at(-1)?.value as { get: ReturnType<typeof vi.fn> } | undefined;
  if (!instance) {
    throw new Error("HttpClient mock was not invoked for RestSupernodeQuery");
  }
  return { query, httpGet: instance.get };
};

describe("RestActionQuery", () => {
  beforeEach(() => {
    HttpClientMock.mockReset();
    HttpClientMock.mockImplementation(() => ({
      get: vi.fn(),
    }));
  });

  it("constructs HttpClient with lcd base URL and default config", () => {
    const { query } = createActionQuery();
    expect(query).toBeDefined();
    expect(HttpClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        baseUrl: "https://lcd.testnet",
        timeout: 10000,
      })
    );
  });

  it("parses params response with defaults", async () => {
    const { query, httpGet } = createActionQuery();
    httpGet.mockResolvedValue({
      params: { rq_ids_max: "500", fee_base: "10", fee_per_kb: "5" },
    });

    const params = await query.getParams();

    expect(httpGet).toHaveBeenCalledWith("/lumera/action/v1/params");
    expect(params).toEqual({
      rq_ids_max: 500,
      fee_base: "10",
      fee_per_kb: "5",
    });

    console.debug("action params instrumentation", { params, calls: httpGet.mock.calls.length });
  });

  it("applies fallback defaults when LCD omits fields", async () => {
    const { query, httpGet } = createActionQuery();
    httpGet.mockResolvedValue({});

    const params = await query.getParams();

    expect(params).toEqual({
      rq_ids_max: 100,
      fee_base: "0",
      fee_per_kb: "0",
    });

    console.debug("action params fallback", { params, calls: httpGet.mock.calls.length });
  });

  it("maps getAction response to ActionRecord shape", async () => {
    const { query, httpGet } = createActionQuery();
    httpGet.mockResolvedValue({
      action: { id: "abc", status: "completed", metadata: { foo: "bar" } },
    });

    const action = await query.getAction("abc");

    expect(httpGet).toHaveBeenCalledWith("/lumera/action/v1/action/abc");
    expect(action).toEqual({
      id: "abc",
      status: "completed",
      metadata: { foo: "bar" },
    });

    console.debug("action retrieval instrumentation", { action, calls: httpGet.mock.calls.length });
  });
});

describe("RestSupernodeQuery", () => {
  beforeEach(() => {
    HttpClientMock.mockReset();
    HttpClientMock.mockImplementation(() => ({
      get: vi.fn(),
    }));
  });

  it("fetches supernode params via HttpClient", async () => {
    const { query, httpGet } = createSupernodeQuery();
    httpGet.mockResolvedValue({
      params: { foo: "bar" },
    });

    const params = await query.getParams();

    expect(httpGet).toHaveBeenCalledWith("/lumera/supernode/v1/params");
    expect(params).toEqual({ foo: "bar" });

    console.debug("supernode params instrumentation", { params, calls: httpGet.mock.calls.length });
  });

  it("returns empty object when params missing", async () => {
    const { query, httpGet } = createSupernodeQuery();
    httpGet.mockResolvedValue({});

    const params = await query.getParams();

    expect(params).toEqual({});

    console.debug("supernode params fallback", { params, calls: httpGet.mock.calls.length });
  });
});