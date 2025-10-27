// @ts-nocheck
/* eslint-disable */
import { Params, ParamsAmino } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { DeepPartial } from "../../../helpers";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParams
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateParams
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
  typeUrl: "/lumera.supernode.v1.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * @name MsgUpdateParamsAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateParams
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
  type: "lumera/x/supernode/v1/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * @name MsgUpdateParamsResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateParamsResponse
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/lumera.supernode.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * @name MsgRegisterSupernode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgRegisterSupernode
 */
export interface MsgRegisterSupernode {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  supernodeAccount: string;
  p2pPort: string;
}
export interface MsgRegisterSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgRegisterSupernode";
  value: Uint8Array;
}
/**
 * @name MsgRegisterSupernodeAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgRegisterSupernode
 */
export interface MsgRegisterSupernodeAmino {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  supernodeAccount: string;
  p2p_port: string;
}
export interface MsgRegisterSupernodeAminoMsg {
  type: "/lumera.supernode.v1.MsgRegisterSupernode";
  value: MsgRegisterSupernodeAmino;
}
/**
 * @name MsgRegisterSupernodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgRegisterSupernodeResponse
 */
export interface MsgRegisterSupernodeResponse {}
export interface MsgRegisterSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgRegisterSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgRegisterSupernodeResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgRegisterSupernodeResponse
 */
export interface MsgRegisterSupernodeResponseAmino {}
export interface MsgRegisterSupernodeResponseAminoMsg {
  type: "/lumera.supernode.v1.MsgRegisterSupernodeResponse";
  value: MsgRegisterSupernodeResponseAmino;
}
/**
 * @name MsgDeregisterSupernode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgDeregisterSupernode
 */
export interface MsgDeregisterSupernode {
  creator: string;
  validatorAddress: string;
}
export interface MsgDeregisterSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernode";
  value: Uint8Array;
}
/**
 * @name MsgDeregisterSupernodeAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgDeregisterSupernode
 */
export interface MsgDeregisterSupernodeAmino {
  creator: string;
  validatorAddress: string;
}
export interface MsgDeregisterSupernodeAminoMsg {
  type: "/lumera.supernode.v1.MsgDeregisterSupernode";
  value: MsgDeregisterSupernodeAmino;
}
/**
 * @name MsgDeregisterSupernodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgDeregisterSupernodeResponse
 */
export interface MsgDeregisterSupernodeResponse {}
export interface MsgDeregisterSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgDeregisterSupernodeResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgDeregisterSupernodeResponse
 */
export interface MsgDeregisterSupernodeResponseAmino {}
export interface MsgDeregisterSupernodeResponseAminoMsg {
  type: "/lumera.supernode.v1.MsgDeregisterSupernodeResponse";
  value: MsgDeregisterSupernodeResponseAmino;
}
/**
 * @name MsgStartSupernode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStartSupernode
 */
export interface MsgStartSupernode {
  creator: string;
  validatorAddress: string;
}
export interface MsgStartSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgStartSupernode";
  value: Uint8Array;
}
/**
 * @name MsgStartSupernodeAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStartSupernode
 */
export interface MsgStartSupernodeAmino {
  creator: string;
  validatorAddress: string;
}
export interface MsgStartSupernodeAminoMsg {
  type: "/lumera.supernode.v1.MsgStartSupernode";
  value: MsgStartSupernodeAmino;
}
/**
 * @name MsgStartSupernodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStartSupernodeResponse
 */
export interface MsgStartSupernodeResponse {}
export interface MsgStartSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgStartSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgStartSupernodeResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStartSupernodeResponse
 */
export interface MsgStartSupernodeResponseAmino {}
export interface MsgStartSupernodeResponseAminoMsg {
  type: "/lumera.supernode.v1.MsgStartSupernodeResponse";
  value: MsgStartSupernodeResponseAmino;
}
/**
 * @name MsgStopSupernode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStopSupernode
 */
export interface MsgStopSupernode {
  creator: string;
  validatorAddress: string;
  reason: string;
}
export interface MsgStopSupernodeProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgStopSupernode";
  value: Uint8Array;
}
/**
 * @name MsgStopSupernodeAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStopSupernode
 */
export interface MsgStopSupernodeAmino {
  creator: string;
  validatorAddress: string;
  reason: string;
}
export interface MsgStopSupernodeAminoMsg {
  type: "/lumera.supernode.v1.MsgStopSupernode";
  value: MsgStopSupernodeAmino;
}
/**
 * @name MsgStopSupernodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStopSupernodeResponse
 */
export interface MsgStopSupernodeResponse {}
export interface MsgStopSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgStopSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgStopSupernodeResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStopSupernodeResponse
 */
export interface MsgStopSupernodeResponseAmino {}
export interface MsgStopSupernodeResponseAminoMsg {
  type: "/lumera.supernode.v1.MsgStopSupernodeResponse";
  value: MsgStopSupernodeResponseAmino;
}
/**
 * @name MsgUpdateSupernode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateSupernode
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
  typeUrl: "/lumera.supernode.v1.MsgUpdateSupernode";
  value: Uint8Array;
}
/**
 * @name MsgUpdateSupernodeAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateSupernode
 */
export interface MsgUpdateSupernodeAmino {
  creator: string;
  validatorAddress: string;
  ipAddress: string;
  note: string;
  supernodeAccount: string;
  p2p_port: string;
}
export interface MsgUpdateSupernodeAminoMsg {
  type: "/lumera.supernode.v1.MsgUpdateSupernode";
  value: MsgUpdateSupernodeAmino;
}
/**
 * @name MsgUpdateSupernodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateSupernodeResponse
 */
