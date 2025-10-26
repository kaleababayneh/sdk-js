// @ts-nocheck
/* eslint-disable */
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { Exact } from "../../helpers";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParams
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
  typeUrl: "/lumera.supernode.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParams
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
  type: "lumera/x/supernode/v1/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParams
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/lumera.supernode.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/lumera.supernode.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseSDKType {}
/**
 * @name MsgRegisterSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernode
 */
export interface MsgRegisterSupernode {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  supernodeAccount: string;
  p2pPort: string;
}
export interface MsgRegisterSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.MsgRegisterSupernode";
  value: Uint8Array;
}
/**
 * @name MsgRegisterSupernodeAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernode
 */
export interface MsgRegisterSupernodeAmino {
  creator?: string;
  validatorAddress?: string;
  ipAddress?: string;
  supernodeAccount?: string;
  p2p_port?: string;
}
export interface MsgRegisterSupernodeAminoMsg {
  type: "/lumera.supernode.MsgRegisterSupernode";
  value: MsgRegisterSupernodeAmino;
}
/**
 * @name MsgRegisterSupernodeSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernode
 */
export interface MsgRegisterSupernodeSDKType {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  supernodeAccount: string;
  p2p_port: string;
}
/**
 * @name MsgRegisterSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernodeResponse
 */
export interface MsgRegisterSupernodeResponse {}
export interface MsgRegisterSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.MsgRegisterSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgRegisterSupernodeResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernodeResponse
 */
export interface MsgRegisterSupernodeResponseAmino {}
export interface MsgRegisterSupernodeResponseAminoMsg {
  type: "/lumera.supernode.MsgRegisterSupernodeResponse";
  value: MsgRegisterSupernodeResponseAmino;
}
/**
 * @name MsgRegisterSupernodeResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernodeResponse
 */
export interface MsgRegisterSupernodeResponseSDKType {}
/**
 * @name MsgDeregisterSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernode
 */
export interface MsgDeregisterSupernode {
  creator: string;
  validatorAddress: string;
}
export interface MsgDeregisterSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.MsgDeregisterSupernode";
  value: Uint8Array;
}
/**
 * @name MsgDeregisterSupernodeAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernode
 */
export interface MsgDeregisterSupernodeAmino {
  creator?: string;
  validatorAddress?: string;
}
export interface MsgDeregisterSupernodeAminoMsg {
  type: "/lumera.supernode.MsgDeregisterSupernode";
  value: MsgDeregisterSupernodeAmino;
}
/**
 * @name MsgDeregisterSupernodeSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernode
 */
export interface MsgDeregisterSupernodeSDKType {
  creator: string;
  validatorAddress: string;
}
/**
 * @name MsgDeregisterSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernodeResponse
 */
export interface MsgDeregisterSupernodeResponse {}
export interface MsgDeregisterSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.MsgDeregisterSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgDeregisterSupernodeResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernodeResponse
 */
export interface MsgDeregisterSupernodeResponseAmino {}
export interface MsgDeregisterSupernodeResponseAminoMsg {
  type: "/lumera.supernode.MsgDeregisterSupernodeResponse";
  value: MsgDeregisterSupernodeResponseAmino;
}
/**
 * @name MsgDeregisterSupernodeResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernodeResponse
 */
export interface MsgDeregisterSupernodeResponseSDKType {}
/**
 * @name MsgStartSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernode
 */
export interface MsgStartSupernode {
  creator: string;
  validatorAddress: string;
}
export interface MsgStartSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.MsgStartSupernode";
  value: Uint8Array;
}
/**
 * @name MsgStartSupernodeAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernode
 */
export interface MsgStartSupernodeAmino {
  creator?: string;
  validatorAddress?: string;
}
export interface MsgStartSupernodeAminoMsg {
  type: "/lumera.supernode.MsgStartSupernode";
  value: MsgStartSupernodeAmino;
}
/**
 * @name MsgStartSupernodeSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernode
 */
export interface MsgStartSupernodeSDKType {
  creator: string;
  validatorAddress: string;
}
/**
 * @name MsgStartSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernodeResponse
 */
export interface MsgStartSupernodeResponse {}
export interface MsgStartSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.MsgStartSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgStartSupernodeResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernodeResponse
 */
