// @ts-nocheck
/* eslint-disable */
import { MsgUpdateParams, MsgClaim, MsgDelayedClaim } from "./tx";
export const AminoConverter = {
  "/lumera.claim.MsgUpdateParams": {
    aminoType: "/lumera.claim.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/lumera.claim.MsgClaim": {
    aminoType: "/lumera.claim.MsgClaim",
    toAmino: MsgClaim.toAmino,
    fromAmino: MsgClaim.fromAmino
  },
  "/lumera.claim.MsgDelayedClaim": {
    aminoType: "/lumera.claim.MsgDelayedClaim",
    toAmino: MsgDelayedClaim.toAmino,
    fromAmino: MsgDelayedClaim.fromAmino
  }
};