// @ts-nocheck
/* eslint-disable */
import { buildQuery } from "../../helper-func-types";
import { QueryParamsRequest, QueryParamsResponse } from "./query";
/**
 * Parameters queries the parameters of the module.
 * @name getParams
 * @package lumera.lumeraid
 * @see proto service: lumera.lumeraid.Params
 */
export const getParams = buildQuery<QueryParamsRequest, QueryParamsResponse>({
  encode: QueryParamsRequest.encode,
  decode: QueryParamsResponse.decode,
  service: "lumera.lumeraid.Query",
  method: "Params",
  deps: [QueryParamsRequest, QueryParamsResponse]
});