export interface MsgStartSupernodeResponseAmino {}
export interface MsgStartSupernodeResponseAminoMsg {
  type: "/lumera.supernode.MsgStartSupernodeResponse";
  value: MsgStartSupernodeResponseAmino;
}
/**
 * @name MsgStartSupernodeResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernodeResponse
 */
export interface MsgStartSupernodeResponseSDKType {}
/**
 * @name MsgStopSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernode
 */
export interface MsgStopSupernode {
  creator: string;
  validatorAddress: string;
  reason: string;
}
export interface MsgStopSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.MsgStopSupernode";
  value: Uint8Array;
}
/**
 * @name MsgStopSupernodeAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernode
 */
export interface MsgStopSupernodeAmino {
  creator?: string;
  validatorAddress?: string;
  reason?: string;
}
export interface MsgStopSupernodeAminoMsg {
  type: "/lumera.supernode.MsgStopSupernode";
  value: MsgStopSupernodeAmino;
}
/**
 * @name MsgStopSupernodeSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernode
 */
export interface MsgStopSupernodeSDKType {
  creator: string;
  validatorAddress: string;
  reason: string;
}
/**
 * @name MsgStopSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernodeResponse
 */
export interface MsgStopSupernodeResponse {}
export interface MsgStopSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.MsgStopSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgStopSupernodeResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernodeResponse
 */
export interface MsgStopSupernodeResponseAmino {}
export interface MsgStopSupernodeResponseAminoMsg {
  type: "/lumera.supernode.MsgStopSupernodeResponse";
  value: MsgStopSupernodeResponseAmino;
}
/**
 * @name MsgStopSupernodeResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernodeResponse
 */
export interface MsgStopSupernodeResponseSDKType {}
/**
 * @name MsgUpdateSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernode
 */
export interface MsgUpdateSupernode {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  note: string;
  supernodeAccount: string;
  p2pPort: string;
}
export interface MsgUpdateSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.MsgUpdateSupernode";
  value: Uint8Array;
}
/**
 * @name MsgUpdateSupernodeAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernode
 */
export interface MsgUpdateSupernodeAmino {
  creator?: string;
  validatorAddress?: string;
  ipAddress?: string;
  note?: string;
  supernodeAccount?: string;
  p2p_port?: string;
}
export interface MsgUpdateSupernodeAminoMsg {
  type: "/lumera.supernode.MsgUpdateSupernode";
  value: MsgUpdateSupernodeAmino;
}
/**
 * @name MsgUpdateSupernodeSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernode
 */
export interface MsgUpdateSupernodeSDKType {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  note: string;
  supernodeAccount: string;
  p2p_port: string;
}
/**
 * @name MsgUpdateSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernodeResponse
 */
export interface MsgUpdateSupernodeResponse {}
export interface MsgUpdateSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.MsgUpdateSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgUpdateSupernodeResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernodeResponse
 */
export interface MsgUpdateSupernodeResponseAmino {}
export interface MsgUpdateSupernodeResponseAminoMsg {
  type: "/lumera.supernode.MsgUpdateSupernodeResponse";
  value: MsgUpdateSupernodeResponseAmino;
}
/**
 * @name MsgUpdateSupernodeResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernodeResponse
 */
export interface MsgUpdateSupernodeResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParams
 */
