/**
 * Full Workflow Example: Node.js CLI
 * 
 * This example demonstrates a complete end-to-end workflow using the Lumera SDK:
 * 1. Set up a secp256k1 wallet signer for programmatic use
 * 2. Instantiate the LumeraClient with testnet preset
 * 3. Query blockchain parameters
 * 4. Upload a sample file to Cascade storage
 * 5. Download the same file and verify integrity
 * 
 * Prerequisites:
 * - Set the MNEMONIC environment variable with a valid 24-word mnemonic
 * - Ensure the account has sufficient balance for transaction fees
 * 
 * Usage:
 *   MNEMONIC="your mnemonic here" npx tsx examples/node/full-workflow.ts
 */

import { createLumeraClient } from "../../src/client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import * as crypto from "crypto";

/**
 * Main workflow function
 */
async function main() {
  console.log("=".repeat(60));
  console.log("Lumera SDK - Full Workflow Example (Node.js CLI)");
  console.log("=".repeat(60));

  // ============================================================================
  // STEP 1: Set up a direct secp256k1 signer for programmatic use
  // ============================================================================
  console.log("\n[Step 1] Setting up wallet signer...");
  
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error(
      "MNEMONIC environment variable is required.\n" +
      "Usage: MNEMONIC='your mnemonic here' npx tsx examples/node/full-workflow.ts"
    );
  }

  // Create a wallet from the mnemonic using the Lumera prefix
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "lumera",
  });

  // Get the first account from the wallet
  const [account] = await wallet.getAccounts();
  console.log(`✓ Wallet initialized`);
  console.log(`  Address: ${account.address}`);
  console.log(`  Public Key: ${Buffer.from(account.pubkey).toString("hex").slice(0, 20)}...`);

  // ============================================================================
  // STEP 2: Instantiate the LumeraClient with testnet preset
  // ============================================================================
  console.log("\n[Step 2] Creating LumeraClient...");

  const client = await createLumeraClient({
    preset: "testnet",
    signer: wallet,
    address: account.address,
    gasPrice: "0.025ulume",
    http: {
      timeout: 45000,
      maxRetries: 3,
    },
  });

  console.log(`✓ LumeraClient initialized with testnet preset`);

  // ============================================================================
  // STEP 3: Perform blockchain queries
  // ============================================================================
  console.log("\n[Step 3] Querying blockchain parameters...");

  // Query chain information
  const chainId = await client.Blockchain.getChainId();
  console.log(`  Chain ID: ${chainId}`);

  // Query action module parameters (needed for uploads)
  const actionParams = await client.Blockchain.Action.getParams();
  console.log(`  Action Module Parameters:`);
  console.log(`    - rq_ids_max: ${actionParams.rq_ids_max}`);
  console.log(`    - rq_ids_ic: ${actionParams.rq_ids_ic}`);
  console.log(`    - fee_base: ${actionParams.fee_base}`);
  console.log(`    - fee_per_kb: ${actionParams.fee_per_kb}`);

  // Query supernode module parameters
  const supernodeParams = await client.Blockchain.Supernode.getParams();
  console.log(`  Supernode Module Parameters:`);
  console.log(`    - min_stake: ${supernodeParams.min_stake}`);
  console.log(`    - stake_denom: ${supernodeParams.stake_denom}`);

  // ============================================================================
  // STEP 4: Upload a sample file using client.Cascade.uploader
  // ============================================================================
  console.log("\n[Step 4] Uploading sample file to Cascade storage...");

  // Create a sample file with random content
  const sampleContent = `Hello from Lumera SDK!
  
This is a test file uploaded at ${new Date().toISOString()}.
Random data for uniqueness: ${crypto.randomBytes(32).toString("hex")}

The Lumera SDK provides a unified interface for:
- Blockchain operations (queries and transactions)
- Cascade storage (distributed file storage)
- Wallet integration (Keplr, Leap, and programmatic signing)

This file demonstrates the complete upload/download workflow.`;

  const fileBytes = new TextEncoder().encode(sampleContent);
  console.log(`  File size: ${fileBytes.length} bytes`);
  console.log(`  Content preview: ${sampleContent.split('\n')[0]}...`);

  // Generate a unique action ID for this upload
  const actionId = `demo-action-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  console.log(`  Action ID: ${actionId}`);

  try {
    console.log(`  Initiating upload...`);

    // Upload the file to Cascade storage
    const uploadResult = await client.Cascade.uploader.uploadFile(fileBytes, {
      actionId: actionId,
      rq_ids_ic: actionParams.rq_ids_ic,
      rq_ids_max: actionParams.rq_ids_max,
      taskOptions: {
        pollInterval: 2000,  // Poll every 2 seconds
        timeout: 300000,     // 5 minute timeout
      },
    });

    console.log(`✓ Upload completed successfully!`);
    console.log(`  Task ID: ${uploadResult.id}`);
    console.log(`  Status: ${uploadResult.status}`);
    if (uploadResult.completedAt) {
      console.log(`  Completed at: ${new Date(uploadResult.completedAt).toISOString()}`);
    }

    // ============================================================================
    // STEP 5: Download the same file using client.Cascade.downloader
    // ============================================================================
    console.log("\n[Step 5] Downloading file from Cascade storage...");
    console.log(`  Action ID: ${actionId}`);

    // Download the file we just uploaded
    const downloadStream = await client.Cascade.downloader.download(actionId, {
      pollInterval: 2000,
      timeout: 300000,
    });

    console.log(`  Reading stream...`);

    // Read the stream and collect chunks
    const reader = downloadStream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      console.log(`  Received chunk: ${value.length} bytes`);
    }

    // Combine all chunks into a single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const downloadedBytes = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      downloadedBytes.set(chunk, offset);
      offset += chunk.length;
    }

    // Decode the downloaded content
    const downloadedContent = new TextDecoder().decode(downloadedBytes);

    console.log(`✓ Download completed successfully!`);
    console.log(`  Downloaded size: ${downloadedBytes.length} bytes`);
    console.log(`  Content preview: ${downloadedContent.split('\n')[0]}...`);

    // ============================================================================
    // STEP 6: Verify integrity
    // ============================================================================
    console.log("\n[Step 6] Verifying file integrity...");

    const originalSize = fileBytes.length;
    const downloadedSize = downloadedBytes.length;
    const sizesMatch = originalSize === downloadedSize;
    const contentsMatch = sampleContent === downloadedContent;

    console.log(`  Original size: ${originalSize} bytes`);
    console.log(`  Downloaded size: ${downloadedSize} bytes`);
    console.log(`  Sizes match: ${sizesMatch ? "✓ YES" : "✗ NO"}`);
    console.log(`  Contents match: ${contentsMatch ? "✓ YES" : "✗ NO"}`);

    if (sizesMatch && contentsMatch) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`SUCCESS! File integrity verified.`);
      console.log(`${"=".repeat(60)}`);
    } else {
      console.error(`\n${"=".repeat(60)}`);
      console.error(`ERROR! File integrity check failed.`);
      console.error(`${"=".repeat(60)}`);
      process.exit(1);
    }

  } catch (error) {
    console.error("\n✗ Upload/Download workflow failed:");
    if (error instanceof Error) {
      console.error(`  Error: ${error.message}`);
      if (error.stack) {
        console.error(`  Stack trace:\n${error.stack}`);
      }
    } else {
      console.error(`  Error: ${String(error)}`);
    }
    process.exit(1);
  }
}

// Run the main workflow
main().catch((error) => {
  console.error("\n✗ Fatal error:");
  console.error(error);
  process.exit(1);
});