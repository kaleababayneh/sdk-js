// @ts-nocheck
/* eslint-disable */
import { buildTx } from "../../helper-func-types";
import { MsgUpdateParams } from "./tx";
/**
 * UpdateParams defines a (governance) operation for updating the module
 * parameters. The authority defaults to the x/gov module account.
 * @name updateParams
 * @package lumera.lumeraid
 * @see proto service: lumera.lumeraid.UpdateParams
 */
export const updateParams = buildTx<MsgUpdateParams>({
  msg: MsgUpdateParams
});