// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../binary";
import { DeepPartial, bytesFromBase64, base64FromBytes } from "../../helpers";
/**
 * HandshakeInfo message
 * @name HandshakeInfo
 * @package lumera.lumeraid
 * @see proto type: lumera.lumeraid.HandshakeInfo
 */
export interface HandshakeInfo {
  /**
   * Cosmos account address
   */
  address: string;
  /**
   * Peer type (0 = Simplenode, 1 = Supernode)
   */
  peerType: number;
  /**
   * ephemeral public key
   */
  publicKey: Uint8Array;
  /**
   * Cosmos account public key
   */
  accountPublicKey: Uint8Array;
  /**
   * Curve type (e.g., P256, P384, P521)
   */
  curve: string;
}
export interface HandshakeInfoProtoMsg {
  typeUrl: "/lumera.lumeraid.HandshakeInfo";
  value: Uint8Array;
}
/**
 * HandshakeInfo message
 * @name HandshakeInfoAmino
 * @package lumera.lumeraid
 * @see proto type: lumera.lumeraid.HandshakeInfo
 */
export interface HandshakeInfoAmino {
  /**
   * Cosmos account address
   */
  address: string;
  /**
   * Peer type (0 = Simplenode, 1 = Supernode)
   */
  peer_type: number;
  /**
   * ephemeral public key
   */
  public_key: string;
  /**
   * Cosmos account public key
   */
  account_public_key: string;
  /**
   * Curve type (e.g., P256, P384, P521)
   */
  curve: string;
}
export interface HandshakeInfoAminoMsg {
  type: "/lumera.lumeraid.HandshakeInfo";
  value: HandshakeInfoAmino;
}
function createBaseHandshakeInfo(): HandshakeInfo {
  return {
    address: "",
    peerType: 0,
    publicKey: new Uint8Array(),
    accountPublicKey: new Uint8Array(),
    curve: ""
  };
}
/**
 * HandshakeInfo message
 * @name HandshakeInfo
 * @package lumera.lumeraid
 * @see proto type: lumera.lumeraid.HandshakeInfo
 */
export const HandshakeInfo = {
  typeUrl: "/lumera.lumeraid.HandshakeInfo",
  is(o: any): o is HandshakeInfo {
    return o && (o.$typeUrl === HandshakeInfo.typeUrl || typeof o.address === "string" && typeof o.peerType === "number" && (o.publicKey instanceof Uint8Array || typeof o.publicKey === "string") && (o.accountPublicKey instanceof Uint8Array || typeof o.accountPublicKey === "string") && typeof o.curve === "string");
  },
  isAmino(o: any): o is HandshakeInfoAmino {
    return o && (o.$typeUrl === HandshakeInfo.typeUrl || typeof o.address === "string" && typeof o.peer_type === "number" && (o.public_key instanceof Uint8Array || typeof o.public_key === "string") && (o.account_public_key instanceof Uint8Array || typeof o.account_public_key === "string") && typeof o.curve === "string");
  },
  encode(message: HandshakeInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.peerType !== 0) {
      writer.uint32(16).int32(message.peerType);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(26).bytes(message.publicKey);
    }
    if (message.accountPublicKey.length !== 0) {
      writer.uint32(34).bytes(message.accountPublicKey);
    }
    if (message.curve !== "") {
      writer.uint32(42).string(message.curve);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): HandshakeInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.peerType = reader.int32();
          break;
        case 3:
          message.publicKey = reader.bytes();
          break;
        case 4:
          message.accountPublicKey = reader.bytes();
          break;
        case 5:
          message.curve = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<HandshakeInfo>): HandshakeInfo {
    const message = createBaseHandshakeInfo();
    message.address = object.address ?? "";
    message.peerType = object.peerType ?? 0;
    message.publicKey = object.publicKey ?? new Uint8Array();
    message.accountPublicKey = object.accountPublicKey ?? new Uint8Array();
    message.curve = object.curve ?? "";
    return message;
  },
  fromAmino(object: HandshakeInfoAmino): HandshakeInfo {
    const message = createBaseHandshakeInfo();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.peer_type !== undefined && object.peer_type !== null) {
      message.peerType = object.peer_type;
    }
    if (object.public_key !== undefined && object.public_key !== null) {
      message.publicKey = bytesFromBase64(object.public_key);
    }
    if (object.account_public_key !== undefined && object.account_public_key !== null) {
      message.accountPublicKey = bytesFromBase64(object.account_public_key);
    }
    if (object.curve !== undefined && object.curve !== null) {
      message.curve = object.curve;
    }
    return message;
  },
  toAmino(message: HandshakeInfo): HandshakeInfoAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.peer_type = message.peerType === 0 ? undefined : message.peerType;
    obj.public_key = message.publicKey ? base64FromBytes(message.publicKey) : undefined;
    obj.account_public_key = message.accountPublicKey ? base64FromBytes(message.accountPublicKey) : undefined;
    obj.curve = message.curve === "" ? undefined : message.curve;
    return obj;
  },
  fromAminoMsg(object: HandshakeInfoAminoMsg): HandshakeInfo {
    return HandshakeInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: HandshakeInfoProtoMsg): HandshakeInfo {
    return HandshakeInfo.decode(message.value);
  },
  toProto(message: HandshakeInfo): Uint8Array {
    return HandshakeInfo.encode(message).finish();
  },
  toProtoMsg(message: HandshakeInfo): HandshakeInfoProtoMsg {
    return {
      typeUrl: "/lumera.lumeraid.HandshakeInfo",
      value: HandshakeInfo.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};