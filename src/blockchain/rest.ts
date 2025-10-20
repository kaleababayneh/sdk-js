/**
 * REST/LCD query clients for Lumera blockchain modules.
 * 
 * These clients provide read-only access to on-chain state via the LCD (Light Client Daemon) REST API.
 * Uses the HttpClient from the Internal Layer for automatic retries and error handling.
 * 
 * @module blockchain/rest
 */

import { HttpClient } from "../internal/http";
import type { ActionParams, ActionRecord, ActionQuery, SupernodeParams, SupernodeQuery } from "./interfaces";

/**
 * REST query client for the Action module.
 * 
 * Provides methods to query action parameters and individual action records from the blockchain.
 * All queries are performed via the LCD REST API.
 * 
 * @example
 * ```typescript
 * const client = new RestActionQuery("https://lcd.testnet.lumera.io");
 * const params = await client.getParams();
 * console.log("Max RQ IDs:", params.rq_ids_max);
 * ```
 */
export class RestActionQuery implements ActionQuery {
  private readonly http: HttpClient;

  /**
   * Create a new REST Action query client
   * 
   * @param lcdBaseUrl - Base URL of the LCD REST API (e.g., "https://lcd.testnet.lumera.io")
   */
  constructor(lcdBaseUrl: string) {
    this.http = new HttpClient({
      baseUrl: lcdBaseUrl,
      timeout: 10000,
      retry: {
        maxAttempts: 3,
        initialDelay: 1000,
      },
    });
  }

  /**
   * Get action module parameters.
   * 
   * Retrieves the current parameters for the action module, including fee schedule and RQ ID limits.
   * 
   * @returns Action module parameters
   * @throws {HttpError} If the LCD query fails
   * 
   * @example
   * ```typescript
   * const params = await actionQuery.getParams();
   * console.log("Fee base:", params.fee_base);
   * console.log("Fee per KB:", params.fee_per_kb);
   * console.log("Max RQ IDs:", params.rq_ids_max);
   * ```
   */
  async getParams(): Promise<ActionParams> {
    const response = await this.http.get<{
      params?: {
        rq_ids_max?: number | string;
        fee_base?: string;
        fee_per_kb?: string;
      };
    }>("/lumera/action/v1/params");

    return {
      rq_ids_max: Number(response.params?.rq_ids_max ?? 100),
      fee_base: response.params?.fee_base ?? "0",
      fee_per_kb: response.params?.fee_per_kb ?? "0",
    };
  }

  /**
   * Get an action record by ID.
   * 
   * Retrieves the details of a specific action from the blockchain, including its current status and metadata.
   * 
   * @param actionId - The unique identifier of the action
   * @returns Action record details
   * @throws {HttpError} If the LCD query fails or action is not found
   * 
   * @example
   * ```typescript
   * const action = await actionQuery.getAction("action123");
   * console.log("Status:", action.status);
   * console.log("Metadata:", action.metadata);
   * ```
   */
  async getAction(actionId: string): Promise<ActionRecord> {
    const response = await this.http.get<{
      action?: {
        id?: string;
        status?: string;
        metadata?: unknown;
      };
    }>(`/lumera/action/v1/action/${actionId}`);

    return {
      id: response.action?.id ?? actionId,
      status: response.action?.status ?? "unknown",
      metadata: response.action?.metadata,
    };
  }
}

/**
 * REST query client for the Supernode module.
 * 
 * Provides methods to query supernode parameters from the blockchain.
 * All queries are performed via the LCD REST API.
 * 
 * @example
 * ```typescript
 * const client = new RestSupernodeQuery("https://lcd.testnet.lumera.io");
 * const params = await client.getParams();
 * console.log("Supernode params:", params);
 * ```
 */
export class RestSupernodeQuery implements SupernodeQuery {
  private readonly http: HttpClient;

  /**
   * Create a new REST Supernode query client
   * 
   * @param lcdBaseUrl - Base URL of the LCD REST API (e.g., "https://lcd.testnet.lumera.io")
   */
  constructor(lcdBaseUrl: string) {
    this.http = new HttpClient({
      baseUrl: lcdBaseUrl,
      timeout: 10000,
      retry: {
        maxAttempts: 3,
        initialDelay: 1000,
      },
    });
  }

  /**
   * Get supernode module parameters.
   * 
   * Retrieves the current parameters for the supernode module.
   * 
   * @returns Supernode module parameters
   * @throws {HttpError} If the LCD query fails
   * 
   * @example
   * ```typescript
   * const params = await supernodeQuery.getParams();
   * console.log("Params:", params);
   * ```
   */
  async getParams(): Promise<SupernodeParams> {
    const response = await this.http.get<{
      params?: SupernodeParams;
    }>("/lumera/supernode/v1/params");

    return response.params ?? {};
  }
}