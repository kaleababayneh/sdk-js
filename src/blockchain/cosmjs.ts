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
 * Options for CosmjsTxClient constructor.
 */
export interface CosmjsTxClientOptions {
  /**
   * Gas adjustment multiplier to use when simulation fails.
   * This multiplier is applied to a base gas amount when the gRPC
   * reflection service is unavailable. Default: 1.5
   */
  gasMultiplier?: number;
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
 * const client = new CosmjsTxClient(signingClient, {
 *   gasMultiplier: 1.5
 * });
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
  private readonly gasMultiplier: number;

  /**
   * Create a new CosmJS transaction client
   *
   * @param sg - CosmJS SigningStargateClient instance
   * @param options - Optional configuration
   */
  constructor(
    private readonly sg: SigningStargateClient,
    options?: CosmjsTxClientOptions
  ) {
    this.gasMultiplier = options?.gasMultiplier ?? 1.5;
  }

  /**
   * Simulate a transaction to estimate gas usage.
   *
   * Performs a dry-run of the transaction to estimate the gas required.
   * The returned gas amount should typically be multiplied by a safety factor
   * (e.g., 1.3-1.5) to account for state changes between simulation and execution.
   *
   * Returns `null` if simulation fails due to type resolution errors (indicating
   * that the gRPC reflection service is unavailable). In this case, the caller
   * should use a fallback gas estimate.
   *
   * @param address - Signer's address
   * @param msgs - Transaction messages to simulate
   * @param memo - Transaction memo (optional)
   * @returns Estimated gas amount, or null if simulation is unavailable
   * @throws {Error} If simulation fails for reasons other than type resolution
   *
   * @example
   * ```typescript
   * const estimatedGas = await client.simulate(myAddress, [msgSend], "test");
   * if (estimatedGas !== null) {
   *   const gasWithBuffer = estimatedGas * 13n / 10n; // 30% buffer
   * }
   * ```
   */
  async simulate(
    address: string,
    msgs: readonly EncodeObject[],
    memo = ""
  ): Promise<bigint | null> {
    try {
      const gas = await this.sg.simulate(address, msgs, memo);
      return BigInt(gas);
    } catch (error) {
      // Check if the error is due to type resolution failure (gRPC reflection unavailable)
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("unable to resolve type URL") ||
          errorMessage.includes("cannot resolve type URL") ||
          errorMessage.includes("type URL") && errorMessage.includes("not found")) {
        console.debug("Simulation failed due to type resolution error, REST fallback will be used", errorMessage);
        return null;
      }
      // Re-throw other errors
      throw error;
    }
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

    // Explicitly fetch and validate the signer's account
    const account = await this.sg.getAccount(signerAddress);
    if (!account) {
      throw new Error(`Account '${signerAddress}' not found on chain. Ensure the account is initialized with funds.`);
    }

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
   * Query a transaction by hash.
   *
   * Retrieves the full transaction details including events from the blockchain.
   * This is useful for extracting information from transaction events after broadcasting.
   *
   * @param txHash - Transaction hash (hex string)
   * @returns Transaction response with full details including events
   * @throws {Error} If the query fails or transaction is not found
   *
   * @example
   * ```typescript
   * const txDetails = await client.getTx("ABC123...");
   * console.log("Events:", txDetails.events);
   * ```
   */
  async getTx(txHash: string): Promise<DeliverTxResponse> {
    const tx = await this.sg.getTx(txHash);
    if (!tx) {
      throw new Error(`Transaction ${txHash} not found`);
    }
    
    // Map IndexedTx to DeliverTxResponse
    return {
      code: tx.code,
      height: tx.height,
      txIndex: tx.txIndex,
      events: tx.events,
      rawLog: tx.rawLog,
      transactionHash: tx.hash,
      msgResponses: tx.msgResponses ?? [],
      gasUsed: BigInt(tx.gasUsed),
      gasWanted: BigInt(tx.gasWanted),
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