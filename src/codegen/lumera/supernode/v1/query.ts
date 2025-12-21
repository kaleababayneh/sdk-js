// @ts-nocheck
/* eslint-disable */
import { PageRequest, PageRequestAmino, PageResponse, PageResponseAmino } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino } from "./params";
import { SuperNode, SuperNodeAmino } from "./super_node";
import { SupernodeMetricsState, SupernodeMetricsStateAmino } from "./metrics";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryParamsRequest
 */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryParamsRequest";
  value: Uint8Array;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequestAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryParamsRequest
 */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/lumera.supernode.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryParamsResponse
 */
export interface QueryParamsResponse {
  /**
   * params holds all the parameters of this module.
   */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryParamsResponse";
  value: Uint8Array;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryParamsResponse
 */
export interface QueryParamsResponseAmino {
  /**
   * params holds all the parameters of this module.
   */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/lumera.supernode.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/**
 * QueryGetSuperNodeRequest is request type for the Query/GetSuperNode RPC method.
 * @name QueryGetSuperNodeRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeRequest
 */
export interface QueryGetSuperNodeRequest {
  validatorAddress: string;
}
export interface QueryGetSuperNodeRequestProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeRequest";
  value: Uint8Array;
}
/**
 * QueryGetSuperNodeRequest is request type for the Query/GetSuperNode RPC method.
 * @name QueryGetSuperNodeRequestAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeRequest
 */
export interface QueryGetSuperNodeRequestAmino {
  validatorAddress: string;
}
export interface QueryGetSuperNodeRequestAminoMsg {
  type: "/lumera.supernode.v1.QueryGetSuperNodeRequest";
  value: QueryGetSuperNodeRequestAmino;
}
/**
 * QueryGetSuperNodeResponse is response type for the Query/GetSuperNode RPC method.
 * @name QueryGetSuperNodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeResponse
 */
export interface QueryGetSuperNodeResponse {
  supernode?: SuperNode;
}
export interface QueryGetSuperNodeResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeResponse";
  value: Uint8Array;
}
/**
 * QueryGetSuperNodeResponse is response type for the Query/GetSuperNode RPC method.
 * @name QueryGetSuperNodeResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeResponse
 */
export interface QueryGetSuperNodeResponseAmino {
  supernode?: SuperNodeAmino;
}
export interface QueryGetSuperNodeResponseAminoMsg {
  type: "/lumera.supernode.v1.QueryGetSuperNodeResponse";
  value: QueryGetSuperNodeResponseAmino;
}
/**
 * QueryGetSuperNodeBySuperNodeAddressRequest is request type for the Query/GetSuperNodeBySuperNodeAddress RPC method.
 * @name QueryGetSuperNodeBySuperNodeAddressRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export interface QueryGetSuperNodeBySuperNodeAddressRequest {
  supernodeAddress: string;
}
export interface QueryGetSuperNodeBySuperNodeAddressRequestProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest";
  value: Uint8Array;
}
/**
 * QueryGetSuperNodeBySuperNodeAddressRequest is request type for the Query/GetSuperNodeBySuperNodeAddress RPC method.
 * @name QueryGetSuperNodeBySuperNodeAddressRequestAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export interface QueryGetSuperNodeBySuperNodeAddressRequestAmino {
  supernodeAddress: string;
}
export interface QueryGetSuperNodeBySuperNodeAddressRequestAminoMsg {
  type: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest";
  value: QueryGetSuperNodeBySuperNodeAddressRequestAmino;
}
/**
 * QueryGetSuperNodeBySuperNodeAddressResponse is response type for the Query/GetSuperNodeBySuperNodeAddress RPC method.
 * @name QueryGetSuperNodeBySuperNodeAddressResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export interface QueryGetSuperNodeBySuperNodeAddressResponse {
  supernode?: SuperNode;
}
export interface QueryGetSuperNodeBySuperNodeAddressResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse";
  value: Uint8Array;
}
/**
 * QueryGetSuperNodeBySuperNodeAddressResponse is response type for the Query/GetSuperNodeBySuperNodeAddress RPC method.
 * @name QueryGetSuperNodeBySuperNodeAddressResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export interface QueryGetSuperNodeBySuperNodeAddressResponseAmino {
  supernode?: SuperNodeAmino;
}
export interface QueryGetSuperNodeBySuperNodeAddressResponseAminoMsg {
  type: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse";
  value: QueryGetSuperNodeBySuperNodeAddressResponseAmino;
}
/**
 * QueryListSuperNodesRequest is request type for the Query/ListSuperNodes RPC method.
 * @name QueryListSuperNodesRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryListSuperNodesRequest
 */
