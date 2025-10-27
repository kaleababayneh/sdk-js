// @ts-nocheck
/* eslint-disable */
import { buildTx } from "../../../helper-func-types";
import { MsgUpdateParams, MsgRequestAction, MsgFinalizeAction, MsgApproveAction } from "./tx";
/**
 * UpdateParams defines a (governance) operation for updating the module
 * parameters. The authority defaults to the x/gov module account.
 * @name updateParams
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.UpdateParams
 */
export const updateParams = buildTx<MsgUpdateParams>({
  msg: MsgUpdateParams
});
/**
 * RequestAction defines a message for requesting an action.
 * @name requestAction
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.RequestAction
 */
export const requestAction = buildTx<MsgRequestAction>({
  msg: MsgRequestAction
});
/**
 * FinalizeAction defines a message for finalizing an action.
 * @name finalizeAction
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.FinalizeAction
 */
export const finalizeAction = buildTx<MsgFinalizeAction>({
  msg: MsgFinalizeAction
});
/**
 * ApproveAction defines a message for approving an action.
 * @name approveAction
 * @package lumera.action.v1
 * @see proto service: lumera.action.v1.ApproveAction
 */
export const approveAction = buildTx<MsgApproveAction>({
  msg: MsgApproveAction
});