# @lumera/sdk-js

Unified JS/TS SDK for **Lumera** — blockchain client (CosmJS + REST/LCD) and **Cascade** storage client (sn-api).

## ✨ Features

- `Blockchain.Tx.simulate/broadcast` via CosmJS
- `Blockchain.Action.*`, `Blockchain.Supernode.*` via LCD/REST
- Cascade client with rq-wasm (layout/index) + sn-api (upload/download)
- ADR-036 `signArbitrary` for layout/index/start/download signatures
- Deterministic LEP-1 (canonical JSON + Base64) across platforms

## Quick start

```bash
npm i @lumera/sdk-js @cosmjs/proto-signing @cosmjs/stargate
```

See `examples/node/upload.ts` for a minimal flow.
