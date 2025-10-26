// @ts-nocheck
/* eslint-disable */
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { SuperNode, SuperNodeAmino, SuperNodeSDKType } from "./super_node";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Exact } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsRequest
 */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/lumera.supernode.QueryParamsRequest";
  value: Uint8Array;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequestAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsRequest
 */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/lumera.supernode.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequestSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsRequest
 */
export interface QueryParamsRequestSDKType {}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsResponse
 */
export interface QueryParamsResponse {
  /**
   * params holds all the parameters of this module.
   */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/lumera.supernode.QueryParamsResponse";
  value: Uint8Array;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsResponse
 */
export interface QueryParamsResponseAmino {
  /**
   * params holds all the parameters of this module.
   */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/lumera.supernode.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsResponse
 */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/**
 * @name QueryGetSuperNodeRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeRequest
 */
export interface QueryGetSuperNodeRequest {
  validatorAddress: string;
}
export interface QueryGetSuperNodeRequestProtoMsg {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeRequest";
  value: Uint8Array;
}
/**
 * @name QueryGetSuperNodeRequestAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeRequest
 */
export interface QueryGetSuperNodeRequestAmino {
  validatorAddress?: string;
}
export interface QueryGetSuperNodeRequestAminoMsg {
  type: "/lumera.supernode.QueryGetSuperNodeRequest";
  value: QueryGetSuperNodeRequestAmino;
}
/**
 * @name QueryGetSuperNodeRequestSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeRequest
 */
export interface QueryGetSuperNodeRequestSDKType {
  validatorAddress: string;
}
/**
 * @name QueryGetSuperNodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeResponse
 */
export interface QueryGetSuperNodeResponse {
  supernode?: SuperNode;
}
export interface QueryGetSuperNodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeResponse";
  value: Uint8Array;
}
/**
 * @name QueryGetSuperNodeResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeResponse
 */
export interface QueryGetSuperNodeResponseAmino {
  supernode?: SuperNodeAmino;
}
export interface QueryGetSuperNodeResponseAminoMsg {
  type: "/lumera.supernode.QueryGetSuperNodeResponse";
  value: QueryGetSuperNodeResponseAmino;
}
/**
 * @name QueryGetSuperNodeResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeResponse
 */
export interface QueryGetSuperNodeResponseSDKType {
  supernode?: SuperNodeSDKType;
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export interface QueryGetSuperNodeBySuperNodeAddressRequest {
  supernodeAddress: string;
}
export interface QueryGetSuperNodeBySuperNodeAddressRequestProtoMsg {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest";
  value: Uint8Array;
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressRequestAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export interface QueryGetSuperNodeBySuperNodeAddressRequestAmino {
  supernodeAddress?: string;
}
export interface QueryGetSuperNodeBySuperNodeAddressRequestAminoMsg {
  type: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest";
  value: QueryGetSuperNodeBySuperNodeAddressRequestAmino;
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressRequestSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export interface QueryGetSuperNodeBySuperNodeAddressRequestSDKType {
  supernodeAddress: string;
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export interface QueryGetSuperNodeBySuperNodeAddressResponse {
  supernode?: SuperNode;
}
export interface QueryGetSuperNodeBySuperNodeAddressResponseProtoMsg {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse";
  value: Uint8Array;
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export interface QueryGetSuperNodeBySuperNodeAddressResponseAmino {
  supernode?: SuperNodeAmino;
}
export interface QueryGetSuperNodeBySuperNodeAddressResponseAminoMsg {
  type: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse";
  value: QueryGetSuperNodeBySuperNodeAddressResponseAmino;
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export interface QueryGetSuperNodeBySuperNodeAddressResponseSDKType {
  supernode?: SuperNodeSDKType;
}
/**
 * @name QueryListSuperNodesRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesRequest
 */
export interface QueryListSuperNodesRequest {
  pagination?: PageRequest;
}
export interface QueryListSuperNodesRequestProtoMsg {
  typeUrl: "/lumera.supernode.QueryListSuperNodesRequest";
  value: Uint8Array;
}
/**
 * @name QueryListSuperNodesRequestAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesRequest
 */
export interface QueryListSuperNodesRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryListSuperNodesRequestAminoMsg {
  type: "/lumera.supernode.QueryListSuperNodesRequest";
  value: QueryListSuperNodesRequestAmino;
}
/**
 * @name QueryListSuperNodesRequestSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesRequest
 */
export interface QueryListSuperNodesRequestSDKType {
  pagination?: PageRequestSDKType;
}
/**
 * @name QueryListSuperNodesResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesResponse
 */
export interface QueryListSuperNodesResponse {
  supernodes: SuperNode[];
  pagination?: PageResponse;
}
export interface QueryListSuperNodesResponseProtoMsg {
  typeUrl: "/lumera.supernode.QueryListSuperNodesResponse";
  value: Uint8Array;
}
/**
 * @name QueryListSuperNodesResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesResponse
 */
export interface QueryListSuperNodesResponseAmino {
  supernodes?: SuperNodeAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryListSuperNodesResponseAminoMsg {
  type: "/lumera.supernode.QueryListSuperNodesResponse";
  value: QueryListSuperNodesResponseAmino;
}
/**
 * @name QueryListSuperNodesResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesResponse
 */
export interface QueryListSuperNodesResponseSDKType {
  supernodes: SuperNodeSDKType[];
  pagination?: PageResponseSDKType;
}
/**
 * @name QueryGetTopSuperNodesForBlockRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockRequest
 */
export interface QueryGetTopSuperNodesForBlockRequest {
  blockHeight: number;
  limit: number;
  state: string;
}
export interface QueryGetTopSuperNodesForBlockRequestProtoMsg {
  typeUrl: "/lumera.supernode.QueryGetTopSuperNodesForBlockRequest";
  value: Uint8Array;
}
/**
 * @name QueryGetTopSuperNodesForBlockRequestAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockRequest
 */
export interface QueryGetTopSuperNodesForBlockRequestAmino {
  blockHeight?: number;
  limit?: number;
  state?: string;
}
export interface QueryGetTopSuperNodesForBlockRequestAminoMsg {
  type: "/lumera.supernode.QueryGetTopSuperNodesForBlockRequest";
  value: QueryGetTopSuperNodesForBlockRequestAmino;
}
/**
 * @name QueryGetTopSuperNodesForBlockRequestSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockRequest
 */
export interface QueryGetTopSuperNodesForBlockRequestSDKType {
  blockHeight: number;
  limit: number;
  state: string;
}
/**
 * @name QueryGetTopSuperNodesForBlockResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockResponse
 */
export interface QueryGetTopSuperNodesForBlockResponse {
  supernodes: SuperNode[];
}
export interface QueryGetTopSuperNodesForBlockResponseProtoMsg {
  typeUrl: "/lumera.supernode.QueryGetTopSuperNodesForBlockResponse";
  value: Uint8Array;
}
/**
 * @name QueryGetTopSuperNodesForBlockResponseAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockResponse
 */
export interface QueryGetTopSuperNodesForBlockResponseAmino {
  supernodes?: SuperNodeAmino[];
}
export interface QueryGetTopSuperNodesForBlockResponseAminoMsg {
  type: "/lumera.supernode.QueryGetTopSuperNodesForBlockResponse";
  value: QueryGetTopSuperNodesForBlockResponseAmino;
}
/**
 * @name QueryGetTopSuperNodesForBlockResponseSDKType
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockResponse
 */
export interface QueryGetTopSuperNodesForBlockResponseSDKType {
  supernodes: SuperNodeSDKType[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsRequest
 */
export const QueryParamsRequest = {
  typeUrl: "/lumera.supernode.QueryParamsRequest",
  is(o: any): o is QueryParamsRequest {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isSDK(o: any): o is QueryParamsRequestSDKType {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryParamsRequestAmino {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial<I extends Exact<Partial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryParamsResponse
 */
export const QueryParamsResponse = {
  typeUrl: "/lumera.supernode.QueryParamsResponse",
  is(o: any): o is QueryParamsResponse {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
  },
  isSDK(o: any): o is QueryParamsResponseSDKType {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isSDK(o.params));
  },
  isAmino(o: any): o is QueryParamsResponseAmino {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
  },
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryParamsResponse.typeUrl)) {
      return;
    }
    Params.registerTypeUrl();
  }
};
function createBaseQueryGetSuperNodeRequest(): QueryGetSuperNodeRequest {
  return {
    validatorAddress: ""
  };
}
/**
 * @name QueryGetSuperNodeRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeRequest
 */
export const QueryGetSuperNodeRequest = {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeRequest",
  is(o: any): o is QueryGetSuperNodeRequest {
    return o && (o.$typeUrl === QueryGetSuperNodeRequest.typeUrl || typeof o.validatorAddress === "string");
  },
  isSDK(o: any): o is QueryGetSuperNodeRequestSDKType {
    return o && (o.$typeUrl === QueryGetSuperNodeRequest.typeUrl || typeof o.validatorAddress === "string");
  },
  isAmino(o: any): o is QueryGetSuperNodeRequestAmino {
    return o && (o.$typeUrl === QueryGetSuperNodeRequest.typeUrl || typeof o.validatorAddress === "string");
  },
  encode(message: QueryGetSuperNodeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetSuperNodeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSuperNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryGetSuperNodeRequest>, I>>(object: I): QueryGetSuperNodeRequest {
    const message = createBaseQueryGetSuperNodeRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryGetSuperNodeRequestAmino): QueryGetSuperNodeRequest {
    const message = createBaseQueryGetSuperNodeRequest();
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    return message;
  },
  toAmino(message: QueryGetSuperNodeRequest): QueryGetSuperNodeRequestAmino {
    const obj: any = {};
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryGetSuperNodeRequestAminoMsg): QueryGetSuperNodeRequest {
    return QueryGetSuperNodeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSuperNodeRequestProtoMsg): QueryGetSuperNodeRequest {
    return QueryGetSuperNodeRequest.decode(message.value);
  },
  toProto(message: QueryGetSuperNodeRequest): Uint8Array {
    return QueryGetSuperNodeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSuperNodeRequest): QueryGetSuperNodeRequestProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryGetSuperNodeRequest",
      value: QueryGetSuperNodeRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryGetSuperNodeResponse(): QueryGetSuperNodeResponse {
  return {
    supernode: undefined
  };
}
/**
 * @name QueryGetSuperNodeResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeResponse
 */
export const QueryGetSuperNodeResponse = {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeResponse",
  is(o: any): o is QueryGetSuperNodeResponse {
    return o && o.$typeUrl === QueryGetSuperNodeResponse.typeUrl;
  },
  isSDK(o: any): o is QueryGetSuperNodeResponseSDKType {
    return o && o.$typeUrl === QueryGetSuperNodeResponse.typeUrl;
  },
  isAmino(o: any): o is QueryGetSuperNodeResponseAmino {
    return o && o.$typeUrl === QueryGetSuperNodeResponse.typeUrl;
  },
  encode(message: QueryGetSuperNodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supernode !== undefined) {
      SuperNode.encode(message.supernode, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetSuperNodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSuperNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supernode = SuperNode.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryGetSuperNodeResponse>, I>>(object: I): QueryGetSuperNodeResponse {
    const message = createBaseQueryGetSuperNodeResponse();
    message.supernode = object.supernode !== undefined && object.supernode !== null ? SuperNode.fromPartial(object.supernode) : undefined;
    return message;
  },
  fromAmino(object: QueryGetSuperNodeResponseAmino): QueryGetSuperNodeResponse {
    const message = createBaseQueryGetSuperNodeResponse();
    if (object.supernode !== undefined && object.supernode !== null) {
      message.supernode = SuperNode.fromAmino(object.supernode);
    }
    return message;
  },
  toAmino(message: QueryGetSuperNodeResponse): QueryGetSuperNodeResponseAmino {
    const obj: any = {};
    obj.supernode = message.supernode ? SuperNode.toAmino(message.supernode) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetSuperNodeResponseAminoMsg): QueryGetSuperNodeResponse {
    return QueryGetSuperNodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSuperNodeResponseProtoMsg): QueryGetSuperNodeResponse {
    return QueryGetSuperNodeResponse.decode(message.value);
  },
  toProto(message: QueryGetSuperNodeResponse): Uint8Array {
    return QueryGetSuperNodeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSuperNodeResponse): QueryGetSuperNodeResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryGetSuperNodeResponse",
      value: QueryGetSuperNodeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryGetSuperNodeResponse.typeUrl)) {
      return;
    }
    SuperNode.registerTypeUrl();
  }
};
function createBaseQueryGetSuperNodeBySuperNodeAddressRequest(): QueryGetSuperNodeBySuperNodeAddressRequest {
  return {
    supernodeAddress: ""
  };
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export const QueryGetSuperNodeBySuperNodeAddressRequest = {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest",
  is(o: any): o is QueryGetSuperNodeBySuperNodeAddressRequest {
    return o && (o.$typeUrl === QueryGetSuperNodeBySuperNodeAddressRequest.typeUrl || typeof o.supernodeAddress === "string");
  },
  isSDK(o: any): o is QueryGetSuperNodeBySuperNodeAddressRequestSDKType {
    return o && (o.$typeUrl === QueryGetSuperNodeBySuperNodeAddressRequest.typeUrl || typeof o.supernodeAddress === "string");
  },
  isAmino(o: any): o is QueryGetSuperNodeBySuperNodeAddressRequestAmino {
    return o && (o.$typeUrl === QueryGetSuperNodeBySuperNodeAddressRequest.typeUrl || typeof o.supernodeAddress === "string");
  },
  encode(message: QueryGetSuperNodeBySuperNodeAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supernodeAddress !== "") {
      writer.uint32(10).string(message.supernodeAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetSuperNodeBySuperNodeAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSuperNodeBySuperNodeAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supernodeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryGetSuperNodeBySuperNodeAddressRequest>, I>>(object: I): QueryGetSuperNodeBySuperNodeAddressRequest {
    const message = createBaseQueryGetSuperNodeBySuperNodeAddressRequest();
    message.supernodeAddress = object.supernodeAddress ?? "";
    return message;
  },
  fromAmino(object: QueryGetSuperNodeBySuperNodeAddressRequestAmino): QueryGetSuperNodeBySuperNodeAddressRequest {
    const message = createBaseQueryGetSuperNodeBySuperNodeAddressRequest();
    if (object.supernodeAddress !== undefined && object.supernodeAddress !== null) {
      message.supernodeAddress = object.supernodeAddress;
    }
    return message;
  },
  toAmino(message: QueryGetSuperNodeBySuperNodeAddressRequest): QueryGetSuperNodeBySuperNodeAddressRequestAmino {
    const obj: any = {};
    obj.supernodeAddress = message.supernodeAddress === "" ? undefined : message.supernodeAddress;
    return obj;
  },
  fromAminoMsg(object: QueryGetSuperNodeBySuperNodeAddressRequestAminoMsg): QueryGetSuperNodeBySuperNodeAddressRequest {
    return QueryGetSuperNodeBySuperNodeAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSuperNodeBySuperNodeAddressRequestProtoMsg): QueryGetSuperNodeBySuperNodeAddressRequest {
    return QueryGetSuperNodeBySuperNodeAddressRequest.decode(message.value);
  },
  toProto(message: QueryGetSuperNodeBySuperNodeAddressRequest): Uint8Array {
    return QueryGetSuperNodeBySuperNodeAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSuperNodeBySuperNodeAddressRequest): QueryGetSuperNodeBySuperNodeAddressRequestProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressRequest",
      value: QueryGetSuperNodeBySuperNodeAddressRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryGetSuperNodeBySuperNodeAddressResponse(): QueryGetSuperNodeBySuperNodeAddressResponse {
  return {
    supernode: undefined
  };
}
/**
 * @name QueryGetSuperNodeBySuperNodeAddressResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export const QueryGetSuperNodeBySuperNodeAddressResponse = {
  typeUrl: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse",
  is(o: any): o is QueryGetSuperNodeBySuperNodeAddressResponse {
    return o && o.$typeUrl === QueryGetSuperNodeBySuperNodeAddressResponse.typeUrl;
  },
  isSDK(o: any): o is QueryGetSuperNodeBySuperNodeAddressResponseSDKType {
    return o && o.$typeUrl === QueryGetSuperNodeBySuperNodeAddressResponse.typeUrl;
  },
  isAmino(o: any): o is QueryGetSuperNodeBySuperNodeAddressResponseAmino {
    return o && o.$typeUrl === QueryGetSuperNodeBySuperNodeAddressResponse.typeUrl;
  },
  encode(message: QueryGetSuperNodeBySuperNodeAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supernode !== undefined) {
      SuperNode.encode(message.supernode, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetSuperNodeBySuperNodeAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSuperNodeBySuperNodeAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supernode = SuperNode.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryGetSuperNodeBySuperNodeAddressResponse>, I>>(object: I): QueryGetSuperNodeBySuperNodeAddressResponse {
    const message = createBaseQueryGetSuperNodeBySuperNodeAddressResponse();
    message.supernode = object.supernode !== undefined && object.supernode !== null ? SuperNode.fromPartial(object.supernode) : undefined;
    return message;
  },
  fromAmino(object: QueryGetSuperNodeBySuperNodeAddressResponseAmino): QueryGetSuperNodeBySuperNodeAddressResponse {
    const message = createBaseQueryGetSuperNodeBySuperNodeAddressResponse();
    if (object.supernode !== undefined && object.supernode !== null) {
      message.supernode = SuperNode.fromAmino(object.supernode);
    }
    return message;
  },
  toAmino(message: QueryGetSuperNodeBySuperNodeAddressResponse): QueryGetSuperNodeBySuperNodeAddressResponseAmino {
    const obj: any = {};
    obj.supernode = message.supernode ? SuperNode.toAmino(message.supernode) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetSuperNodeBySuperNodeAddressResponseAminoMsg): QueryGetSuperNodeBySuperNodeAddressResponse {
    return QueryGetSuperNodeBySuperNodeAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSuperNodeBySuperNodeAddressResponseProtoMsg): QueryGetSuperNodeBySuperNodeAddressResponse {
    return QueryGetSuperNodeBySuperNodeAddressResponse.decode(message.value);
  },
  toProto(message: QueryGetSuperNodeBySuperNodeAddressResponse): Uint8Array {
    return QueryGetSuperNodeBySuperNodeAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSuperNodeBySuperNodeAddressResponse): QueryGetSuperNodeBySuperNodeAddressResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryGetSuperNodeBySuperNodeAddressResponse",
      value: QueryGetSuperNodeBySuperNodeAddressResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryGetSuperNodeBySuperNodeAddressResponse.typeUrl)) {
      return;
    }
    SuperNode.registerTypeUrl();
  }
};
function createBaseQueryListSuperNodesRequest(): QueryListSuperNodesRequest {
  return {
    pagination: undefined
  };
}
/**
 * @name QueryListSuperNodesRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesRequest
 */
export const QueryListSuperNodesRequest = {
  typeUrl: "/lumera.supernode.QueryListSuperNodesRequest",
  is(o: any): o is QueryListSuperNodesRequest {
    return o && o.$typeUrl === QueryListSuperNodesRequest.typeUrl;
  },
  isSDK(o: any): o is QueryListSuperNodesRequestSDKType {
    return o && o.$typeUrl === QueryListSuperNodesRequest.typeUrl;
  },
  isAmino(o: any): o is QueryListSuperNodesRequestAmino {
    return o && o.$typeUrl === QueryListSuperNodesRequest.typeUrl;
  },
  encode(message: QueryListSuperNodesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListSuperNodesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListSuperNodesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryListSuperNodesRequest>, I>>(object: I): QueryListSuperNodesRequest {
    const message = createBaseQueryListSuperNodesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListSuperNodesRequestAmino): QueryListSuperNodesRequest {
    const message = createBaseQueryListSuperNodesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListSuperNodesRequest): QueryListSuperNodesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListSuperNodesRequestAminoMsg): QueryListSuperNodesRequest {
    return QueryListSuperNodesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListSuperNodesRequestProtoMsg): QueryListSuperNodesRequest {
    return QueryListSuperNodesRequest.decode(message.value);
  },
  toProto(message: QueryListSuperNodesRequest): Uint8Array {
    return QueryListSuperNodesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListSuperNodesRequest): QueryListSuperNodesRequestProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryListSuperNodesRequest",
      value: QueryListSuperNodesRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListSuperNodesRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};
function createBaseQueryListSuperNodesResponse(): QueryListSuperNodesResponse {
  return {
    supernodes: [],
    pagination: undefined
  };
}
/**
 * @name QueryListSuperNodesResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryListSuperNodesResponse
 */
export const QueryListSuperNodesResponse = {
  typeUrl: "/lumera.supernode.QueryListSuperNodesResponse",
  is(o: any): o is QueryListSuperNodesResponse {
    return o && (o.$typeUrl === QueryListSuperNodesResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.is(o.supernodes[0])));
  },
  isSDK(o: any): o is QueryListSuperNodesResponseSDKType {
    return o && (o.$typeUrl === QueryListSuperNodesResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.isSDK(o.supernodes[0])));
  },
  isAmino(o: any): o is QueryListSuperNodesResponseAmino {
    return o && (o.$typeUrl === QueryListSuperNodesResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.isAmino(o.supernodes[0])));
  },
  encode(message: QueryListSuperNodesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.supernodes) {
      SuperNode.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListSuperNodesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListSuperNodesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supernodes.push(SuperNode.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryListSuperNodesResponse>, I>>(object: I): QueryListSuperNodesResponse {
    const message = createBaseQueryListSuperNodesResponse();
    message.supernodes = object.supernodes?.map(e => SuperNode.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListSuperNodesResponseAmino): QueryListSuperNodesResponse {
    const message = createBaseQueryListSuperNodesResponse();
    message.supernodes = object.supernodes?.map(e => SuperNode.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListSuperNodesResponse): QueryListSuperNodesResponseAmino {
    const obj: any = {};
    if (message.supernodes) {
      obj.supernodes = message.supernodes.map(e => e ? SuperNode.toAmino(e) : undefined);
    } else {
      obj.supernodes = message.supernodes;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListSuperNodesResponseAminoMsg): QueryListSuperNodesResponse {
    return QueryListSuperNodesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListSuperNodesResponseProtoMsg): QueryListSuperNodesResponse {
    return QueryListSuperNodesResponse.decode(message.value);
  },
  toProto(message: QueryListSuperNodesResponse): Uint8Array {
    return QueryListSuperNodesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryListSuperNodesResponse): QueryListSuperNodesResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryListSuperNodesResponse",
      value: QueryListSuperNodesResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListSuperNodesResponse.typeUrl)) {
      return;
    }
    SuperNode.registerTypeUrl();
    PageResponse.registerTypeUrl();
  }
};
function createBaseQueryGetTopSuperNodesForBlockRequest(): QueryGetTopSuperNodesForBlockRequest {
  return {
    blockHeight: 0,
    limit: 0,
    state: ""
  };
}
/**
 * @name QueryGetTopSuperNodesForBlockRequest
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockRequest
 */
export const QueryGetTopSuperNodesForBlockRequest = {
  typeUrl: "/lumera.supernode.QueryGetTopSuperNodesForBlockRequest",
  is(o: any): o is QueryGetTopSuperNodesForBlockRequest {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockRequest.typeUrl || typeof o.blockHeight === "number" && typeof o.limit === "number" && typeof o.state === "string");
  },
  isSDK(o: any): o is QueryGetTopSuperNodesForBlockRequestSDKType {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockRequest.typeUrl || typeof o.blockHeight === "number" && typeof o.limit === "number" && typeof o.state === "string");
  },
  isAmino(o: any): o is QueryGetTopSuperNodesForBlockRequestAmino {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockRequest.typeUrl || typeof o.blockHeight === "number" && typeof o.limit === "number" && typeof o.state === "string");
  },
  encode(message: QueryGetTopSuperNodesForBlockRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeight !== 0) {
      writer.uint32(8).int32(message.blockHeight);
    }
    if (message.limit !== 0) {
      writer.uint32(16).int32(message.limit);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetTopSuperNodesForBlockRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTopSuperNodesForBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.int32();
          break;
        case 2:
          message.limit = reader.int32();
          break;
        case 3:
          message.state = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryGetTopSuperNodesForBlockRequest>, I>>(object: I): QueryGetTopSuperNodesForBlockRequest {
    const message = createBaseQueryGetTopSuperNodesForBlockRequest();
    message.blockHeight = object.blockHeight ?? 0;
    message.limit = object.limit ?? 0;
    message.state = object.state ?? "";
    return message;
  },
  fromAmino(object: QueryGetTopSuperNodesForBlockRequestAmino): QueryGetTopSuperNodesForBlockRequest {
    const message = createBaseQueryGetTopSuperNodesForBlockRequest();
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    return message;
  },
  toAmino(message: QueryGetTopSuperNodesForBlockRequest): QueryGetTopSuperNodesForBlockRequestAmino {
    const obj: any = {};
    obj.blockHeight = message.blockHeight === 0 ? undefined : message.blockHeight;
    obj.limit = message.limit === 0 ? undefined : message.limit;
    obj.state = message.state === "" ? undefined : message.state;
    return obj;
  },
  fromAminoMsg(object: QueryGetTopSuperNodesForBlockRequestAminoMsg): QueryGetTopSuperNodesForBlockRequest {
    return QueryGetTopSuperNodesForBlockRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetTopSuperNodesForBlockRequestProtoMsg): QueryGetTopSuperNodesForBlockRequest {
    return QueryGetTopSuperNodesForBlockRequest.decode(message.value);
  },
  toProto(message: QueryGetTopSuperNodesForBlockRequest): Uint8Array {
    return QueryGetTopSuperNodesForBlockRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetTopSuperNodesForBlockRequest): QueryGetTopSuperNodesForBlockRequestProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryGetTopSuperNodesForBlockRequest",
      value: QueryGetTopSuperNodesForBlockRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryGetTopSuperNodesForBlockResponse(): QueryGetTopSuperNodesForBlockResponse {
  return {
    supernodes: []
  };
}
/**
 * @name QueryGetTopSuperNodesForBlockResponse
 * @package lumera.supernode
 * @see proto type: lumera.supernode.QueryGetTopSuperNodesForBlockResponse
 */
export const QueryGetTopSuperNodesForBlockResponse = {
  typeUrl: "/lumera.supernode.QueryGetTopSuperNodesForBlockResponse",
  is(o: any): o is QueryGetTopSuperNodesForBlockResponse {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.is(o.supernodes[0])));
  },
  isSDK(o: any): o is QueryGetTopSuperNodesForBlockResponseSDKType {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.isSDK(o.supernodes[0])));
  },
  isAmino(o: any): o is QueryGetTopSuperNodesForBlockResponseAmino {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.isAmino(o.supernodes[0])));
  },
  encode(message: QueryGetTopSuperNodesForBlockResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.supernodes) {
      SuperNode.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetTopSuperNodesForBlockResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTopSuperNodesForBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supernodes.push(SuperNode.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<QueryGetTopSuperNodesForBlockResponse>, I>>(object: I): QueryGetTopSuperNodesForBlockResponse {
    const message = createBaseQueryGetTopSuperNodesForBlockResponse();
    message.supernodes = object.supernodes?.map(e => SuperNode.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetTopSuperNodesForBlockResponseAmino): QueryGetTopSuperNodesForBlockResponse {
    const message = createBaseQueryGetTopSuperNodesForBlockResponse();
    message.supernodes = object.supernodes?.map(e => SuperNode.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGetTopSuperNodesForBlockResponse): QueryGetTopSuperNodesForBlockResponseAmino {
    const obj: any = {};
    if (message.supernodes) {
      obj.supernodes = message.supernodes.map(e => e ? SuperNode.toAmino(e) : undefined);
    } else {
      obj.supernodes = message.supernodes;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetTopSuperNodesForBlockResponseAminoMsg): QueryGetTopSuperNodesForBlockResponse {
    return QueryGetTopSuperNodesForBlockResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetTopSuperNodesForBlockResponseProtoMsg): QueryGetTopSuperNodesForBlockResponse {
    return QueryGetTopSuperNodesForBlockResponse.decode(message.value);
  },
  toProto(message: QueryGetTopSuperNodesForBlockResponse): Uint8Array {
    return QueryGetTopSuperNodesForBlockResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetTopSuperNodesForBlockResponse): QueryGetTopSuperNodesForBlockResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.QueryGetTopSuperNodesForBlockResponse",
      value: QueryGetTopSuperNodesForBlockResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryGetTopSuperNodesForBlockResponse.typeUrl)) {
      return;
    }
    SuperNode.registerTypeUrl();
  }
};