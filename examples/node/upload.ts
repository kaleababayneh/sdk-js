/**
 * Advanced Upload Example: Direct Message Composition
 * 
 * This example demonstrates how to use the Telescope-generated message composers
 * directly for more granular control over the upload workflow:
 * 
 * 1. Build file metadata manually
 * 2. Create messages using generated MessageComposer
 * 3. Simulate, sign, and broadcast transactions
 * 4. Complete the action with finalization
 * 
 * Prerequisites:
 * - Set the MNEMONIC environment variable with a valid 24-word mnemonic
 * - Ensure the account has sufficient balance for transaction fees
 * - Have a file to upload (e.g., example.bin)
 * 
 * Usage:
 *   MNEMONIC="your mnemonic here" npx tsx examples/node/upload.ts
 */

import { makeBlockchainClient } from "../../src/blockchain/client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { lumera } from "../../src/codegen";
import { calculateCascadeFee } from "../../src/blockchain/messages";
import fs from "node:fs";
import crypto from "node:crypto";

async function main() {
  console.log("=".repeat(60));
  console.log("Lumera SDK - Direct Message Composition Example");
  console.log("=".repeat(60));

  // ============================================================================
  // STEP 1: Initialize wallet and blockchain client
  // ============================================================================
  console.log("\n[Step 1] Setting up wallet and blockchain client...");
  
  if (!process.env.MNEMONIC) {
    throw new Error("Set MNEMONIC environment variable");
  }

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, {
    prefix: "lumera"
  });
  const [account] = await wallet.getAccounts();
  console.log(`✓ Using address: ${account.address}`);

  const chain = await makeBlockchainClient({
    rpcUrl: "https://rpc.testnet.lumera.io",
    lcdUrl: "https://lcd.testnet.lumera.io",
    chainId: "lumera-testnet-2",
    signer: wallet,
    address: account.address,
    gasPrice: "0.025ulume"
  });

  console.log(`✓ Connected to chain: ${await chain.getChainId()}`);

  // ============================================================================
  // STEP 2: Query blockchain parameters
  // ============================================================================
  console.log("\n[Step 2] Querying action module parameters...");
  
  const params = await chain.Action.getParams();
  console.log(`  rq_ids_max: ${params.rq_ids_max}`);
  console.log(`  rq_ids_ic: ${params.rq_ids_ic}`);
  console.log(`  fee_base: ${params.fee_base}`);
  console.log(`  fee_per_kb: ${params.fee_per_kb}`);

  // ============================================================================
  // STEP 3: Prepare file and metadata
  // ============================================================================
  console.log("\n[Step 3] Preparing file metadata...");
  
  // For this example, create a sample file if it doesn't exist
  const filePath = "./example.bin";
  let fileData: Buffer;
  
  if (fs.existsSync(filePath)) {
    fileData = fs.readFileSync(filePath);
    console.log(`✓ Loaded existing file: ${filePath} (${fileData.length} bytes)`);
  } else {
    // Create a sample file
    fileData = crypto.randomBytes(1024); // 1KB sample file
    fs.writeFileSync(filePath, fileData);
    console.log(`✓ Created sample file: ${filePath} (${fileData.length} bytes)`);
  }

  // Calculate file hash using SHA-256
  const fileHash = crypto.createHash("sha256").update(fileData).digest("hex");
  console.log(`  File hash: ${fileHash}`);

  // Generate action ID
  const actionId = `example-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  console.log(`  Action ID: ${actionId}`);

  // Build metadata for Cascade action
  const metadata = {
    data_hash: fileHash,
    file_name: "example.bin",
    rq_ids_ic: params.rq_ids_ic,
    signatures: "", // Would be populated with RaptorQ signatures in real use
    public: false,
  };

  // Calculate price based on file size
  const price = calculateCascadeFee(fileData.length, params.fee_base, params.fee_per_kb);
  console.log(`  Calculated fee: ${price} ulume`);

  // Set expiration time (24 hours from now)
  const expirationTime = Math.floor(Date.now() / 1000 + 86400).toString();

  // ============================================================================
  // STEP 4: Build and broadcast MsgRequestAction using generated composer
  // ============================================================================
  console.log("\n[Step 4] Building MsgRequestAction with generated composer...");

  // Use the Telescope-generated message composer
  const msgRequestAction = lumera.action.MessageComposer.withTypeUrl.requestAction({
    creator: account.address,
    actionType: "cascade",
    metadata: JSON.stringify(metadata),
    price,
    expirationTime,
  });

  console.log(`✓ Message created with typeUrl: ${msgRequestAction.typeUrl}`);
  console.log(`  Action type: ${msgRequestAction.value.actionType}`);
  console.log(`  Price: ${msgRequestAction.value.price}`);

  // Simulate transaction to estimate gas
  console.log("\n  Simulating transaction...");
  const gasEstimate = await chain.Tx.simulate(account.address, [msgRequestAction]);
  console.log(`  Estimated gas: ${gasEstimate}`);

  // Broadcast the transaction
  console.log("\n  Broadcasting transaction...");
  const result = await chain.Tx.signAndBroadcast(
    account.address,
    [msgRequestAction],
    { amount: [{ denom: "ulume", amount: "10000" }], gas: gasEstimate.toString() },
    "Request Cascade action"
  );

  if (result.code !== 0) {
    console.error(`✗ Transaction failed: ${result.rawLog}`);
    process.exit(1);
  }

  console.log(`✓ Transaction successful!`);
  console.log(`  TX Hash: ${result.transactionHash}`);
  console.log(`  Block Height: ${result.height}`);

  // ============================================================================
  // STEP 5: Build and broadcast MsgFinalizeAction
  // ============================================================================
  console.log("\n[Step 5] Building MsgFinalizeAction with generated composer...");

  // In a real scenario, you would:
  // 1. Upload the file data to supernodes
  // 2. Get the RaptorQ IDs from supernodes
  // 3. Include those in the finalize metadata

  const finalizeMetadata = {
    ...metadata,
    rq_ids_max: params.rq_ids_max,
    rq_ids: ["id1", "id2", "id3"], // Would be real RaptorQ IDs
  };

  // Use the Telescope-generated message composer
  const msgFinalizeAction = lumera.action.MessageComposer.withTypeUrl.finalizeAction({
    creator: account.address,
    actionId,
    actionType: "cascade",
    metadata: JSON.stringify(finalizeMetadata),
  });

  console.log(`✓ Message created with typeUrl: ${msgFinalizeAction.typeUrl}`);
  console.log(`  Action ID: ${msgFinalizeAction.value.actionId}`);

  // Simulate and broadcast finalize transaction
  console.log("\n  Simulating finalize transaction...");
  const finalizeGas = await chain.Tx.simulate(account.address, [msgFinalizeAction]);
  console.log(`  Estimated gas: ${finalizeGas}`);

  console.log("\n  Broadcasting finalize transaction...");
  const finalizeResult = await chain.Tx.signAndBroadcast(
    account.address,
    [msgFinalizeAction],
    { amount: [{ denom: "ulume", amount: "10000" }], gas: finalizeGas.toString() },
    "Finalize Cascade action"
  );

  if (finalizeResult.code !== 0) {
    console.error(`✗ Finalize transaction failed: ${finalizeResult.rawLog}`);
    process.exit(1);
  }

  console.log(`✓ Finalize transaction successful!`);
  console.log(`  TX Hash: ${finalizeResult.transactionHash}`);
  console.log(`  Block Height: ${finalizeResult.height}`);

  // ============================================================================
  // STEP 6: Verify action on blockchain
  // ============================================================================
  console.log("\n[Step 6] Verifying action on blockchain...");

  try {
    const action = await chain.Action.getAction(actionId);
    console.log(`✓ Action found on chain:`);
    console.log(`  Action ID: ${action.actionId}`);
    console.log(`  Action Type: ${action.actionType}`);
    console.log(`  Creator: ${action.creator}`);
    console.log(`  State: ${action.state}`);
  } catch (error) {
    console.log(`  Note: Action query may fail if not yet indexed`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("SUCCESS! Demonstrated direct message composition workflow");
  console.log("=".repeat(60));
  console.log("\nKey takeaways:");
  console.log("  - Used lumera.action.MessageComposer.withTypeUrl for messages");
  console.log("  - Demonstrated both RequestAction and FinalizeAction");
  console.log("  - Showed gas estimation and transaction broadcasting");
  console.log("  - This is the low-level approach for advanced use cases");
  console.log("\nFor simpler workflows, use the LumeraClient facade instead!");
}

main().catch((error) => {
  console.error("\n✗ Fatal error:");
  console.error(error);
  process.exit(1);
});