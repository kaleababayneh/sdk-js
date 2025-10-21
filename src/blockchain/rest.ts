/**
 * REST/LCD query clients for Lumera blockchain modules.
 *
 * These clients provide read-only access to on-chain state via the LCD (Light Client Daemon) REST API.
 * Uses the HttpClient from the Internal Layer for automatic retries and error handling.
 *
 * @module blockchain/rest
 */

import { HttpClient } from "../internal/http";
import type { 
  ActionParams, 
  ActionRecord, 
  ActionQuery, 
  SupernodeParams, 
  SupernodeQuery,
  SuperNodeStateRecord,
  IPAddressHistory,
  Evidence,
  MetricsAggregate,
  SupernodeAccountHistory,
} from "./interfaces";
import { decodeActionMetadata } from "./prototypes";

/**
 * Helper function to get the current value from a historical array.
 * Finds the entry with the highest block height.
 * 
 * @param history - Array of objects with height property
 * @returns The entry with the highest height, or undefined if array is empty
 */
function getCurrentFromHistory<T extends { height: number | string }>(
  history: T[] | undefined
): T | undefined {
  if (!history || history.length === 0) return undefined;
  
  return history.reduce((current, item) => {
    const itemHeight = typeof item.height === 'string' ? parseInt(item.height, 10) : item.height;
    const currentHeight = typeof current.height === 'string' ? parseInt(current.height, 10) : current.height;
    return itemHeight > currentHeight ? item : current;
  });
}

/**
 * Type definition for the raw supernode API response.
 */
interface RawSupernodeResponse {
  validator_address?: string;
  supernode_account?: string;
  p2p_port?: string;
  states?: Array<{
    state?: string;
    height?: string;
  }>;
  evidence?: Array<{
    reporter_address?: string;
    validator_address?: string;
    action_id?: string;
    evidence_type?: string;
    description?: string;
    severity?: string;
    height?: string;
  }>;
  prev_ip_addresses?: Array<{
    address?: string;
    height?: string;
  }>;
  note?: string;
  metrics?: {
    metrics?: Record<string, string>;
    report_count?: string;
    height?: string;
  };
  prev_supernode_accounts?: Array<{
    account?: string;
    height?: string;
  }>;
}

/**
 * Parse a raw supernode API response into a SupernodeRecord.
 * 
 * @param sn - Raw supernode data from the API
 * @returns Parsed SupernodeRecord
 */
function parseSupernodeResponse(sn: RawSupernodeResponse): import("./interfaces").SupernodeRecord {
  // Parse states array
  const states: SuperNodeStateRecord[] = (sn.states || []).map((s) => ({
    state: (s.state as any) ?? "SUPERNODE_STATE_UNSPECIFIED",
    height: parseInt(s.height ?? "0", 10),
  }));

  // Parse evidence array
  const evidence: Evidence[] = (sn.evidence || []).map((e) => ({
    reporterAddress: e.reporter_address ?? "",
    validatorAddress: e.validator_address ?? "",
    actionId: e.action_id ?? "",
    evidenceType: e.evidence_type ?? "",
    description: e.description ?? "",
    severity: parseInt(e.severity ?? "0", 10),
    height: parseInt(e.height ?? "0", 10),
  }));

  // Parse IP address history
  const prevIpAddresses: IPAddressHistory[] = (sn.prev_ip_addresses || []).map((ip) => ({
    address: ip.address ?? "",
    height: parseInt(ip.height ?? "0", 10),
  }));

  // Parse supernode account history
  const prevSupernodeAccounts: SupernodeAccountHistory[] = (sn.prev_supernode_accounts || []).map((acc) => ({
    account: acc.account ?? "",
    height: parseInt(acc.height ?? "0", 10),
  }));

  // Parse metrics
  const metricsData = sn.metrics?.metrics || {};
  const metrics: MetricsAggregate = {
    metrics: Object.fromEntries(
      Object.entries(metricsData).map(([key, value]) => [key, parseFloat(value ?? "0")])
    ),
    reportCount: parseInt(sn.metrics?.report_count ?? "0", 10),
    height: parseInt(sn.metrics?.height ?? "0", 10),
  };

  return {
    validatorAddress: sn.validator_address ?? "",
    supernodeAccount: sn.supernode_account ?? "",
    p2pPort: sn.p2p_port ?? "",
    states,
    evidence,
    prevIpAddresses,
    note: sn.note ?? "",
    metrics,
    prevSupernodeAccounts,
  };
}

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
   * The metadata field is automatically decoded from Base64 and deserialized based on the action type.
   *
   * @param actionId - The unique identifier of the action
   * @returns Action record details with deserialized metadata
   * @throws {HttpError} If the LCD query fails or action is not found
   * @throws {Error} If metadata decoding fails
   *
   * @example
   * ```typescript
   * const action = await actionQuery.getAction("1111");
   * console.log("State:", action.state);
   * if (action.actionType === ActionType.CASCADE) {
   *   const cascadeMetadata = action.metadata as CascadeMetadata;
   *   console.log("File:", cascadeMetadata.file_name);
   * }
   * ```
   */
  async getAction(actionId: string): Promise<ActionRecord> {
    const response = await this.http.get<{
      action?: {
        creator?: string;
        actionID?: string;
        actionType?: string;
        metadata?: string;
        price?: {
          denom?: string;
          amount?: string;
        };
        expirationTime?: string;
        state?: string;
        blockHeight?: string;
        superNodes?: string[];
      };
    }>(`/LumeraProtocol/lumera/action/v1/get_action/${actionId}`);

    console.debug("Action query response:", response);

    if (!response.action) {
      throw new Error(`Action not found: ${actionId}`);
    }

    const action = response.action;

    // Decode the Base64 metadata into the appropriate type
    const decodedMetadata = decodeActionMetadata({
      actionType: action.actionType ?? "ACTION_TYPE_UNSPECIFIED",
      metadata: action.metadata ?? "",
    });

    return {
      creator: action.creator ?? "",
      actionID: action.actionID ?? actionId,
      actionType: action.actionType as any,
      metadata: decodedMetadata,
      price: action.price
        ? `${action.price.amount ?? "0"}${action.price.denom ?? "ulume"}`
        : "0ulume",
      expirationTime: parseInt(action.expirationTime ?? "0", 10),
      state: action.state as any,
      blockHeight: parseInt(action.blockHeight ?? "0", 10),
      superNodes: action.superNodes ?? [],
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
   * console.log("IP:", supernode.prevIpAddresses);
   * ```
   */
  async getSupernode(validatorAddress: string): Promise<import("./interfaces").SupernodeRecord> {
    const response = await this.http.get<{
      supernode?: RawSupernodeResponse;
    }>(`/LumeraProtocol/lumera/supernode/v1/get_super_node/${validatorAddress}`);

    console.debug("Supernode query response:", response);

    if (!response.supernode) {
      throw new Error(`Supernode not found: ${validatorAddress}`);
    }

    return parseSupernodeResponse(response.supernode);
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
      supernode?: RawSupernodeResponse;
    }>(`/LumeraProtocol/lumera/supernode/v1/get_super_node_by_address/${supernodeAddress}`);

    console.debug("Supernode by address query response:", response);

    if (!response.supernode) {
      throw new Error(`Supernode not found: ${supernodeAddress}`);
    }

    return parseSupernodeResponse(response.supernode);
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
      supernodes?: RawSupernodeResponse[];
    }>("/LumeraProtocol/lumera/supernode/v1/list_super_nodes");

    console.debug("List supernodes response:", response);

    return (response.supernodes || []).map(parseSupernodeResponse);
  }
}