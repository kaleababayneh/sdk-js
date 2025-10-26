// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetActionRequest, QueryGetActionResponse, QueryGetActionFeeRequest, QueryGetActionFeeResponse, QueryListActionsRequest, QueryListActionsResponse, QueryListActionsBySuperNodeRequest, QueryListActionsByBlockHeightRequest, QueryListExpiredActionsRequest, QueryActionByMetadataRequest } from "./query";
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
  listActionsBySuperNode(request: QueryListActionsBySuperNodeRequest): Promise<QueryListActionsResponse>;
  /** List actions created at a specific block height. */
  listActionsByBlockHeight(request: QueryListActionsByBlockHeightRequest): Promise<QueryListActionsResponse>;
  /** List expired actions. */
  listExpiredActions(request?: QueryListExpiredActionsRequest): Promise<QueryListActionsResponse>;
  /** Query actions based on metadata. */
  queryActionByMetadata(request: QueryActionByMetadataRequest): Promise<QueryListActionsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.getAction = this.getAction.bind(this);
    this.getActionFee = this.getActionFee.bind(this);
    this.listActions = this.listActions.bind(this);
    this.listActionsBySuperNode = this.listActionsBySuperNode.bind(this);
    this.listActionsByBlockHeight = this.listActionsByBlockHeight.bind(this);
    this.listExpiredActions = this.listExpiredActions.bind(this);
    this.queryActionByMetadata = this.queryActionByMetadata.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  getAction(request: QueryGetActionRequest): Promise<QueryGetActionResponse> {
    const data = QueryGetActionRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "GetAction", data);
    return promise.then(data => QueryGetActionResponse.decode(new BinaryReader(data)));
  }
  getActionFee(request: QueryGetActionFeeRequest): Promise<QueryGetActionFeeResponse> {
    const data = QueryGetActionFeeRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "GetActionFee", data);
    return promise.then(data => QueryGetActionFeeResponse.decode(new BinaryReader(data)));
  }
  listActions(request: QueryListActionsRequest): Promise<QueryListActionsResponse> {
    const data = QueryListActionsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "ListActions", data);
    return promise.then(data => QueryListActionsResponse.decode(new BinaryReader(data)));
  }
  listActionsBySuperNode(request: QueryListActionsBySuperNodeRequest): Promise<QueryListActionsResponse> {
    const data = QueryListActionsBySuperNodeRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "ListActionsBySuperNode", data);
    return promise.then(data => QueryListActionsResponse.decode(new BinaryReader(data)));
  }
  listActionsByBlockHeight(request: QueryListActionsByBlockHeightRequest): Promise<QueryListActionsResponse> {
    const data = QueryListActionsByBlockHeightRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "ListActionsByBlockHeight", data);
    return promise.then(data => QueryListActionsResponse.decode(new BinaryReader(data)));
  }
  listExpiredActions(request: QueryListExpiredActionsRequest = {
    pagination: undefined
  }): Promise<QueryListActionsResponse> {
    const data = QueryListExpiredActionsRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "ListExpiredActions", data);
    return promise.then(data => QueryListActionsResponse.decode(new BinaryReader(data)));
  }
  queryActionByMetadata(request: QueryActionByMetadataRequest): Promise<QueryListActionsResponse> {
    const data = QueryActionByMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Query", "QueryActionByMetadata", data);
    return promise.then(data => QueryListActionsResponse.decode(new BinaryReader(data)));
  }
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
    listActionsBySuperNode(request: QueryListActionsBySuperNodeRequest): Promise<QueryListActionsResponse> {
      return queryService.listActionsBySuperNode(request);
    },
    listActionsByBlockHeight(request: QueryListActionsByBlockHeightRequest): Promise<QueryListActionsResponse> {
      return queryService.listActionsByBlockHeight(request);
    },
    listExpiredActions(request?: QueryListExpiredActionsRequest): Promise<QueryListActionsResponse> {
      return queryService.listExpiredActions(request);
    },
    queryActionByMetadata(request: QueryActionByMetadataRequest): Promise<QueryListActionsResponse> {
      return queryService.queryActionByMetadata(request);
    }
  };
};