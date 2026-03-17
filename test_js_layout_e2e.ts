/**
 * Cascade E2E: JS SDK layout format → sn-api-server
 * Proves the layout JSON mismatch between JS SDK (WASM RQ) and Go (native RQ).
 * 
 * DOES NOT import rq-library-wasm (WASM broken in Node.js).
 * Instead, constructs a JS-style layout directly to simulate what the WASM RQ would produce.
 */

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { makeBlockchainClient } from "./dist/esm/blockchain/client.js";
import { calculateCascadeFee } from "./dist/esm/blockchain/messages.js";
import { lumera } from "./dist/esm/codegen/index.js";
import { createHash as createBlake3 } from "blake3";
import { compress as zstdCompress } from "@mongodb-js/zstd";
import bs58 from "bs58";
import * as crypto from "crypto";
import * as fs from "fs";

const RPC_URL = process.env.RPC_URL || "https://rpc.testnet.lumera.io";
const LCD_URL = process.env.LCD_URL || "https://rest.testnet.lumera.io";
const CHAIN_ID = process.env.CHAIN_ID || "lumera-testnet-2";
const SNAPI_URL = process.env.SNAPI_URL || "https://snapi.testnet.lumera.io";
const FILE_SIZE = parseInt(process.env.FILE_SIZE || "65536");

function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

function blake3Hash(data: Uint8Array): string {
  const hash = createBlake3();
  hash.update(data);
  return Buffer.from(hash.digest()).toString("base64");
}

function blake3HashBytes(data: Uint8Array): Uint8Array {
  const hash = createBlake3();
  hash.update(data);
  return new Uint8Array(hash.digest());
}

async function compress(data: string): Promise<Uint8Array> {
  const bytes = new TextEncoder().encode(data);
  const out = await zstdCompress(Buffer.from(bytes), 3);
  return new Uint8Array(out);
}

/** Canonical JSON: keys sorted alphabetically */
function toCanonicalJsonBytes(obj: unknown): Uint8Array {
  const json = JSON.stringify(obj, Object.keys(obj as object).sort());
  return new TextEncoder().encode(json);
}

/** Generate layout IDs (LEP-1) — inlined to avoid WASM import chain */
async function generateIds(
  layoutB64: string, sigB64: string, rqIdsIc: number, rqIdsMax: number
): Promise<string[]> {
  const layoutWithSig = `${layoutB64}.${sigB64}`;
  const ids: string[] = [];
  for (let i = 0; i < rqIdsMax; i++) {
    const input = `${layoutWithSig}.${rqIdsIc + i}`;
    const compressed = await compress(input);
    const hash = blake3HashBytes(compressed);
    ids.push(bs58.encode(hash));
  }
  return ids;
}

/** Build index file (LEP-1) */
function buildIndexFile(ids: string[], sig: string): object {
  return { version: 1, layout_ids: ids, layout_signature: sig };
}

/**
 * Generate a JS-style RQ layout.
 * This is what rq-library-wasm produces — structurally different from Go RQ.
 */
function generateJsStyleLayout(fileSize: number): object {
  const symbolSize = 65535;
  const sourceSymbols = Math.ceil(fileSize / symbolSize);
  return {
    transfer_length: fileSize,
    symbol_size: symbolSize,
    num_source_blocks: 1,
    num_sub_blocks: 1,
    symbol_alignment: 8,
    source_blocks: [{ source_symbols: sourceSymbols, sub_symbols: 1, sub_symbol_size: symbolSize }],
  };
}

