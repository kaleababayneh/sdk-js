// @ts-nocheck
/* eslint-disable */
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { Exact } from "../../helpers";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParams
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
  typeUrl: "/lumera.action.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParams
 */
export interface MsgUpdateParamsAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless overwritten).
   */
  authority?: string;
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
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParams
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/lumera.action.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/lumera.action.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseSDKType {}
/**
 * @name MsgRequestAction
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestAction
 */
export interface MsgRequestAction {
  creator: string;
  actionType: string;
  metadata: string;
  price: string;
  expirationTime: string;
}
export interface MsgRequestActionProtoMsg {
  typeUrl: "/lumera.action.MsgRequestAction";
  value: Uint8Array;
}
/**
 * @name MsgRequestActionAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestAction
 */
export interface MsgRequestActionAmino {
  creator?: string;
  actionType?: string;
  metadata?: string;
  price?: string;
  expirationTime?: string;
}
export interface MsgRequestActionAminoMsg {
  type: "/lumera.action.MsgRequestAction";
  value: MsgRequestActionAmino;
}
/**
 * @name MsgRequestActionSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestAction
 */
export interface MsgRequestActionSDKType {
  creator: string;
  actionType: string;
  metadata: string;
  price: string;
  expirationTime: string;
}
/**
 * @name MsgRequestActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestActionResponse
 */
export interface MsgRequestActionResponse {
  actionId: string;
  status: string;
}
export interface MsgRequestActionResponseProtoMsg {
  typeUrl: "/lumera.action.MsgRequestActionResponse";
  value: Uint8Array;
}
/**
 * @name MsgRequestActionResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestActionResponse
 */
export interface MsgRequestActionResponseAmino {
  actionId?: string;
  status?: string;
}
export interface MsgRequestActionResponseAminoMsg {
  type: "/lumera.action.MsgRequestActionResponse";
  value: MsgRequestActionResponseAmino;
}
/**
 * @name MsgRequestActionResponseSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestActionResponse
 */
export interface MsgRequestActionResponseSDKType {
  actionId: string;
  status: string;
}
/**
 * @name MsgFinalizeAction
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeAction
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
  typeUrl: "/lumera.action.MsgFinalizeAction";
  value: Uint8Array;
}
/**
 * @name MsgFinalizeActionAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeAction
 */
export interface MsgFinalizeActionAmino {
  /**
   * must be supernode address
   */
  creator?: string;
  actionId?: string;
  actionType?: string;
  metadata?: string;
}
export interface MsgFinalizeActionAminoMsg {
  type: "/lumera.action.MsgFinalizeAction";
  value: MsgFinalizeActionAmino;
}
/**
 * @name MsgFinalizeActionSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeAction
 */
export interface MsgFinalizeActionSDKType {
  creator: string;
  actionId: string;
  actionType: string;
  metadata: string;
}
/**
 * @name MsgFinalizeActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeActionResponse
 */
export interface MsgFinalizeActionResponse {}
export interface MsgFinalizeActionResponseProtoMsg {
  typeUrl: "/lumera.action.MsgFinalizeActionResponse";
  value: Uint8Array;
}
/**
 * @name MsgFinalizeActionResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeActionResponse
 */
export interface MsgFinalizeActionResponseAmino {}
export interface MsgFinalizeActionResponseAminoMsg {
  type: "/lumera.action.MsgFinalizeActionResponse";
  value: MsgFinalizeActionResponseAmino;
}
/**
 * @name MsgFinalizeActionResponseSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeActionResponse
 */
export interface MsgFinalizeActionResponseSDKType {}
/**
 * @name MsgApproveAction
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveAction
 */
export interface MsgApproveAction {
  creator: string;
  actionId: string;
}
export interface MsgApproveActionProtoMsg {
  typeUrl: "/lumera.action.MsgApproveAction";
  value: Uint8Array;
}
/**
 * @name MsgApproveActionAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveAction
 */
export interface MsgApproveActionAmino {
  creator?: string;
  actionId?: string;
}
export interface MsgApproveActionAminoMsg {
  type: "/lumera.action.MsgApproveAction";
  value: MsgApproveActionAmino;
}
/**
 * @name MsgApproveActionSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveAction
 */
export interface MsgApproveActionSDKType {
  creator: string;
  actionId: string;
}
/**
 * @name MsgApproveActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveActionResponse
 */
export interface MsgApproveActionResponse {}
export interface MsgApproveActionResponseProtoMsg {
  typeUrl: "/lumera.action.MsgApproveActionResponse";
  value: Uint8Array;
}
/**
 * @name MsgApproveActionResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveActionResponse
 */
export interface MsgApproveActionResponseAmino {}
export interface MsgApproveActionResponseAminoMsg {
  type: "/lumera.action.MsgApproveActionResponse";
  value: MsgApproveActionResponseAmino;
}
/**
 * @name MsgApproveActionResponseSDKType
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveActionResponse
 */
export interface MsgApproveActionResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParams
 */
