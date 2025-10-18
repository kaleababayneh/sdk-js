export interface TxClient {
  simulate(address: string, msgs: readonly import("@cosmjs/stargate").EncodeObject[], memo?: string): Promise<bigint>;
  broadcast(signedTx: Uint8Array, mode?: "sync" | "async" | "block"): Promise<{ txHash: string; height?: bigint }>;
}

export interface ActionParams {
  rq_ids_max: number;
  fee_base: string;     // uLUME
  fee_per_kb: string;   // uLUME
}
export interface ActionRecord {
  id: string;
  status: string;
  metadata: unknown;
}

export interface ActionQuery {
  getParams(): Promise<ActionParams>;
  getAction(actionId: string): Promise<ActionRecord>;
}

export interface SupernodeParams { [k: string]: unknown }
export interface SupernodeQuery {
  getParams(): Promise<SupernodeParams>;
}

export interface BlockchainClient {
  readonly Tx: TxClient;
  readonly Action: ActionQuery;
  readonly Supernode: SupernodeQuery;
  getChainId(): Promise<string>;
  getAddress(): Promise<string>;
}