export interface MsgUpdateSupernodeResponse {}
export interface MsgUpdateSupernodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.MsgUpdateSupernodeResponse";
  value: Uint8Array;
}
/**
 * @name MsgUpdateSupernodeResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateSupernodeResponse
 */
export interface MsgUpdateSupernodeResponseAmino {}
export interface MsgUpdateSupernodeResponseAminoMsg {
  type: "/lumera.supernode.v1.MsgUpdateSupernodeResponse";
  value: MsgUpdateSupernodeResponseAmino;
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateParams
 */
export const MsgUpdateParams = {
  typeUrl: "/lumera.supernode.v1.MsgUpdateParams",
  aminoType: "lumera/x/supernode/v1/MsgUpdateParams",
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
      typeUrl: "/lumera.supernode.v1.MsgUpdateParams",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = {
  typeUrl: "/lumera.supernode.v1.MsgUpdateParamsResponse",
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
      typeUrl: "/lumera.supernode.v1.MsgUpdateParamsResponse",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgRegisterSupernode
 */
export const MsgRegisterSupernode = {
  typeUrl: "/lumera.supernode.v1.MsgRegisterSupernode",
  is(o: any): o is MsgRegisterSupernode {
    return o && (o.$typeUrl === MsgRegisterSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.supernodeAccount === "string" && typeof o.p2pPort === "string");
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
  fromPartial(object: DeepPartial<MsgRegisterSupernode>): MsgRegisterSupernode {
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
      typeUrl: "/lumera.supernode.v1.MsgRegisterSupernode",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgRegisterSupernodeResponse
 */
export const MsgRegisterSupernodeResponse = {
  typeUrl: "/lumera.supernode.v1.MsgRegisterSupernodeResponse",
  is(o: any): o is MsgRegisterSupernodeResponse {
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
  fromPartial(_: DeepPartial<MsgRegisterSupernodeResponse>): MsgRegisterSupernodeResponse {
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
      typeUrl: "/lumera.supernode.v1.MsgRegisterSupernodeResponse",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgDeregisterSupernode
 */
export const MsgDeregisterSupernode = {
  typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernode",
  is(o: any): o is MsgDeregisterSupernode {
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
  fromPartial(object: DeepPartial<MsgDeregisterSupernode>): MsgDeregisterSupernode {
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
      typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernode",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgDeregisterSupernodeResponse
 */
export const MsgDeregisterSupernodeResponse = {
  typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernodeResponse",
  is(o: any): o is MsgDeregisterSupernodeResponse {
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
  fromPartial(_: DeepPartial<MsgDeregisterSupernodeResponse>): MsgDeregisterSupernodeResponse {
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
      typeUrl: "/lumera.supernode.v1.MsgDeregisterSupernodeResponse",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStartSupernode
 */
export const MsgStartSupernode = {
  typeUrl: "/lumera.supernode.v1.MsgStartSupernode",
  is(o: any): o is MsgStartSupernode {
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
  fromPartial(object: DeepPartial<MsgStartSupernode>): MsgStartSupernode {
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
      typeUrl: "/lumera.supernode.v1.MsgStartSupernode",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStartSupernodeResponse
 */
export const MsgStartSupernodeResponse = {
  typeUrl: "/lumera.supernode.v1.MsgStartSupernodeResponse",
  is(o: any): o is MsgStartSupernodeResponse {
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
  fromPartial(_: DeepPartial<MsgStartSupernodeResponse>): MsgStartSupernodeResponse {
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
      typeUrl: "/lumera.supernode.v1.MsgStartSupernodeResponse",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStopSupernode
 */
export const MsgStopSupernode = {
  typeUrl: "/lumera.supernode.v1.MsgStopSupernode",
  is(o: any): o is MsgStopSupernode {
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
  fromPartial(object: DeepPartial<MsgStopSupernode>): MsgStopSupernode {
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
      typeUrl: "/lumera.supernode.v1.MsgStopSupernode",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgStopSupernodeResponse
 */
export const MsgStopSupernodeResponse = {
  typeUrl: "/lumera.supernode.v1.MsgStopSupernodeResponse",
  is(o: any): o is MsgStopSupernodeResponse {
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
  fromPartial(_: DeepPartial<MsgStopSupernodeResponse>): MsgStopSupernodeResponse {
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
      typeUrl: "/lumera.supernode.v1.MsgStopSupernodeResponse",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateSupernode
 */
export const MsgUpdateSupernode = {
  typeUrl: "/lumera.supernode.v1.MsgUpdateSupernode",
  is(o: any): o is MsgUpdateSupernode {
    return o && (o.$typeUrl === MsgUpdateSupernode.typeUrl || typeof o.creator === "string" && typeof o.validatorAddress === "string" && typeof o.ipAddress === "string" && typeof o.note === "string" && typeof o.supernodeAccount === "string" && typeof o.p2pPort === "string");
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
  fromPartial(object: DeepPartial<MsgUpdateSupernode>): MsgUpdateSupernode {
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
      typeUrl: "/lumera.supernode.v1.MsgUpdateSupernode",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.MsgUpdateSupernodeResponse
 */
export const MsgUpdateSupernodeResponse = {
  typeUrl: "/lumera.supernode.v1.MsgUpdateSupernodeResponse",
  is(o: any): o is MsgUpdateSupernodeResponse {
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
  fromPartial(_: DeepPartial<MsgUpdateSupernodeResponse>): MsgUpdateSupernodeResponse {
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
      typeUrl: "/lumera.supernode.v1.MsgUpdateSupernodeResponse",
      value: MsgUpdateSupernodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};