// @ts-nocheck
/* eslint-disable */
import { TelescopeGeneratedType } from "../../types";
import { MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/lumera.lumeraid.MsgUpdateParams", MsgUpdateParams]];
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.lumeraid.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.lumeraid.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.lumeraid.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};