// @ts-nocheck
/* eslint-disable */
import { buildQuery } from "../../helper-func-types";
import { QueryParamsRequest, QueryParamsResponse, QueryGetActionRequest, QueryGetActionResponse, QueryGetActionFeeRequest, QueryGetActionFeeResponse, QueryListActionsRequest, QueryListActionsResponse, QueryListActionsBySuperNodeRequest, QueryListActionsByBlockHeightRequest, QueryListExpiredActionsRequest, QueryActionByMetadataRequest } from "./query";
/**
 * Parameters queries the parameters of the module.
 * @name getParams
 * @package lumera.action
 * @see proto service: lumera.action.Params
 */
export const getParams = buildQuery<QueryParamsRequest, QueryParamsResponse>({
  encode: QueryParamsRequest.encode,
  decode: QueryParamsResponse.decode,
  service: "lumera.action.Query",
  method: "Params",
  deps: [QueryParamsRequest, QueryParamsResponse]
});
/**
 * GetAction queries a single action by ID.
 * @name getGetAction
 * @package lumera.action
 * @see proto service: lumera.action.GetAction
 */
export const getGetAction = buildQuery<QueryGetActionRequest, QueryGetActionResponse>({
  encode: QueryGetActionRequest.encode,
  decode: QueryGetActionResponse.decode,
  service: "lumera.action.Query",
  method: "GetAction",
  deps: [QueryGetActionRequest, QueryGetActionResponse]
});
/**
 * Queries a list of GetActionFee items.
 * @name getGetActionFee
 * @package lumera.action
 * @see proto service: lumera.action.GetActionFee
 */
export const getGetActionFee = buildQuery<QueryGetActionFeeRequest, QueryGetActionFeeResponse>({
  encode: QueryGetActionFeeRequest.encode,
  decode: QueryGetActionFeeResponse.decode,
  service: "lumera.action.Query",
  method: "GetActionFee",
  deps: [QueryGetActionFeeRequest, QueryGetActionFeeResponse]
});
/**
 * List actions with optional type and state filters.
 * @name getListActions
 * @package lumera.action
 * @see proto service: lumera.action.ListActions
 */
export const getListActions = buildQuery<QueryListActionsRequest, QueryListActionsResponse>({
  encode: QueryListActionsRequest.encode,
  decode: QueryListActionsResponse.decode,
  service: "lumera.action.Query",
  method: "ListActions",
  deps: [QueryListActionsRequest, QueryListActionsResponse]
});
/**
 * List actions for a specific supernode.
 * @name getListActionsBySuperNode
 * @package lumera.action
 * @see proto service: lumera.action.ListActionsBySuperNode
 */
export const getListActionsBySuperNode = buildQuery<QueryListActionsBySuperNodeRequest, QueryListActionsResponse>({
  encode: QueryListActionsBySuperNodeRequest.encode,
  decode: QueryListActionsResponse.decode,
  service: "lumera.action.Query",
  method: "ListActionsBySuperNode",
  deps: [QueryListActionsBySuperNodeRequest, QueryListActionsResponse]
});
/**
 * List actions created at a specific block height.
 * @name getListActionsByBlockHeight
 * @package lumera.action
 * @see proto service: lumera.action.ListActionsByBlockHeight
 */
export const getListActionsByBlockHeight = buildQuery<QueryListActionsByBlockHeightRequest, QueryListActionsResponse>({
  encode: QueryListActionsByBlockHeightRequest.encode,
  decode: QueryListActionsResponse.decode,
  service: "lumera.action.Query",
  method: "ListActionsByBlockHeight",
  deps: [QueryListActionsByBlockHeightRequest, QueryListActionsResponse]
});
/**
 * List expired actions.
 * @name getListExpiredActions
 * @package lumera.action
 * @see proto service: lumera.action.ListExpiredActions
 */
export const getListExpiredActions = buildQuery<QueryListExpiredActionsRequest, QueryListActionsResponse>({
  encode: QueryListExpiredActionsRequest.encode,
  decode: QueryListActionsResponse.decode,
  service: "lumera.action.Query",
  method: "ListExpiredActions",
  deps: [QueryListExpiredActionsRequest, QueryListActionsResponse]
});
/**
 * Query actions based on metadata.
 * @name getQueryActionByMetadata
 * @package lumera.action
 * @see proto service: lumera.action.QueryActionByMetadata
 */
export const getQueryActionByMetadata = buildQuery<QueryActionByMetadataRequest, QueryListActionsResponse>({
  encode: QueryActionByMetadataRequest.encode,
  decode: QueryListActionsResponse.decode,
  service: "lumera.action.Query",
  method: "QueryActionByMetadata",
  deps: [QueryActionByMetadataRequest, QueryListActionsResponse]
});