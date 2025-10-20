/**
 * CosmJS transaction client for the Lumera blockchain.
 * 
 * This module provides a wrapper around CosmJS's SigningStargateClient for transaction
 * operations including simulation, signing, and broadcasting.
 * 
 * @module blockchain/cosmjs
 */

import { SigningStargateClient, type StdFee, type DeliverTxResponse } from "@cosmjs/stargate";
import type { EncodeObject } from "@cosmjs/proto-signing";
import type { TxClient } from "./interfaces";

/**
 * Transaction broadcast result
 */
export interface BroadcastResult {
  /** Transaction hash */
  txHash: string;
  /** Block height where transaction was included */
  height: bigint;
  /** Full delivery response from the chain */
  response: DeliverTxResponse;
}

/**
 * CosmJS-based transaction client for Lumera blockchain.
 * 
 * Wraps CosmJS's SigningStargateClient to provide transaction simulation,
 * signing, and broadcasting capabilities. Handles gas estimation and
 * transaction lifecycle management.
 * 
 * @example
 * ```typescript
 * const client = new CosmjsTxClient(signingClient);
 * 
 * // Simulate to estimate gas
 * const gasEstimate = await client.simulate(address, msgs, "memo");
 * 
 * // Sign and broadcast
 * const result = await client.signAndBroadcast(
 *   address,
 *   msgs,
 *   { amount: [{ denom: "ulume", amount: "5000" }], gas: "200000" },
 *   "Transaction memo"
 * );
 * console.log("TX Hash:", result.txHash);
 * ```
 */
export class CosmjsTxClient implements TxClient {
  /**
   * Create a new CosmJS transaction client
   * 
   * @param sg - CosmJS SigningStargateClient instance
   */
  constructor(private readonly sg: SigningStargateClient) {}

  /**
   * Simulate a transaction to estimate gas usage.
   * 
   * Performs a dry-run of the transaction to estimate the gas required.
   * The returned gas amount should typically be multiplied by a safety factor
   * (e.g., 1.3-1.5) to account for state changes between simulation and execution.
   * 
   * @param address - Signer's address
   * @param msgs - Transaction messages to simulate
   * @param memo - Transaction memo (optional)
   * @returns Estimated gas amount
   * @throws {Error} If simulation fails
   * 
   * @example
   * ```typescript
   * const estimatedGas = await client.simulate(myAddress, [msgSend], "test");
   * const gasWithBuffer = estimatedGas * 13n / 10n; // 30% buffer
   * ```
   */
  async simulate(
    address: string,
    msgs: readonly EncodeObject[],
    memo = ""
  ): Promise<bigint> {
    const gas = await this.sg.simulate(address, msgs, memo);
    return BigInt(gas);
  }

  /**
   * Broadcast a pre-signed transaction.
   * 
   * Sends a signed transaction to the blockchain. This is a low-level method;
   * prefer using `signAndBroadcast` for most use cases.
   * 
   * @param signedTx - Signed transaction bytes
   * @param mode - Broadcast mode ("sync", "async", or "block")
   * @returns Broadcast result with transaction hash and height
   * @throws {Error} If broadcast fails
   * 
   * @example
   * ```typescript
   * const result = await client.broadcast(signedTxBytes, "sync");
   * console.log("TX:", result.txHash);
   * ```
   */
  async broadcast(
    signedTx: Uint8Array,
    mode: "sync" | "async" | "block" = "sync"
  ): Promise<{ txHash: string; height?: bigint }> {
    const res = await this.sg.broadcastTx(signedTx);
    return {
      txHash: res.transactionHash,
      height: BigInt(res.height ?? 0),
    };
  }

  /**
   * Sign and broadcast a transaction in one step.
   * 
   * This is the recommended method for sending transactions. It handles the entire
   * transaction lifecycle: signing with the wallet, broadcasting to the chain, and
   * waiting for confirmation (in "block" mode).
   * 
   * @param signerAddress - Address of the transaction signer
   * @param messages - Array of Cosmos messages to include in the transaction
   * @param fee - Transaction fee (gas amount and denomination)
   * @param memo - Optional transaction memo
   * @param timeoutHeight - Optional transaction timeout height
   * @returns Broadcast result with full delivery response
   * @throws {Error} If signing or broadcasting fails
   * 
   * @example
   * ```typescript
   * const result = await client.signAndBroadcast(
   *   myAddress,
   *   [msgRegisterAction],
   *   { amount: [{ denom: "ulume", amount: "10000" }], gas: "300000" },
   *   "Register cascade action"
   * );
   * 
   * if (result.response.code === 0) {
   *   console.log("Success! TX:", result.txHash);
   * } else {
   *   console.error("Failed:", result.response.rawLog);
   * }
   * ```
   */
  async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo?: string,
    timeoutHeight?: bigint
  ): Promise<BroadcastResult> {
    console.debug("signAndBroadcast diagnostics", {
      signerAddress,
      gasType: typeof fee?.gas,
      timeoutHeightType: typeof timeoutHeight,
      timeoutHeightValue: timeoutHeight?.toString(),
    });

    const response = await this.sg.signAndBroadcast(
      signerAddress,
      messages,
      fee,
      memo,
      timeoutHeight
    );

    console.debug("signAndBroadcast summary", {
      signer: signerAddress,
      memo,
      timeoutHeight,
      txHash: response.transactionHash,
    });

    return {
      txHash: response.transactionHash,
      height: BigInt(response.height),
      response,
    };
  }

  /**
   * Get the underlying SigningStargateClient.
   * 
   * Provides access to the raw CosmJS client for advanced use cases
   * not covered by this wrapper.
   * 
   * @returns The underlying SigningStargateClient instance
   */
  getStargateClient(): SigningStargateClient {
    return this.sg;
  }

  /**
   * Disconnect and clean up resources.
   * 
   * Should be called when the client is no longer needed to properly
   * close connections.
   */
  async disconnect(): Promise<void> {
    await this.sg.disconnect();
  }
}