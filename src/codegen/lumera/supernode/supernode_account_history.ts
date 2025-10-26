// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../binary";
import { Exact } from "../../helpers";
/**
 * @name SupernodeAccountHistory
 * @package lumera.supernode
 * @see proto type: lumera.supernode.SupernodeAccountHistory
 */
export interface SupernodeAccountHistory {
  account: string;
  height: bigint;
}
export interface SupernodeAccountHistoryProtoMsg {
  typeUrl: "/lumera.supernode.SupernodeAccountHistory";
  value: Uint8Array;
}
/**
 * @name SupernodeAccountHistoryAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.SupernodeAccountHistory
 */
export interface SupernodeAccountHistoryAmino {
  account?: string;
  height?: string;
}
export interface SupernodeAccountHistoryAminoMsg {
  type: "/lumera.supernode.SupernodeAccountHistory";
  value: SupernodeAccountHistoryAmino;
}
/**
 * @name SupernodeAccountHistorySDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.SupernodeAccountHistory
 */
export interface SupernodeAccountHistorySDKType {
  account: string;
  height: bigint;
}
function createBaseSupernodeAccountHistory(): SupernodeAccountHistory {
  return {
    account: "",
    height: BigInt(0)
  };
}
/**
 * @name SupernodeAccountHistory
 * @package lumera.supernode
 * @see proto type: lumera.supernode.SupernodeAccountHistory
 */
export const SupernodeAccountHistory = {
  typeUrl: "/lumera.supernode.SupernodeAccountHistory",
  is(o: any): o is SupernodeAccountHistory {
    return o && (o.$typeUrl === SupernodeAccountHistory.typeUrl || typeof o.account === "string" && typeof o.height === "bigint");
  },
  isSDK(o: any): o is SupernodeAccountHistorySDKType {
    return o && (o.$typeUrl === SupernodeAccountHistory.typeUrl || typeof o.account === "string" && typeof o.height === "bigint");
  },
  isAmino(o: any): o is SupernodeAccountHistoryAmino {
    return o && (o.$typeUrl === SupernodeAccountHistory.typeUrl || typeof o.account === "string" && typeof o.height === "bigint");
  },
  encode(message: SupernodeAccountHistory, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SupernodeAccountHistory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupernodeAccountHistory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.height = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<SupernodeAccountHistory>, I>>(object: I): SupernodeAccountHistory {
    const message = createBaseSupernodeAccountHistory();
    message.account = object.account ?? "";
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SupernodeAccountHistoryAmino): SupernodeAccountHistory {
    const message = createBaseSupernodeAccountHistory();
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: SupernodeAccountHistory): SupernodeAccountHistoryAmino {
    const obj: any = {};
    obj.account = message.account === "" ? undefined : message.account;
    obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SupernodeAccountHistoryAminoMsg): SupernodeAccountHistory {
    return SupernodeAccountHistory.fromAmino(object.value);
  },
  fromProtoMsg(message: SupernodeAccountHistoryProtoMsg): SupernodeAccountHistory {
    return SupernodeAccountHistory.decode(message.value);
  },
  toProto(message: SupernodeAccountHistory): Uint8Array {
    return SupernodeAccountHistory.encode(message).finish();
  },
  toProtoMsg(message: SupernodeAccountHistory): SupernodeAccountHistoryProtoMsg {
    return {
      typeUrl: "/lumera.supernode.SupernodeAccountHistory",
      value: SupernodeAccountHistory.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};