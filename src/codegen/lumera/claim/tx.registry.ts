// @ts-nocheck
/* eslint-disable */
import { TelescopeGeneratedType } from "../../types";
import { MsgUpdateParams, MsgClaim, MsgDelayedClaim } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/lumera.claim.MsgUpdateParams", MsgUpdateParams], ["/lumera.claim.MsgClaim", MsgClaim], ["/lumera.claim.MsgDelayedClaim", MsgDelayedClaim]];
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.claim.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/lumera.claim.MsgClaim",
        value: MsgClaim.encode(value).finish()
      };
    },
    delayedClaim(value: MsgDelayedClaim) {
      return {
        typeUrl: "/lumera.claim.MsgDelayedClaim",
        value: MsgDelayedClaim.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.claim.MsgUpdateParams",
        value
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/lumera.claim.MsgClaim",
        value
      };
    },
    delayedClaim(value: MsgDelayedClaim) {
      return {
        typeUrl: "/lumera.claim.MsgDelayedClaim",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.claim.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/lumera.claim.MsgClaim",
        value: MsgClaim.fromPartial(value)
      };
    },
    delayedClaim(value: MsgDelayedClaim) {
      return {
        typeUrl: "/lumera.claim.MsgDelayedClaim",
        value: MsgDelayedClaim.fromPartial(value)
      };
    }
  }
};