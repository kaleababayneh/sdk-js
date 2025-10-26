// @ts-nocheck
/* eslint-disable */
import { TelescopeGeneratedType } from "../../types";
import { MsgUpdateParams, MsgRegisterSupernode, MsgDeregisterSupernode, MsgStartSupernode, MsgStopSupernode, MsgUpdateSupernode } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/lumera.supernode.MsgUpdateParams", MsgUpdateParams], ["/lumera.supernode.MsgRegisterSupernode", MsgRegisterSupernode], ["/lumera.supernode.MsgDeregisterSupernode", MsgDeregisterSupernode], ["/lumera.supernode.MsgStartSupernode", MsgStartSupernode], ["/lumera.supernode.MsgStopSupernode", MsgStopSupernode], ["/lumera.supernode.MsgUpdateSupernode", MsgUpdateSupernode]];
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.supernode.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    registerSupernode(value: MsgRegisterSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgRegisterSupernode",
        value: MsgRegisterSupernode.encode(value).finish()
      };
    },
    deregisterSupernode(value: MsgDeregisterSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgDeregisterSupernode",
        value: MsgDeregisterSupernode.encode(value).finish()
      };
    },
    startSupernode(value: MsgStartSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgStartSupernode",
        value: MsgStartSupernode.encode(value).finish()
      };
    },
    stopSupernode(value: MsgStopSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgStopSupernode",
        value: MsgStopSupernode.encode(value).finish()
      };
    },
    updateSupernode(value: MsgUpdateSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgUpdateSupernode",
        value: MsgUpdateSupernode.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.supernode.MsgUpdateParams",
        value
      };
    },
    registerSupernode(value: MsgRegisterSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgRegisterSupernode",
        value
      };
    },
    deregisterSupernode(value: MsgDeregisterSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgDeregisterSupernode",
        value
      };
    },
    startSupernode(value: MsgStartSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgStartSupernode",
        value
      };
    },
    stopSupernode(value: MsgStopSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgStopSupernode",
        value
      };
    },
    updateSupernode(value: MsgUpdateSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgUpdateSupernode",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/lumera.supernode.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    registerSupernode(value: MsgRegisterSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgRegisterSupernode",
        value: MsgRegisterSupernode.fromPartial(value)
      };
    },
    deregisterSupernode(value: MsgDeregisterSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgDeregisterSupernode",
        value: MsgDeregisterSupernode.fromPartial(value)
      };
    },
    startSupernode(value: MsgStartSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgStartSupernode",
        value: MsgStartSupernode.fromPartial(value)
      };
    },
    stopSupernode(value: MsgStopSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgStopSupernode",
        value: MsgStopSupernode.fromPartial(value)
      };
    },
    updateSupernode(value: MsgUpdateSupernode) {
      return {
        typeUrl: "/lumera.supernode.MsgUpdateSupernode",
        value: MsgUpdateSupernode.fromPartial(value)
      };
    }
  }
};