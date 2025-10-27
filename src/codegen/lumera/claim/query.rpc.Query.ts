// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryClaimRecordRequest, QueryClaimRecordResponse, QueryListClaimedRequest, QueryListClaimedResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of ClaimRecord items. */
  claimRecord(request: QueryClaimRecordRequest): Promise<QueryClaimRecordResponse>;
  /** Queries a list of ListClaimed items. */
  listClaimed(request: QueryListClaimedRequest): Promise<QueryListClaimedResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* Parameters queries the parameters of the module. */
  params = async (request: QueryParamsRequest = {}): Promise<QueryParamsResponse> => {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.claim.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  };
  /* Queries a list of ClaimRecord items. */
  claimRecord = async (request: QueryClaimRecordRequest): Promise<QueryClaimRecordResponse> => {
    const data = QueryClaimRecordRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.claim.Query", "ClaimRecord", data);
    return promise.then(data => QueryClaimRecordResponse.decode(new BinaryReader(data)));
  };
  /* Queries a list of ListClaimed items. */
  listClaimed = async (request: QueryListClaimedRequest): Promise<QueryListClaimedResponse> => {
    const data = QueryListClaimedRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.claim.Query", "ListClaimed", data);
    return promise.then(data => QueryListClaimedResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    claimRecord(request: QueryClaimRecordRequest): Promise<QueryClaimRecordResponse> {
      return queryService.claimRecord(request);
    },
    listClaimed(request: QueryListClaimedRequest): Promise<QueryListClaimedResponse> {
      return queryService.listClaimed(request);
    }
  };
};