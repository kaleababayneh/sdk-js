// @ts-nocheck
/* eslint-disable */
import { PageRequest, PageRequestAmino, PageResponse, PageResponseAmino } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino } from "./params";
import { ClaimRecord, ClaimRecordAmino } from "./claim_record";
import { BinaryReader, BinaryWriter } from "../../binary";
import { DeepPartial } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryParamsRequest
 */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/lumera.claim.QueryParamsRequest";
  value: Uint8Array;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequestAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryParamsRequest
 */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/lumera.claim.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryParamsResponse
 */
export interface QueryParamsResponse {
  /**
   * params holds all the parameters of this module.
   */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/lumera.claim.QueryParamsResponse";
  value: Uint8Array;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponseAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryParamsResponse
 */
export interface QueryParamsResponseAmino {
  /**
   * params holds all the parameters of this module.
   */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/lumera.claim.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/**
 * QueryClaimRecordRequest is request type for the Query/ClaimRecord RPC method.
 * @name QueryClaimRecordRequest
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryClaimRecordRequest
 */
export interface QueryClaimRecordRequest {
  address: string;
}
export interface QueryClaimRecordRequestProtoMsg {
  typeUrl: "/lumera.claim.QueryClaimRecordRequest";
  value: Uint8Array;
}
/**
 * QueryClaimRecordRequest is request type for the Query/ClaimRecord RPC method.
 * @name QueryClaimRecordRequestAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryClaimRecordRequest
 */
export interface QueryClaimRecordRequestAmino {
  address: string;
}
export interface QueryClaimRecordRequestAminoMsg {
  type: "/lumera.claim.QueryClaimRecordRequest";
  value: QueryClaimRecordRequestAmino;
}
/**
 * QueryClaimRecordResponse is response type for the Query/ClaimRecord RPC method.
 * @name QueryClaimRecordResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryClaimRecordResponse
 */
export interface QueryClaimRecordResponse {
  record?: ClaimRecord;
}
export interface QueryClaimRecordResponseProtoMsg {
  typeUrl: "/lumera.claim.QueryClaimRecordResponse";
  value: Uint8Array;
}
/**
 * QueryClaimRecordResponse is response type for the Query/ClaimRecord RPC method.
 * @name QueryClaimRecordResponseAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryClaimRecordResponse
 */
export interface QueryClaimRecordResponseAmino {
  record?: ClaimRecordAmino;
}
export interface QueryClaimRecordResponseAminoMsg {
  type: "/lumera.claim.QueryClaimRecordResponse";
  value: QueryClaimRecordResponseAmino;
}
/**
 * @name QueryListClaimedRequest
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryListClaimedRequest
 */
export interface QueryListClaimedRequest {
  vestedTerm: number;
  pagination?: PageRequest;
}
export interface QueryListClaimedRequestProtoMsg {
  typeUrl: "/lumera.claim.QueryListClaimedRequest";
  value: Uint8Array;
}
/**
 * @name QueryListClaimedRequestAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryListClaimedRequest
 */
export interface QueryListClaimedRequestAmino {
  vestedTerm: number;
  pagination?: PageRequestAmino;
}
export interface QueryListClaimedRequestAminoMsg {
  type: "/lumera.claim.QueryListClaimedRequest";
  value: QueryListClaimedRequestAmino;
}
/**
 * @name QueryListClaimedResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryListClaimedResponse
 */
export interface QueryListClaimedResponse {
  claims: ClaimRecord[];
  pagination?: PageResponse;
}
export interface QueryListClaimedResponseProtoMsg {
  typeUrl: "/lumera.claim.QueryListClaimedResponse";
  value: Uint8Array;
}
/**
 * @name QueryListClaimedResponseAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryListClaimedResponse
 */
export interface QueryListClaimedResponseAmino {
  claims: ClaimRecordAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryListClaimedResponseAminoMsg {
  type: "/lumera.claim.QueryListClaimedResponse";
  value: QueryListClaimedResponseAmino;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryParamsRequest
 */
export const QueryParamsRequest = {
  typeUrl: "/lumera.claim.QueryParamsRequest",
  is(o: any): o is QueryParamsRequest {
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
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
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
      typeUrl: "/lumera.claim.QueryParamsRequest",
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
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryParamsResponse
 */
export const QueryParamsResponse = {
  typeUrl: "/lumera.claim.QueryParamsResponse",
  is(o: any): o is QueryParamsResponse {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
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
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
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
      typeUrl: "/lumera.claim.QueryParamsResponse",
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
function createBaseQueryClaimRecordRequest(): QueryClaimRecordRequest {
  return {
    address: ""
  };
}
/**
 * QueryClaimRecordRequest is request type for the Query/ClaimRecord RPC method.
 * @name QueryClaimRecordRequest
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryClaimRecordRequest
 */
export const QueryClaimRecordRequest = {
  typeUrl: "/lumera.claim.QueryClaimRecordRequest",
  is(o: any): o is QueryClaimRecordRequest {
    return o && (o.$typeUrl === QueryClaimRecordRequest.typeUrl || typeof o.address === "string");
  },
  isAmino(o: any): o is QueryClaimRecordRequestAmino {
    return o && (o.$typeUrl === QueryClaimRecordRequest.typeUrl || typeof o.address === "string");
  },
  encode(message: QueryClaimRecordRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClaimRecordRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClaimRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryClaimRecordRequest>): QueryClaimRecordRequest {
    const message = createBaseQueryClaimRecordRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryClaimRecordRequestAmino): QueryClaimRecordRequest {
    const message = createBaseQueryClaimRecordRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryClaimRecordRequest): QueryClaimRecordRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryClaimRecordRequestAminoMsg): QueryClaimRecordRequest {
    return QueryClaimRecordRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClaimRecordRequestProtoMsg): QueryClaimRecordRequest {
    return QueryClaimRecordRequest.decode(message.value);
  },
  toProto(message: QueryClaimRecordRequest): Uint8Array {
    return QueryClaimRecordRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClaimRecordRequest): QueryClaimRecordRequestProtoMsg {
    return {
      typeUrl: "/lumera.claim.QueryClaimRecordRequest",
      value: QueryClaimRecordRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryClaimRecordResponse(): QueryClaimRecordResponse {
  return {
    record: undefined
  };
}
/**
 * QueryClaimRecordResponse is response type for the Query/ClaimRecord RPC method.
 * @name QueryClaimRecordResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryClaimRecordResponse
 */
export const QueryClaimRecordResponse = {
  typeUrl: "/lumera.claim.QueryClaimRecordResponse",
  is(o: any): o is QueryClaimRecordResponse {
    return o && o.$typeUrl === QueryClaimRecordResponse.typeUrl;
  },
  isAmino(o: any): o is QueryClaimRecordResponseAmino {
    return o && o.$typeUrl === QueryClaimRecordResponse.typeUrl;
  },
  encode(message: QueryClaimRecordResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.record !== undefined) {
      ClaimRecord.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClaimRecordResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClaimRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = ClaimRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryClaimRecordResponse>): QueryClaimRecordResponse {
    const message = createBaseQueryClaimRecordResponse();
    message.record = object.record !== undefined && object.record !== null ? ClaimRecord.fromPartial(object.record) : undefined;
    return message;
  },
  fromAmino(object: QueryClaimRecordResponseAmino): QueryClaimRecordResponse {
    const message = createBaseQueryClaimRecordResponse();
    if (object.record !== undefined && object.record !== null) {
      message.record = ClaimRecord.fromAmino(object.record);
    }
    return message;
  },
  toAmino(message: QueryClaimRecordResponse): QueryClaimRecordResponseAmino {
    const obj: any = {};
    obj.record = message.record ? ClaimRecord.toAmino(message.record) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClaimRecordResponseAminoMsg): QueryClaimRecordResponse {
    return QueryClaimRecordResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClaimRecordResponseProtoMsg): QueryClaimRecordResponse {
    return QueryClaimRecordResponse.decode(message.value);
  },
  toProto(message: QueryClaimRecordResponse): Uint8Array {
    return QueryClaimRecordResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClaimRecordResponse): QueryClaimRecordResponseProtoMsg {
    return {
      typeUrl: "/lumera.claim.QueryClaimRecordResponse",
      value: QueryClaimRecordResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryClaimRecordResponse.typeUrl)) {
      return;
    }
    ClaimRecord.registerTypeUrl();
  }
};
function createBaseQueryListClaimedRequest(): QueryListClaimedRequest {
  return {
    vestedTerm: 0,
    pagination: undefined
  };
}
/**
 * @name QueryListClaimedRequest
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryListClaimedRequest
 */
export const QueryListClaimedRequest = {
  typeUrl: "/lumera.claim.QueryListClaimedRequest",
  is(o: any): o is QueryListClaimedRequest {
    return o && (o.$typeUrl === QueryListClaimedRequest.typeUrl || typeof o.vestedTerm === "number");
  },
  isAmino(o: any): o is QueryListClaimedRequestAmino {
    return o && (o.$typeUrl === QueryListClaimedRequest.typeUrl || typeof o.vestedTerm === "number");
  },
  encode(message: QueryListClaimedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vestedTerm !== 0) {
      writer.uint32(8).uint32(message.vestedTerm);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListClaimedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListClaimedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vestedTerm = reader.uint32();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryListClaimedRequest>): QueryListClaimedRequest {
    const message = createBaseQueryListClaimedRequest();
    message.vestedTerm = object.vestedTerm ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListClaimedRequestAmino): QueryListClaimedRequest {
    const message = createBaseQueryListClaimedRequest();
    if (object.vestedTerm !== undefined && object.vestedTerm !== null) {
      message.vestedTerm = object.vestedTerm;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListClaimedRequest): QueryListClaimedRequestAmino {
    const obj: any = {};
    obj.vestedTerm = message.vestedTerm === 0 ? undefined : message.vestedTerm;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListClaimedRequestAminoMsg): QueryListClaimedRequest {
    return QueryListClaimedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListClaimedRequestProtoMsg): QueryListClaimedRequest {
    return QueryListClaimedRequest.decode(message.value);
  },
  toProto(message: QueryListClaimedRequest): Uint8Array {
    return QueryListClaimedRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListClaimedRequest): QueryListClaimedRequestProtoMsg {
    return {
      typeUrl: "/lumera.claim.QueryListClaimedRequest",
      value: QueryListClaimedRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListClaimedRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};
function createBaseQueryListClaimedResponse(): QueryListClaimedResponse {
  return {
    claims: [],
    pagination: undefined
  };
}
/**
 * @name QueryListClaimedResponse
 * @package lumera.claim
 * @see proto type: lumera.claim.QueryListClaimedResponse
 */
export const QueryListClaimedResponse = {
  typeUrl: "/lumera.claim.QueryListClaimedResponse",
  is(o: any): o is QueryListClaimedResponse {
    return o && (o.$typeUrl === QueryListClaimedResponse.typeUrl || Array.isArray(o.claims) && (!o.claims.length || ClaimRecord.is(o.claims[0])));
  },
  isAmino(o: any): o is QueryListClaimedResponseAmino {
    return o && (o.$typeUrl === QueryListClaimedResponse.typeUrl || Array.isArray(o.claims) && (!o.claims.length || ClaimRecord.isAmino(o.claims[0])));
  },
  encode(message: QueryListClaimedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.claims) {
      ClaimRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListClaimedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListClaimedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claims.push(ClaimRecord.decode(reader, reader.uint32()));
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
  fromPartial(object: DeepPartial<QueryListClaimedResponse>): QueryListClaimedResponse {
    const message = createBaseQueryListClaimedResponse();
    message.claims = object.claims?.map(e => ClaimRecord.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListClaimedResponseAmino): QueryListClaimedResponse {
    const message = createBaseQueryListClaimedResponse();
    message.claims = object.claims?.map(e => ClaimRecord.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListClaimedResponse): QueryListClaimedResponseAmino {
    const obj: any = {};
    if (message.claims) {
      obj.claims = message.claims.map(e => e ? ClaimRecord.toAmino(e) : undefined);
    } else {
      obj.claims = message.claims;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListClaimedResponseAminoMsg): QueryListClaimedResponse {
    return QueryListClaimedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListClaimedResponseProtoMsg): QueryListClaimedResponse {
    return QueryListClaimedResponse.decode(message.value);
  },
  toProto(message: QueryListClaimedResponse): Uint8Array {
    return QueryListClaimedResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryListClaimedResponse): QueryListClaimedResponseProtoMsg {
    return {
      typeUrl: "/lumera.claim.QueryListClaimedResponse",
      value: QueryListClaimedResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListClaimedResponse.typeUrl)) {
      return;
    }
    ClaimRecord.registerTypeUrl();
    PageResponse.registerTypeUrl();
  }
};