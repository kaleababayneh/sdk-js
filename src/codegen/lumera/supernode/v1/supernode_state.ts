// @ts-nocheck
/* eslint-disable */
import { isSet, DeepPartial } from "../../../helpers";
import { BinaryReader, BinaryWriter } from "../../../binary";
export enum SuperNodeState {
  SUPERNODE_STATE_UNSPECIFIED = 0,
  SUPERNODE_STATE_ACTIVE = 1,
  SUPERNODE_STATE_DISABLED = 2,
  SUPERNODE_STATE_STOPPED = 3,
  SUPERNODE_STATE_PENALIZED = 4,
  UNRECOGNIZED = -1,
}
export const SuperNodeStateAmino = SuperNodeState;
export function superNodeStateFromJSON(object: any): SuperNodeState {
  switch (object) {
    case 0:
    case "SUPERNODE_STATE_UNSPECIFIED":
      return SuperNodeState.SUPERNODE_STATE_UNSPECIFIED;
    case 1:
    case "SUPERNODE_STATE_ACTIVE":
      return SuperNodeState.SUPERNODE_STATE_ACTIVE;
    case 2:
    case "SUPERNODE_STATE_DISABLED":
      return SuperNodeState.SUPERNODE_STATE_DISABLED;
    case 3:
    case "SUPERNODE_STATE_STOPPED":
      return SuperNodeState.SUPERNODE_STATE_STOPPED;
    case 4:
    case "SUPERNODE_STATE_PENALIZED":
      return SuperNodeState.SUPERNODE_STATE_PENALIZED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SuperNodeState.UNRECOGNIZED;
  }
}
export function superNodeStateToJSON(object: SuperNodeState): string {
  switch (object) {
    case SuperNodeState.SUPERNODE_STATE_UNSPECIFIED:
      return "SUPERNODE_STATE_UNSPECIFIED";
    case SuperNodeState.SUPERNODE_STATE_ACTIVE:
      return "SUPERNODE_STATE_ACTIVE";
    case SuperNodeState.SUPERNODE_STATE_DISABLED:
      return "SUPERNODE_STATE_DISABLED";
    case SuperNodeState.SUPERNODE_STATE_STOPPED:
      return "SUPERNODE_STATE_STOPPED";
    case SuperNodeState.SUPERNODE_STATE_PENALIZED:
      return "SUPERNODE_STATE_PENALIZED";
    case SuperNodeState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * @name SuperNodeStateRecord
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SuperNodeStateRecord
 */
export interface SuperNodeStateRecord {
  state: SuperNodeState;
  height: bigint;
}
export interface SuperNodeStateRecordProtoMsg {
  typeUrl: "/lumera.supernode.v1.SuperNodeStateRecord";
  value: Uint8Array;
}
/**
 * @name SuperNodeStateRecordAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SuperNodeStateRecord
 */
export interface SuperNodeStateRecordAmino {
  state: SuperNodeState;
  height: string;
}
export interface SuperNodeStateRecordAminoMsg {
  type: "/lumera.supernode.v1.SuperNodeStateRecord";
  value: SuperNodeStateRecordAmino;
}
function createBaseSuperNodeStateRecord(): SuperNodeStateRecord {
  return {
    state: 0,
    height: BigInt(0)
  };
}
/**
 * @name SuperNodeStateRecord
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SuperNodeStateRecord
 */
export const SuperNodeStateRecord = {
  typeUrl: "/lumera.supernode.v1.SuperNodeStateRecord",
  is(o: any): o is SuperNodeStateRecord {
    return o && (o.$typeUrl === SuperNodeStateRecord.typeUrl || isSet(o.state) && typeof o.height === "bigint");
  },
  isAmino(o: any): o is SuperNodeStateRecordAmino {
    return o && (o.$typeUrl === SuperNodeStateRecord.typeUrl || isSet(o.state) && typeof o.height === "bigint");
  },
  encode(message: SuperNodeStateRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SuperNodeStateRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperNodeStateRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.int32() as any;
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
  fromPartial(object: DeepPartial<SuperNodeStateRecord>): SuperNodeStateRecord {
    const message = createBaseSuperNodeStateRecord();
    message.state = object.state ?? 0;
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SuperNodeStateRecordAmino): SuperNodeStateRecord {
    const message = createBaseSuperNodeStateRecord();
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: SuperNodeStateRecord): SuperNodeStateRecordAmino {
    const obj: any = {};
    obj.state = message.state === 0 ? undefined : message.state;
    obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SuperNodeStateRecordAminoMsg): SuperNodeStateRecord {
    return SuperNodeStateRecord.fromAmino(object.value);
  },
  fromProtoMsg(message: SuperNodeStateRecordProtoMsg): SuperNodeStateRecord {
    return SuperNodeStateRecord.decode(message.value);
  },
  toProto(message: SuperNodeStateRecord): Uint8Array {
    return SuperNodeStateRecord.encode(message).finish();
  },
  toProtoMsg(message: SuperNodeStateRecord): SuperNodeStateRecordProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.SuperNodeStateRecord",
      value: SuperNodeStateRecord.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};