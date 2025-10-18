import type { BlockchainClient } from "./blockchain/interfaces";
import { LumeraCascadeClient, type CascadeClientOptions } from "./cascade/client";

export type LumeraClientOptions = {
  chain: BlockchainClient;
  cascade: Omit<CascadeClientOptions, "chain"> & { snapiBaseUrl: string };
};

export class LumeraClient {
  readonly Blockchain: BlockchainClient;
  readonly Cascade: LumeraCascadeClient;

  constructor(opts: LumeraClientOptions) {
    this.Blockchain = opts.chain;
    this.Cascade = new LumeraCascadeClient({ ...opts.cascade, chain: opts.chain });
  }
}