export const MsgUpdateParams = {
  typeUrl: "/lumera.action.MsgUpdateParams",
  aminoType: "lumera/x/action/v1/MsgUpdateParams",
  is(o: any): o is MsgUpdateParams {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.is(o.params));
  },
  isSDK(o: any): o is MsgUpdateParamsSDKType {
    return o && (o.$typeUrl === MsgUpdateParams.typeUrl || typeof o.authority === "string" && Params.isSDK(o.params));
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
  fromPartial<I extends Exact<Partial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
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
      typeUrl: "/lumera.action.MsgUpdateParams",
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
 * @package lumera.action
 * @see proto type: lumera.action.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = {
  typeUrl: "/lumera.action.MsgUpdateParamsResponse",
  is(o: any): o is MsgUpdateParamsResponse {
    return o && o.$typeUrl === MsgUpdateParamsResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateParamsResponseSDKType {
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
  fromPartial<I extends Exact<Partial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
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
      typeUrl: "/lumera.action.MsgUpdateParamsResponse",
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
 * @name MsgRequestAction
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestAction
 */
export const MsgRequestAction = {
  typeUrl: "/lumera.action.MsgRequestAction",
  is(o: any): o is MsgRequestAction {
    return o && (o.$typeUrl === MsgRequestAction.typeUrl || typeof o.creator === "string" && typeof o.actionType === "string" && typeof o.metadata === "string" && typeof o.price === "string" && typeof o.expirationTime === "string");
  },
  isSDK(o: any): o is MsgRequestActionSDKType {
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
  fromPartial<I extends Exact<Partial<MsgRequestAction>, I>>(object: I): MsgRequestAction {
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
      typeUrl: "/lumera.action.MsgRequestAction",
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
 * @name MsgRequestActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgRequestActionResponse
 */
export const MsgRequestActionResponse = {
  typeUrl: "/lumera.action.MsgRequestActionResponse",
  is(o: any): o is MsgRequestActionResponse {
    return o && (o.$typeUrl === MsgRequestActionResponse.typeUrl || typeof o.actionId === "string" && typeof o.status === "string");
  },
  isSDK(o: any): o is MsgRequestActionResponseSDKType {
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
  fromPartial<I extends Exact<Partial<MsgRequestActionResponse>, I>>(object: I): MsgRequestActionResponse {
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
      typeUrl: "/lumera.action.MsgRequestActionResponse",
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
 * @name MsgFinalizeAction
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeAction
 */
export const MsgFinalizeAction = {
  typeUrl: "/lumera.action.MsgFinalizeAction",
  is(o: any): o is MsgFinalizeAction {
    return o && (o.$typeUrl === MsgFinalizeAction.typeUrl || typeof o.creator === "string" && typeof o.actionId === "string" && typeof o.actionType === "string" && typeof o.metadata === "string");
  },
  isSDK(o: any): o is MsgFinalizeActionSDKType {
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
  fromPartial<I extends Exact<Partial<MsgFinalizeAction>, I>>(object: I): MsgFinalizeAction {
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
      typeUrl: "/lumera.action.MsgFinalizeAction",
      value: MsgFinalizeAction.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgFinalizeActionResponse(): MsgFinalizeActionResponse {
  return {};
}
/**
 * @name MsgFinalizeActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgFinalizeActionResponse
 */
export const MsgFinalizeActionResponse = {
  typeUrl: "/lumera.action.MsgFinalizeActionResponse",
  is(o: any): o is MsgFinalizeActionResponse {
    return o && o.$typeUrl === MsgFinalizeActionResponse.typeUrl;
  },
  isSDK(o: any): o is MsgFinalizeActionResponseSDKType {
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
  fromPartial<I extends Exact<Partial<MsgFinalizeActionResponse>, I>>(_: I): MsgFinalizeActionResponse {
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
      typeUrl: "/lumera.action.MsgFinalizeActionResponse",
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
 * @name MsgApproveAction
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveAction
 */
export const MsgApproveAction = {
  typeUrl: "/lumera.action.MsgApproveAction",
  is(o: any): o is MsgApproveAction {
    return o && (o.$typeUrl === MsgApproveAction.typeUrl || typeof o.creator === "string" && typeof o.actionId === "string");
  },
  isSDK(o: any): o is MsgApproveActionSDKType {
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
  fromPartial<I extends Exact<Partial<MsgApproveAction>, I>>(object: I): MsgApproveAction {
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
      typeUrl: "/lumera.action.MsgApproveAction",
      value: MsgApproveAction.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgApproveActionResponse(): MsgApproveActionResponse {
  return {};
}
/**
 * @name MsgApproveActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.MsgApproveActionResponse
 */
export const MsgApproveActionResponse = {
  typeUrl: "/lumera.action.MsgApproveActionResponse",
  is(o: any): o is MsgApproveActionResponse {
    return o && o.$typeUrl === MsgApproveActionResponse.typeUrl;
  },
  isSDK(o: any): o is MsgApproveActionResponseSDKType {
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
  fromPartial<I extends Exact<Partial<MsgApproveActionResponse>, I>>(_: I): MsgApproveActionResponse {
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
      typeUrl: "/lumera.action.MsgApproveActionResponse",
      value: MsgApproveActionResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};