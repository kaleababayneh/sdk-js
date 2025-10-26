/**
 * REST/LCD utilities for Lumera blockchain.
 *
 * This module provides REST-based fallback utilities for blockchain operations.
 * The primary query clients have been replaced with RPC-based implementations.
 *
 * @module blockchain/rest
 */

import { HttpClient } from "../internal/http";
import { toBase64 } from "@cosmjs/encoding";

/**
 * Broadcast a signed transaction via the REST endpoint.
 *
 * This function provides a fallback mechanism for broadcasting transactions
 * when gRPC/Tendermint RPC is unavailable or when simulation fails due to
 * type resolution errors.
 *
 * @param lcdBaseUrl - Base URL of the LCD REST API
 * @param signedTx - Signed transaction bytes
 * @param mode - Broadcast mode ("sync", "async", or "block")
 * @returns Transaction hash and height
 * @throws {HttpError} If the REST broadcast fails
 *
 * @example
 * ```typescript
 * const result = await broadcastTx(
 *   "https://lcd.testnet.lumera.io",
 *   signedTxBytes,
 *   "sync"
 * );
 * console.log("TX Hash:", result.txHash);
 * ```
 */
export async function broadcastTx(
  lcdBaseUrl: string,
  signedTx: Uint8Array,
  mode: "sync" | "async" | "block" = "sync"
): Promise<{ txHash: string; height?: bigint }> {
  const http = new HttpClient({
    baseUrl: lcdBaseUrl,
    timeout: 30000, // Longer timeout for block mode
    retry: {
      maxAttempts: 3,
      initialDelay: 1000,
    },
  });

  // Convert mode to the format expected by the REST API
  const broadcastMode = mode === "block" ? "BROADCAST_MODE_BLOCK" :
                        mode === "async" ? "BROADCAST_MODE_ASYNC" :
                        "BROADCAST_MODE_SYNC";

  const response = await http.post<{
    tx_response?: {
      txhash?: string;
      height?: string;
      code?: number;
      raw_log?: string;
    };
  }>("/cosmos/tx/v1beta1/txs", {
    tx_bytes: toBase64(signedTx),
    mode: broadcastMode,
  });

  console.debug("REST broadcast response:", response);

  if (!response.tx_response) {
    throw new Error("Invalid response from REST broadcast endpoint");
  }

  const txResponse = response.tx_response;

  // Check for transaction errors
  if (txResponse.code && txResponse.code !== 0) {
    throw new Error(`Transaction failed: ${txResponse.raw_log || "Unknown error"}`);
  }

  return {
    txHash: txResponse.txhash ?? "",
    height: txResponse.height ? BigInt(txResponse.height) : undefined,
  };
}