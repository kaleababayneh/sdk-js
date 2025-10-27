// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetSuperNodeRequest, QueryGetSuperNodeResponse, QueryGetSuperNodeBySuperNodeAddressRequest, QueryGetSuperNodeBySuperNodeAddressResponse, QueryListSuperNodesRequest, QueryListSuperNodesResponse, QueryGetTopSuperNodesForBlockRequest, QueryGetTopSuperNodesForBlockResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a SuperNode by validatorAddress. */
  getSuperNode(request: QueryGetSuperNodeRequest): Promise<QueryGetSuperNodeResponse>;
  /** Queries a SuperNode by supernodeAddress. */
  getSuperNodeBySuperNodeAddress(request: QueryGetSuperNodeBySuperNodeAddressRequest): Promise<QueryGetSuperNodeBySuperNodeAddressResponse>;
  /** Queries a list of SuperNodes. */
  listSuperNodes(request?: QueryListSuperNodesRequest): Promise<QueryListSuperNodesResponse>;
  /** Queries a list of GetTopSuperNodesForBlock items. */
  getTopSuperNodesForBlock(request: QueryGetTopSuperNodesForBlockRequest): Promise<QueryGetTopSuperNodesForBlockResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* Parameters queries the parameters of the module. */
  params = async (request: QueryParamsRequest = {}): Promise<QueryParamsResponse> => {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  };
  /* Queries a SuperNode by validatorAddress. */
  getSuperNode = async (request: QueryGetSuperNodeRequest): Promise<QueryGetSuperNodeResponse> => {
    const data = QueryGetSuperNodeRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Query", "GetSuperNode", data);
    return promise.then(data => QueryGetSuperNodeResponse.decode(new BinaryReader(data)));
  };
  /* Queries a SuperNode by supernodeAddress. */
  getSuperNodeBySuperNodeAddress = async (request: QueryGetSuperNodeBySuperNodeAddressRequest): Promise<QueryGetSuperNodeBySuperNodeAddressResponse> => {
    const data = QueryGetSuperNodeBySuperNodeAddressRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Query", "GetSuperNodeBySuperNodeAddress", data);
    return promise.then(data => QueryGetSuperNodeBySuperNodeAddressResponse.decode(new BinaryReader(data)));
  };
  /* Queries a list of SuperNodes. */
  listSuperNodes = async (request: QueryListSuperNodesRequest = {
    pagination: undefined
  }): Promise<QueryListSuperNodesResponse> => {
    const data = QueryListSuperNodesRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Query", "ListSuperNodes", data);
    return promise.then(data => QueryListSuperNodesResponse.decode(new BinaryReader(data)));
  };
  /* Queries a list of GetTopSuperNodesForBlock items. */
  getTopSuperNodesForBlock = async (request: QueryGetTopSuperNodesForBlockRequest): Promise<QueryGetTopSuperNodesForBlockResponse> => {
    const data = QueryGetTopSuperNodesForBlockRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Query", "GetTopSuperNodesForBlock", data);
    return promise.then(data => QueryGetTopSuperNodesForBlockResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    getSuperNode(request: QueryGetSuperNodeRequest): Promise<QueryGetSuperNodeResponse> {
      return queryService.getSuperNode(request);
    },
    getSuperNodeBySuperNodeAddress(request: QueryGetSuperNodeBySuperNodeAddressRequest): Promise<QueryGetSuperNodeBySuperNodeAddressResponse> {
      return queryService.getSuperNodeBySuperNodeAddress(request);
    },
    listSuperNodes(request?: QueryListSuperNodesRequest): Promise<QueryListSuperNodesResponse> {
      return queryService.listSuperNodes(request);
    },
    getTopSuperNodesForBlock(request: QueryGetTopSuperNodesForBlockRequest): Promise<QueryGetTopSuperNodesForBlockResponse> {
      return queryService.getTopSuperNodesForBlock(request);
    }
  };
};