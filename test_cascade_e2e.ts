/**
 * Cascade E2E via JS SDK: Create ticket on-chain + upload/download via sn-api-server.
 * 
 * This tests the full JS SDK cascade path to prove layout mismatch failure.
 *
 * Usage:
 *   MNEMONIC="..." RPC_URL="https://rpc.testnet.lumera.io" SNAPI_URL="https://snapi.testnet.lumera.io" npx tsx test_cascade_e2e.ts
 */

import { createLumeraClient } from "./src/client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import * as crypto from "crypto";
import * as fs from "fs";

const RPC_URL = process.env.RPC_URL || "https://rpc.testnet.lumera.io";
const LCD_URL = process.env.LCD_URL || "https://rest.testnet.lumera.io";
const CHAIN_ID = process.env.CHAIN_ID || "lumera-testnet-2";
const SNAPI_URL = process.env.SNAPI_URL || "https://snapi.testnet.lumera.io";
const FILE_SIZE = parseInt(process.env.FILE_SIZE || "65536");

async function main() {
  console.log("═".repeat(60));
  console.log("  Cascade E2E: JS SDK ticket → sn-api-server upload");
  console.log("═".repeat(60));

  // ── Step 1: Setup wallet ──
  console.log("\n── Step 1: Setup wallet ──");
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) throw new Error("MNEMONIC env required");

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "lumera" });
  const [account] = await wallet.getAccounts();
  console.log(`  Address: ${account.address}`);

  // ── Step 2: Create LumeraClient ──
  console.log("\n── Step 2: Create LumeraClient ──");
  const client = await createLumeraClient({
    rpcUrl: RPC_URL,
    lcdUrl: LCD_URL,
    chainId: CHAIN_ID,
    snapiUrl: SNAPI_URL,
    signer: wallet,
    address: account.address,
    gasPrice: "0.025ulume",
  });
  console.log(`  ✓ Client initialized`);

  // ── Step 3: Create test file ──
  console.log("\n── Step 3: Create test file ──");
  const testFile = `/tmp/cascade-js-e2e/test_${Date.now()}.bin`;
  fs.mkdirSync("/tmp/cascade-js-e2e", { recursive: true });
  const fileData = crypto.randomBytes(FILE_SIZE);
  fs.writeFileSync(testFile, fileData);
  const fileHash = crypto.createHash("sha256").update(fileData).digest("hex");
  console.log(`  File: ${testFile} (${fileData.length} bytes)`);
  console.log(`  SHA256: ${fileHash}`);

  // ── Step 4: Upload via Cascade (registers on-chain + uploads to SN) ──
  console.log("\n── Step 4: Cascade upload (JS SDK) ──");
  console.log("  This creates the action ticket on-chain via JS SDK,");
  console.log("  then uploads to sn-api-server...\n");

  try {
    // The JS SDK client should have a Cascade facade
    // Let me check what's available
    console.log("  Available client properties:", Object.keys(client));
    
    // Try the Cascade upload path
    if ('Cascade' in client) {
      const cascade = (client as any).Cascade;
      console.log("  Cascade methods:", Object.keys(cascade));
      
      // Use the upload method
      const fileBlob = new Blob([fileData]);
      const result = await cascade.upload({
        file: fileBlob,
        fileName: `test_${Date.now()}.bin`,
        isPublic: false,
      });
      
      console.log("  ✅ Upload result:", JSON.stringify(result, null, 2));
    } else {
      // Manual path: build metadata, submit tx, then upload via REST
      console.log("  No Cascade facade found. Using manual path...");
      console.log("  Available:", Object.keys(client));
      
      // Use the Blockchain client directly
      const blockchain = (client as any).Blockchain || (client as any).blockchain;
      if (blockchain) {
        console.log("  Blockchain methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(blockchain)));
      }
      
      // Try to use the uploader directly
      await manualCascadeUpload(client, wallet, account, fileData, testFile);
    }
  } catch (error: any) {
    console.error("\n  ❌ FAILED:", error.message);
    if (error.stack) {
      console.error("  Stack:", error.stack.split("\n").slice(0, 5).join("\n  "));
    }
    process.exit(1);
  }
}

async function manualCascadeUpload(client: any, wallet: any, account: any, fileData: Buffer, testFile: string) {
  // Import the uploader directly
  const { CascadeUploader } = await import("./src/cascade/uploader");
  const { makeBlockchainClient } = await import("./src/blockchain/client");
  
  console.log("\n  Using CascadeUploader directly...");
  
  const chain = await makeBlockchainClient({
    rpcUrl: RPC_URL,
    lcdUrl: LCD_URL,
    chainId: CHAIN_ID,
    signer: wallet,
    address: account.address,
    gasPrice: "0.025ulume",
  });

  // Check available chain methods
  console.log("  Chain.Action methods:", Object.keys(chain.Action || {}));
  
  // Query params
  const params = await chain.Action.getParams();
  console.log("  Action params:", JSON.stringify(params, null, 2));
  
  // Create a CascadeUploader
  const uploader = new CascadeUploader({
    chainPort: chain.Cascade,
    snapiUrl: SNAPI_URL,
  });
  
  console.log("  CascadeUploader created");
  console.log("  Uploader methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(uploader)));

  // Step 1: Prepare file
  const fileBlob = new Blob([fileData]);
  const prepared = await uploader.prepareFile(fileBlob, `test_${Date.now()}.bin`);
  console.log("\n  Prepared file:");
  console.log(`    dataHash: ${prepared.dataHash}`);
  console.log(`    rqIdsIc: ${prepared.rqIdsIc}`);
  console.log(`    indexFile: ${JSON.stringify(prepared.indexFile).slice(0, 100)}...`);
  console.log(`    layout: ${JSON.stringify(prepared.layout).slice(0, 100)}...`);

  // Step 2: Register action (creates on-chain ticket)
  console.log("\n  Registering action on-chain...");
  const registerResult = await uploader.registerAction({
    fileName: `test_${Date.now()}.bin`,
    isPublic: false,
    expirationTime: Math.floor(Date.now() / 1000 + 86400).toString(),
    signaturePrompter: async (type: string, data: string) => {
      // Auto-sign for testing
      const encoded = new TextEncoder().encode(data);
      const signResult = await wallet.signDirect(account.address, {
        bodyBytes: encoded,
        authInfoBytes: new Uint8Array(),
        chainId: CHAIN_ID,
        accountNumber: BigInt(0),
      });
      return { signature: signResult.signature.signature };
    },
  });
  
  console.log(`\n  ✅ Action registered on-chain!`);
  console.log(`    Action ID: ${registerResult.actionId}`);
  console.log(`    Auth signature: ${registerResult.authSignature?.slice(0, 30)}...`);

  // Step 3: Upload to sn-api-server
  console.log("\n  Uploading to sn-api-server...");
  const uploadResult = await uploader.upload({
    actionId: registerResult.actionId,
    authSignature: registerResult.authSignature,
    file: fileBlob,
  });
  
  console.log(`\n  Upload result:`, JSON.stringify(uploadResult, null, 2));
}

main().catch((error) => {
  console.error("\n✗ Fatal error:", error.message);
  if (error.stack) console.error(error.stack);
  process.exit(1);
});
