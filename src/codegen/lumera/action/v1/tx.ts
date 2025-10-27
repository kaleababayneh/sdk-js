// @ts-nocheck
/* eslint-disable */
import { Params, ParamsAmino } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { DeepPartial } from "../../../helpers";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgUpdateParams
 */
export interface MsgUpdateParams {
  /**
   * authority is the address that controls the module (defaults to x/gov unless overwritten).
   */
  authority: string;
  /**
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/lumera.action.v1.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgUpdateParams
 */
export interface MsgUpdateParamsAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless overwritten).
   */
  authority: string;
  /**
   * NOTE: All parameters must be supplied.
   */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "lumera/x/action/v1/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/lumera.action.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/lumera.action.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgRequestAction is the Msg/RequestAction request type.
 * @name MsgRequestAction
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgRequestAction
 */
export interface MsgRequestAction {
  creator: string;
  actionType: string;
  metadata: string;
  price: string;
  expirationTime: string;
}
export interface MsgRequestActionProtoMsg {
  typeUrl: "/lumera.action.v1.MsgRequestAction";
  value: Uint8Array;
}
/**
 * MsgRequestAction is the Msg/RequestAction request type.
 * @name MsgRequestActionAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgRequestAction
 */
export interface MsgRequestActionAmino {
  creator: string;
  actionType: string;
  metadata: string;
  price: string;
  expirationTime: string;
}
export interface MsgRequestActionAminoMsg {
  type: "/lumera.action.v1.MsgRequestAction";
  value: MsgRequestActionAmino;
}
/**
 * MsgRequestActionResponse defines the response structure for executing a MsgRequestAction
 * @name MsgRequestActionResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgRequestActionResponse
 */
export interface MsgRequestActionResponse {
  actionId: string;
  status: string;
}
export interface MsgRequestActionResponseProtoMsg {
  typeUrl: "/lumera.action.v1.MsgRequestActionResponse";
  value: Uint8Array;
}
/**
 * MsgRequestActionResponse defines the response structure for executing a MsgRequestAction
 * @name MsgRequestActionResponseAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgRequestActionResponse
 */
export interface MsgRequestActionResponseAmino {
  actionId: string;
  status: string;
}
export interface MsgRequestActionResponseAminoMsg {
  type: "/lumera.action.v1.MsgRequestActionResponse";
  value: MsgRequestActionResponseAmino;
}
/**
 * MsgFinalizeAction is the Msg/FinalizeAction request type.
 * @name MsgFinalizeAction
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgFinalizeAction
 */
export interface MsgFinalizeAction {
  /**
   * must be supernode address
   */
  creator: string;
  actionId: string;
  actionType: string;
  metadata: string;
}
export interface MsgFinalizeActionProtoMsg {
  typeUrl: "/lumera.action.v1.MsgFinalizeAction";
  value: Uint8Array;
}
/**
 * MsgFinalizeAction is the Msg/FinalizeAction request type.
 * @name MsgFinalizeActionAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgFinalizeAction
 */
export interface MsgFinalizeActionAmino {
  /**
   * must be supernode address
   */
  creator: string;
  actionId: string;
  actionType: string;
  metadata: string;
}
export interface MsgFinalizeActionAminoMsg {
  type: "/lumera.action.v1.MsgFinalizeAction";
  value: MsgFinalizeActionAmino;
}
/**
 * MsgFinalizeActionResponse defines the response structure for executing a MsgFinalizeAction
 * @name MsgFinalizeActionResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgFinalizeActionResponse
 */
export interface MsgFinalizeActionResponse {}
export interface MsgFinalizeActionResponseProtoMsg {
  typeUrl: "/lumera.action.v1.MsgFinalizeActionResponse";
  value: Uint8Array;
}
/**
 * MsgFinalizeActionResponse defines the response structure for executing a MsgFinalizeAction
 * @name MsgFinalizeActionResponseAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgFinalizeActionResponse
 */
export interface MsgFinalizeActionResponseAmino {}
export interface MsgFinalizeActionResponseAminoMsg {
  type: "/lumera.action.v1.MsgFinalizeActionResponse";
  value: MsgFinalizeActionResponseAmino;
}
/**
 * MsgApproveAction is the Msg/ApproveAction request type.
 * @name MsgApproveAction
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgApproveAction
 */
export interface MsgApproveAction {
  creator: string;
  actionId: string;
}
export interface MsgApproveActionProtoMsg {
  typeUrl: "/lumera.action.v1.MsgApproveAction";
  value: Uint8Array;
}
/**
 * MsgApproveAction is the Msg/ApproveAction request type.
 * @name MsgApproveActionAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgApproveAction
 */
