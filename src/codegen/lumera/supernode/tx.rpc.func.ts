// @ts-nocheck
/* eslint-disable */
import { buildTx } from "../../helper-func-types";
import { MsgUpdateParams, MsgRegisterSupernode, MsgDeregisterSupernode, MsgStartSupernode, MsgStopSupernode, MsgUpdateSupernode } from "./tx";
/**
 * UpdateParams defines a (governance) operation for updating the module
 * parameters. The authority defaults to the x/gov module account.
 * @name updateParams
 * @package lumera.supernode
 * @see proto service: lumera.supernode.UpdateParams
 */
export const updateParams = buildTx<MsgUpdateParams>({
  msg: MsgUpdateParams
});
/**
 * @name registerSupernode
 * @package lumera.supernode
 * @see proto service: lumera.supernode.RegisterSupernode
 */
export const registerSupernode = buildTx<MsgRegisterSupernode>({
  msg: MsgRegisterSupernode
});
/**
 * @name deregisterSupernode
 * @package lumera.supernode
 * @see proto service: lumera.supernode.DeregisterSupernode
 */
export const deregisterSupernode = buildTx<MsgDeregisterSupernode>({
  msg: MsgDeregisterSupernode
});
/**
 * @name startSupernode
 * @package lumera.supernode
 * @see proto service: lumera.supernode.StartSupernode
 */
export const startSupernode = buildTx<MsgStartSupernode>({
  msg: MsgStartSupernode
});
/**
 * @name stopSupernode
 * @package lumera.supernode
 * @see proto service: lumera.supernode.StopSupernode
 */
export const stopSupernode = buildTx<MsgStopSupernode>({
  msg: MsgStopSupernode
});
/**
 * @name updateSupernode
 * @package lumera.supernode
 * @see proto service: lumera.supernode.UpdateSupernode
 */
export const updateSupernode = buildTx<MsgUpdateSupernode>({
  msg: MsgUpdateSupernode
});