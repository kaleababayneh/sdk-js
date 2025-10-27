// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/**
 * @name IPAddressHistory
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.IPAddressHistory
 */
export interface IPAddressHistory {
  address: string;
  height: bigint;
}
export interface IPAddressHistoryProtoMsg {
  typeUrl: "/lumera.supernode.v1.IPAddressHistory";
  value: Uint8Array;
}
/**
 * @name IPAddressHistoryAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.IPAddressHistory
 */
export interface IPAddressHistoryAmino {
  address: string;
  height: string;
}
export interface IPAddressHistoryAminoMsg {
  type: "/lumera.supernode.v1.IPAddressHistory";
  value: IPAddressHistoryAmino;
}
function createBaseIPAddressHistory(): IPAddressHistory {
  return {
    address: "",
    height: BigInt(0)
  };
}
/**
 * @name IPAddressHistory
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.IPAddressHistory
 */
export const IPAddressHistory = {
  typeUrl: "/lumera.supernode.v1.IPAddressHistory",
  is(o: any): o is IPAddressHistory {
    return o && (o.$typeUrl === IPAddressHistory.typeUrl || typeof o.address === "string" && typeof o.height === "bigint");
  },
  isAmino(o: any): o is IPAddressHistoryAmino {
    return o && (o.$typeUrl === IPAddressHistory.typeUrl || typeof o.address === "string" && typeof o.height === "bigint");
  },
  encode(message: IPAddressHistory, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): IPAddressHistory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIPAddressHistory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: DeepPartial<IPAddressHistory>): IPAddressHistory {
    const message = createBaseIPAddressHistory();
    message.address = object.address ?? "";
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: IPAddressHistoryAmino): IPAddressHistory {
    const message = createBaseIPAddressHistory();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: IPAddressHistory): IPAddressHistoryAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: IPAddressHistoryAminoMsg): IPAddressHistory {
    return IPAddressHistory.fromAmino(object.value);
  },
  fromProtoMsg(message: IPAddressHistoryProtoMsg): IPAddressHistory {
    return IPAddressHistory.decode(message.value);
  },
  toProto(message: IPAddressHistory): Uint8Array {
    return IPAddressHistory.encode(message).finish();
  },
  toProtoMsg(message: IPAddressHistory): IPAddressHistoryProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.IPAddressHistory",
      value: IPAddressHistory.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};