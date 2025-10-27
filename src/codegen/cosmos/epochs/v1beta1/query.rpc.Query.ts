// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryEpochInfosRequest, QueryEpochInfosResponse, QueryCurrentEpochRequest, QueryCurrentEpochResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** EpochInfos provide running epochInfos */
  epochInfos(request?: QueryEpochInfosRequest): Promise<QueryEpochInfosResponse>;
  /** CurrentEpoch provide current epoch of specified identifier */
  currentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* EpochInfos provide running epochInfos */
  epochInfos = async (request: QueryEpochInfosRequest = {}): Promise<QueryEpochInfosResponse> => {
    const data = QueryEpochInfosRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.epochs.v1beta1.Query", "EpochInfos", data);
    return promise.then(data => QueryEpochInfosResponse.decode(new BinaryReader(data)));
  };
  /* CurrentEpoch provide current epoch of specified identifier */
  currentEpoch = async (request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse> => {
    const data = QueryCurrentEpochRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.epochs.v1beta1.Query", "CurrentEpoch", data);
    return promise.then(data => QueryCurrentEpochResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    epochInfos(request?: QueryEpochInfosRequest): Promise<QueryEpochInfosResponse> {
      return queryService.epochInfos(request);
    },
    currentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse> {
      return queryService.currentEpoch(request);
    }
  };
};