export interface QueryListSuperNodesRequest {
  pagination?: PageRequest;
}
export interface QueryListSuperNodesRequestProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryListSuperNodesRequest";
  value: Uint8Array;
}
/**
 * QueryListSuperNodesRequest is request type for the Query/ListSuperNodes RPC method.
 * @name QueryListSuperNodesRequestAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryListSuperNodesRequest
 */
export interface QueryListSuperNodesRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryListSuperNodesRequestAminoMsg {
  type: "/lumera.supernode.v1.QueryListSuperNodesRequest";
  value: QueryListSuperNodesRequestAmino;
}
/**
 * QueryListSuperNodesResponse is response type for the Query/ListSuperNodes RPC method.
 * @name QueryListSuperNodesResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryListSuperNodesResponse
 */
export interface QueryListSuperNodesResponse {
  supernodes: SuperNode[];
  pagination?: PageResponse;
}
export interface QueryListSuperNodesResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryListSuperNodesResponse";
  value: Uint8Array;
}
/**
 * QueryListSuperNodesResponse is response type for the Query/ListSuperNodes RPC method.
 * @name QueryListSuperNodesResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryListSuperNodesResponse
 */
export interface QueryListSuperNodesResponseAmino {
  supernodes: SuperNodeAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryListSuperNodesResponseAminoMsg {
  type: "/lumera.supernode.v1.QueryListSuperNodesResponse";
  value: QueryListSuperNodesResponseAmino;
}
/**
 * QueryGetTopSuperNodesForBlockRequest is request type for the Query/GetTopSuperNodesForBlock RPC method.
 * @name QueryGetTopSuperNodesForBlockRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest
 */
export interface QueryGetTopSuperNodesForBlockRequest {
  blockHeight: number;
  limit: number;
  state: string;
}
export interface QueryGetTopSuperNodesForBlockRequestProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest";
  value: Uint8Array;
}
/**
 * QueryGetTopSuperNodesForBlockRequest is request type for the Query/GetTopSuperNodesForBlock RPC method.
 * @name QueryGetTopSuperNodesForBlockRequestAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest
 */
export interface QueryGetTopSuperNodesForBlockRequestAmino {
  blockHeight: number;
  limit: number;
  state: string;
}
export interface QueryGetTopSuperNodesForBlockRequestAminoMsg {
  type: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest";
  value: QueryGetTopSuperNodesForBlockRequestAmino;
}
/**
 * QueryGetTopSuperNodesForBlockResponse is response type for the Query/GetTopSuperNodesForBlock RPC method.
 * @name QueryGetTopSuperNodesForBlockResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse
 */
export interface QueryGetTopSuperNodesForBlockResponse {
  supernodes: SuperNode[];
}
export interface QueryGetTopSuperNodesForBlockResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse";
  value: Uint8Array;
}
/**
 * QueryGetTopSuperNodesForBlockResponse is response type for the Query/GetTopSuperNodesForBlock RPC method.
 * @name QueryGetTopSuperNodesForBlockResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse
 */
export interface QueryGetTopSuperNodesForBlockResponseAmino {
  supernodes: SuperNodeAmino[];
}
export interface QueryGetTopSuperNodesForBlockResponseAminoMsg {
  type: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse";
  value: QueryGetTopSuperNodesForBlockResponseAmino;
}
/**
 * QueryGetMetricsRequest is request type for the Query/GetMetrics RPC method.
 * @name QueryGetMetricsRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetMetricsRequest
 */
export interface QueryGetMetricsRequest {
  validatorAddress: string;
}
export interface QueryGetMetricsRequestProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetMetricsRequest";
  value: Uint8Array;
}
/**
 * QueryGetMetricsRequest is request type for the Query/GetMetrics RPC method.
 * @name QueryGetMetricsRequestAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetMetricsRequest
 */
export interface QueryGetMetricsRequestAmino {
  validatorAddress: string;
}
export interface QueryGetMetricsRequestAminoMsg {
  type: "/lumera.supernode.v1.QueryGetMetricsRequest";
  value: QueryGetMetricsRequestAmino;
}
/**
 * QueryGetMetricsResponse is response type for the Query/GetMetrics RPC method.
 * @name QueryGetMetricsResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetMetricsResponse
 */
export interface QueryGetMetricsResponse {
  metricsState?: SupernodeMetricsState;
}
export interface QueryGetMetricsResponseProtoMsg {
  typeUrl: "/lumera.supernode.v1.QueryGetMetricsResponse";
  value: Uint8Array;
}
/**
 * QueryGetMetricsResponse is response type for the Query/GetMetrics RPC method.
 * @name QueryGetMetricsResponseAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetMetricsResponse
 */
