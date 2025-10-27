// @ts-nocheck
/* eslint-disable */
import { Params, ParamsAmino } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { DeepPartial } from "../../helpers";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgUpdateParams
 */
export interface MsgUpdateParams {
  /**
   * authority is the address that controls the module (defaults to x/gov unless overwritten).
   */
  authority: string;
  /**
   * params defines the x/claim parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/lumera.claim.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgUpdateParams
 */
export interface MsgUpdateParamsAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless overwritten).
   */
  authority: string;
  /**
   * params defines the x/claim parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/lumera.claim.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/lumera.claim.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/lumera.claim.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * @name MsgClaim
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgClaim
 */
export interface MsgClaim {
  creator: string;
  oldAddress: string;
  newAddress: string;
  pubKey: string;
  signature: string;
}
export interface MsgClaimProtoMsg {
  typeUrl: "/lumera.claim.MsgClaim";
  value: Uint8Array;
}
/**
 * @name MsgClaimAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgClaim
 */
export interface MsgClaimAmino {
  creator: string;
  oldAddress: string;
  newAddress: string;
  pubKey: string;
  signature: string;
}
export interface MsgClaimAminoMsg {
  type: "/lumera.claim.MsgClaim";
  value: MsgClaimAmino;
}
/**
 * @name MsgClaimResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgClaimResponse
 */
export interface MsgClaimResponse {}
export interface MsgClaimResponseProtoMsg {
  typeUrl: "/lumera.claim.MsgClaimResponse";
  value: Uint8Array;
}
/**
 * @name MsgClaimResponseAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgClaimResponse
 */
export interface MsgClaimResponseAmino {}
export interface MsgClaimResponseAminoMsg {
  type: "/lumera.claim.MsgClaimResponse";
  value: MsgClaimResponseAmino;
}
/**
 * @name MsgDelayedClaim
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgDelayedClaim
 */
export interface MsgDelayedClaim {
  creator: string;
  oldAddress: string;
  newAddress: string;
  pubKey: string;
  signature: string;
  tier: number;
}
export interface MsgDelayedClaimProtoMsg {
  typeUrl: "/lumera.claim.MsgDelayedClaim";
  value: Uint8Array;
}
/**
 * @name MsgDelayedClaimAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgDelayedClaim
 */
export interface MsgDelayedClaimAmino {
  creator: string;
  oldAddress: string;
  newAddress: string;
  pubKey: string;
  signature: string;
  tier: number;
}
export interface MsgDelayedClaimAminoMsg {
  type: "/lumera.claim.MsgDelayedClaim";
  value: MsgDelayedClaimAmino;
}
/**
 * @name MsgDelayedClaimResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgDelayedClaimResponse
 */
export interface MsgDelayedClaimResponse {}
export interface MsgDelayedClaimResponseProtoMsg {
  typeUrl: "/lumera.claim.MsgDelayedClaimResponse";
  value: Uint8Array;
}
/**
 * @name MsgDelayedClaimResponseAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgDelayedClaimResponse
 */
export interface MsgDelayedClaimResponseAmino {}
export interface MsgDelayedClaimResponseAminoMsg {
  type: "/lumera.claim.MsgDelayedClaimResponse";
  value: MsgDelayedClaimResponseAmino;
}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgUpdateParams
 */
