// @ts-nocheck
/* eslint-disable */
import { MsgUpdateParams, MsgRegisterSupernode, MsgDeregisterSupernode, MsgStartSupernode, MsgStopSupernode, MsgUpdateSupernode } from "./tx";
export const AminoConverter = {
  "/lumera.supernode.MsgUpdateParams": {
    aminoType: "lumera/x/supernode/v1/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/lumera.supernode.MsgRegisterSupernode": {
    aminoType: "/lumera.supernode.MsgRegisterSupernode",
    toAmino: MsgRegisterSupernode.toAmino,
    fromAmino: MsgRegisterSupernode.fromAmino
  },
  "/lumera.supernode.MsgDeregisterSupernode": {
    aminoType: "/lumera.supernode.MsgDeregisterSupernode",
    toAmino: MsgDeregisterSupernode.toAmino,
    fromAmino: MsgDeregisterSupernode.fromAmino
  },
  "/lumera.supernode.MsgStartSupernode": {
    aminoType: "/lumera.supernode.MsgStartSupernode",
    toAmino: MsgStartSupernode.toAmino,
    fromAmino: MsgStartSupernode.fromAmino
  },
  "/lumera.supernode.MsgStopSupernode": {
    aminoType: "/lumera.supernode.MsgStopSupernode",
    toAmino: MsgStopSupernode.toAmino,
    fromAmino: MsgStopSupernode.fromAmino
  },
  "/lumera.supernode.MsgUpdateSupernode": {
    aminoType: "/lumera.supernode.MsgUpdateSupernode",
    toAmino: MsgUpdateSupernode.toAmino,
    fromAmino: MsgUpdateSupernode.fromAmino
  }
};