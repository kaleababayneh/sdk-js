// @ts-nocheck
/* eslint-disable */
import { buildTx } from "../../helper-func-types";
import { MsgUpdateParams, MsgClaim, MsgDelayedClaim } from "./tx";
/**
 * UpdateParams defines a (governance) operation for updating the module
 * parameters. The authority defaults to the x/gov module account.
 * @name updateParams
 * @package lumera.claim
 * @see proto service: lumera.claim.UpdateParams
 */
export const updateParams = buildTx<MsgUpdateParams>({
  msg: MsgUpdateParams
});
/**
 * @name claim
 * @package lumera.claim
 * @see proto service: lumera.claim.Claim
 */
export const claim = buildTx<MsgClaim>({
  msg: MsgClaim
});
/**
 * @name delayedClaim
 * @package lumera.claim
 * @see proto service: lumera.claim.DelayedClaim
 */
export const delayedClaim = buildTx<MsgDelayedClaim>({
  msg: MsgDelayedClaim
});