export interface QueryGetMetricsResponseAmino {
  metrics_state?: SupernodeMetricsStateAmino;
}
export interface QueryGetMetricsResponseAminoMsg {
  type: "/lumera.supernode.v1.QueryGetMetricsResponse";
  value: QueryGetMetricsResponseAmino;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryParamsRequest
 */
export const QueryParamsRequest = {
  typeUrl: "/lumera.supernode.v1.QueryParamsRequest",
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
      typeUrl: "/lumera.supernode.v1.QueryParamsRequest",
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
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryParamsResponse
 */
export const QueryParamsResponse = {
  typeUrl: "/lumera.supernode.v1.QueryParamsResponse",
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
      typeUrl: "/lumera.supernode.v1.QueryParamsResponse",
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
 * QueryGetSuperNodeRequest is request type for the Query/GetSuperNode RPC method.
 * @name QueryGetSuperNodeRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeRequest
 */
export const QueryGetSuperNodeRequest = {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeRequest",
  is(o: any): o is QueryGetSuperNodeRequest {
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
  fromPartial(object: DeepPartial<QueryGetSuperNodeRequest>): QueryGetSuperNodeRequest {
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
      typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeRequest",
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
 * QueryGetSuperNodeResponse is response type for the Query/GetSuperNode RPC method.
 * @name QueryGetSuperNodeResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeResponse
 */
export const QueryGetSuperNodeResponse = {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeResponse",
  is(o: any): o is QueryGetSuperNodeResponse {
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
  fromPartial(object: DeepPartial<QueryGetSuperNodeResponse>): QueryGetSuperNodeResponse {
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
      typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeResponse",
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
 * QueryGetSuperNodeBySuperNodeAddressRequest is request type for the Query/GetSuperNodeBySuperNodeAddress RPC method.
 * @name QueryGetSuperNodeBySuperNodeAddressRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest
 */
export const QueryGetSuperNodeBySuperNodeAddressRequest = {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest",
  is(o: any): o is QueryGetSuperNodeBySuperNodeAddressRequest {
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
  fromPartial(object: DeepPartial<QueryGetSuperNodeBySuperNodeAddressRequest>): QueryGetSuperNodeBySuperNodeAddressRequest {
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
      typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressRequest",
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
 * QueryGetSuperNodeBySuperNodeAddressResponse is response type for the Query/GetSuperNodeBySuperNodeAddress RPC method.
 * @name QueryGetSuperNodeBySuperNodeAddressResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse
 */
export const QueryGetSuperNodeBySuperNodeAddressResponse = {
  typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse",
  is(o: any): o is QueryGetSuperNodeBySuperNodeAddressResponse {
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
  fromPartial(object: DeepPartial<QueryGetSuperNodeBySuperNodeAddressResponse>): QueryGetSuperNodeBySuperNodeAddressResponse {
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
      typeUrl: "/lumera.supernode.v1.QueryGetSuperNodeBySuperNodeAddressResponse",
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
 * QueryListSuperNodesRequest is request type for the Query/ListSuperNodes RPC method.
 * @name QueryListSuperNodesRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryListSuperNodesRequest
 */
export const QueryListSuperNodesRequest = {
  typeUrl: "/lumera.supernode.v1.QueryListSuperNodesRequest",
  is(o: any): o is QueryListSuperNodesRequest {
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
  fromPartial(object: DeepPartial<QueryListSuperNodesRequest>): QueryListSuperNodesRequest {
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
      typeUrl: "/lumera.supernode.v1.QueryListSuperNodesRequest",
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
 * QueryListSuperNodesResponse is response type for the Query/ListSuperNodes RPC method.
 * @name QueryListSuperNodesResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryListSuperNodesResponse
 */
export const QueryListSuperNodesResponse = {
  typeUrl: "/lumera.supernode.v1.QueryListSuperNodesResponse",
  is(o: any): o is QueryListSuperNodesResponse {
    return o && (o.$typeUrl === QueryListSuperNodesResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.is(o.supernodes[0])));
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
  fromPartial(object: DeepPartial<QueryListSuperNodesResponse>): QueryListSuperNodesResponse {
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
      typeUrl: "/lumera.supernode.v1.QueryListSuperNodesResponse",
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
 * QueryGetTopSuperNodesForBlockRequest is request type for the Query/GetTopSuperNodesForBlock RPC method.
 * @name QueryGetTopSuperNodesForBlockRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest
 */
export const QueryGetTopSuperNodesForBlockRequest = {
  typeUrl: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest",
  is(o: any): o is QueryGetTopSuperNodesForBlockRequest {
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
  fromPartial(object: DeepPartial<QueryGetTopSuperNodesForBlockRequest>): QueryGetTopSuperNodesForBlockRequest {
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
      typeUrl: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockRequest",
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
 * QueryGetTopSuperNodesForBlockResponse is response type for the Query/GetTopSuperNodesForBlock RPC method.
 * @name QueryGetTopSuperNodesForBlockResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse
 */
export const QueryGetTopSuperNodesForBlockResponse = {
  typeUrl: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse",
  is(o: any): o is QueryGetTopSuperNodesForBlockResponse {
    return o && (o.$typeUrl === QueryGetTopSuperNodesForBlockResponse.typeUrl || Array.isArray(o.supernodes) && (!o.supernodes.length || SuperNode.is(o.supernodes[0])));
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
  fromPartial(object: DeepPartial<QueryGetTopSuperNodesForBlockResponse>): QueryGetTopSuperNodesForBlockResponse {
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
      typeUrl: "/lumera.supernode.v1.QueryGetTopSuperNodesForBlockResponse",
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
function createBaseQueryGetMetricsRequest(): QueryGetMetricsRequest {
  return {
    validatorAddress: ""
  };
}
/**
 * QueryGetMetricsRequest is request type for the Query/GetMetrics RPC method.
 * @name QueryGetMetricsRequest
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetMetricsRequest
 */
export const QueryGetMetricsRequest = {
  typeUrl: "/lumera.supernode.v1.QueryGetMetricsRequest",
  is(o: any): o is QueryGetMetricsRequest {
    return o && (o.$typeUrl === QueryGetMetricsRequest.typeUrl || typeof o.validatorAddress === "string");
  },
  isAmino(o: any): o is QueryGetMetricsRequestAmino {
    return o && (o.$typeUrl === QueryGetMetricsRequest.typeUrl || typeof o.validatorAddress === "string");
  },
  encode(message: QueryGetMetricsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetMetricsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMetricsRequest();
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
  fromPartial(object: DeepPartial<QueryGetMetricsRequest>): QueryGetMetricsRequest {
    const message = createBaseQueryGetMetricsRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryGetMetricsRequestAmino): QueryGetMetricsRequest {
    const message = createBaseQueryGetMetricsRequest();
    if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
      message.validatorAddress = object.validatorAddress;
    }
    return message;
  },
  toAmino(message: QueryGetMetricsRequest): QueryGetMetricsRequestAmino {
    const obj: any = {};
    obj.validatorAddress = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryGetMetricsRequestAminoMsg): QueryGetMetricsRequest {
    return QueryGetMetricsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMetricsRequestProtoMsg): QueryGetMetricsRequest {
    return QueryGetMetricsRequest.decode(message.value);
  },
  toProto(message: QueryGetMetricsRequest): Uint8Array {
    return QueryGetMetricsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMetricsRequest): QueryGetMetricsRequestProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.QueryGetMetricsRequest",
      value: QueryGetMetricsRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryGetMetricsResponse(): QueryGetMetricsResponse {
  return {
    metricsState: undefined
  };
}
/**
 * QueryGetMetricsResponse is response type for the Query/GetMetrics RPC method.
 * @name QueryGetMetricsResponse
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.QueryGetMetricsResponse
 */
export const QueryGetMetricsResponse = {
  typeUrl: "/lumera.supernode.v1.QueryGetMetricsResponse",
  is(o: any): o is QueryGetMetricsResponse {
    return o && o.$typeUrl === QueryGetMetricsResponse.typeUrl;
  },
  isAmino(o: any): o is QueryGetMetricsResponseAmino {
    return o && o.$typeUrl === QueryGetMetricsResponse.typeUrl;
  },
  encode(message: QueryGetMetricsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.metricsState !== undefined) {
      SupernodeMetricsState.encode(message.metricsState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetMetricsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMetricsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metricsState = SupernodeMetricsState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetMetricsResponse>): QueryGetMetricsResponse {
    const message = createBaseQueryGetMetricsResponse();
    message.metricsState = object.metricsState !== undefined && object.metricsState !== null ? SupernodeMetricsState.fromPartial(object.metricsState) : undefined;
    return message;
  },
  fromAmino(object: QueryGetMetricsResponseAmino): QueryGetMetricsResponse {
    const message = createBaseQueryGetMetricsResponse();
    if (object.metrics_state !== undefined && object.metrics_state !== null) {
      message.metricsState = SupernodeMetricsState.fromAmino(object.metrics_state);
    }
    return message;
  },
  toAmino(message: QueryGetMetricsResponse): QueryGetMetricsResponseAmino {
    const obj: any = {};
    obj.metrics_state = message.metricsState ? SupernodeMetricsState.toAmino(message.metricsState) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetMetricsResponseAminoMsg): QueryGetMetricsResponse {
    return QueryGetMetricsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMetricsResponseProtoMsg): QueryGetMetricsResponse {
    return QueryGetMetricsResponse.decode(message.value);
  },
  toProto(message: QueryGetMetricsResponse): Uint8Array {
    return QueryGetMetricsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMetricsResponse): QueryGetMetricsResponseProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.QueryGetMetricsResponse",
      value: QueryGetMetricsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryGetMetricsResponse.typeUrl)) {
      return;
    }
    SupernodeMetricsState.registerTypeUrl();
  }
};