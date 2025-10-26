// @ts-nocheck
/* eslint-disable */
import { MsgUpdateParams, MsgRequestAction, MsgFinalizeAction, MsgApproveAction } from "./tx";
export const AminoConverter = {
  "/lumera.action.MsgUpdateParams": {
    aminoType: "lumera/x/action/v1/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/lumera.action.MsgRequestAction": {
    aminoType: "/lumera.action.MsgRequestAction",
    toAmino: MsgRequestAction.toAmino,
    fromAmino: MsgRequestAction.fromAmino
  },
  "/lumera.action.MsgFinalizeAction": {
    aminoType: "/lumera.action.MsgFinalizeAction",
    toAmino: MsgFinalizeAction.toAmino,
    fromAmino: MsgFinalizeAction.fromAmino
  },
  "/lumera.action.MsgApproveAction": {
    aminoType: "/lumera.action.MsgApproveAction",
    toAmino: MsgApproveAction.toAmino,
    fromAmino: MsgApproveAction.fromAmino
  }
};