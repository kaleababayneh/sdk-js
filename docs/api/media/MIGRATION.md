# Migration Guide

This guide helps developers migrate from direct `fetch` calls to the Lumera LCD REST API and `sn-api` endpoints to using the **@lumera/sdk-js**.

## Table of Contents

- [Why Migrate?](#why-migrate)
- [Blockchain Operations](#blockchain-operations)
  - [Query Chain Parameters](#query-chain-parameters)
  - [Query Action Module](#query-action-module)
  - [Query Supernode Module](#query-supernode-module)
- [Cascade Storage Operations](#cascade-storage-operations)
  - [Start Upload Task](#start-upload-task)
  - [Request Download](#request-download)
  - [Poll Task Status](#poll-task-status)
- [Benefits Summary](#benefits-summary)

## Why Migrate?

The Lumera SDK provides significant advantages over direct API calls:

- ✅ **Type Safety** - Full TypeScript types for all operations
- ✅ **Error Handling** - Consistent error handling with typed exceptions
- ✅ **Simplified API** - Unified interface for all Lumera operations
- ✅ **Built-in Retry Logic** - Automatic retries for transient failures
- ✅ **Task Management** - Automatic polling and status tracking for async operations
- ✅ **Signing Integration** - Built-in wallet and transaction signing support
- ✅ **Streaming Downloads** - Memory-efficient file downloads
- ✅ **Best Practices** - Encoding, hashing, and validation handled automatically

---

## Blockchain Operations

### Query Chain Parameters

#### Before (Direct fetch)

```typescript
// Manual fetch to LCD endpoint
const response = await fetch(
  "https://lcd.testnet.lumera.io/cosmos/base/tendermint/v1beta1/node_info"
);

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();
const chainId = data.default_node_info?.network;
console.log("Chain ID:", chainId);
```

#### After (SDK)

```typescript
import { createLumeraClient } from "@lumera/sdk";

const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
});

// Type-safe, simple query
const chainId = await client.Blockchain.getChainId();
console.log("Chain ID:", chainId);
```

### Query Action Module

#### Before (Direct fetch)

```typescript
// Query action module parameters
const paramsResponse = await fetch(
  "https://lcd.testnet.lumera.io/LumeraProtocol/lumera/action/params"
);

if (!paramsResponse.ok) {
  throw new Error(`HTTP error! status: ${paramsResponse.status}`);
}

const paramsData = await paramsResponse.json();
const actionParams = paramsData.params;

// Query specific action
const actionId = "my-action-id";
const actionResponse = await fetch(
  `https://lcd.testnet.lumera.io/LumeraProtocol/lumera/action/action/${actionId}`
);

if (!actionResponse.ok) {
  throw new Error(`HTTP error! status: ${actionResponse.status}`);
}

const actionData = await actionResponse.json();
const action = actionData.action;
```

#### After (SDK)

```typescript
import { createLumeraClient } from "@lumera/sdk";

const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
});

// Type-safe parameter query
const actionParams = await client.Blockchain.Action.getParams();

// Type-safe action query
const action = await client.Blockchain.Action.getAction("my-action-id");
```

### Query Supernode Module

#### Before (Direct fetch)

```typescript
// Query supernode parameters
const response = await fetch(
  "https://lcd.testnet.lumera.io/LumeraProtocol/lumera/supernode/params"
);

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();
const supernodeParams = data.params;

// List all supernodes
const listResponse = await fetch(
  "https://lcd.testnet.lumera.io/LumeraProtocol/lumera/supernode/supernodes"
);

if (!listResponse.ok) {
  throw new Error(`HTTP error! status: ${listResponse.status}`);
}

const listData = await listResponse.json();
const supernodes = listData.supernodes || [];
```

#### After (SDK)

```typescript
import { createLumeraClient } from "@lumera/sdk";

const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
});

// Type-safe queries with automatic error handling
const supernodeParams = await client.Blockchain.Supernode.getParams();
const supernodes = await client.Blockchain.Supernode.listAll();
```

---

## Cascade Storage Operations

### Start Upload Task

#### Before (Direct fetch with manual FormData)

```typescript
import { FormData } from "formdata-node";

// Manually prepare file and metadata
const file = new Uint8Array([...]); // Your file bytes
const actionId = "my-action-id";

// Sign layout and index manually
const layoutSignature = await signArbitrary(wallet, address, layoutJson);
const indexSignature = await signArbitrary(wallet, address, indexJson);

// Build FormData manually
const formData = new FormData();
formData.append("file", new Blob([file]), "upload.bin");
formData.append("action_id", actionId);
formData.append("layout", layoutJson);
formData.append("layout_signature", layoutSignature);
formData.append("index", indexJson);
formData.append("index_signature", indexSignature);

// Make request
const response = await fetch(
  "https://snapi.testnet.lumera.io/start-cascade",
  {
    method: "POST",
    body: formData,
  }
);

if (!response.ok) {
  const error = await response.text();
  throw new Error(`Upload failed: ${error}`);
}

const result = await response.json();
const taskId = result.id;

// Manual polling for completion
let status = "pending";
while (status !== "completed" && status !== "failed") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const statusResponse = await fetch(
    `https://snapi.testnet.lumera.io/task/${taskId}`
  );
  
  if (!statusResponse.ok) {
    throw new Error("Failed to get task status");
  }
  
  const statusData = await statusResponse.json();
  status = statusData.status;
  
  if (status === "failed") {
    throw new Error(`Upload failed: ${statusData.error}`);
  }
}

console.log("Upload completed!");
```

#### After (SDK)

```typescript
import { createLumeraClient } from "@lumera/sdk";

const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
});

// Simple, type-safe upload with automatic polling
const uploadResult = await client.Cascade.uploader.uploadFile(
  file, // Uint8Array
  {
    actionId: "my-action-id",
    rq_ids_ic: 1000,
    rq_ids_max: 10000,
    taskOptions: {
      pollInterval: 2000,
      timeout: 300000,
    },
  }
);

console.log("Upload completed:", uploadResult);
```

### Request Download

#### Before (Direct fetch with manual signatures)

```typescript
// Sign download request manually
const downloadSignature = await signArbitrary(
  wallet,
  address,
  JSON.stringify({ action_id: actionId })
);

// Request download
const response = await fetch(
  "https://snapi.testnet.lumera.io/request-download",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action_id: actionId,
      signature: downloadSignature,
      address: address,
    }),
  }
);