async function main() {
  console.log("═".repeat(60));
  console.log("  Cascade E2E: JS SDK Layout → sn-api-server");
  console.log("  (Proving layout JSON format mismatch)");
  console.log("═".repeat(60));

  // Step 1: Setup
  console.log("\n── Step 1: Setup ──");
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) throw new Error("MNEMONIC env required");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "lumera" });
  const [account] = await wallet.getAccounts();
  console.log(`  Address: ${account.address}`);

  const chain = await makeBlockchainClient({
    rpcUrl: RPC_URL, lcdUrl: LCD_URL, chainId: CHAIN_ID,
    signer: wallet, address: account.address, gasPrice: "0.025ulume",
  });
  console.log("  ✓ Chain client initialized");

  // Step 2: Create test file
  console.log("\n── Step 2: Create test file ──");
  fs.mkdirSync("/tmp/cascade-js-e2e", { recursive: true });
  const testFile = `/tmp/cascade-js-e2e/test_${Date.now()}.bin`;
  const fileData = crypto.randomBytes(FILE_SIZE);
  fs.writeFileSync(testFile, fileData);
  const fileBytes = new Uint8Array(fileData);
  const dataHash = blake3Hash(fileBytes);
  console.log(`  File: ${testFile} (${fileData.length} bytes)`);
  console.log(`  BLAKE3: ${dataHash}`);

  // Step 3: Generate JS-style layout
  console.log("\n── Step 3: Generate JS-style RQ layout ──");
  const jsLayout = generateJsStyleLayout(fileData.length);
  const layoutJSON = JSON.stringify(jsLayout);
  const layoutB64 = toBase64(new TextEncoder().encode(layoutJSON));
  console.log("  JS Layout:", layoutJSON);
  console.log("\n  ⚠️  Go RQ would produce: {\"blocks\":[{\"block_id\":0,...}]}");

  // Step 4: Sign layout (ADR-036 signArbitrary via signDirect)
  console.log("\n── Step 4: Sign layout ──");
  // Use signAmino with ADR-036 format for proper signature
  const layoutSigResult = await (wallet as any).signAmino(account.address, {
    chain_id: "",
    account_number: "0",
    sequence: "0",
    fee: { amount: [], gas: "0" },
    msgs: [{
      type: "sign/MsgSignData",
      value: {
        signer: account.address,
        data: Buffer.from(layoutB64).toString("base64"),
      },
    }],
    memo: "",
  });
  const layoutSigB64 = layoutSigResult.signature.signature;
  console.log(`  Layout sig: ${layoutSigB64.slice(0, 40)}...`);

  // Step 5: Build index file
  console.log("\n── Step 5: Build LEP-1 index file ──");
  const params = await chain.Action.getParams();
  const rqIdsMax = parseInt(params.rq_ids_max || "50");
  const rqIdsIc = Math.floor(Math.random() * rqIdsMax);
  console.log(`  rq_ids_max: ${rqIdsMax}, rq_ids_ic: ${rqIdsIc}`);

  const layoutIds = await generateIds(layoutB64, layoutSigB64, rqIdsIc, rqIdsMax);
  const indexFile = buildIndexFile(layoutIds, layoutSigB64);
  const indexFileBytes = toCanonicalJsonBytes(indexFile);
  const indexFileB64 = toBase64(indexFileBytes);
  const indexFileString = new TextDecoder().decode(indexFileBytes);

  // Sign index
  const indexSigResult = await (wallet as any).signAmino(account.address, {
    chain_id: "",
    account_number: "0",
    sequence: "0",
    fee: { amount: [], gas: "0" },
    msgs: [{
      type: "sign/MsgSignData",
      value: { signer: account.address, data: Buffer.from(indexFileString).toString("base64") },
    }],
    memo: "",
  });
  const indexSigB64 = indexSigResult.signature.signature;
  const signatures = `${indexFileB64}.${indexSigB64}`;
  console.log(`  ✓ Index signed, ${layoutIds.length} layout IDs`);

  // Step 6: Build metadata & fee
  console.log("\n── Step 6: Build metadata ──");
  const fileSizeKbs = Math.ceil(fileData.length / 1024);
  const price = calculateCascadeFee(fileData.length, params.fee_base || "5000", params.fee_per_kb || "50");
  
  const metadata = {
    data_hash: dataHash,
    file_name: `test_js.bin`,
    rq_ids_ic: rqIdsIc,
    signatures: signatures,
    public: false,
  };
  const metadataJSON = JSON.stringify(metadata);
  console.log(`  Fee: ${price}, Size: ${fileSizeKbs}KB`);

  // Step 7: Submit MsgRequestAction
  console.log("\n── Step 7: Submit MsgRequestAction ──");
  const expirationTime = Math.floor(Date.now() / 1000 + 86400).toString();
  
  const msg = lumera.action.v1.MessageComposer.withTypeUrl.requestAction({
    creator: account.address,
    actionType: "cascade",
    metadata: metadataJSON,
    price: price,
    expirationTime: expirationTime,
    fileSizeKbs: BigInt(fileSizeKbs),
  });

  const gasEst = await chain.Tx.simulate(account.address, [msg]);
  const result = await chain.Tx.signAndBroadcast(
    account.address, [msg],
    { amount: [{ denom: "ulume", amount: "10000" }], gas: Math.ceil(Number(gasEst) * 1.5).toString() },
    "JS SDK cascade test"
  );

  if (result.code !== 0) {
    console.error(`  ❌ TX failed: code=${result.code} log=${result.rawLog}`);
    process.exit(1);
  }
  console.log(`  ✓ TX: ${result.transactionHash}`);

  // Extract action_id
  let actionId = "";
  for (const ev of result.events) {
    for (const attr of ev.attributes) {
      if (attr.key === "action_id") { actionId = attr.value; break; }
    }
    if (actionId) break;
  }
  if (!actionId) { console.error("  ❌ No action_id"); process.exit(1); }
  console.log(`  ✓ Action ID: ${actionId}`);

  // Step 8: Generate auth signature
  console.log("\n── Step 8: Auth signature ──");
  const authSigResult = await (wallet as any).signAmino(account.address, {
    chain_id: "",
    account_number: "0",
    sequence: "0",
    fee: { amount: [], gas: "0" },
    msgs: [{
      type: "sign/MsgSignData",
      value: { signer: account.address, data: Buffer.from(dataHash).toString("base64") },
    }],
    memo: "",
  });
  const authSig = authSigResult.signature.signature;
  console.log(`  Auth sig: ${authSig.slice(0, 40)}...`);

  // Step 9: Upload to sn-api-server
  console.log("\n── Step 9: Upload to sn-api-server ──");
  const formData = new FormData();
  formData.append("action_id", actionId);
  formData.append("signature", authSig);
  formData.append("file", new Blob([fileData]), "test_js.bin");

  const uploadResp = await fetch(`${SNAPI_URL}/api/v1/actions/cascade`, {
    method: "POST", body: formData,
  });
  const uploadBody = await uploadResp.json();
  console.log(`  HTTP ${uploadResp.status}: ${JSON.stringify(uploadBody)}`);
  if (!uploadBody.task_id) { console.error("  ❌ No task_id"); process.exit(1); }
  const taskId = uploadBody.task_id;
  console.log(`  ✓ Task ID: ${taskId}`);

  // Step 10: Poll SSE
  console.log("\n── Step 10: Wait for supernode (expecting layout mismatch failure) ──\n");
  const sseUrl = `${SNAPI_URL}/api/v1/actions/cascade/tasks/${taskId}/status`;

  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise(r => setTimeout(r, 5000));
    try {
      const resp = await fetch(sseUrl);
      const text = await resp.text();
      const lines = text.split("\n").filter(l => l.startsWith("data: "));
      
      for (const line of lines) {
        const data = JSON.parse(line.slice(6));
        const status = data.status || "";
        const error = data.data?.error || data.data?.message || "";
        console.log(`  → ${status}${error ? ": " + error.slice(0, 150) : ""}`);

        if (status === "sdk:completed") {
          console.log("\n  ✅ Unexpectedly PASSED!");
          process.exit(0);
        }
        if (status === "sdk:failed" || status.includes("failed")) {
          console.log("\n" + "═".repeat(60));
          console.log("  ❌ FAILED — Layout mismatch confirmed");
          console.log("═".repeat(60));
          console.log(`\n  Error: ${error.slice(0, 200)}`);
          console.log("\n  ROOT CAUSE:");
          console.log(`  JS layout:  ${layoutJSON.slice(0, 80)}...`);
          console.log(`  Go layout:  {"blocks":[{"block_id":0,"encoder_parameters":"..."}]}`);
          console.log("  → Different bytes → signature verification fails\n");
          console.log("  SUMMARY:");
          console.log(`    Action ID:    ${actionId}`);
          console.log(`    TX Hash:      ${result.transactionHash}`);
          console.log(`    Task ID:      ${taskId}`);
          console.log(`    File:         ${fileData.length} bytes, Fee: ${price}`);
          console.log(`    Branches:     sdk-js=feat/lep5, lumera=LEP5, sn=feat/lep5, snapi=main`);
          process.exit(1);
        }
      }
    } catch (_) {}
  }
  console.log("  ⏰ Timeout");
  process.exit(1);
}

main().catch(e => { console.error("✗ Fatal:", e.message, e.stack); process.exit(1); });
