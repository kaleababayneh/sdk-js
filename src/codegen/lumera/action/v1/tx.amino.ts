// @ts-nocheck
/* eslint-disable */
import { MsgUpdateParams, MsgRequestAction, MsgFinalizeAction, MsgApproveAction } from "./tx";
export const AminoConverter = {
  "/lumera.action.v1.MsgUpdateParams": {
    aminoType: "lumera/x/action/v1/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/lumera.action.v1.MsgRequestAction": {
    aminoType: "/lumera.action.v1.MsgRequestAction",
    toAmino: MsgRequestAction.toAmino,
    fromAmino: MsgRequestAction.fromAmino
  },
  "/lumera.action.v1.MsgFinalizeAction": {
    aminoType: "/lumera.action.v1.MsgFinalizeAction",
    toAmino: MsgFinalizeAction.toAmino,
    fromAmino: MsgFinalizeAction.fromAmino
  },
  "/lumera.action.v1.MsgApproveAction": {
    aminoType: "/lumera.action.v1.MsgApproveAction",
    toAmino: MsgApproveAction.toAmino,
    fromAmino: MsgApproveAction.fromAmino
  }
};