if (!response.ok) {
  throw new Error(`Download request failed: ${response.status}`);
}

const result = await response.json();
const taskId = result.id;

// Poll for download URL
let downloadUrl = null;
while (!downloadUrl) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const statusResponse = await fetch(
    `https://snapi.testnet.lumera.io/task/${taskId}`
  );
  
  const statusData = await statusResponse.json();
  
  if (statusData.status === "completed" && statusData.download_url) {
    downloadUrl = statusData.download_url;
  } else if (statusData.status === "failed") {
    throw new Error("Download failed");
  }
}

// Download the file
const fileResponse = await fetch(downloadUrl);
const fileBlob = await fileResponse.blob();
const fileBytes = new Uint8Array(await fileBlob.arrayBuffer());
```

#### After (SDK)

```typescript
import { createLumeraClient } from "@lumera/sdk";

const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
});

// Simple download with automatic signature and polling
const downloadStream = await client.Cascade.downloader.download(
  "my-action-id",
  {
    pollInterval: 2000,
    timeout: 300000,
  }
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
const fileBytes = new Uint8Array(totalLength);
let offset = 0;
for (const chunk of chunks) {
  fileBytes.set(chunk, offset);
  offset += chunk.length;
}
```

### Poll Task Status

#### Before (Direct fetch with manual polling)

```typescript
async function pollTaskStatus(taskId: string): Promise<any> {
  const maxAttempts = 150; // 5 minutes with 2s interval
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const response = await fetch(
      `https://snapi.testnet.lumera.io/task/${taskId}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to get task status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === "completed") {
      return data;
    }
    
    if (data.status === "failed") {
      throw new Error(`Task failed: ${data.error || "Unknown error"}`);
    }
    
    // Still pending, wait and retry
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;
  }
  
  throw new Error("Task timeout - exceeded maximum polling attempts");
}

// Usage
const taskStatus = await pollTaskStatus(taskId);
console.log("Task completed:", taskStatus);
```

#### After (SDK)

```typescript
import { createLumeraClient } from "@lumera/sdk";

const client = await createLumeraClient({
  preset: "testnet",
  signer: wallet,
  address: account.address,
});

// TaskManager handles polling automatically
const taskStatus = await client.Cascade.taskManager.waitForTaskCompletion(
  taskId,
  {
    pollInterval: 2000,
    timeout: 300000,
  }
);

console.log("Task completed:", taskStatus);
```

---

## Benefits Summary

### Code Reduction

- **70-80% less code** for typical operations
- No manual error handling boilerplate
- No manual polling loops
- No manual signature generation

### Type Safety

```typescript
// Before: Any type, prone to runtime errors
const data: any = await response.json();
const params = data.params; // No type checking

// After: Fully typed
const params: ActionParams = await client.Blockchain.Action.getParams();
// TypeScript knows the exact structure of params
```

### Error Handling

```typescript
// Before: Manual error checking everywhere
if (!response.ok) {
  const error = await response.text();
  throw new Error(`Request failed: ${error}`);
}

// After: Automatic error handling with typed exceptions
try {
  const result = await client.Cascade.uploader.uploadFile(file, options);
} catch (error) {
  if (error instanceof HttpError) {
    console.error("HTTP error:", error.status, error.message);
  }
}
```

### Configuration

```typescript
// Before: Managing multiple endpoints manually
const LCD_URL = "https://lcd.testnet.lumera.io";
const RPC_URL = "https://rpc.testnet.lumera.io";
const SNAPI_URL = "https://snapi.testnet.lumera.io";

// After: Single preset configuration
const client = await createLumeraClient({
  preset: "testnet", // All endpoints configured automatically
  signer: wallet,
  address: account.address,
});
```

### Maintenance

- **SDK updates handle API changes** - You don't need to track breaking changes
- **Consistent patterns** - Learn once, use everywhere
- **Built-in best practices** - Encoding, signing, validation handled correctly
- **Active maintenance** - Bug fixes and improvements delivered automatically

---

## Getting Started

1. **Install the SDK**:
   ```bash
   pnpm install @lumera/sdk @cosmjs/proto-signing @cosmjs/stargate
   ```

2. **Replace direct fetch calls** with SDK methods using this guide

3. **Remove manual boilerplate** for error handling, polling, and signatures

4. **Enjoy type safety** and simplified code!

For more examples, see:
- [README.md](./README.md) - Quick start guide
- [API Reference](./docs/api/README.md) - Complete API documentation
- [Examples](./examples/) - Working code samples