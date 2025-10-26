// @ts-nocheck
/* eslint-disable */
import { buildQuery } from "../../helper-func-types";
import { QueryParamsRequest, QueryParamsResponse, QueryClaimRecordRequest, QueryClaimRecordResponse, QueryListClaimedRequest, QueryListClaimedResponse } from "./query";
/**
 * Parameters queries the parameters of the module.
 * @name getParams
 * @package lumera.claim
 * @see proto service: lumera.claim.Params
 */
export const getParams = buildQuery<QueryParamsRequest, QueryParamsResponse>({
  encode: QueryParamsRequest.encode,
  decode: QueryParamsResponse.decode,
  service: "lumera.claim.Query",
  method: "Params",
  deps: [QueryParamsRequest, QueryParamsResponse]
});
/**
 * Queries a list of ClaimRecord items.
 * @name getClaimRecord
 * @package lumera.claim
 * @see proto service: lumera.claim.ClaimRecord
 */
export const getClaimRecord = buildQuery<QueryClaimRecordRequest, QueryClaimRecordResponse>({
  encode: QueryClaimRecordRequest.encode,
  decode: QueryClaimRecordResponse.decode,
  service: "lumera.claim.Query",
  method: "ClaimRecord",
  deps: [QueryClaimRecordRequest, QueryClaimRecordResponse]
});
/**
 * Queries a list of ListClaimed items.
 * @name getListClaimed
 * @package lumera.claim
 * @see proto service: lumera.claim.ListClaimed
 */
export const getListClaimed = buildQuery<QueryListClaimedRequest, QueryListClaimedResponse>({
  encode: QueryListClaimedRequest.encode,
  decode: QueryListClaimedResponse.decode,
  service: "lumera.claim.Query",
  method: "ListClaimed",
  deps: [QueryListClaimedRequest, QueryListClaimedResponse]
});