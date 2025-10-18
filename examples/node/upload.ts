import { makeBlockchainClient } from "../../src/blockchain/client";
import { LumeraClient } from "../../src/client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import fs from "node:fs";

async function main() {
  if (!process.env.MNEMONIC) throw new Error("Set MNEMONIC env var");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, { prefix: "lumera" });
  const [acct] = await wallet.getAccounts();

  const chain = await makeBlockchainClient({
    rpcUrl: "https://rpc.testnet.lumera.io",
    lcdUrl: "https://lcd.testnet.lumera.io",
    chainId: "lumera-testnet-2",
    signer: wallet,
    address: acct.address,
    gasPrice: "0.025ulume"
  });

  const client = new LumeraClient({
    chain,
    cascade: { snapiBaseUrl: "https://snapi.testnet.lumera.io" }
  });

  const file = fs.readFileSync("./example.bin");
  const { meta, price } = await client.Cascade.buildMetadataFromFile(file, { public: false });
  console.log("price uLUME:", price, "meta:", meta);

  // TODO: build MsgRequestAction meta/price → simulate/sign/broadcast using CosmJS
  // const msgs: EncodeObject[] = [buildMsgRequestAction(meta, price, acct.address)];
  // const gas = await chain.Tx.simulate(acct.address, msgs);
  // const signedTx = await signWithWallet(...);
  // const { txHash } = await chain.Tx.broadcast(signedTx);
}
main().catch(err => { console.error(err); process.exit(1); });
