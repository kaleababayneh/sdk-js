/**
 * Example: Using the LumeraClient facade
 * 
 * This example demonstrates how to use the main LumeraClient to interact
 * with both the Lumera blockchain and Cascade storage.
 */

import { createLumeraClient } from "../../src/client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import * as fs from "fs/promises";

async function main() {
  // Create a wallet from mnemonic
  const mnemonic = process.env.MNEMONIC || "your mnemonic here";
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "lumera"
  });
  
  const [account] = await wallet.getAccounts();
  console.log("Using address:", account.address);

  // Create the unified client using testnet preset
  const client = await createLumeraClient({
    preset: "testnet",
    signer: wallet,
    address: account.address,
    gasPrice: "0.025ulume"
  });

  console.log("\n=== Blockchain Operations ===");
  
  // Get chain information
  const chainId = await client.Blockchain.getChainId();
  console.log("Chain ID:", chainId);
  
  // Query action module parameters
  const actionParams = await client.Blockchain.Action.getParams();
  console.log("Action Params:", {
    rq_ids_max: actionParams.rq_ids_max,
    fee_base: actionParams.fee_base,
    fee_per_kb: actionParams.fee_per_kb,
  });
  
  // Query supernode module parameters
  const supernodeParams = await client.Blockchain.Supernode.getParams();
  console.log("Supernode Params:", supernodeParams);

  console.log("\n=== Cascade Upload Example ===");
  
  // Example: Upload a file to Cascade
  const fileContent = "Hello, Lumera! This is a test file for Cascade storage.";
  const fileBytes = new TextEncoder().encode(fileContent);
  
  try {
    // Upload file to Cascade
    const uploadResult = await client.Cascade.uploader.uploadFile(fileBytes, {
      actionId: `test-action-${Date.now()}`,
      rq_ids_ic: 1000,
      rq_ids_max: actionParams.rq_ids_max,
      taskOptions: {
        pollInterval: 2000,
        timeout: 300000,
      },
    });
    
    console.log("Upload completed:", uploadResult);
    
    console.log("\n=== Cascade Download Example ===");
    
    // Download the file back
    if (uploadResult.actionId) {
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
      console.log("Downloaded content:", downloadedContent);
      console.log("Content matches:", downloadedContent === fileContent);
    }
  } catch (error) {
    console.error("Upload/Download error:", error);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});