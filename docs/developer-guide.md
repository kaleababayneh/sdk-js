# Lumera JS SDK – Developer Guide

Practical notes for contributors and maintainers of `@lumera-protocol/sdk-js`: how to set up your environment, run the toolchain, regenerate code, and validate changes before publishing.

## Prerequisites

- Node.js 18+ and `pnpm` (the repo uses workspaces and lockfile checked in)
- Buf CLI and Telescope (for protobuf codegen)
- Chrome + Keplr and an `snapi` binary if you need to run the browser E2E harness

## Project Layout

- `src/` – SDK implementation (`blockchain`, `cascade`, `wasm`, `wallets`, `internal/http`)
- `src/codegen/` – Generated protobuf client code (CosmJS-compatible)
- `examples/` – Node and browser usage samples
- `docs/api/` – Typedoc HTML output (generated)
- `docs/*.md` – Internal notes (codegen fixes, Buf/Telescope guide, compatibility notes)
- `tests/` – Vitest unit/integration coverage
- `scripts/` – Helper scripts (post-codegen fixes, E2E harness entrypoint)

## Setup

```bash
pnpm install
```

If you plan to touch codegen, also install Buf and Telescope (see `docs/Step-by-Step Guide to Buf and Telescope.md`).

## Day-to-day Commands

- Lint: `pnpm lint`
- Tests: `pnpm test` (or `pnpm run coverage`)
- Build (ESM + CJS): `pnpm build`
- API docs: `pnpm run docs` → outputs HTML to `docs/api`
- Browser E2E harness: follow `README.e2e-browser.md` and run `make e2e-browser`

## Regenerating Clients

### Protobuf (CosmJS) clients

1. Update `telescope.json` or proto references if needed.
2. Download protos from Buf:

   ```bash
   pnpm run proto:download
   ```

3. Generate and fix code:

   ```bash
   pnpm run generate       # alias for proto download + telescope + fixes
   # or:
   pnpm run codegen:full
   pnpm run codegen:fix    # applies scripted cleanups; see docs/post-codegen-fixes.md
   ```

Generated files land in `src/codegen/`. Avoid hand-editing them.

### sn-api (Cascade HTTP) types

`docs/snapi-swagger.json` pins the OpenAPI spec. To refresh types:

```bash
pnpm run gen:snapi   # writes src/types/snapi.gen.ts
```

If the spec changes, replace `docs/snapi-swagger.json` before running the command.

## Working on SDK Features

- Unified entry: `createLumeraClient`/`LumeraClient` in `src/client.ts`.
- Blockchain features live under `src/blockchain/*` and use CosmJS clients; new queries/tx helpers generally wrap generated types from `src/codegen`.
- Cascade storage uses `src/cascade/*` (uploader, downloader, task manager) and `src/wasm/*` for LEP-1/RaptorQ helpers.
- Wallet UX helpers are under `src/wallets/*` (Keplr adapters, signature/tx prompters).

Prefer adding surface area behind the unified client so both Node and browser callers stay consistent.

## Validating Changes

1. `pnpm lint`
2. `pnpm test` (add Vitest cases in `tests/` when adding features)
3. `pnpm build`
4. `pnpm run docs` (ensure public types stay well-documented)
5. For Cascade/signature flows that touch Keplr or sn-api, run `make e2e-browser` with a configured `e2e.env`.

## Publishing Checklist (library maintainers)

- Bump version in `package.json`.
- Regenerate API docs (`pnpm run docs`) so `docs/api` stays in sync.
- Ensure `dist/` is fresh (`pnpm build`).
- Sanity-check examples (`examples/node`, `examples/browser`) still run.
- Publish: `pnpm publish --access public` (from a clean git state).

## Troubleshooting

- Buf/Telescope issues: cross-check `docs/Step-by-Step Guide to Buf and Telescope.md`.
- Post-generation cleanup details: `docs/post-codegen-fixes.md` and `docs/generator-known-issues.md`.
- WASM compatibility notes (zstd/blake3): `docs/BLAKE3_BROWSER_COMPATIBILITY.md`.
