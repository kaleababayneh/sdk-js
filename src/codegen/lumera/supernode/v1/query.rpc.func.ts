// @ts-nocheck
/* eslint-disable */
import { buildQuery } from "../../../helper-func-types";
import { QueryParamsRequest, QueryParamsResponse, QueryGetSuperNodeRequest, QueryGetSuperNodeResponse, QueryGetSuperNodeBySuperNodeAddressRequest, QueryGetSuperNodeBySuperNodeAddressResponse, QueryListSuperNodesRequest, QueryListSuperNodesResponse, QueryGetTopSuperNodesForBlockRequest, QueryGetTopSuperNodesForBlockResponse } from "./query";
/**
 * Parameters queries the parameters of the module.
 * @name getParams
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.Params
 */
export const getParams = buildQuery<QueryParamsRequest, QueryParamsResponse>({
  encode: QueryParamsRequest.encode,
  decode: QueryParamsResponse.decode,
  service: "lumera.supernode.v1.Query",
  method: "Params",
  deps: [QueryParamsRequest, QueryParamsResponse]
});
/**
 * Queries a SuperNode by validatorAddress.
 * @name getGetSuperNode
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.GetSuperNode
 */
export const getGetSuperNode = buildQuery<QueryGetSuperNodeRequest, QueryGetSuperNodeResponse>({
  encode: QueryGetSuperNodeRequest.encode,
  decode: QueryGetSuperNodeResponse.decode,
  service: "lumera.supernode.v1.Query",
  method: "GetSuperNode",
  deps: [QueryGetSuperNodeRequest, QueryGetSuperNodeResponse]
});
/**
 * Queries a SuperNode by supernodeAddress.
 * @name getGetSuperNodeBySuperNodeAddress
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.GetSuperNodeBySuperNodeAddress
 */
export const getGetSuperNodeBySuperNodeAddress = buildQuery<QueryGetSuperNodeBySuperNodeAddressRequest, QueryGetSuperNodeBySuperNodeAddressResponse>({
  encode: QueryGetSuperNodeBySuperNodeAddressRequest.encode,
  decode: QueryGetSuperNodeBySuperNodeAddressResponse.decode,
  service: "lumera.supernode.v1.Query",
  method: "GetSuperNodeBySuperNodeAddress",
  deps: [QueryGetSuperNodeBySuperNodeAddressRequest, QueryGetSuperNodeBySuperNodeAddressResponse]
});
/**
 * Queries a list of SuperNodes.
 * @name getListSuperNodes
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.ListSuperNodes
 */
export const getListSuperNodes = buildQuery<QueryListSuperNodesRequest, QueryListSuperNodesResponse>({
  encode: QueryListSuperNodesRequest.encode,
  decode: QueryListSuperNodesResponse.decode,
  service: "lumera.supernode.v1.Query",
  method: "ListSuperNodes",
  deps: [QueryListSuperNodesRequest, QueryListSuperNodesResponse]
});
/**
 * Queries a list of GetTopSuperNodesForBlock items.
 * @name getGetTopSuperNodesForBlock
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.GetTopSuperNodesForBlock
 */
export const getGetTopSuperNodesForBlock = buildQuery<QueryGetTopSuperNodesForBlockRequest, QueryGetTopSuperNodesForBlockResponse>({
  encode: QueryGetTopSuperNodesForBlockRequest.encode,
  decode: QueryGetTopSuperNodesForBlockResponse.decode,
  service: "lumera.supernode.v1.Query",
  method: "GetTopSuperNodesForBlock",
  deps: [QueryGetTopSuperNodesForBlockRequest, QueryGetTopSuperNodesForBlockResponse]
});