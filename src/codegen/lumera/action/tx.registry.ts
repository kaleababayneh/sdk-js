// @ts-nocheck
/* eslint-disable */
import { TelescopeGeneratedType } from "../../types";
import { MsgUpdateParams, MsgRequestAction, MsgFinalizeAction, MsgApproveAction } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/lumera.action.MsgUpdateParams", MsgUpdateParams], ["/lumera.action.MsgRequestAction", MsgRequestAction], ["/lumera.action.MsgFinalizeAction", MsgFinalizeAction], ["/lumera.action.MsgApproveAction", MsgApproveAction]];
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.action.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    requestAction(value: MsgRequestAction) {
      return {
        typeUrl: "/lumera.action.MsgRequestAction",
        value: MsgRequestAction.encode(value).finish()
      };
    },
    finalizeAction(value: MsgFinalizeAction) {
      return {
        typeUrl: "/lumera.action.MsgFinalizeAction",
        value: MsgFinalizeAction.encode(value).finish()
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/lumera.action.MsgApproveAction",
        value: MsgApproveAction.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.action.MsgUpdateParams",
        value
      };
    },
    requestAction(value: MsgRequestAction) {
      return {
        typeUrl: "/lumera.action.MsgRequestAction",
        value
      };
    },
    finalizeAction(value: MsgFinalizeAction) {
      return {
        typeUrl: "/lumera.action.MsgFinalizeAction",
        value
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/lumera.action.MsgApproveAction",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.action.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    requestAction(value: MsgRequestAction) {
      return {
        typeUrl: "/lumera.action.MsgRequestAction",
        value: MsgRequestAction.fromPartial(value)
      };
    },
    finalizeAction(value: MsgFinalizeAction) {
      return {
        typeUrl: "/lumera.action.MsgFinalizeAction",
        value: MsgFinalizeAction.fromPartial(value)
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/lumera.action.MsgApproveAction",
        value: MsgApproveAction.fromPartial(value)
      };
    }
  }
};