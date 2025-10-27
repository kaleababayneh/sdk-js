// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetActionRequest, QueryGetActionResponse, QueryGetActionFeeRequest, QueryGetActionFeeResponse, QueryListActionsRequest, QueryListActionsResponse, QueryListActionsBySuperNodeRequest, QueryListActionsBySuperNodeResponse, QueryListActionsByBlockHeightRequest, QueryListActionsByBlockHeightResponse, QueryListExpiredActionsRequest, QueryListExpiredActionsResponse, QueryActionByMetadataRequest, QueryActionByMetadataResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** GetAction queries a single action by ID. */
  getAction(request: QueryGetActionRequest): Promise<QueryGetActionResponse>;
  /** Queries a list of GetActionFee items. */
  getActionFee(request: QueryGetActionFeeRequest): Promise<QueryGetActionFeeResponse>;
  /** List actions with optional type and state filters. */
  listActions(request: QueryListActionsRequest): Promise<QueryListActionsResponse>;
  /** List actions for a specific supernode. */
  listActionsBySuperNode(request: QueryListActionsBySuperNodeRequest): Promise<QueryListActionsBySuperNodeResponse>;
  /** List actions created at a specific block height. */
  listActionsByBlockHeight(request: QueryListActionsByBlockHeightRequest): Promise<QueryListActionsByBlockHeightResponse>;
  /** List expired actions. */
  listExpiredActions(request?: QueryListExpiredActionsRequest): Promise<QueryListExpiredActionsResponse>;
  /** Query actions based on metadata. */
  queryActionByMetadata(request: QueryActionByMetadataRequest): Promise<QueryActionByMetadataResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* Parameters queries the parameters of the module. */
  params = async (request: QueryParamsRequest = {}): Promise<QueryParamsResponse> => {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  };
  /* GetAction queries a single action by ID. */
  getAction = async (request: QueryGetActionRequest): Promise<QueryGetActionResponse> => {
    const data = QueryGetActionRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "GetAction", data);
    return promise.then(data => QueryGetActionResponse.decode(new BinaryReader(data)));
  };
  /* Queries a list of GetActionFee items. */
  getActionFee = async (request: QueryGetActionFeeRequest): Promise<QueryGetActionFeeResponse> => {
    const data = QueryGetActionFeeRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "GetActionFee", data);
    return promise.then(data => QueryGetActionFeeResponse.decode(new BinaryReader(data)));
  };
  /* List actions with optional type and state filters. */
  listActions = async (request: QueryListActionsRequest): Promise<QueryListActionsResponse> => {
    const data = QueryListActionsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "ListActions", data);
    return promise.then(data => QueryListActionsResponse.decode(new BinaryReader(data)));
  };
  /* List actions for a specific supernode. */
  listActionsBySuperNode = async (request: QueryListActionsBySuperNodeRequest): Promise<QueryListActionsBySuperNodeResponse> => {
    const data = QueryListActionsBySuperNodeRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "ListActionsBySuperNode", data);
    return promise.then(data => QueryListActionsBySuperNodeResponse.decode(new BinaryReader(data)));
  };
  /* List actions created at a specific block height. */
  listActionsByBlockHeight = async (request: QueryListActionsByBlockHeightRequest): Promise<QueryListActionsByBlockHeightResponse> => {
    const data = QueryListActionsByBlockHeightRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "ListActionsByBlockHeight", data);
    return promise.then(data => QueryListActionsByBlockHeightResponse.decode(new BinaryReader(data)));
  };
  /* List expired actions. */
  listExpiredActions = async (request: QueryListExpiredActionsRequest = {
    pagination: undefined
  }): Promise<QueryListExpiredActionsResponse> => {
    const data = QueryListExpiredActionsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "ListExpiredActions", data);
    return promise.then(data => QueryListExpiredActionsResponse.decode(new BinaryReader(data)));
  };
  /* Query actions based on metadata. */
  queryActionByMetadata = async (request: QueryActionByMetadataRequest): Promise<QueryActionByMetadataResponse> => {
    const data = QueryActionByMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Query", "QueryActionByMetadata", data);
    return promise.then(data => QueryActionByMetadataResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    getAction(request: QueryGetActionRequest): Promise<QueryGetActionResponse> {
      return queryService.getAction(request);
    },
    getActionFee(request: QueryGetActionFeeRequest): Promise<QueryGetActionFeeResponse> {
      return queryService.getActionFee(request);
    },
    listActions(request: QueryListActionsRequest): Promise<QueryListActionsResponse> {
      return queryService.listActions(request);
    },
    listActionsBySuperNode(request: QueryListActionsBySuperNodeRequest): Promise<QueryListActionsBySuperNodeResponse> {
      return queryService.listActionsBySuperNode(request);
    },
    listActionsByBlockHeight(request: QueryListActionsByBlockHeightRequest): Promise<QueryListActionsByBlockHeightResponse> {
      return queryService.listActionsByBlockHeight(request);
    },
    listExpiredActions(request?: QueryListExpiredActionsRequest): Promise<QueryListExpiredActionsResponse> {
      return queryService.listExpiredActions(request);
    },
    queryActionByMetadata(request: QueryActionByMetadataRequest): Promise<QueryActionByMetadataResponse> {
      return queryService.queryActionByMetadata(request);
    }
  };
};