export interface MsgApproveActionAmino {
  creator: string;
  actionId: string;
}
export interface MsgApproveActionAminoMsg {
  type: "/lumera.action.v1.MsgApproveAction";
  value: MsgApproveActionAmino;
}
/**
 * MsgApproveActionResponse defines the response structure for executing a MsgApproveAction
 * @name MsgApproveActionResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgApproveActionResponse
 */
export interface MsgApproveActionResponse {}
export interface MsgApproveActionResponseProtoMsg {
  typeUrl: "/lumera.action.v1.MsgApproveActionResponse";
  value: Uint8Array;
}
/**
 * MsgApproveActionResponse defines the response structure for executing a MsgApproveAction
 * @name MsgApproveActionResponseAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgApproveActionResponse
 */
export interface MsgApproveActionResponseAmino {}
export interface MsgApproveActionResponseAminoMsg {
  type: "/lumera.action.v1.MsgApproveActionResponse";
  value: MsgApproveActionResponseAmino;
}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgUpdateParams
 */
export const MsgUpdateParams = {
  typeUrl: "/lumera.action.v1.MsgUpdateParams",
  aminoType: "lumera/x/action/v1/MsgUpdateParams",
  is(o: any): o is MsgUpdateParams {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
  },
  isAmino(o: any): o is MsgUpdateParamsAmino {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isAmino(o.params));
  },
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "lumera/x/action/v1/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(MsgUpdateParams.typeUrl)) {
      return;
    }
    Params.registerTypeUrl();
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = {
  typeUrl: "/lumera.action.v1.MsgUpdateParamsResponse",
  is(o: any): o is MsgUpdateParamsResponse {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateParamsResponseAmino {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: DeepPartial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgRequestAction(): MsgRequestAction {
  return {
    creator: "",
    actionType: "",
    metadata: "",
    price: "",
    expirationTime: ""
  };
}
/**
 * MsgRequestAction is the Msg/RequestAction request type.
 * @name MsgRequestAction
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgRequestAction
 */
export const MsgRequestAction = {
  typeUrl: "/lumera.action.v1.MsgRequestAction",
  is(o: any): o is MsgRequestAction {
    return o && (o.$typeUrl === MsgRequestAction.typeUrl || typeof o.creator === "string" && typeof o.actionType === "string" && typeof o.metadata === "string" && typeof o.price === "string" && typeof o.expirationTime === "string");
  },
  isAmino(o: any): o is MsgRequestActionAmino {
    return o && (o.$typeUrl === MsgRequestAction.typeUrl || typeof o.creator === "string" && typeof o.actionType === "string" && typeof o.metadata === "string" && typeof o.price === "string" && typeof o.expirationTime === "string");
  },
  encode(message: MsgRequestAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionType !== "") {
      writer.uint32(18).string(message.actionType);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.price !== "") {
      writer.uint32(34).string(message.price);
    }
    if (message.expirationTime !== "") {
      writer.uint32(42).string(message.expirationTime);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRequestAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRequestAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionType = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.price = reader.string();
          break;
        case 5:
          message.expirationTime = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgRequestAction>): MsgRequestAction {
    const message = createBaseMsgRequestAction();
    message.creator = object.creator ?? "";
    message.actionType = object.actionType ?? "";
    message.metadata = object.metadata ?? "";
    message.price = object.price ?? "";
    message.expirationTime = object.expirationTime ?? "";
    return message;
  },
  fromAmino(object: MsgRequestActionAmino): MsgRequestAction {
    const message = createBaseMsgRequestAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.actionType !== undefined && object.actionType !== null) {
      message.actionType = object.actionType;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.expirationTime !== undefined && object.expirationTime !== null) {
      message.expirationTime = object.expirationTime;
    }
    return message;
  },
  toAmino(message: MsgRequestAction): MsgRequestActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.actionType = message.actionType === "" ? undefined : message.actionType;
    obj.metadata = message.metadata === "" ? undefined : message.metadata;
    obj.price = message.price === "" ? undefined : message.price;
    obj.expirationTime = message.expirationTime === "" ? undefined : message.expirationTime;
    return obj;
  },
  fromAminoMsg(object: MsgRequestActionAminoMsg): MsgRequestAction {
    return MsgRequestAction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRequestActionProtoMsg): MsgRequestAction {
    return MsgRequestAction.decode(message.value);
  },
  toProto(message: MsgRequestAction): Uint8Array {
    return MsgRequestAction.encode(message).finish();
  },
  toProtoMsg(message: MsgRequestAction): MsgRequestActionProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgRequestAction",
      value: MsgRequestAction.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgRequestActionResponse(): MsgRequestActionResponse {
  return {
    actionId: "",
    status: ""
  };
}
/**
 * MsgRequestActionResponse defines the response structure for executing a MsgRequestAction
 * @name MsgRequestActionResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgRequestActionResponse
 */
export const MsgRequestActionResponse = {
  typeUrl: "/lumera.action.v1.MsgRequestActionResponse",
  is(o: any): o is MsgRequestActionResponse {
    return o && (o.$typeUrl === MsgRequestActionResponse.typeUrl || typeof o.actionId === "string" && typeof o.status === "string");
  },
  isAmino(o: any): o is MsgRequestActionResponseAmino {
    return o && (o.$typeUrl === MsgRequestActionResponse.typeUrl || typeof o.actionId === "string" && typeof o.status === "string");
  },
  encode(message: MsgRequestActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.actionId !== "") {
      writer.uint32(10).string(message.actionId);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRequestActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRequestActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionId = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgRequestActionResponse>): MsgRequestActionResponse {
    const message = createBaseMsgRequestActionResponse();
    message.actionId = object.actionId ?? "";
    message.status = object.status ?? "";
    return message;
  },
  fromAmino(object: MsgRequestActionResponseAmino): MsgRequestActionResponse {
    const message = createBaseMsgRequestActionResponse();
    if (object.actionId !== undefined && object.actionId !== null) {
      message.actionId = object.actionId;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: MsgRequestActionResponse): MsgRequestActionResponseAmino {
    const obj: any = {};
    obj.actionId = message.actionId === "" ? undefined : message.actionId;
    obj.status = message.status === "" ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: MsgRequestActionResponseAminoMsg): MsgRequestActionResponse {
    return MsgRequestActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRequestActionResponseProtoMsg): MsgRequestActionResponse {
    return MsgRequestActionResponse.decode(message.value);
  },
  toProto(message: MsgRequestActionResponse): Uint8Array {
    return MsgRequestActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRequestActionResponse): MsgRequestActionResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgRequestActionResponse",
      value: MsgRequestActionResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgFinalizeAction(): MsgFinalizeAction {
  return {
    creator: "",
    actionId: "",
    actionType: "",
    metadata: ""
  };
}
/**
 * MsgFinalizeAction is the Msg/FinalizeAction request type.
 * @name MsgFinalizeAction
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgFinalizeAction
 */
export const MsgFinalizeAction = {
  typeUrl: "/lumera.action.v1.MsgFinalizeAction",
  is(o: any): o is MsgFinalizeAction {
    return o && (o.$typeUrl === MsgFinalizeAction.typeUrl || typeof o.creator === "string" && typeof o.actionId === "string" && typeof o.actionType === "string" && typeof o.metadata === "string");
  },
  isAmino(o: any): o is MsgFinalizeActionAmino {
    return o && (o.$typeUrl === MsgFinalizeAction.typeUrl || typeof o.creator === "string" && typeof o.actionId === "string" && typeof o.actionType === "string" && typeof o.metadata === "string");
  },
  encode(message: MsgFinalizeAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionId !== "") {
      writer.uint32(18).string(message.actionId);
    }
    if (message.actionType !== "") {
      writer.uint32(26).string(message.actionType);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFinalizeAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFinalizeAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionId = reader.string();
          break;
        case 3:
          message.actionType = reader.string();
          break;
        case 4:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgFinalizeAction>): MsgFinalizeAction {
    const message = createBaseMsgFinalizeAction();
    message.creator = object.creator ?? "";
    message.actionId = object.actionId ?? "";
    message.actionType = object.actionType ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
  fromAmino(object: MsgFinalizeActionAmino): MsgFinalizeAction {
    const message = createBaseMsgFinalizeAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.actionId !== undefined && object.actionId !== null) {
      message.actionId = object.actionId;
    }
    if (object.actionType !== undefined && object.actionType !== null) {
      message.actionType = object.actionType;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    return message;
  },
  toAmino(message: MsgFinalizeAction): MsgFinalizeActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.actionId = message.actionId === "" ? undefined : message.actionId;
    obj.actionType = message.actionType === "" ? undefined : message.actionType;
    obj.metadata = message.metadata === "" ? undefined : message.metadata;
    return obj;
  },
  fromAminoMsg(object: MsgFinalizeActionAminoMsg): MsgFinalizeAction {
    return MsgFinalizeAction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFinalizeActionProtoMsg): MsgFinalizeAction {
    return MsgFinalizeAction.decode(message.value);
  },
  toProto(message: MsgFinalizeAction): Uint8Array {
    return MsgFinalizeAction.encode(message).finish();
  },
  toProtoMsg(message: MsgFinalizeAction): MsgFinalizeActionProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgFinalizeAction",
      value: MsgFinalizeAction.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgFinalizeActionResponse(): MsgFinalizeActionResponse {
  return {};
}
/**
 * MsgFinalizeActionResponse defines the response structure for executing a MsgFinalizeAction
 * @name MsgFinalizeActionResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgFinalizeActionResponse
 */
export const MsgFinalizeActionResponse = {
  typeUrl: "/lumera.action.v1.MsgFinalizeActionResponse",
  is(o: any): o is MsgFinalizeActionResponse {
    return o && o.$typeUrl === MsgFinalizeActionResponse.typeUrl;
  },
  isAmino(o: any): o is MsgFinalizeActionResponseAmino {
    return o && o.$typeUrl === MsgFinalizeActionResponse.typeUrl;
  },
  encode(_: MsgFinalizeActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFinalizeActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFinalizeActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: DeepPartial<MsgFinalizeActionResponse>): MsgFinalizeActionResponse {
    const message = createBaseMsgFinalizeActionResponse();
    return message;
  },
  fromAmino(_: MsgFinalizeActionResponseAmino): MsgFinalizeActionResponse {
    const message = createBaseMsgFinalizeActionResponse();
    return message;
  },
  toAmino(_: MsgFinalizeActionResponse): MsgFinalizeActionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgFinalizeActionResponseAminoMsg): MsgFinalizeActionResponse {
    return MsgFinalizeActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFinalizeActionResponseProtoMsg): MsgFinalizeActionResponse {
    return MsgFinalizeActionResponse.decode(message.value);
  },
  toProto(message: MsgFinalizeActionResponse): Uint8Array {
    return MsgFinalizeActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFinalizeActionResponse): MsgFinalizeActionResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgFinalizeActionResponse",
      value: MsgFinalizeActionResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgApproveAction(): MsgApproveAction {
  return {
    creator: "",
    actionId: ""
  };
}
/**
 * MsgApproveAction is the Msg/ApproveAction request type.
 * @name MsgApproveAction
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgApproveAction
 */
export const MsgApproveAction = {
  typeUrl: "/lumera.action.v1.MsgApproveAction",
  is(o: any): o is MsgApproveAction {
    return o && (o.$typeUrl === MsgApproveAction.typeUrl || typeof o.creator === "string" && typeof o.actionId === "string");
  },
  isAmino(o: any): o is MsgApproveActionAmino {
    return o && (o.$typeUrl === MsgApproveAction.typeUrl || typeof o.creator === "string" && typeof o.actionId === "string");
  },
  encode(message: MsgApproveAction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.actionId !== "") {
      writer.uint32(18).string(message.actionId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApproveAction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.actionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgApproveAction>): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    message.creator = object.creator ?? "";
    message.actionId = object.actionId ?? "";
    return message;
  },
  fromAmino(object: MsgApproveActionAmino): MsgApproveAction {
    const message = createBaseMsgApproveAction();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.actionId !== undefined && object.actionId !== null) {
      message.actionId = object.actionId;
    }
    return message;
  },
  toAmino(message: MsgApproveAction): MsgApproveActionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.actionId = message.actionId === "" ? undefined : message.actionId;
    return obj;
  },
  fromAminoMsg(object: MsgApproveActionAminoMsg): MsgApproveAction {
    return MsgApproveAction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApproveActionProtoMsg): MsgApproveAction {
    return MsgApproveAction.decode(message.value);
  },
  toProto(message: MsgApproveAction): Uint8Array {
    return MsgApproveAction.encode(message).finish();
  },
  toProtoMsg(message: MsgApproveAction): MsgApproveActionProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgApproveAction",
      value: MsgApproveAction.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgApproveActionResponse(): MsgApproveActionResponse {
  return {};
}
/**
 * MsgApproveActionResponse defines the response structure for executing a MsgApproveAction
 * @name MsgApproveActionResponse
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.MsgApproveActionResponse
 */
export const MsgApproveActionResponse = {
  typeUrl: "/lumera.action.v1.MsgApproveActionResponse",
  is(o: any): o is MsgApproveActionResponse {
    return o && o.$typeUrl === MsgApproveActionResponse.typeUrl;
  },
  isAmino(o: any): o is MsgApproveActionResponseAmino {
    return o && o.$typeUrl === MsgApproveActionResponse.typeUrl;
  },
  encode(_: MsgApproveActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApproveActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: DeepPartial<MsgApproveActionResponse>): MsgApproveActionResponse {
    const message = createBaseMsgApproveActionResponse();
    return message;
  },
  fromAmino(_: MsgApproveActionResponseAmino): MsgApproveActionResponse {
    const message = createBaseMsgApproveActionResponse();
    return message;
  },
  toAmino(_: MsgApproveActionResponse): MsgApproveActionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgApproveActionResponseAminoMsg): MsgApproveActionResponse {
    return MsgApproveActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApproveActionResponseProtoMsg): MsgApproveActionResponse {
    return MsgApproveActionResponse.decode(message.value);
  },
  toProto(message: MsgApproveActionResponse): Uint8Array {
    return MsgApproveActionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgApproveActionResponse): MsgApproveActionResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.MsgApproveActionResponse",
      value: MsgApproveActionResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};