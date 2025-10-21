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
   * Retrieves the current parameters for the action module, including fee schedule.
   *
   * @returns Action module parameters
   * @throws {HttpError} If the LCD query fails
   *
   * @example
   * ```typescript
   * const params = await actionQuery.getParams();
   * console.log("Fee base:", params.fee_base);
   * console.log("Fee per KB:", params.fee_per_kb);
   * ```
   */
  async getParams(): Promise<ActionParams> {
    const response = await this.http.get<{
      params?: {
        fee_base?: string;
        fee_per_kb?: string;
        max_raptor_q_symbols?: string;
      };
    }>("/LumeraProtocol/lumera/action/v1/params");

    return {
      fee_base: response.params?.fee_base ?? "0",
      fee_per_kb: response.params?.fee_per_kb ?? "0",
      max_raptor_q_symbols: response.params?.max_raptor_q_symbols ?? "0",
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
    }>(`/LumeraProtocol/lumera/action/v1/get_action/${actionId}`);

    console.debug("Action query response:", response);

    return {
      id: response.action?.id ?? actionId,
      status: response.action?.status ?? "unknown",
      metadata: response.action?.metadata,
    };
  }

  /**
   * Get the action fee for a given data size.
   *
   * Queries the blockchain to calculate the required fee for an action
   * based on the size of the data being stored.
   *
   * @param dataSize - Size of the data in bytes
   * @returns Object containing the fee amount as a string
   * @throws {HttpError} If the LCD query fails
   *
   * @example
   * ```typescript
   * const feeInfo = await actionQuery.getActionFee(1024000); // 1MB
   * console.log("Fee amount:", feeInfo.amount, "uLUME");
   * ```
   */
  async getActionFee(dataSize: number): Promise<{ amount: string }> {
    const response = await this.http.get<{
      amount?: string;
    }>(`/LumeraProtocol/lumera/action/v1/get_action_fee/${dataSize}`);

    console.debug("Action fee query response:", response);

    return {
      amount: response.amount ?? "0",
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
   * Retrieves the current parameters for the supernode module, including RaptorQ symbol limits.
   *
   * @returns Supernode module parameters
   * @throws {HttpError} If the LCD query fails
   *
   * @example
   * ```typescript
   * const params = await supernodeQuery.getParams();
   * console.log("Max RaptorQ symbols:", params.max_raptor_q_symbols);
   * ```
   */
  async getParams(): Promise<SupernodeParams> {
    const response = await this.http.get<{
      params?: {
        [key: string]: unknown;
      };
    }>("/LumeraProtocol/lumera/supernode/v1/params");

    console.debug("Supernode params response:", response);

    return {
      ...(response.params || {}),
    };
  }

  /**
   * Get a supernode by validator address.
   *
   * Retrieves the details of a specific supernode from the blockchain.
   *
   * @param validatorAddress - The validator address of the supernode
   * @returns Supernode record details
   * @throws {HttpError} If the LCD query fails or supernode is not found
   *
   * @example
   * ```typescript
   * const supernode = await supernodeQuery.getSupernode("lumeravaloper1abc...");
   * console.log("IP:", supernode.ipAddress);
   * ```
   */
  async getSupernode(validatorAddress: string): Promise<import("./interfaces").SupernodeRecord> {
    const response = await this.http.get<{
      supernode?: {
        validatorAddress?: string;
        supernodeAccount?: string;
        ipAddress?: string;
        p2pPort?: string;
        state?: string;
        [key: string]: unknown;
      };
    }>(`/LumeraProtocol/lumera/supernode/v1/get_super_node/${validatorAddress}`);

    console.debug("Supernode query response:", response);

    return {
      validatorAddress: response.supernode?.validatorAddress ?? validatorAddress,
      supernodeAccount: response.supernode?.supernodeAccount ?? "",
      ipAddress: response.supernode?.ipAddress ?? "",
      p2pPort: response.supernode?.p2pPort ?? "",
      state: response.supernode?.state ?? "unknown",
      ...(response.supernode || {}),
    };
  }

  /**
   * Get a supernode by supernode address.
   *
   * Retrieves the details of a specific supernode by its supernode account address.
   *
   * @param supernodeAddress - The supernode account address
   * @returns Supernode record details
   * @throws {HttpError} If the LCD query fails or supernode is not found
   *
   * @example
   * ```typescript
   * const supernode = await supernodeQuery.getSupernodeByAddress("lumera1xyz...");
   * console.log("Validator:", supernode.validatorAddress);
   * ```
   */
  async getSupernodeByAddress(supernodeAddress: string): Promise<import("./interfaces").SupernodeRecord> {
    const response = await this.http.get<{
      supernode?: {
        validatorAddress?: string;
        supernodeAccount?: string;
        ipAddress?: string;
        p2pPort?: string;
        state?: string;
        [key: string]: unknown;
      };
    }>(`/LumeraProtocol/lumera/supernode/v1/get_super_node_by_address/${supernodeAddress}`);

    console.debug("Supernode by address query response:", response);

    return {
      validatorAddress: response.supernode?.validatorAddress ?? "",
      supernodeAccount: response.supernode?.supernodeAccount ?? supernodeAddress,
      ipAddress: response.supernode?.ipAddress ?? "",
      p2pPort: response.supernode?.p2pPort ?? "",
      state: response.supernode?.state ?? "unknown",
      ...(response.supernode || {}),
    };
  }

  /**
   * List all supernodes.
   *
   * Retrieves a list of all registered supernodes from the blockchain.
   *
   * @returns Array of supernode records
   * @throws {HttpError} If the LCD query fails
   *
   * @example
   * ```typescript
   * const supernodes = await supernodeQuery.listSupernodes();
   * console.log(`Found ${supernodes.length} supernodes`);
   * ```
   */
  async listSupernodes(): Promise<import("./interfaces").SupernodeRecord[]> {
    const response = await this.http.get<{
      supernodes?: Array<{
        validatorAddress?: string;
        supernodeAccount?: string;
        ipAddress?: string;
        p2pPort?: string;
        state?: string;
        [key: string]: unknown;
      }>;
    }>("/LumeraProtocol/lumera/supernode/v1/list_super_nodes");

    console.debug("List supernodes response:", response);

    return (response.supernodes || []).map((sn) => ({
      validatorAddress: sn.validatorAddress ?? "",
      supernodeAccount: sn.supernodeAccount ?? "",
      ipAddress: sn.ipAddress ?? "",
      p2pPort: sn.p2pPort ?? "",
      state: sn.state ?? "unknown",
      ...sn,
    }));
  }
}