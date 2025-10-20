import { afterEach, beforeEach, vi } from "vitest";

declare global {
  // Extend global scope for tests that rely on browser APIs
  interface GlobalFetch extends typeof fetch {}
  // Provide DOM-like atob/btoa where necessary (happy-dom already supplies, but ensure)
  // eslint-disable-next-line no-var
  var fetch: GlobalFetch;
  // eslint-disable-next-line no-var
  var Response: typeof globalThis.Response;
  // eslint-disable-next-line no-var
  var Request: typeof globalThis.Request;
  // eslint-disable-next-line no-var
  var FormData: typeof globalThis.FormData;
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllTimers();
  vi.clearAllMocks();
});