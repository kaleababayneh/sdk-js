// @ts-nocheck
/* eslint-disable */
import { buildTx } from "../../../helper-func-types";
import { MsgUpdateParams, MsgRegisterSupernode, MsgDeregisterSupernode, MsgStartSupernode, MsgStopSupernode, MsgUpdateSupernode, MsgReportSupernodeMetrics } from "./tx";
/**
 * UpdateParams defines a (governance) operation for updating the module
 * parameters. The authority defaults to the x/gov module account.
 * @name updateParams
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.UpdateParams
 */
export const updateParams = buildTx<MsgUpdateParams>({
  msg: MsgUpdateParams
});
/**
 * @name registerSupernode
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.RegisterSupernode
 */
export const registerSupernode = buildTx<MsgRegisterSupernode>({
  msg: MsgRegisterSupernode
});
/**
 * @name deregisterSupernode
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.DeregisterSupernode
 */
export const deregisterSupernode = buildTx<MsgDeregisterSupernode>({
  msg: MsgDeregisterSupernode
});
/**
 * @name startSupernode
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.StartSupernode
 */
export const startSupernode = buildTx<MsgStartSupernode>({
  msg: MsgStartSupernode
});
/**
 * @name stopSupernode
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.StopSupernode
 */
export const stopSupernode = buildTx<MsgStopSupernode>({
  msg: MsgStopSupernode
});
/**
 * @name updateSupernode
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.UpdateSupernode
 */
export const updateSupernode = buildTx<MsgUpdateSupernode>({
  msg: MsgUpdateSupernode
});
/**
 * @name reportSupernodeMetrics
 * @package lumera.supernode.v1
 * @see proto service: lumera.supernode.v1.ReportSupernodeMetrics
 */
export const reportSupernodeMetrics = buildTx<MsgReportSupernodeMetrics>({
  msg: MsgReportSupernodeMetrics
});