export const MsgUpdateParams = {
  typeUrl: "/lumera.claim.MsgUpdateParams",
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
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/lumera.claim.MsgUpdateParams",
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
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = {
  typeUrl: "/lumera.claim.MsgUpdateParamsResponse",
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
      typeUrl: "/lumera.claim.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgClaim(): MsgClaim {
  return {
    creator: "",
    oldAddress: "",
    newAddress: "",
    pubKey: "",
    signature: ""
  };
}
/**
 * @name MsgClaim
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgClaim
 */
export const MsgClaim = {
  typeUrl: "/lumera.claim.MsgClaim",
  is(o: any): o is MsgClaim {
    return o && (o.$typeUrl === MsgClaim.typeUrl || typeof o.creator === "string" && typeof o.oldAddress === "string" && typeof o.newAddress === "string" && typeof o.pubKey === "string" && typeof o.signature === "string");
  },
  isAmino(o: any): o is MsgClaimAmino {
    return o && (o.$typeUrl === MsgClaim.typeUrl || typeof o.creator === "string" && typeof o.oldAddress === "string" && typeof o.newAddress === "string" && typeof o.pubKey === "string" && typeof o.signature === "string");
  },
  encode(message: MsgClaim, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.oldAddress !== "") {
      writer.uint32(18).string(message.oldAddress);
    }
    if (message.newAddress !== "") {
      writer.uint32(26).string(message.newAddress);
    }
    if (message.pubKey !== "") {
      writer.uint32(34).string(message.pubKey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaim {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.oldAddress = reader.string();
          break;
        case 3:
          message.newAddress = reader.string();
          break;
        case 4:
          message.pubKey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgClaim>): MsgClaim {
    const message = createBaseMsgClaim();
    message.creator = object.creator ?? "";
    message.oldAddress = object.oldAddress ?? "";
    message.newAddress = object.newAddress ?? "";
    message.pubKey = object.pubKey ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: MsgClaimAmino): MsgClaim {
    const message = createBaseMsgClaim();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.oldAddress !== undefined && object.oldAddress !== null) {
      message.oldAddress = object.oldAddress;
    }
    if (object.newAddress !== undefined && object.newAddress !== null) {
      message.newAddress = object.newAddress;
    }
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = object.pubKey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: MsgClaim): MsgClaimAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.oldAddress = message.oldAddress === "" ? undefined : message.oldAddress;
    obj.newAddress = message.newAddress === "" ? undefined : message.newAddress;
    obj.pubKey = message.pubKey === "" ? undefined : message.pubKey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: MsgClaimAminoMsg): MsgClaim {
    return MsgClaim.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimProtoMsg): MsgClaim {
    return MsgClaim.decode(message.value);
  },
  toProto(message: MsgClaim): Uint8Array {
    return MsgClaim.encode(message).finish();
  },
  toProtoMsg(message: MsgClaim): MsgClaimProtoMsg {
    return {
      typeUrl: "/lumera.claim.MsgClaim",
      value: MsgClaim.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgClaimResponse(): MsgClaimResponse {
  return {};
}
/**
 * @name MsgClaimResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgClaimResponse
 */
export const MsgClaimResponse = {
  typeUrl: "/lumera.claim.MsgClaimResponse",
  is(o: any): o is MsgClaimResponse {
    return o && o.$typeUrl === MsgClaimResponse.typeUrl;
  },
  isAmino(o: any): o is MsgClaimResponseAmino {
    return o && o.$typeUrl === MsgClaimResponse.typeUrl;
  },
  encode(_: MsgClaimResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgClaimResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimResponse();
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
  fromPartial(_: DeepPartial<MsgClaimResponse>): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    return message;
  },
  fromAmino(_: MsgClaimResponseAmino): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    return message;
  },
  toAmino(_: MsgClaimResponse): MsgClaimResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClaimResponseAminoMsg): MsgClaimResponse {
    return MsgClaimResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimResponseProtoMsg): MsgClaimResponse {
    return MsgClaimResponse.decode(message.value);
  },
  toProto(message: MsgClaimResponse): Uint8Array {
    return MsgClaimResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimResponse): MsgClaimResponseProtoMsg {
    return {
      typeUrl: "/lumera.claim.MsgClaimResponse",
      value: MsgClaimResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgDelayedClaim(): MsgDelayedClaim {
  return {
    creator: "",
    oldAddress: "",
    newAddress: "",
    pubKey: "",
    signature: "",
    tier: 0
  };
}
/**
 * @name MsgDelayedClaim
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgDelayedClaim
 */
export const MsgDelayedClaim = {
  typeUrl: "/lumera.claim.MsgDelayedClaim",
  is(o: any): o is MsgDelayedClaim {
    return o && (o.$typeUrl === MsgDelayedClaim.typeUrl || typeof o.creator === "string" && typeof o.oldAddress === "string" && typeof o.newAddress === "string" && typeof o.pubKey === "string" && typeof o.signature === "string" && typeof o.tier === "number");
  },
  isAmino(o: any): o is MsgDelayedClaimAmino {
    return o && (o.$typeUrl === MsgDelayedClaim.typeUrl || typeof o.creator === "string" && typeof o.oldAddress === "string" && typeof o.newAddress === "string" && typeof o.pubKey === "string" && typeof o.signature === "string" && typeof o.tier === "number");
  },
  encode(message: MsgDelayedClaim, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.oldAddress !== "") {
      writer.uint32(18).string(message.oldAddress);
    }
    if (message.newAddress !== "") {
      writer.uint32(26).string(message.newAddress);
    }
    if (message.pubKey !== "") {
      writer.uint32(34).string(message.pubKey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    if (message.tier !== 0) {
      writer.uint32(48).uint32(message.tier);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDelayedClaim {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDelayedClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.oldAddress = reader.string();
          break;
        case 3:
          message.newAddress = reader.string();
          break;
        case 4:
          message.pubKey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        case 6:
          message.tier = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgDelayedClaim>): MsgDelayedClaim {
    const message = createBaseMsgDelayedClaim();
    message.creator = object.creator ?? "";
    message.oldAddress = object.oldAddress ?? "";
    message.newAddress = object.newAddress ?? "";
    message.pubKey = object.pubKey ?? "";
    message.signature = object.signature ?? "";
    message.tier = object.tier ?? 0;
    return message;
  },
  fromAmino(object: MsgDelayedClaimAmino): MsgDelayedClaim {
    const message = createBaseMsgDelayedClaim();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.oldAddress !== undefined && object.oldAddress !== null) {
      message.oldAddress = object.oldAddress;
    }
    if (object.newAddress !== undefined && object.newAddress !== null) {
      message.newAddress = object.newAddress;
    }
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = object.pubKey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    if (object.tier !== undefined && object.tier !== null) {
      message.tier = object.tier;
    }
    return message;
  },
  toAmino(message: MsgDelayedClaim): MsgDelayedClaimAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.oldAddress = message.oldAddress === "" ? undefined : message.oldAddress;
    obj.newAddress = message.newAddress === "" ? undefined : message.newAddress;
    obj.pubKey = message.pubKey === "" ? undefined : message.pubKey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    obj.tier = message.tier === 0 ? undefined : message.tier;
    return obj;
  },
  fromAminoMsg(object: MsgDelayedClaimAminoMsg): MsgDelayedClaim {
    return MsgDelayedClaim.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDelayedClaimProtoMsg): MsgDelayedClaim {
    return MsgDelayedClaim.decode(message.value);
  },
  toProto(message: MsgDelayedClaim): Uint8Array {
    return MsgDelayedClaim.encode(message).finish();
  },
  toProtoMsg(message: MsgDelayedClaim): MsgDelayedClaimProtoMsg {
    return {
      typeUrl: "/lumera.claim.MsgDelayedClaim",
      value: MsgDelayedClaim.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgDelayedClaimResponse(): MsgDelayedClaimResponse {
  return {};
}
/**
 * @name MsgDelayedClaimResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.MsgDelayedClaimResponse
 */
export const MsgDelayedClaimResponse = {
  typeUrl: "/lumera.claim.MsgDelayedClaimResponse",
  is(o: any): o is MsgDelayedClaimResponse {
    return o && o.$typeUrl === MsgDelayedClaimResponse.typeUrl;
  },
  isAmino(o: any): o is MsgDelayedClaimResponseAmino {
    return o && o.$typeUrl === MsgDelayedClaimResponse.typeUrl;
  },
  encode(_: MsgDelayedClaimResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDelayedClaimResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDelayedClaimResponse();
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
  fromPartial(_: DeepPartial<MsgDelayedClaimResponse>): MsgDelayedClaimResponse {
    const message = createBaseMsgDelayedClaimResponse();
    return message;
  },
  fromAmino(_: MsgDelayedClaimResponseAmino): MsgDelayedClaimResponse {
    const message = createBaseMsgDelayedClaimResponse();
    return message;
  },
  toAmino(_: MsgDelayedClaimResponse): MsgDelayedClaimResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDelayedClaimResponseAminoMsg): MsgDelayedClaimResponse {
    return MsgDelayedClaimResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDelayedClaimResponseProtoMsg): MsgDelayedClaimResponse {
    return MsgDelayedClaimResponse.decode(message.value);
  },
  toProto(message: MsgDelayedClaimResponse): Uint8Array {
    return MsgDelayedClaimResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDelayedClaimResponse): MsgDelayedClaimResponseProtoMsg {
    return {
      typeUrl: "/lumera.claim.MsgDelayedClaimResponse",
      value: MsgDelayedClaimResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};