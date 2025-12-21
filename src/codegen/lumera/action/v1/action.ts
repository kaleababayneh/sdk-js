// @ts-nocheck
/* eslint-disable */
import { ActionType } from "./action_type";
import { ActionState } from "./action_state";
import { isSet, DeepPartial, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * Action represents a specific action within the Lumera protocol.
 * @name Action
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.Action
 */
export interface Action {
  creator: string;
  actionID: string;
  actionType: ActionType;
  metadata: Uint8Array;
  price: string;
  expirationTime: bigint;
  state: ActionState;
  blockHeight: bigint;
  superNodes: string[];
  fileSizeKbs: bigint;
}
export interface ActionProtoMsg {
  typeUrl: "/lumera.action.v1.Action";
  value: Uint8Array;
}
/**
 * Action represents a specific action within the Lumera protocol.
 * @name ActionAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.Action
 */
export interface ActionAmino {
  creator: string;
  actionID: string;
  actionType: ActionType;
  metadata: string;
  price: string;
  expirationTime: string;
  state: ActionState;
  blockHeight: string;
  superNodes: string[];
  fileSizeKbs: string;
}
export interface ActionAminoMsg {
  type: "/lumera.action.v1.Action";
  value: ActionAmino;
}
function createBaseAction(): Action {
  return {
    creator: "",
    actionID: "",
    actionType: 0,
    metadata: new Uint8Array(),
    price: "",
    expirationTime: BigInt(0),
    state: 0,
    blockHeight: BigInt(0),
    superNodes: [],
    fileSizeKbs: BigInt(0)
  };
}
/**
 * Action represents a specific action within the Lumera protocol.
 * @name Action
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.Action
 */
export const Action = {
  typeUrl: "/lumera.action.v1.Action",
  is(o: any): o is Action {
    return o && (o.$typeUrl === Action.typeUrl || typeof o.creator === "string" && typeof o.actionID === "string" && isSet(o.actionType) && (o.metadata instanceof Uint8Array || typeof o.metadata === "string") && typeof o.price === "string" && typeof o.expirationTime === "bigint" && isSet(o.state) && typeof o.blockHeight === "bigint" && Array.isArray(o.superNodes) && (!o.superNodes.length || typeof o.superNodes[0] === "string") && typeof o.fileSizeKbs === "bigint");
  },
  isAmino(o: any): o is ActionAmino {
    return o && (o.$typeUrl === Action.typeUrl || typeof o.creator === "string" && typeof o.actionID === "string" && isSet(o.actionType) && (o.metadata instanceof Uint8Array || typeof o.metadata === "string") && typeof o.price === "string" && typeof o.expirationTime === "bigint" && isSet(o.state) && typeof o.blockHeight === "bigint" && Array.isArray(o.superNodes) && (!o.superNodes.length || typeof o.superNodes[0] === "string") && typeof o.fileSizeKbs === "bigint");
  },
  encode(message: Action, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionID !== "") {
      writer.uint32(18).string(message.actionID);
    }
    if (message.actionType !== 0) {
      writer.uint32(24).int32(message.actionType);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(34).bytes(message.metadata);
    }
    if (message.price !== "") {
      writer.uint32(42).string(message.price);
    }
    if (message.expirationTime !== BigInt(0)) {
      writer.uint32(48).int64(message.expirationTime);
    }
    if (message.state !== 0) {
      writer.uint32(56).int32(message.state);
    }
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(64).int64(message.blockHeight);
    }
    for (const v of message.superNodes) {
      writer.uint32(74).string(v!);
    }
    if (message.fileSizeKbs !== BigInt(0)) {
      writer.uint32(80).int64(message.fileSizeKbs);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Action {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionID = reader.string();
          break;
        case 3:
          message.actionType = reader.int32() as any;
          break;
        case 4:
          message.metadata = reader.bytes();
          break;
        case 5:
          message.price = reader.string();
          break;
        case 6:
          message.expirationTime = reader.int64();
          break;
        case 7:
          message.state = reader.int32() as any;
          break;
        case 8:
          message.blockHeight = reader.int64();
          break;
        case 9:
          message.superNodes.push(reader.string());
          break;
        case 10:
          message.fileSizeKbs = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Action>): Action {
    const message = createBaseAction();
    message.creator = object.creator ?? "";
    message.actionID = object.actionID ?? "";
    message.actionType = object.actionType ?? 0;
    message.metadata = object.metadata ?? new Uint8Array();
    message.price = object.price ?? "";
    message.expirationTime = object.expirationTime !== undefined && object.expirationTime !== null ? BigInt(object.expirationTime.toString()) : BigInt(0);
    message.state = object.state ?? 0;
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.superNodes = object.superNodes?.map(e => e) || [];
    message.fileSizeKbs = object.fileSizeKbs !== undefined && object.fileSizeKbs !== null ? BigInt(object.fileSizeKbs.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ActionAmino): Action {
    const message = createBaseAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.actionID !== undefined && object.actionID !== null) {
      message.actionID = object.actionID;
    }
    if (object.actionType !== undefined && object.actionType !== null) {
      message.actionType = object.actionType;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = bytesFromBase64(object.metadata);
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.expirationTime !== undefined && object.expirationTime !== null) {
      message.expirationTime = BigInt(object.expirationTime);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = BigInt(object.blockHeight);
    }
    message.superNodes = object.superNodes?.map(e => e) || [];
    if (object.fileSizeKbs !== undefined && object.fileSizeKbs !== null) {
      message.fileSizeKbs = BigInt(object.fileSizeKbs);
    }
    return message;
  },
  toAmino(message: Action): ActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.actionID = message.actionID === "" ? undefined : message.actionID;
    obj.actionType = message.actionType === 0 ? undefined : message.actionType;
    obj.metadata = message.metadata ? base64FromBytes(message.metadata) : undefined;
    obj.price = message.price === "" ? undefined : message.price;
    obj.expirationTime = message.expirationTime !== BigInt(0) ? message.expirationTime?.toString() : undefined;
    obj.state = message.state === 0 ? undefined : message.state;
    obj.blockHeight = message.blockHeight !== BigInt(0) ? message.blockHeight?.toString() : undefined;
    if (message.superNodes) {
      obj.superNodes = message.superNodes.map(e => e);
    } else {
      obj.superNodes = message.superNodes;
    }
    obj.fileSizeKbs = message.fileSizeKbs !== BigInt(0) ? message.fileSizeKbs?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ActionAminoMsg): Action {
    return Action.fromAmino(object.value);
  },
  fromProtoMsg(message: ActionProtoMsg): Action {
    return Action.decode(message.value);
  },
  toProto(message: Action): Uint8Array {
    return Action.encode(message).finish();
  },
  toProtoMsg(message: Action): ActionProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.Action",
      value: Action.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};