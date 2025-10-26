// @ts-nocheck
/* eslint-disable */
import { isSet, Exact } from "../../helpers";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * The standard format of a field value. The supported formats are all backed
 * by either an RFC defined by the IETF or a Google-defined AIP.
 */
export enum FieldInfo_Format {
  /** FORMAT_UNSPECIFIED - Default, unspecified value. */
  FORMAT_UNSPECIFIED = 0,
  /**
   * UUID4 - Universally Unique Identifier, version 4, value as defined by
   * https://datatracker.ietf.org/doc/html/rfc4122. The value may be
   * normalized to entirely lowercase letters. For example, the value
   * `F47AC10B-58CC-0372-8567-0E02B2C3D479` would be normalized to
   * `f47ac10b-58cc-0372-8567-0e02b2c3d479`.
   */
  UUID4 = 1,
  /**
   * IPV4 - Internet Protocol v4 value as defined by [RFC
   * 791](https://datatracker.ietf.org/doc/html/rfc791). The value may be
   * condensed, with leading zeros in each octet stripped. For example,
   * `001.022.233.040` would be condensed to `1.22.233.40`.
   */
  IPV4 = 2,
  /**
   * IPV6 - Internet Protocol v6 value as defined by [RFC
   * 2460](https://datatracker.ietf.org/doc/html/rfc2460). The value may be
   * normalized to entirely lowercase letters with zeros compressed, following
   * [RFC 5952](https://datatracker.ietf.org/doc/html/rfc5952). For example,
   * the value `2001:0DB8:0::0` would be normalized to `2001:db8::`.
   */
  IPV6 = 3,
  /**
   * IPV4_OR_IPV6 - An IP address in either v4 or v6 format as described by the individual
   * values defined herein. See the comments on the IPV4 and IPV6 types for
   * allowed normalizations of each.
   */
  IPV4_OR_IPV6 = 4,
  UNRECOGNIZED = -1,
}
export const FieldInfo_FormatSDKType = FieldInfo_Format;
export const FieldInfo_FormatAmino = FieldInfo_Format;
export function fieldInfo_FormatFromJSON(object: any): FieldInfo_Format {
  switch (object) {
    case 0:
    case "FORMAT_UNSPECIFIED":
      return FieldInfo_Format.FORMAT_UNSPECIFIED;
    case 1:
    case "UUID4":
      return FieldInfo_Format.UUID4;
    case 2:
    case "IPV4":
      return FieldInfo_Format.IPV4;
    case 3:
    case "IPV6":
      return FieldInfo_Format.IPV6;
    case 4:
    case "IPV4_OR_IPV6":
      return FieldInfo_Format.IPV4_OR_IPV6;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FieldInfo_Format.UNRECOGNIZED;
  }
}
export function fieldInfo_FormatToJSON(object: FieldInfo_Format): string {
  switch (object) {
    case FieldInfo_Format.FORMAT_UNSPECIFIED:
      return "FORMAT_UNSPECIFIED";
    case FieldInfo_Format.UUID4:
      return "UUID4";
    case FieldInfo_Format.IPV4:
      return "IPV4";
    case FieldInfo_Format.IPV6:
      return "IPV6";
    case FieldInfo_Format.IPV4_OR_IPV6:
      return "IPV4_OR_IPV6";
    case FieldInfo_Format.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * Rich semantic information of an API field beyond basic typing.
 * @name FieldInfo
 * @package google.api
 * @see proto type: google.api.FieldInfo
 */
export interface FieldInfo {
  /**
   * The standard format of a field value. This does not explicitly configure
   * any API consumer, just documents the API's format for the field it is
   * applied to.
   */
  format: FieldInfo_Format;
  /**
   * The type(s) that the annotated, generic field may represent.
   * 
   * Currently, this must only be used on fields of type `google.protobuf.Any`.
   * Supporting other generic types may be considered in the future.
   */
  referencedTypes: TypeReference[];
}
export interface FieldInfoProtoMsg {
  typeUrl: "/google.api.FieldInfo";
  value: Uint8Array;
}
/**
 * Rich semantic information of an API field beyond basic typing.
 * @name FieldInfoAmino
 * @package google.api
 * @see proto type: google.api.FieldInfo
 */
export interface FieldInfoAmino {
  /**
   * The standard format of a field value. This does not explicitly configure
   * any API consumer, just documents the API's format for the field it is
   * applied to.
   */
  format?: FieldInfo_Format;
  /**
   * The type(s) that the annotated, generic field may represent.
   * 
   * Currently, this must only be used on fields of type `google.protobuf.Any`.
   * Supporting other generic types may be considered in the future.
   */
  referenced_types?: TypeReferenceAmino[];
}
export interface FieldInfoAminoMsg {
  type: "/google.api.FieldInfo";
  value: FieldInfoAmino;
}
/**
 * Rich semantic information of an API field beyond basic typing.
 * @name FieldInfoSDKType
 * @package google.api
 * @see proto type: google.api.FieldInfo
 */
export interface FieldInfoSDKType {
  format: FieldInfo_Format;
  referenced_types: TypeReferenceSDKType[];
}
/**
 * A reference to a message type, for use in [FieldInfo][google.api.FieldInfo].
 * @name TypeReference
 * @package google.api
 * @see proto type: google.api.TypeReference
 */
export interface TypeReference {
  /**
   * The name of the type that the annotated, generic field may represent.
   * If the type is in the same protobuf package, the value can be the simple
   * message name e.g., `"MyMessage"`. Otherwise, the value must be the
   * fully-qualified message name e.g., `"google.library.v1.Book"`.
   * 
   * If the type(s) are unknown to the service (e.g. the field accepts generic
   * user input), use the wildcard `"*"` to denote this behavior.
   * 
   * See [AIP-202](https://google.aip.dev/202#type-references) for more details.
   */
  typeName: string;
}
export interface TypeReferenceProtoMsg {
  typeUrl: "/google.api.TypeReference";
  value: Uint8Array;
}
/**
 * A reference to a message type, for use in [FieldInfo][google.api.FieldInfo].
 * @name TypeReferenceAmino
 * @package google.api
 * @see proto type: google.api.TypeReference
 */
export interface TypeReferenceAmino {
  /**
   * The name of the type that the annotated, generic field may represent.
   * If the type is in the same protobuf package, the value can be the simple
   * message name e.g., `"MyMessage"`. Otherwise, the value must be the
   * fully-qualified message name e.g., `"google.library.v1.Book"`.
   * 
   * If the type(s) are unknown to the service (e.g. the field accepts generic
   * user input), use the wildcard `"*"` to denote this behavior.
   * 
   * See [AIP-202](https://google.aip.dev/202#type-references) for more details.
   */
  type_name?: string;
}
export interface TypeReferenceAminoMsg {
  type: "/google.api.TypeReference";
  value: TypeReferenceAmino;
}
/**
 * A reference to a message type, for use in [FieldInfo][google.api.FieldInfo].
 * @name TypeReferenceSDKType
 * @package google.api
 * @see proto type: google.api.TypeReference
 */
export interface TypeReferenceSDKType {
  type_name: string;
}
function createBaseFieldInfo(): FieldInfo {
  return {
    format: 0,
    referencedTypes: []
  };
}
/**
 * Rich semantic information of an API field beyond basic typing.
 * @name FieldInfo
 * @package google.api
 * @see proto type: google.api.FieldInfo
 */
export const FieldInfo = {
  typeUrl: "/google.api.FieldInfo",
  is(o: any): o is FieldInfo {
    return o && (o.$typeUrl === FieldInfo.typeUrl || isSet(o.format) && Array.isArray(o.referencedTypes) && (!o.referencedTypes.length || TypeReference.is(o.referencedTypes[0])));
  },
  isSDK(o: any): o is FieldInfoSDKType {
    return o && (o.$typeUrl === FieldInfo.typeUrl || isSet(o.format) && Array.isArray(o.referenced_types) && (!o.referenced_types.length || TypeReference.isSDK(o.referenced_types[0])));
  },
  isAmino(o: any): o is FieldInfoAmino {
    return o && (o.$typeUrl === FieldInfo.typeUrl || isSet(o.format) && Array.isArray(o.referenced_types) && (!o.referenced_types.length || TypeReference.isAmino(o.referenced_types[0])));
  },
  encode(message: FieldInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.format !== 0) {
      writer.uint32(8).int32(message.format);
    }
    for (const v of message.referencedTypes) {
      TypeReference.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): FieldInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.format = reader.int32() as any;
          break;
        case 2:
          message.referencedTypes.push(TypeReference.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<FieldInfo>, I>>(object: I): FieldInfo {
    const message = createBaseFieldInfo();
    message.format = object.format ?? 0;
    message.referencedTypes = object.referencedTypes?.map(e => TypeReference.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: FieldInfoAmino): FieldInfo {
    const message = createBaseFieldInfo();
    if (object.format !== undefined && object.format !== null) {
      message.format = object.format;
    }
    message.referencedTypes = object.referenced_types?.map(e => TypeReference.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: FieldInfo): FieldInfoAmino {
    const obj: any = {};
    obj.format = message.format === 0 ? undefined : message.format;
    if (message.referencedTypes) {
      obj.referenced_types = message.referencedTypes.map(e => e ? TypeReference.toAmino(e) : undefined);
    } else {
      obj.referenced_types = message.referencedTypes;
    }
    return obj;
  },
  fromAminoMsg(object: FieldInfoAminoMsg): FieldInfo {
    return FieldInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: FieldInfoProtoMsg): FieldInfo {
    return FieldInfo.decode(message.value);
  },
  toProto(message: FieldInfo): Uint8Array {
    return FieldInfo.encode(message).finish();
  },
  toProtoMsg(message: FieldInfo): FieldInfoProtoMsg {
    return {
      typeUrl: "/google.api.FieldInfo",
      value: FieldInfo.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(FieldInfo.typeUrl)) {
      return;
    }
    TypeReference.registerTypeUrl();
  }
};
function createBaseTypeReference(): TypeReference {
  return {
    typeName: ""
  };
}
/**
 * A reference to a message type, for use in [FieldInfo][google.api.FieldInfo].
 * @name TypeReference
 * @package google.api
 * @see proto type: google.api.TypeReference
 */
export const TypeReference = {
  typeUrl: "/google.api.TypeReference",
  is(o: any): o is TypeReference {
    return o && (o.$typeUrl === TypeReference.typeUrl || typeof o.typeName === "string");
  },
  isSDK(o: any): o is TypeReferenceSDKType {
    return o && (o.$typeUrl === TypeReference.typeUrl || typeof o.type_name === "string");
  },
  isAmino(o: any): o is TypeReferenceAmino {
    return o && (o.$typeUrl === TypeReference.typeUrl || typeof o.type_name === "string");
  },
  encode(message: TypeReference, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.typeName !== "") {
      writer.uint32(10).string(message.typeName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TypeReference {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypeReference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.typeName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<TypeReference>, I>>(object: I): TypeReference {
    const message = createBaseTypeReference();
    message.typeName = object.typeName ?? "";
    return message;
  },
  fromAmino(object: TypeReferenceAmino): TypeReference {
    const message = createBaseTypeReference();
    if (object.type_name !== undefined && object.type_name !== null) {
      message.typeName = object.type_name;
    }
    return message;
  },
  toAmino(message: TypeReference): TypeReferenceAmino {
    const obj: any = {};
    obj.type_name = message.typeName === "" ? undefined : message.typeName;
    return obj;
  },
  fromAminoMsg(object: TypeReferenceAminoMsg): TypeReference {
    return TypeReference.fromAmino(object.value);
  },
  fromProtoMsg(message: TypeReferenceProtoMsg): TypeReference {
    return TypeReference.decode(message.value);
  },
  toProto(message: TypeReference): Uint8Array {
    return TypeReference.encode(message).finish();
  },
  toProtoMsg(message: TypeReference): TypeReferenceProtoMsg {
    return {
      typeUrl: "/google.api.TypeReference",
      value: TypeReference.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};