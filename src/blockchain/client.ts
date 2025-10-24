/**
 * Blockchain client facade for the Lumera blockchain.
 * 
 * This module provides the main entry point for blockchain operations, composing
 * transaction and query clients into a unified interface. It orchestrates CosmJS
 * for transaction operations and REST/LCD for module queries.
 * 
 * @module blockchain/client
 */

import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import type { OfflineSigner } from "@cosmjs/proto-signing";
import type { TxClient, ActionQuery, SupernodeQuery, BlockchainClient } from "./interfaces";
import { CosmjsTxClient } from "./cosmjs";
import { RestActionQuery, RestSupernodeQuery } from "./rest";
import { createLumeraRegistry } from "./registry";

/**
 * Implementation of BlockchainClient using CosmJS and REST/LCD.
 * 
 * This class combines a CosmJS transaction client with REST-based query clients
 * to provide a complete blockchain interaction interface. It serves as the facade
 * for all blockchain operations.
 */
export class CosmjsRestBlockchainClient implements BlockchainClient {
  /**
   * Create a new blockchain client instance.
   * 
   * @param Tx - Transaction client for signing and broadcasting
   * @param Action - Action module query client
   * @param Supernode - Supernode module query client
   * @param chainId - Blockchain network identifier
   * @param bech32Address - Signer's bech32 address
   */
  constructor(
    public readonly Tx: TxClient,
    public readonly Action: ActionQuery,
    public readonly Supernode: SupernodeQuery,
    private readonly chainId: string,
    private readonly bech32Address: string,
  ) {}

  /**
   * Get the chain ID.
   * 
   * @returns Chain ID (e.g., "lumera-testnet-2")
   */
  async getChainId(): Promise<string> {
    return this.chainId;
  }

  /**
   * Get the signer's address.
   * 
   * @returns Bech32 address of the account associated with this client
   */
  async getAddress(): Promise<string> {
    return this.bech32Address;
  }
}

/**
 * Configuration options for creating a blockchain client.
 */
export interface BlockchainClientOptions {
  /** Tendermint RPC URL for transaction operations (e.g., "https://rpc.testnet.lumera.io") */
  rpcUrl: string;

  /** LCD REST API URL for query operations (e.g., "https://lcd.testnet.lumera.io") */
  lcdUrl: string;

  /** Blockchain network identifier (e.g., "lumera-testnet-2") */
  chainId: string;

  /** CosmJS offline signer (wallet) for transaction signing */
  signer: OfflineSigner;

  /** Bech32 address of the signing account */
  address: string;

  /** Gas price string (e.g., "0.025ulume"). If not provided, defaults will be used. */
  gasPrice?: string;
}

/**
 * Create a new blockchain client.
 * 
 * This factory function initializes a complete blockchain client with transaction
 * and query capabilities. It connects to the Tendermint RPC for transactions and
 * the LCD REST API for queries.
 * 
 * @param opts - Configuration options for the client
 * @returns Promise resolving to a configured BlockchainClient
 * @throws {Error} If connection to RPC fails or configuration is invalid
 * 
 * @example
 * ```typescript
 * import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
 * import { makeBlockchainClient } from "@lumera/sdk-js";
 * 
 * // Create a wallet
 * const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
 *   prefix: "lumera"
 * });
 * const [account] = await wallet.getAccounts();
 * 
 * // Create the blockchain client
 * const client = await makeBlockchainClient({
 *   rpcUrl: "https://rpc.testnet.lumera.io",
 *   lcdUrl: "https://lcd.testnet.lumera.io",
 *   chainId: "lumera-testnet-2",
 *   signer: wallet,
 *   address: account.address,
 *   gasPrice: "0.025ulume"
 * });
 * 
 * // Query action parameters
 * const params = await client.Action.getParams();
 * console.log("Max RQ IDs:", params.rq_ids_max);
 * 
 * // Simulate and broadcast a transaction
 * const msgs = [buildMsgRequestAction(metadata, price, expirationTime, account.address)];
 * const gas = await client.Tx.simulate(account.address, msgs);
 * const result = await client.Tx.signAndBroadcast(
 *   account.address,
 *   msgs,
 *   { amount: [{ denom: "ulume", amount: "5000" }], gas: gas.toString() }
 * );
 * console.log("TX Hash:", result.txHash);
 * ```
 */
export async function makeBlockchainClient(
  opts: BlockchainClientOptions
): Promise<BlockchainClient> {
  // Create registry with Lumera-specific message types
  const registry = createLumeraRegistry();
  
  // Connect to Tendermint RPC via CosmJS SigningStargateClient
  const signingClient = await SigningStargateClient.connectWithSigner(
    opts.rpcUrl,
    opts.signer,
    {
      registry,
      gasPrice: opts.gasPrice ? GasPrice.fromString(opts.gasPrice) : undefined,
    }
  );

  // Create transaction client
  const txClient = new CosmjsTxClient(signingClient);

  // Create query clients for modules
  const actionQuery = new RestActionQuery(opts.lcdUrl);
  const supernodeQuery = new RestSupernodeQuery(opts.lcdUrl);

  // Compose into the unified blockchain client facade
  return new CosmjsRestBlockchainClient(
    txClient,
    actionQuery,
    supernodeQuery,
    opts.chainId,
    opts.address
  );
}

// Export classes and types for direct use if needed
export { CosmjsTxClient } from "./cosmjs";
export { RestActionQuery, RestSupernodeQuery } from "./rest";
export * from "./interfaces";
export * from "./messages";
export * from "./registry";