# Lumera SDK Testing & Mocking Strategy

## Framework & Coverage Targets
- Test runner: Vitest (`npm run test` / `npm run dev` for watch mode).
- Coverage threshold: ≥ 80% lines/branches/functions using Vitest's built-in coverage (`vitest run --coverage`).
- Test layout: mirror source tree under `tests/`, using `*.test.ts` for unit tests and `*.spec.ts` for integration flows.

## Cross-Cutting Test Utilities
- Create shared test helpers in `tests/utils/`:
  - HTTP mocks that simulate fetch/undici responses with programmable delays, aborts, and errors.
  - Queue-based mock for `SNApiClient` and LCD/RPC endpoints.
  - Stub implementations for `SigningStargateClient` exposing spyable `simulate`, `broadcastTx`, and `signAndBroadcast`.
  - WasmBridge shim that captures `init` calls and exposes deterministic layout outputs.
- Enable fake timers (`vi.useFakeTimers()`) where retry/polling logic relies on timeouts.
- Use `vi.restoreAllMocks()` / `vi.resetModules()` between tests to preserve isolation.

## Diagnostic Logging via Spies
- [`HttpClient.executeWithRetry()`](src/internal/http.ts:320): `vi.spyOn(HttpClient.prototype, "sleep")` to log retry backoff intervals; wrap fetch mock to record attempts and emitted errors.
- [`TaskManager.waitForCompletion()`](src/cascade/task.ts:88): inject spy on private `sleep` helper via prototype override to count poll iterations and capture timeout boundaries.
- Emit structured `console.info` entries inside mocks (suppressed in assertions) when retries/polls occur; assert against snapshot of attempt metadata to validate behaviour.

## Layer-Specific Plans

### Internal Layer
- **HttpClient unit tests** (`tests/internal/http.test.ts`):
  - Mock fetch success/failure paths, verify headers, JSON handling, retry aborts, timeout propagation, and noRetry option.
  - Use fake timers to trigger timeout aborts, confirm `HttpError` metadata (status, endpoint, retryable).
- **Encoding utilities** (`tests/internal/encoding.test.ts`):
  - Golden-vector tests covering nested object canonicalization, arrays, strings, null/undefined handling.
  - Round-trip Base64 encode/decode across Node and simulated browser (`globalThis.atob/btoa`) contexts.
- **Hash utilities** (`tests/internal/hash.test.ts`):
  - Deterministic hashes against known vectors (hex/bytes) using small fixtures.
  - Stream hashing: create `ReadableStream` shim with enqueued chunks to validate incremental updates.

### WASM Layer
- **LEP-1 helpers unit tests** (`tests/wasm/lep1.test.ts`):
  - Mock [`WasmBridge.getInstance()`](src/wasm/bridge.ts:76) to return stub module; verify layout ID derivation, index_file validation errors, Base64 canonical bytes.
  - Introduce golden fixtures for `deriveLayoutIds` wrap-around (rq_ids_ic + N > rq_ids_max).
- **WasmBridge integration spec** (`tests/wasm/bridge.spec.ts`):
  - Use dynamic import mock (`vi.mock("rq-wasm", ...)`) to assert lazy initialization, single-flight `init`, error reset on failure, and `resetInstance()` cleanup.
  - Confirm `isInitialized()` reflects state transitions.

### Blockchain Layer
- **REST query clients** (`tests/blockchain/rest.test.ts`):
  - Mock underlying [`HttpClient.get`](src/internal/http.ts:167) to ensure correct LCD paths, param parsing (`getParams`, `getAction`).
  - Validate fallback defaults when LCD omits fields.
- **CosmjsTxClient unit tests** (`tests/blockchain/cosmjs.test.ts`):
  - Provide stubbed `SigningStargateClient` with spies to ensure `simulate`, `broadcastTx`, `signAndBroadcast`, `disconnect` proxies arguments/results.
  - Cover timeoutHeight conversion and BigInt handling.
- **Message builders** (`tests/blockchain/messages.test.ts`):
  - Check EncodeObject structure, fee calculations, and batch builder behaviour.

### Storage Layer
- **SNApiClient unit tests** (`tests/cascade/client.test.ts`):
  - Mock global fetch for multipart upload/download endpoints; assert `FormData` construction, error handling, and fallback defaults.
- **TaskManager unit tests** (`tests/cascade/task.test.ts`):
  - Fake timers to drive polling loop, verifying completion, failure, and timeout branches plus error messaging.
- **CascadeUploader integration spec** (`tests/cascade/uploader.spec.ts`):
  - Mock LEP-1 helpers (`createSingleBlockLayout`, `deriveLayoutIds`, `buildIndexFile`) and `SNApiClient.startCascade`/`getTask*`.
  - Use spies to assert sequential workflow: hashing, layout derivation, index file Base64, placeholder signatures, TaskManager interaction.
- **CascadeDownloader integration spec** (`tests/cascade/downloader.spec.ts`):
  - Mock `SNApiClient.requestDownload`/`downloadFile`, toggling `isPrivate` for signature requirements; assert stream passthrough and TaskManager polling.

### Client Layer
- **LumeraClient factory integration tests** (`tests/client/lumera.spec.ts`):
  - Mock `makeBlockchainClient`, `SNApiClient`, `CascadeUploader`, `CascadeDownloader` to verify composition, dependency wiring, and configuration propagation.
  - Provide end-to-end happy-path using fully mocked LCD/RPC/SN-api responses to ensure public API contracts.

## Coverage & Execution
- Configure `vitest.config.ts` with alias mappings (`src`), coverage thresholds, and test environment (`happy-dom` for browser-like globals).
- Add npm script `"test:coverage": "vitest run --coverage"`.
- Integrate CI step to run `npm run test:coverage` and enforce coverage gates.

## Next Steps
1. Scaffold `tests/utils/` helpers for shared mocks/spies.
2. Implement Internal layer tests (priority on HttpClient retry logging).
3. Progress through WASM, Blockchain, Storage, and Client layers per plan.
4. Execute coverage run, iterate until ≥ 80%.