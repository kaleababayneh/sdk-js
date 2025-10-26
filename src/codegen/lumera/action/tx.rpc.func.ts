// @ts-nocheck
/* eslint-disable */
import { buildTx } from "../../helper-func-types";
import { MsgUpdateParams, MsgRequestAction, MsgFinalizeAction, MsgApproveAction } from "./tx";
/**
 * UpdateParams defines a (governance) operation for updating the module
 * parameters. The authority defaults to the x/gov module account.
 * @name updateParams
 * @package lumera.action
 * @see proto service: lumera.action.UpdateParams
 */
export const updateParams = buildTx<MsgUpdateParams>({
  msg: MsgUpdateParams
});
/**
 * @name requestAction
 * @package lumera.action
 * @see proto service: lumera.action.RequestAction
 */
export const requestAction = buildTx<MsgRequestAction>({
  msg: MsgRequestAction
});
/**
 * @name finalizeAction
 * @package lumera.action
 * @see proto service: lumera.action.FinalizeAction
 */
export const finalizeAction = buildTx<MsgFinalizeAction>({
  msg: MsgFinalizeAction
});
/**
 * @name approveAction
 * @package lumera.action
 * @see proto service: lumera.action.ApproveAction
 */
export const approveAction = buildTx<MsgApproveAction>({
  msg: MsgApproveAction
});