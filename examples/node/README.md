# Node.js Examples

This directory contains Node.js examples demonstrating the Lumera SDK capabilities.

## Prerequisites

1. **Node.js 18+** - Required for running the examples
2. **Lumera Wallet** - A wallet with a mnemonic phrase
3. **Testnet Tokens** - Ensure your wallet has sufficient LUME tokens on testnet

## Setup

1. Install dependencies from the root of the repository:
   ```bash
   npm install
   ```

2. Set your mnemonic as an environment variable:
   ```bash
   export MNEMONIC="your twenty four word mnemonic phrase here"
   ```

   **⚠️ Security Warning**: Never commit your mnemonic to version control or share it publicly!

## Examples

### 1. Full Workflow (`full-workflow.ts`)

A comprehensive end-to-end example demonstrating the complete Lumera SDK workflow:

**What it does:**
- Sets up a secp256k1 wallet signer from a mnemonic
- Creates a LumeraClient with testnet configuration
- Queries blockchain parameters (Action and Supernode modules)
- Uploads a sample file to Cascade storage
- Downloads the same file and verifies integrity

**Run it:**
```bash
MNEMONIC="your mnemonic here" npx tsx examples/node/full-workflow.ts
```

**Expected Output:**
```
============================================================
Lumera SDK - Full Workflow Example (Node.js CLI)
============================================================

[Step 1] Setting up wallet signer...
✓ Wallet initialized
  Address: lumera1...
  Public Key: 02a1b2c3...

[Step 2] Creating LumeraClient...
✓ LumeraClient initialized with testnet preset

[Step 3] Querying blockchain parameters...
  Chain ID: lumera-testnet-2
  Action Module Parameters:
    - rq_ids_max: 10000
    - rq_ids_ic: 1000
    - fee_base: 100000
    - fee_per_kb: 1000
  ...

[Step 4] Uploading sample file to Cascade storage...
  File size: 456 bytes
  Action ID: demo-action-1234567890-a1b2c3d4
  Initiating upload...
✓ Upload completed successfully!

[Step 5] Downloading file from Cascade storage...
  Reading stream...
✓ Download completed successfully!

[Step 6] Verifying file integrity...
  Sizes match: ✓ YES
  Contents match: ✓ YES

============================================================
SUCCESS! File integrity verified.
============================================================
```

### 2. Lumera Client Demo (`lumera-client-demo.ts`)

A simpler example showing basic LumeraClient usage with blockchain queries and Cascade operations.

**Run it:**
```bash
MNEMONIC="your mnemonic here" npx tsx examples/node/lumera-client-demo.ts
```

### 3. Upload Example (`upload.ts`)

A minimal example focusing on the upload workflow using the lower-level API.

**Run it:**
```bash
MNEMONIC="your mnemonic here" npx tsx examples/node/upload.ts
```

## Common Issues

### "MNEMONIC environment variable is required"

Make sure you've set the `MNEMONIC` environment variable:
```bash
export MNEMONIC="your mnemonic phrase here"
```

Or run the command with the mnemonic inline:
```bash
MNEMONIC="your mnemonic phrase here" npx tsx examples/node/full-workflow.ts
```

### "Insufficient funds" or Transaction Errors

Ensure your wallet has sufficient LUME tokens on testnet. You can request testnet tokens from the Lumera faucet.

### Connection Timeouts

The examples connect to the Lumera testnet endpoints. If you experience timeouts:
- Check your internet connection
- Verify the testnet is operational
- Increase timeout values in the client configuration

## Understanding the Code

### Client Initialization

```typescript
import { createLumeraClient } from "@lumera/sdk-js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

// Create wallet from mnemonic
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
  prefix: "lumera"
});
const [account] = await wallet.getAccounts();

// Create unified client
const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address
});
```

### Blockchain Queries

```typescript
// Query chain information
const chainId = await client.Blockchain.getChainId();

// Query module parameters
const actionParams = await client.Blockchain.Action.getParams();
const supernodeParams = await client.Blockchain.Supernode.getParams();
```

### File Upload

```typescript
const uploadResult = await client.Cascade.uploader.uploadFile(fileBytes, {
  actionId: "unique-action-id",
  rq_ids_ic: actionParams.rq_ids_ic,
  rq_ids_max: actionParams.rq_ids_max
});
```

### File Download

```typescript
const stream = await client.Cascade.downloader.download(actionId);

// Read the stream
const reader = stream.getReader();
const chunks: Uint8Array[] = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}
```

## Next Steps

- Explore the [Browser Examples](../browser/README.md) for web application integration
- Read the [API Documentation](../../README.md) for detailed SDK reference
- Check out the [test suite](../../tests/) for more usage examples

## Support

For issues or questions:
- GitHub Issues: https://github.com/LumeraProtocol/sdk-js/issues
- Documentation: https://docs.lumera.io
- Discord: https://discord.gg/lumera