export const MsgUpdateParams = {
  typeUrl: "/lumera.supernode.MsgUpdateParams",
  aminoType: "lumera/x/supernode/v1/MsgUpdateParams",
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
      type: "lumera/x/supernode/v1/MsgUpdateParams",
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
      typeUrl: "/lumera.supernode.MsgUpdateParams",
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
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = {
  typeUrl: "/lumera.supernode.MsgUpdateParamsResponse",
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
      typeUrl: "/lumera.supernode.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgRegisterSupernode(): MsgRegisterSupernode {
  return {
    creator: "",
    validatorAddress: "",
    ipAddress: "",
    supernodeAccount: "",
    p2pPort: ""
  };
}
/**
 * @name MsgRegisterSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernode
 */
export const MsgRegisterSupernode = {
  typeUrl: "/lumera.supernode.MsgRegisterSupernode",
  is(o: any): o is MsgRegisterSupernode {
    return o && (o.$typeUrl === MsgRegisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.supernodeAccount === "string" && typeof o.p2pPort === "string");
  },
  isSDK(o: any): o is MsgRegisterSupernodeSDKType {
    return o && (o.$typeUrl === MsgRegisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.supernodeAccount === "string" && typeof o.p2p_port === "string");
  },
  isAmino(o: any): o is MsgRegisterSupernodeAmino {
    return o && (o.$typeUrl === MsgRegisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.supernodeAccount === "string" && typeof o.p2p_port === "string");
  },
  encode(message: MsgRegisterSupernode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.ipAddress !== "") {
      writer.uint32(26).string(message.ipAddress);
    }
    if (message.supernodeAccount !== "") {
      writer.uint32(34).string(message.supernodeAccount);
    }
    if (message.p2pPort !== "") {
      writer.uint32(42).string(message.p2pPort);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterSupernode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterSupernode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.ipAddress = reader.string();
          break;
        case 4:
          message.supernodeAccount = reader.string();
          break;
        case 5:
          message.p2pPort = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<MsgRegisterSupernode>, I>>(object: I): MsgRegisterSupernode {
    const message = createBaseMsgRegisterSupernode();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.ipAddress = object.ipAddress ?? "";
    message.supernodeAccount = object.supernodeAccount ?? "";
    message.p2pPort = object.p2pPort ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterSupernodeAmino): MsgRegisterSupernode {
    const message = createBaseMsgRegisterSupernode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    if (object.ipAddress !== undefined && object.ipAddress !== null) {
      message.ipAddress = object.ipAddress;
    }
    if (object.supernodeAccount !== undefined && object.supernodeAccount !== null) {
      message.supernodeAccount = object.supernodeAccount;
    }
    if (object.p2p_port !== undefined && object.p2p_port !== null) {
      message.p2pPort = object.p2p_port;
    }
    return message;
  },
  toAmino(message: MsgRegisterSupernode): MsgRegisterSupernodeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.ipAddress = message.ipAddress === "" ? undefined : message.ipAddress;
    obj.supernodeAccount = message.supernodeAccount === "" ? undefined : message.supernodeAccount;
    obj.p2p_port = message.p2pPort === "" ? undefined : message.p2pPort;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterSupernodeAminoMsg): MsgRegisterSupernode {
    return MsgRegisterSupernode.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterSupernodeProtoMsg): MsgRegisterSupernode {
    return MsgRegisterSupernode.decode(message.value);
  },
  toProto(message: MsgRegisterSupernode): Uint8Array {
    return MsgRegisterSupernode.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterSupernode): MsgRegisterSupernodeProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgRegisterSupernode",
      value: MsgRegisterSupernode.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgRegisterSupernodeResponse(): MsgRegisterSupernodeResponse {
  return {};
}
/**
 * @name MsgRegisterSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgRegisterSupernodeResponse
 */
export const MsgRegisterSupernodeResponse = {
  typeUrl: "/lumera.supernode.MsgRegisterSupernodeResponse",
  is(o: any): o is MsgRegisterSupernodeResponse {
    return o && o.$typeUrl === MsgRegisterSupernodeResponse.typeUrl;
  },
  isSDK(o: any): o is MsgRegisterSupernodeResponseSDKType {
    return o && o.$typeUrl === MsgRegisterSupernodeResponse.typeUrl;
  },
  isAmino(o: any): o is MsgRegisterSupernodeResponseAmino {
    return o && o.$typeUrl === MsgRegisterSupernodeResponse.typeUrl;
  },
  encode(_: MsgRegisterSupernodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterSupernodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterSupernodeResponse();
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
  fromPartial<I extends Exact<Partial<MsgRegisterSupernodeResponse>, I>>(_: I): MsgRegisterSupernodeResponse {
    const message = createBaseMsgRegisterSupernodeResponse();
    return message;
  },
  fromAmino(_: MsgRegisterSupernodeResponseAmino): MsgRegisterSupernodeResponse {
    const message = createBaseMsgRegisterSupernodeResponse();
    return message;
  },
  toAmino(_: MsgRegisterSupernodeResponse): MsgRegisterSupernodeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterSupernodeResponseAminoMsg): MsgRegisterSupernodeResponse {
    return MsgRegisterSupernodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterSupernodeResponseProtoMsg): MsgRegisterSupernodeResponse {
    return MsgRegisterSupernodeResponse.decode(message.value);
  },
  toProto(message: MsgRegisterSupernodeResponse): Uint8Array {
    return MsgRegisterSupernodeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterSupernodeResponse): MsgRegisterSupernodeResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgRegisterSupernodeResponse",
      value: MsgRegisterSupernodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgDeregisterSupernode(): MsgDeregisterSupernode {
  return {
    creator: "",
    validatorAddress: ""
  };
}
/**
 * @name MsgDeregisterSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernode
 */
export const MsgDeregisterSupernode = {
  typeUrl: "/lumera.supernode.MsgDeregisterSupernode",
  is(o: any): o is MsgDeregisterSupernode {
    return o && (o.$typeUrl === MsgDeregisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string");
  },
  isSDK(o: any): o is MsgDeregisterSupernodeSDKType {
    return o && (o.$typeUrl === MsgDeregisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string");
  },
  isAmino(o: any): o is MsgDeregisterSupernodeAmino {
    return o && (o.$typeUrl === MsgDeregisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string");
  },
  encode(message: MsgDeregisterSupernode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeregisterSupernode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeregisterSupernode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<MsgDeregisterSupernode>, I>>(object: I): MsgDeregisterSupernode {
    const message = createBaseMsgDeregisterSupernode();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: MsgDeregisterSupernodeAmino): MsgDeregisterSupernode {
    const message = createBaseMsgDeregisterSupernode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    return message;
  },
  toAmino(message: MsgDeregisterSupernode): MsgDeregisterSupernodeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: MsgDeregisterSupernodeAminoMsg): MsgDeregisterSupernode {
    return MsgDeregisterSupernode.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeregisterSupernodeProtoMsg): MsgDeregisterSupernode {
    return MsgDeregisterSupernode.decode(message.value);
  },
  toProto(message: MsgDeregisterSupernode): Uint8Array {
    return MsgDeregisterSupernode.encode(message).finish();
  },
  toProtoMsg(message: MsgDeregisterSupernode): MsgDeregisterSupernodeProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgDeregisterSupernode",
      value: MsgDeregisterSupernode.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgDeregisterSupernodeResponse(): MsgDeregisterSupernodeResponse {
  return {};
}
/**
 * @name MsgDeregisterSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgDeregisterSupernodeResponse
 */
export const MsgDeregisterSupernodeResponse = {
  typeUrl: "/lumera.supernode.MsgDeregisterSupernodeResponse",
  is(o: any): o is MsgDeregisterSupernodeResponse {
    return o && o.$typeUrl === MsgDeregisterSupernodeResponse.typeUrl;
  },
  isSDK(o: any): o is MsgDeregisterSupernodeResponseSDKType {
    return o && o.$typeUrl === MsgDeregisterSupernodeResponse.typeUrl;
  },
  isAmino(o: any): o is MsgDeregisterSupernodeResponseAmino {
    return o && o.$typeUrl === MsgDeregisterSupernodeResponse.typeUrl;
  },
  encode(_: MsgDeregisterSupernodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeregisterSupernodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeregisterSupernodeResponse();
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
  fromPartial<I extends Exact<Partial<MsgDeregisterSupernodeResponse>, I>>(_: I): MsgDeregisterSupernodeResponse {
    const message = createBaseMsgDeregisterSupernodeResponse();
    return message;
  },
  fromAmino(_: MsgDeregisterSupernodeResponseAmino): MsgDeregisterSupernodeResponse {
    const message = createBaseMsgDeregisterSupernodeResponse();
    return message;
  },
  toAmino(_: MsgDeregisterSupernodeResponse): MsgDeregisterSupernodeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeregisterSupernodeResponseAminoMsg): MsgDeregisterSupernodeResponse {
    return MsgDeregisterSupernodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeregisterSupernodeResponseProtoMsg): MsgDeregisterSupernodeResponse {
    return MsgDeregisterSupernodeResponse.decode(message.value);
  },
  toProto(message: MsgDeregisterSupernodeResponse): Uint8Array {
    return MsgDeregisterSupernodeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeregisterSupernodeResponse): MsgDeregisterSupernodeResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgDeregisterSupernodeResponse",
      value: MsgDeregisterSupernodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgStartSupernode(): MsgStartSupernode {
  return {
    creator: "",
    validatorAddress: ""
  };
}
/**
 * @name MsgStartSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernode
 */
export const MsgStartSupernode = {
  typeUrl: "/lumera.supernode.MsgStartSupernode",
  is(o: any): o is MsgStartSupernode {
    return o && (o.$typeUrl === MsgStartSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string");
  },
  isSDK(o: any): o is MsgStartSupernodeSDKType {
    return o && (o.$typeUrl === MsgStartSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string");
  },
  isAmino(o: any): o is MsgStartSupernodeAmino {
    return o && (o.$typeUrl === MsgStartSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string");
  },
  encode(message: MsgStartSupernode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgStartSupernode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartSupernode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<MsgStartSupernode>, I>>(object: I): MsgStartSupernode {
    const message = createBaseMsgStartSupernode();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: MsgStartSupernodeAmino): MsgStartSupernode {
    const message = createBaseMsgStartSupernode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    return message;
  },
  toAmino(message: MsgStartSupernode): MsgStartSupernodeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: MsgStartSupernodeAminoMsg): MsgStartSupernode {
    return MsgStartSupernode.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStartSupernodeProtoMsg): MsgStartSupernode {
    return MsgStartSupernode.decode(message.value);
  },
  toProto(message: MsgStartSupernode): Uint8Array {
    return MsgStartSupernode.encode(message).finish();
  },
  toProtoMsg(message: MsgStartSupernode): MsgStartSupernodeProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgStartSupernode",
      value: MsgStartSupernode.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgStartSupernodeResponse(): MsgStartSupernodeResponse {
  return {};
}
/**
 * @name MsgStartSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStartSupernodeResponse
 */
export const MsgStartSupernodeResponse = {
  typeUrl: "/lumera.supernode.MsgStartSupernodeResponse",
  is(o: any): o is MsgStartSupernodeResponse {
    return o && o.$typeUrl === MsgStartSupernodeResponse.typeUrl;
  },
  isSDK(o: any): o is MsgStartSupernodeResponseSDKType {
    return o && o.$typeUrl === MsgStartSupernodeResponse.typeUrl;
  },
  isAmino(o: any): o is MsgStartSupernodeResponseAmino {
    return o && o.$typeUrl === MsgStartSupernodeResponse.typeUrl;
  },
  encode(_: MsgStartSupernodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgStartSupernodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartSupernodeResponse();
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
  fromPartial<I extends Exact<Partial<MsgStartSupernodeResponse>, I>>(_: I): MsgStartSupernodeResponse {
    const message = createBaseMsgStartSupernodeResponse();
    return message;
  },
  fromAmino(_: MsgStartSupernodeResponseAmino): MsgStartSupernodeResponse {
    const message = createBaseMsgStartSupernodeResponse();
    return message;
  },
  toAmino(_: MsgStartSupernodeResponse): MsgStartSupernodeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgStartSupernodeResponseAminoMsg): MsgStartSupernodeResponse {
    return MsgStartSupernodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStartSupernodeResponseProtoMsg): MsgStartSupernodeResponse {
    return MsgStartSupernodeResponse.decode(message.value);
  },
  toProto(message: MsgStartSupernodeResponse): Uint8Array {
    return MsgStartSupernodeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStartSupernodeResponse): MsgStartSupernodeResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgStartSupernodeResponse",
      value: MsgStartSupernodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgStopSupernode(): MsgStopSupernode {
  return {
    creator: "",
    validatorAddress: "",
    reason: ""
  };
}
/**
 * @name MsgStopSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernode
 */
export const MsgStopSupernode = {
  typeUrl: "/lumera.supernode.MsgStopSupernode",
  is(o: any): o is MsgStopSupernode {
    return o && (o.$typeUrl === MsgStopSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.reason === "string");
  },
  isSDK(o: any): o is MsgStopSupernodeSDKType {
    return o && (o.$typeUrl === MsgStopSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.reason === "string");
  },
  isAmino(o: any): o is MsgStopSupernodeAmino {
    return o && (o.$typeUrl === MsgStopSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.reason === "string");
  },
  encode(message: MsgStopSupernode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgStopSupernode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStopSupernode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<MsgStopSupernode>, I>>(object: I): MsgStopSupernode {
    const message = createBaseMsgStopSupernode();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.reason = object.reason ?? "";
    return message;
  },
  fromAmino(object: MsgStopSupernodeAmino): MsgStopSupernode {
    const message = createBaseMsgStopSupernode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason;
    }
    return message;
  },
  toAmino(message: MsgStopSupernode): MsgStopSupernodeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.reason = message.reason === "" ? undefined : message.reason;
    return obj;
  },
  fromAminoMsg(object: MsgStopSupernodeAminoMsg): MsgStopSupernode {
    return MsgStopSupernode.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStopSupernodeProtoMsg): MsgStopSupernode {
    return MsgStopSupernode.decode(message.value);
  },
  toProto(message: MsgStopSupernode): Uint8Array {
    return MsgStopSupernode.encode(message).finish();
  },
  toProtoMsg(message: MsgStopSupernode): MsgStopSupernodeProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgStopSupernode",
      value: MsgStopSupernode.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgStopSupernodeResponse(): MsgStopSupernodeResponse {
  return {};
}
/**
 * @name MsgStopSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgStopSupernodeResponse
 */
export const MsgStopSupernodeResponse = {
  typeUrl: "/lumera.supernode.MsgStopSupernodeResponse",
  is(o: any): o is MsgStopSupernodeResponse {
    return o && o.$typeUrl === MsgStopSupernodeResponse.typeUrl;
  },
  isSDK(o: any): o is MsgStopSupernodeResponseSDKType {
    return o && o.$typeUrl === MsgStopSupernodeResponse.typeUrl;
  },
  isAmino(o: any): o is MsgStopSupernodeResponseAmino {
    return o && o.$typeUrl === MsgStopSupernodeResponse.typeUrl;
  },
  encode(_: MsgStopSupernodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgStopSupernodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStopSupernodeResponse();
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
  fromPartial<I extends Exact<Partial<MsgStopSupernodeResponse>, I>>(_: I): MsgStopSupernodeResponse {
    const message = createBaseMsgStopSupernodeResponse();
    return message;
  },
  fromAmino(_: MsgStopSupernodeResponseAmino): MsgStopSupernodeResponse {
    const message = createBaseMsgStopSupernodeResponse();
    return message;
  },
  toAmino(_: MsgStopSupernodeResponse): MsgStopSupernodeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgStopSupernodeResponseAminoMsg): MsgStopSupernodeResponse {
    return MsgStopSupernodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStopSupernodeResponseProtoMsg): MsgStopSupernodeResponse {
    return MsgStopSupernodeResponse.decode(message.value);
  },
  toProto(message: MsgStopSupernodeResponse): Uint8Array {
    return MsgStopSupernodeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStopSupernodeResponse): MsgStopSupernodeResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgStopSupernodeResponse",
      value: MsgStopSupernodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgUpdateSupernode(): MsgUpdateSupernode {
  return {
    creator: "",
    validatorAddress: "",
    ipAddress: "",
    note: "",
    supernodeAccount: "",
    p2pPort: ""
  };
}
/**
 * @name MsgUpdateSupernode
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernode
 */
export const MsgUpdateSupernode = {
  typeUrl: "/lumera.supernode.MsgUpdateSupernode",
  is(o: any): o is MsgUpdateSupernode {
    return o && (o.$typeUrl === MsgUpdateSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.note === "string" && typeof o.supernodeAccount === "string" && typeof o.p2pPort === "string");
  },
  isSDK(o: any): o is MsgUpdateSupernodeSDKType {
    return o && (o.$typeUrl === MsgUpdateSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.note === "string" && typeof o.supernodeAccount === "string" && typeof o.p2p_port === "string");
  },
  isAmino(o: any): o is MsgUpdateSupernodeAmino {
    return o && (o.$typeUrl === MsgUpdateSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.note === "string" && typeof o.supernodeAccount === "string" && typeof o.p2p_port === "string");
  },
  encode(message: MsgUpdateSupernode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.ipAddress !== "") {
      writer.uint32(26).string(message.ipAddress);
    }
    if (message.note !== "") {
      writer.uint32(34).string(message.note);
    }
    if (message.supernodeAccount !== "") {
      writer.uint32(42).string(message.supernodeAccount);
    }
    if (message.p2pPort !== "") {
      writer.uint32(50).string(message.p2pPort);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSupernode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSupernode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.ipAddress = reader.string();
          break;
        case 4:
          message.note = reader.string();
          break;
        case 5:
          message.supernodeAccount = reader.string();
          break;
        case 6:
          message.p2pPort = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<MsgUpdateSupernode>, I>>(object: I): MsgUpdateSupernode {
    const message = createBaseMsgUpdateSupernode();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.ipAddress = object.ipAddress ?? "";
    message.note = object.note ?? "";
    message.supernodeAccount = object.supernodeAccount ?? "";
    message.p2pPort = object.p2pPort ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateSupernodeAmino): MsgUpdateSupernode {
    const message = createBaseMsgUpdateSupernode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    if (object.ipAddress !== undefined && object.ipAddress !== null) {
      message.ipAddress = object.ipAddress;
    }
    if (object.note !== undefined && object.note !== null) {
      message.note = object.note;
    }
    if (object.supernodeAccount !== undefined && object.supernodeAccount !== null) {
      message.supernodeAccount = object.supernodeAccount;
    }
    if (object.p2p_port !== undefined && object.p2p_port !== null) {
      message.p2pPort = object.p2p_port;
    }
    return message;
  },
  toAmino(message: MsgUpdateSupernode): MsgUpdateSupernodeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.ipAddress = message.ipAddress === "" ? undefined : message.ipAddress;
    obj.note = message.note === "" ? undefined : message.note;
    obj.supernodeAccount = message.supernodeAccount === "" ? undefined : message.supernodeAccount;
    obj.p2p_port = message.p2pPort === "" ? undefined : message.p2pPort;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSupernodeAminoMsg): MsgUpdateSupernode {
    return MsgUpdateSupernode.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSupernodeProtoMsg): MsgUpdateSupernode {
    return MsgUpdateSupernode.decode(message.value);
  },
  toProto(message: MsgUpdateSupernode): Uint8Array {
    return MsgUpdateSupernode.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSupernode): MsgUpdateSupernodeProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgUpdateSupernode",
      value: MsgUpdateSupernode.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseMsgUpdateSupernodeResponse(): MsgUpdateSupernodeResponse {
  return {};
}
/**
 * @name MsgUpdateSupernodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MsgUpdateSupernodeResponse
 */
export const MsgUpdateSupernodeResponse = {
  typeUrl: "/lumera.supernode.MsgUpdateSupernodeResponse",
  is(o: any): o is MsgUpdateSupernodeResponse {
    return o && o.$typeUrl === MsgUpdateSupernodeResponse.typeUrl;
  },
  isSDK(o: any): o is MsgUpdateSupernodeResponseSDKType {
    return o && o.$typeUrl === MsgUpdateSupernodeResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateSupernodeResponseAmino {
    return o && o.$typeUrl === MsgUpdateSupernodeResponse.typeUrl;
  },
  encode(_: MsgUpdateSupernodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSupernodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSupernodeResponse();
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
  fromPartial<I extends Exact<Partial<MsgUpdateSupernodeResponse>, I>>(_: I): MsgUpdateSupernodeResponse {
    const message = createBaseMsgUpdateSupernodeResponse();
    return message;
  },
  fromAmino(_: MsgUpdateSupernodeResponseAmino): MsgUpdateSupernodeResponse {
    const message = createBaseMsgUpdateSupernodeResponse();
    return message;
  },
  toAmino(_: MsgUpdateSupernodeResponse): MsgUpdateSupernodeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSupernodeResponseAminoMsg): MsgUpdateSupernodeResponse {
    return MsgUpdateSupernodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSupernodeResponseProtoMsg): MsgUpdateSupernodeResponse {
    return MsgUpdateSupernodeResponse.decode(message.value);
  },
  toProto(message: MsgUpdateSupernodeResponse): Uint8Array {
    return MsgUpdateSupernodeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSupernodeResponse): MsgUpdateSupernodeResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MsgUpdateSupernodeResponse",
      value: MsgUpdateSupernodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};