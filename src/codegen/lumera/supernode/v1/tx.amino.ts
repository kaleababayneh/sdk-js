// @ts-nocheck
/* eslint-disable */
import { MsgUpdateParams, MsgRegisterSupernode, MsgDeregisterSupernode, MsgStartSupernode, MsgStopSupernode, MsgUpdateSupernode, MsgReportSupernodeMetrics } from "./tx";
export const AminoConverter = {
  "/lumera.supernode.v1.MsgUpdateParams": {
    aminoType: "lumera/x/supernode/v1/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/lumera.supernode.v1.MsgRegisterSupernode": {
    aminoType: "/lumera.supernode.v1.MsgRegisterSupernode",
    toAmino: MsgRegisterSupernode.toAmino,
    fromAmino: MsgRegisterSupernode.fromAmino
  },
  "/lumera.supernode.v1.MsgDeregisterSupernode": {
    aminoType: "/lumera.supernode.v1.MsgDeregisterSupernode",
    toAmino: MsgDeregisterSupernode.toAmino,
    fromAmino: MsgDeregisterSupernode.fromAmino
  },
  "/lumera.supernode.v1.MsgStartSupernode": {
    aminoType: "/lumera.supernode.v1.MsgStartSupernode",
    toAmino: MsgStartSupernode.toAmino,
    fromAmino: MsgStartSupernode.fromAmino
  },
  "/lumera.supernode.v1.MsgStopSupernode": {
    aminoType: "/lumera.supernode.v1.MsgStopSupernode",
    toAmino: MsgStopSupernode.toAmino,
    fromAmino: MsgStopSupernode.fromAmino
  },
  "/lumera.supernode.v1.MsgUpdateSupernode": {
    aminoType: "/lumera.supernode.v1.MsgUpdateSupernode",
    toAmino: MsgUpdateSupernode.toAmino,
    fromAmino: MsgUpdateSupernode.fromAmino
  },
  "/lumera.supernode.v1.MsgReportSupernodeMetrics": {
    aminoType: "/lumera.supernode.v1.MsgReportSupernodeMetrics",
    toAmino: MsgReportSupernodeMetrics.toAmino,
    fromAmino: MsgReportSupernodeMetrics.fromAmino
  }
};