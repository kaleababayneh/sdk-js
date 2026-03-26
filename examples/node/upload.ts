/**
 * Cascade Upload Example: LumeraClient Facade
 *
 * This example demonstrates the high-level upload workflow using the
 * LumeraClient facade, which handles RaptorQ encoding, supernode
 * communication, and on-chain action registration automatically:
 *
 * 1. Initialize wallets (Direct + Amino for ADR-036 signing)
 * 2. Create a LumeraClient with testnet preset
 * 3. Upload a file via the Cascade uploader
 *
 * Prerequisites:
 * - Set the MNEMONIC environment variable with a valid mnemonic
 * - Ensure the account has sufficient balance for transaction fees
 *
 * Usage:
 *   MNEMONIC="your mnemonic here" npx tsx examples/node/upload.ts
 */

import { createLumeraClient } from "../../src";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Secp256k1HdWallet, makeSignDoc as makeAminoSignDoc } from "@cosmjs/amino";

async function main() {
  console.log("=".repeat(60));
  console.log("Lumera SDK - Cascade Upload Example");
  console.log("=".repeat(60));

  // ============================================================================
  // STEP 1: Initialize wallets
  // ============================================================================
  console.log("\n[Step 1] Setting up wallets...");

  if (!process.env.MNEMONIC) {
    throw new Error("Set MNEMONIC environment variable");
  }

  const directWallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, {
    prefix: "lumera",
  });
  const aminoWallet = await Secp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, {
    prefix: "lumera",
  });
  const [account] = await directWallet.getAccounts();
  console.log(`  Address: ${account.address}`);

  // Combine direct + amino wallets and add signArbitrary (ADR-036) for Cascade
  const signer = {
    getAccounts: () => directWallet.getAccounts(),
    signDirect: (addr: string, doc: any) => directWallet.signDirect(addr, doc),
    signAmino: (addr: string, doc: any) => aminoWallet.signAmino(addr, doc),
    async signArbitrary(_chainId: string, signerAddress: string, data: string) {
      const signDoc = makeAminoSignDoc(
        [
          {
            type: "sign/MsgSignData",
            value: {
              signer: signerAddress,
              data: Buffer.from(data).toString("base64"),
            },
          },
        ],
        { gas: "0", amount: [] },
        "", // ADR-036 requires empty chain_id
        "",
        0,
        0
      );
      const { signature } = await aminoWallet.signAmino(signerAddress, signDoc);
      return {
        signed: data,
        signature: signature.signature,
        pub_key: signature.pub_key,
      };
    },
  };

  console.log("  Wallets ready");

  // ============================================================================
  // STEP 2: Create LumeraClient
  // ============================================================================
  console.log("\n[Step 2] Creating LumeraClient...");

  const client = await createLumeraClient({
    preset: "testnet",
    signer: signer as any,
    address: account.address,
    gasPrice: "0.025ulume",
  });

  console.log("  Connected to testnet");

  // ============================================================================
  // STEP 3: Upload a file via Cascade
  // ============================================================================
  console.log("\n[Step 3] Uploading file via Cascade...");

  const file = new TextEncoder().encode("Hello, Lumera!");
  // Expiration must be at least 86400s from now; add buffer to avoid race with block time
  const expirationTime = String(Math.floor(Date.now() / 1000) + 86400 + 600);

  console.log(`  File size: ${file.length} bytes`);
  console.log(`  Expiration: ${expirationTime}`);

  const result = await client.Cascade.uploader.uploadFile(file, {
    fileName: "hello.txt",
    isPublic: true,
    expirationTime,
    taskOptions: { pollInterval: 2000, timeout: 300000 },
  });

  console.log("\n" + "=".repeat(60));
  console.log("Upload complete!");
  console.log("=".repeat(60));
  console.log(result);
}

main().catch((error) => {
  console.error("\nFatal error:");
  console.error(error);
  process.exit(1);
});
