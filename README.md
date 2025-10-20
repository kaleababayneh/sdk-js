# @lumera/sdk-js

**Official JavaScript/TypeScript SDK for Lumera Protocol**

A unified SDK providing seamless access to the Lumera blockchain and Cascade distributed storage network. Built with modern TypeScript, featuring comprehensive type safety, and designed for both Node.js and browser environments.

## ✨ Features

- **🔗 Unified Client Interface** - Single entry point for all Lumera operations
- **⛓️ Blockchain Operations** - Complete CosmJS integration with LCD/REST queries
  - Transaction simulation, signing, and broadcasting
  - Action module queries and operations
  - Supernode module queries
  - Chain parameter queries
- **📦 Cascade Storage** - Full-featured distributed file storage client
  - Upload/download with progress tracking
  - Automatic file chunking and Reed-Solomon encoding
  - Task management with polling and status updates
  - Stream-based downloads for memory efficiency
- **🔐 Wallet Integration** - Support for multiple wallet types
  - Keplr wallet integration
  - Leap wallet integration  
  - Programmatic signing with DirectSecp256k1HdWallet
- **🎯 Type Safety** - Full TypeScript support with comprehensive types
- **🌐 Cross-Platform** - Works in Node.js (v18+) and modern browsers
- **📝 Extensive Documentation** - Complete API reference and examples

## 📦 Installation

```bash
pnpm install @lumera/sdk
```

### Peer Dependencies

For blockchain operations, you'll also need CosmJS packages:

```bash
pnpm install @cosmjs/proto-signing @cosmjs/stargate
```

## 🚀 Quick Start

### 1. Initialize the Client

```typescript
import { createLumeraClient } from "@lumera/sdk";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

// Create a wallet
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
  "your mnemonic phrase here",
  { prefix: "lumera" }
);

const [account] = await wallet.getAccounts();

// Create the client using testnet preset
const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
  gasPrice: "0.025ulume"
});
```

### 2. Query the Blockchain

```typescript
// Get chain information
const chainId = await client.Blockchain.getChainId();
console.log("Chain ID:", chainId);

// Query action module parameters
const actionParams = await client.Blockchain.Action.getParams();
console.log("Action params:", actionParams);

// Query supernode module parameters  
const supernodeParams = await client.Blockchain.Supernode.getParams();
console.log("Supernode params:", supernodeParams);
```

### 3. Upload a File to Cascade

```typescript
// Prepare your file
const fileContent = "Hello, Lumera!";
const fileBytes = new TextEncoder().encode(fileContent);

// Upload to Cascade
const uploadResult = await client.Cascade.uploader.uploadFile(fileBytes, {
  actionId: `my-file-${Date.now()}`,
  rq_ids_ic: 1000,
  rq_ids_max: actionParams.rq_ids_max,
  taskOptions: {
    pollInterval: 2000,
    timeout: 300000,
  },
});

console.log("Upload completed:", uploadResult);
```

### 4. Download a File from Cascade

```typescript
// Download using the action ID
const downloadStream = await client.Cascade.downloader.download(
  uploadResult.actionId
);

// Read the stream
const reader = downloadStream.getReader();
const chunks: Uint8Array[] = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}

// Combine chunks
const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
const downloadedBytes = new Uint8Array(totalLength);
let offset = 0;
for (const chunk of chunks) {
  downloadedBytes.set(chunk, offset);
  offset += chunk.length;
}

const downloadedContent = new TextDecoder().decode(downloadedBytes);
console.log("Downloaded:", downloadedContent);
```

## 📚 Documentation

- **[API Reference](./docs/api/README.md)** - Complete TypeScript API documentation
- **[Migration Guide](./MIGRATION.md)** - Migrate from direct fetch/LCD calls to the SDK
- **[Examples](./examples/)** - Working code examples
  - [Node.js Examples](./examples/node/) - Full workflow and standalone examples
  - [Browser Example](./examples/browser/) - Browser-based upload/download demo

## 🎯 Core Concepts

### Chain Presets

The SDK includes built-in presets for quick setup:

```typescript
const client = await createLumeraClient({
  preset: "testnet", // or "mainnet"
  signer: wallet,
  address: account.address,
});
```

Available presets:
- `testnet` - Lumera testnet configuration
- `mainnet` - Lumera mainnet configuration

### Manual Configuration

For custom chains or advanced setups:

```typescript
const client = await createLumeraClient({
  rpcUrl: "https://your-rpc-url.com",
  lcdUrl: "https://your-lcd-url.com",
  chainId: "your-chain-id",
  signer: wallet,
  address: account.address,
  gasPrice: "0.025ulume",
  cascade: {
    snapiBaseUrl: "https://your-snapi-url.com"
  }
});
```

### Blockchain Client

Direct access to blockchain operations:

```typescript
// Transaction operations
const msgs = [...]; // Your messages
const gas = await client.Blockchain.Tx.simulate(address, msgs);
const result = await client.Blockchain.Tx.broadcast(signedTx);

// Query operations
const actionList = await client.Blockchain.Action.listActions();
const supernodeList = await client.Blockchain.Supernode.listAll();
```

### Cascade Client

File storage operations:

```typescript
// Upload with progress tracking
const uploader = client.Cascade.uploader;
const result = await uploader.uploadFile(fileBytes, {
  actionId: "my-action",
  rq_ids_ic: 1000,
  rq_ids_max: 10000,
});

// Download as stream
const downloader = client.Cascade.downloader;
const stream = await downloader.download("action-id");
```

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm run coverage

# Build the SDK
pnpm build

# Generate API documentation
pnpm run docs

# Lint code
pnpm lint
```

## 📋 Requirements

- Node.js v18 or higher
- TypeScript 5.x (for development)
- Modern browser with ES2020+ support (for browser usage)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

Apache-2.0 - see LICENSE file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/LumeraProtocol/sdk-js)
- [Lumera Protocol](https://lumera.io)
- [Documentation](./docs/api/README.md)

## 💡 Support

- For bug reports and feature requests, please open an issue on GitHub
- For questions and discussions, join our community channels

---

**Built with ❤️ by the Lumera Protocol team**