// @ts-nocheck
/* eslint-disable */
import { buildQuery } from "../../../helper-func-types";
import { QueryParamsRequest, QueryParamsResponse, QueryGetActionRequest, QueryGetActionResponse, QueryGetActionFeeRequest, QueryGetActionFeeResponse, QueryListActionsRequest, QueryListActionsResponse, QueryListActionsByCreatorRequest, QueryListActionsByCreatorResponse, QueryListActionsBySuperNodeRequest, QueryListActionsBySuperNodeResponse, QueryListActionsByBlockHeightRequest, QueryListActionsByBlockHeightResponse, QueryListExpiredActionsRequest, QueryListExpiredActionsResponse, QueryActionByMetadataRequest, QueryActionByMetadataResponse } from "./query";
/**
 * Parameters queries the parameters of the module.
 * @name getParams
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.Params
 */
export const getParams = buildQuery<QueryParamsRequest, QueryParamsResponse>({
  encode: QueryParamsRequest.encode,
  decode: QueryParamsResponse.decode,
  service: "lumera.action.v1.Query",
  method: "Params",
  deps: [QueryParamsRequest, QueryParamsResponse]
});
/**
 * GetAction queries a single action by ID.
 * @name getGetAction
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.GetAction
 */
export const getGetAction = buildQuery<QueryGetActionRequest, QueryGetActionResponse>({
  encode: QueryGetActionRequest.encode,
  decode: QueryGetActionResponse.decode,
  service: "lumera.action.v1.Query",
  method: "GetAction",
  deps: [QueryGetActionRequest, QueryGetActionResponse]
});
/**
 * Queries a list of GetActionFee items.
 * @name getGetActionFee
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.GetActionFee
 */
export const getGetActionFee = buildQuery<QueryGetActionFeeRequest, QueryGetActionFeeResponse>({
  encode: QueryGetActionFeeRequest.encode,
  decode: QueryGetActionFeeResponse.decode,
  service: "lumera.action.v1.Query",
  method: "GetActionFee",
  deps: [QueryGetActionFeeRequest, QueryGetActionFeeResponse]
});
/**
 * List actions with optional type and state filters.
 * @name getListActions
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.ListActions
 */
export const getListActions = buildQuery<QueryListActionsRequest, QueryListActionsResponse>({
  encode: QueryListActionsRequest.encode,
  decode: QueryListActionsResponse.decode,
  service: "lumera.action.v1.Query",
  method: "ListActions",
  deps: [QueryListActionsRequest, QueryListActionsResponse]
});
/**
 * List actions created by a specific address.
 * @name getListActionsByCreator
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.ListActionsByCreator
 */
export const getListActionsByCreator = buildQuery<QueryListActionsByCreatorRequest, QueryListActionsByCreatorResponse>({
  encode: QueryListActionsByCreatorRequest.encode,
  decode: QueryListActionsByCreatorResponse.decode,
  service: "lumera.action.v1.Query",
  method: "ListActionsByCreator",
  deps: [QueryListActionsByCreatorRequest, QueryListActionsByCreatorResponse]
});
/**
 * List actions for a specific supernode.
 * @name getListActionsBySuperNode
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.ListActionsBySuperNode
 */
export const getListActionsBySuperNode = buildQuery<QueryListActionsBySuperNodeRequest, QueryListActionsBySuperNodeResponse>({
  encode: QueryListActionsBySuperNodeRequest.encode,
  decode: QueryListActionsBySuperNodeResponse.decode,
  service: "lumera.action.v1.Query",
  method: "ListActionsBySuperNode",
  deps: [QueryListActionsBySuperNodeRequest, QueryListActionsBySuperNodeResponse]
});
/**
 * List actions created at a specific block height.
 * @name getListActionsByBlockHeight
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.ListActionsByBlockHeight
 */
export const getListActionsByBlockHeight = buildQuery<QueryListActionsByBlockHeightRequest, QueryListActionsByBlockHeightResponse>({
  encode: QueryListActionsByBlockHeightRequest.encode,
  decode: QueryListActionsByBlockHeightResponse.decode,
  service: "lumera.action.v1.Query",
  method: "ListActionsByBlockHeight",
  deps: [QueryListActionsByBlockHeightRequest, QueryListActionsByBlockHeightResponse]
});
/**
 * List expired actions.
 * @name getListExpiredActions
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.ListExpiredActions
 */
export const getListExpiredActions = buildQuery<QueryListExpiredActionsRequest, QueryListExpiredActionsResponse>({
  encode: QueryListExpiredActionsRequest.encode,
  decode: QueryListExpiredActionsResponse.decode,
  service: "lumera.action.v1.Query",
  method: "ListExpiredActions",
  deps: [QueryListExpiredActionsRequest, QueryListExpiredActionsResponse]
});
/**
 * Query actions based on metadata.
 * @name getQueryActionByMetadata
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.QueryActionByMetadata
 */
export const getQueryActionByMetadata = buildQuery<QueryActionByMetadataRequest, QueryActionByMetadataResponse>({
  encode: QueryActionByMetadataRequest.encode,
  decode: QueryActionByMetadataResponse.decode,
  service: "lumera.action.v1.Query",
  method: "QueryActionByMetadata",
  deps: [QueryActionByMetadataRequest, QueryActionByMetadataResponse]
});