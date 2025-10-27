// @ts-nocheck
/* eslint-disable */
import { ActionType } from "./action_type";
import { ActionState } from "./action_state";
import { PageRequest, PageRequestAmino, PageResponse, PageResponseAmino } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino } from "./params";
import { Action, ActionAmino } from "./action";
import { BinaryReader, BinaryWriter } from "../../binary";
import { DeepPartial, isSet } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryParamsRequest
 */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/lumera.action.QueryParamsRequest";
  value: Uint8Array;
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryParamsRequest
 */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/lumera.action.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryParamsResponse
 */
export interface QueryParamsResponse {
  /**
   * params holds all the parameters of this module.
   */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/lumera.action.QueryParamsResponse";
  value: Uint8Array;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 * @name QueryParamsResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryParamsResponse
 */
export interface QueryParamsResponseAmino {
  /**
   * params holds all the parameters of this module.
   */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/lumera.action.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/**
 * Request type for GetAction
 * @name QueryGetActionRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionRequest
 */
export interface QueryGetActionRequest {
  /**
   * The ID of the action to query
   */
  actionID: string;
}
export interface QueryGetActionRequestProtoMsg {
  typeUrl: "/lumera.action.QueryGetActionRequest";
  value: Uint8Array;
}
/**
 * Request type for GetAction
 * @name QueryGetActionRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionRequest
 */
export interface QueryGetActionRequestAmino {
  /**
   * The ID of the action to query
   */
  actionID: string;
}
export interface QueryGetActionRequestAminoMsg {
  type: "/lumera.action.QueryGetActionRequest";
  value: QueryGetActionRequestAmino;
}
/**
 * Response type for GetAction
 * @name QueryGetActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionResponse
 */
export interface QueryGetActionResponse {
  action?: Action;
}
export interface QueryGetActionResponseProtoMsg {
  typeUrl: "/lumera.action.QueryGetActionResponse";
  value: Uint8Array;
}
/**
 * Response type for GetAction
 * @name QueryGetActionResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionResponse
 */
export interface QueryGetActionResponseAmino {
  action?: ActionAmino;
}
export interface QueryGetActionResponseAminoMsg {
  type: "/lumera.action.QueryGetActionResponse";
  value: QueryGetActionResponseAmino;
}
/**
 * @name QueryGetActionFeeRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionFeeRequest
 */
export interface QueryGetActionFeeRequest {
  dataSize: string;
}
export interface QueryGetActionFeeRequestProtoMsg {
  typeUrl: "/lumera.action.QueryGetActionFeeRequest";
  value: Uint8Array;
}
/**
 * @name QueryGetActionFeeRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionFeeRequest
 */
export interface QueryGetActionFeeRequestAmino {
  dataSize: string;
}
export interface QueryGetActionFeeRequestAminoMsg {
  type: "/lumera.action.QueryGetActionFeeRequest";
  value: QueryGetActionFeeRequestAmino;
}
/**
 * @name QueryGetActionFeeResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionFeeResponse
 */
export interface QueryGetActionFeeResponse {
  amount: string;
}
export interface QueryGetActionFeeResponseProtoMsg {
  typeUrl: "/lumera.action.QueryGetActionFeeResponse";
  value: Uint8Array;
}
/**
 * @name QueryGetActionFeeResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionFeeResponse
 */
export interface QueryGetActionFeeResponseAmino {
  amount: string;
}
export interface QueryGetActionFeeResponseAminoMsg {
  type: "/lumera.action.QueryGetActionFeeResponse";
  value: QueryGetActionFeeResponseAmino;
}
/**
 * List actions with optional type and state filters
 * @name QueryListActionsRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsRequest
 */
export interface QueryListActionsRequest {
  actionType: ActionType;
  actionState: ActionState;
  pagination?: PageRequest;
}
export interface QueryListActionsRequestProtoMsg {
  typeUrl: "/lumera.action.QueryListActionsRequest";
  value: Uint8Array;
}
/**
 * List actions with optional type and state filters
 * @name QueryListActionsRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsRequest
 */
export interface QueryListActionsRequestAmino {
  actionType: ActionType;
  actionState: ActionState;
  pagination?: PageRequestAmino;
}
export interface QueryListActionsRequestAminoMsg {
  type: "/lumera.action.QueryListActionsRequest";
  value: QueryListActionsRequestAmino;
}
/**
 * @name QueryListActionsResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsResponse
 */
export interface QueryListActionsResponse {
  actions: Action[];
  pagination?: PageResponse;
  total: bigint;
}
export interface QueryListActionsResponseProtoMsg {
  typeUrl: "/lumera.action.QueryListActionsResponse";
  value: Uint8Array;
}
/**
 * @name QueryListActionsResponseAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsResponse
 */
export interface QueryListActionsResponseAmino {
  actions: ActionAmino[];
  pagination?: PageResponseAmino;
  total: string;
}
export interface QueryListActionsResponseAminoMsg {
  type: "/lumera.action.QueryListActionsResponse";
  value: QueryListActionsResponseAmino;
}
/**
 * List actions for a specific supernode
 * @name QueryListActionsBySuperNodeRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsBySuperNodeRequest
 */
export interface QueryListActionsBySuperNodeRequest {
  superNodeAddress: string;
  pagination?: PageRequest;
}
export interface QueryListActionsBySuperNodeRequestProtoMsg {
  typeUrl: "/lumera.action.QueryListActionsBySuperNodeRequest";
  value: Uint8Array;
}
/**
 * List actions for a specific supernode
 * @name QueryListActionsBySuperNodeRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsBySuperNodeRequest
 */
export interface QueryListActionsBySuperNodeRequestAmino {
  superNodeAddress: string;
  pagination?: PageRequestAmino;
}
export interface QueryListActionsBySuperNodeRequestAminoMsg {
  type: "/lumera.action.QueryListActionsBySuperNodeRequest";
  value: QueryListActionsBySuperNodeRequestAmino;
}
/**
 * List actions by block height
 * @name QueryListActionsByBlockHeightRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsByBlockHeightRequest
 */
export interface QueryListActionsByBlockHeightRequest {
  blockHeight: bigint;
  pagination?: PageRequest;
}
export interface QueryListActionsByBlockHeightRequestProtoMsg {
  typeUrl: "/lumera.action.QueryListActionsByBlockHeightRequest";
  value: Uint8Array;
}
/**
 * List actions by block height
 * @name QueryListActionsByBlockHeightRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsByBlockHeightRequest
 */
export interface QueryListActionsByBlockHeightRequestAmino {
  blockHeight: string;
  pagination?: PageRequestAmino;
}
export interface QueryListActionsByBlockHeightRequestAminoMsg {
  type: "/lumera.action.QueryListActionsByBlockHeightRequest";
  value: QueryListActionsByBlockHeightRequestAmino;
}
/**
 * List expired actions
 * @name QueryListExpiredActionsRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListExpiredActionsRequest
 */
export interface QueryListExpiredActionsRequest {
  pagination?: PageRequest;
}
export interface QueryListExpiredActionsRequestProtoMsg {
  typeUrl: "/lumera.action.QueryListExpiredActionsRequest";
  value: Uint8Array;
}
/**
 * List expired actions
 * @name QueryListExpiredActionsRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryListExpiredActionsRequest
 */
export interface QueryListExpiredActionsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryListExpiredActionsRequestAminoMsg {
  type: "/lumera.action.QueryListExpiredActionsRequest";
  value: QueryListExpiredActionsRequestAmino;
}
/**
 * Query actions by metadata field
 * @name QueryActionByMetadataRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryActionByMetadataRequest
 */
export interface QueryActionByMetadataRequest {
  actionType: ActionType;
  /**
   * e.g., "field=value"
   */
  metadataQuery: string;
  pagination?: PageRequest;
}
export interface QueryActionByMetadataRequestProtoMsg {
  typeUrl: "/lumera.action.QueryActionByMetadataRequest";
  value: Uint8Array;
}
/**
 * Query actions by metadata field
 * @name QueryActionByMetadataRequestAmino
 * @package lumera.action
 * @see proto type: lumera.action.QueryActionByMetadataRequest
 */
export interface QueryActionByMetadataRequestAmino {
  actionType: ActionType;
  /**
   * e.g., "field=value"
   */
  metadataQuery: string;
  pagination?: PageRequestAmino;
}
export interface QueryActionByMetadataRequestAminoMsg {
  type: "/lumera.action.QueryActionByMetadataRequest";
  value: QueryActionByMetadataRequestAmino;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
/**
 * QueryParamsRequest is request type for the Query/Params RPC method.
 * @name QueryParamsRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryParamsRequest
 */
export const QueryParamsRequest = {
  typeUrl: "/lumera.action.QueryParamsRequest",
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
      typeUrl: "/lumera.action.QueryParamsRequest",
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
 * @package lumera.action
 * @see proto type: lumera.action.QueryParamsResponse
 */
export const QueryParamsResponse = {
  typeUrl: "/lumera.action.QueryParamsResponse",
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
      typeUrl: "/lumera.action.QueryParamsResponse",
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
function createBaseQueryGetActionRequest(): QueryGetActionRequest {
  return {
    actionID: ""
  };
}
/**
 * Request type for GetAction
 * @name QueryGetActionRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionRequest
 */
export const QueryGetActionRequest = {
  typeUrl: "/lumera.action.QueryGetActionRequest",
  is(o: any): o is QueryGetActionRequest {
    return o && (o.$typeUrl === QueryGetActionRequest.typeUrl || typeof o.actionID === "string");
  },
  isAmino(o: any): o is QueryGetActionRequestAmino {
    return o && (o.$typeUrl === QueryGetActionRequest.typeUrl || typeof o.actionID === "string");
  },
  encode(message: QueryGetActionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.actionID !== "") {
      writer.uint32(10).string(message.actionID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetActionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetActionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetActionRequest>): QueryGetActionRequest {
    const message = createBaseQueryGetActionRequest();
    message.actionID = object.actionID ?? "";
    return message;
  },
  fromAmino(object: QueryGetActionRequestAmino): QueryGetActionRequest {
    const message = createBaseQueryGetActionRequest();
    if (object.actionID !== undefined && object.actionID !== null) {
      message.actionID = object.actionID;
    }
    return message;
  },
  toAmino(message: QueryGetActionRequest): QueryGetActionRequestAmino {
    const obj: any = {};
    obj.actionID = message.actionID === "" ? undefined : message.actionID;
    return obj;
  },
  fromAminoMsg(object: QueryGetActionRequestAminoMsg): QueryGetActionRequest {
    return QueryGetActionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetActionRequestProtoMsg): QueryGetActionRequest {
    return QueryGetActionRequest.decode(message.value);
  },
  toProto(message: QueryGetActionRequest): Uint8Array {
    return QueryGetActionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetActionRequest): QueryGetActionRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryGetActionRequest",
      value: QueryGetActionRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryGetActionResponse(): QueryGetActionResponse {
  return {
    action: undefined
  };
}
/**
 * Response type for GetAction
 * @name QueryGetActionResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionResponse
 */
export const QueryGetActionResponse = {
  typeUrl: "/lumera.action.QueryGetActionResponse",
  is(o: any): o is QueryGetActionResponse {
    return o && o.$typeUrl === QueryGetActionResponse.typeUrl;
  },
  isAmino(o: any): o is QueryGetActionResponseAmino {
    return o && o.$typeUrl === QueryGetActionResponse.typeUrl;
  },
  encode(message: QueryGetActionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetActionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = Action.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetActionResponse>): QueryGetActionResponse {
    const message = createBaseQueryGetActionResponse();
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    return message;
  },
  fromAmino(object: QueryGetActionResponseAmino): QueryGetActionResponse {
    const message = createBaseQueryGetActionResponse();
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    return message;
  },
  toAmino(message: QueryGetActionResponse): QueryGetActionResponseAmino {
    const obj: any = {};
    obj.action = message.action ? Action.toAmino(message.action) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetActionResponseAminoMsg): QueryGetActionResponse {
    return QueryGetActionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetActionResponseProtoMsg): QueryGetActionResponse {
    return QueryGetActionResponse.decode(message.value);
  },
  toProto(message: QueryGetActionResponse): Uint8Array {
    return QueryGetActionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetActionResponse): QueryGetActionResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryGetActionResponse",
      value: QueryGetActionResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryGetActionResponse.typeUrl)) {
      return;
    }
    Action.registerTypeUrl();
  }
};
function createBaseQueryGetActionFeeRequest(): QueryGetActionFeeRequest {
  return {
    dataSize: ""
  };
}
/**
 * @name QueryGetActionFeeRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionFeeRequest
 */
export const QueryGetActionFeeRequest = {
  typeUrl: "/lumera.action.QueryGetActionFeeRequest",
  is(o: any): o is QueryGetActionFeeRequest {
    return o && (o.$typeUrl === QueryGetActionFeeRequest.typeUrl || typeof o.dataSize === "string");
  },
  isAmino(o: any): o is QueryGetActionFeeRequestAmino {
    return o && (o.$typeUrl === QueryGetActionFeeRequest.typeUrl || typeof o.dataSize === "string");
  },
  encode(message: QueryGetActionFeeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dataSize !== "") {
      writer.uint32(10).string(message.dataSize);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetActionFeeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetActionFeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataSize = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetActionFeeRequest>): QueryGetActionFeeRequest {
    const message = createBaseQueryGetActionFeeRequest();
    message.dataSize = object.dataSize ?? "";
    return message;
  },
  fromAmino(object: QueryGetActionFeeRequestAmino): QueryGetActionFeeRequest {
    const message = createBaseQueryGetActionFeeRequest();
    if (object.dataSize !== undefined && object.dataSize !== null) {
      message.dataSize = object.dataSize;
    }
    return message;
  },
  toAmino(message: QueryGetActionFeeRequest): QueryGetActionFeeRequestAmino {
    const obj: any = {};
    obj.dataSize = message.dataSize === "" ? undefined : message.dataSize;
    return obj;
  },
  fromAminoMsg(object: QueryGetActionFeeRequestAminoMsg): QueryGetActionFeeRequest {
    return QueryGetActionFeeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetActionFeeRequestProtoMsg): QueryGetActionFeeRequest {
    return QueryGetActionFeeRequest.decode(message.value);
  },
  toProto(message: QueryGetActionFeeRequest): Uint8Array {
    return QueryGetActionFeeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetActionFeeRequest): QueryGetActionFeeRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryGetActionFeeRequest",
      value: QueryGetActionFeeRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryGetActionFeeResponse(): QueryGetActionFeeResponse {
  return {
    amount: ""
  };
}
/**
 * @name QueryGetActionFeeResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryGetActionFeeResponse
 */
export const QueryGetActionFeeResponse = {
  typeUrl: "/lumera.action.QueryGetActionFeeResponse",
  is(o: any): o is QueryGetActionFeeResponse {
    return o && (o.$typeUrl === QueryGetActionFeeResponse.typeUrl || typeof o.amount === "string");
  },
  isAmino(o: any): o is QueryGetActionFeeResponseAmino {
    return o && (o.$typeUrl === QueryGetActionFeeResponse.typeUrl || typeof o.amount === "string");
  },
  encode(message: QueryGetActionFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== "") {
      writer.uint32(10).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetActionFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetActionFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetActionFeeResponse>): QueryGetActionFeeResponse {
    const message = createBaseQueryGetActionFeeResponse();
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: QueryGetActionFeeResponseAmino): QueryGetActionFeeResponse {
    const message = createBaseQueryGetActionFeeResponse();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: QueryGetActionFeeResponse): QueryGetActionFeeResponseAmino {
    const obj: any = {};
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: QueryGetActionFeeResponseAminoMsg): QueryGetActionFeeResponse {
    return QueryGetActionFeeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetActionFeeResponseProtoMsg): QueryGetActionFeeResponse {
    return QueryGetActionFeeResponse.decode(message.value);
  },
  toProto(message: QueryGetActionFeeResponse): Uint8Array {
    return QueryGetActionFeeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetActionFeeResponse): QueryGetActionFeeResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryGetActionFeeResponse",
      value: QueryGetActionFeeResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseQueryListActionsRequest(): QueryListActionsRequest {
  return {
    actionType: 0,
    actionState: 0,
    pagination: undefined
  };
}
/**
 * List actions with optional type and state filters
 * @name QueryListActionsRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsRequest
 */
export const QueryListActionsRequest = {
  typeUrl: "/lumera.action.QueryListActionsRequest",
  is(o: any): o is QueryListActionsRequest {
    return o && (o.$typeUrl === QueryListActionsRequest.typeUrl || isSet(o.actionType) && isSet(o.actionState));
  },
  isAmino(o: any): o is QueryListActionsRequestAmino {
    return o && (o.$typeUrl === QueryListActionsRequest.typeUrl || isSet(o.actionType) && isSet(o.actionState));
  },
  encode(message: QueryListActionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.actionType !== 0) {
      writer.uint32(8).int32(message.actionType);
    }
    if (message.actionState !== 0) {
      writer.uint32(16).int32(message.actionState);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListActionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListActionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionType = reader.int32() as any;
          break;
        case 2:
          message.actionState = reader.int32() as any;
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryListActionsRequest>): QueryListActionsRequest {
    const message = createBaseQueryListActionsRequest();
    message.actionType = object.actionType ?? 0;
    message.actionState = object.actionState ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListActionsRequestAmino): QueryListActionsRequest {
    const message = createBaseQueryListActionsRequest();
    if (object.actionType !== undefined && object.actionType !== null) {
      message.actionType = object.actionType;
    }
    if (object.actionState !== undefined && object.actionState !== null) {
      message.actionState = object.actionState;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListActionsRequest): QueryListActionsRequestAmino {
    const obj: any = {};
    obj.actionType = message.actionType === 0 ? undefined : message.actionType;
    obj.actionState = message.actionState === 0 ? undefined : message.actionState;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListActionsRequestAminoMsg): QueryListActionsRequest {
    return QueryListActionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListActionsRequestProtoMsg): QueryListActionsRequest {
    return QueryListActionsRequest.decode(message.value);
  },
  toProto(message: QueryListActionsRequest): Uint8Array {
    return QueryListActionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListActionsRequest): QueryListActionsRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryListActionsRequest",
      value: QueryListActionsRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListActionsRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};
function createBaseQueryListActionsResponse(): QueryListActionsResponse {
  return {
    actions: [],
    pagination: undefined,
    total: BigInt(0)
  };
}
/**
 * @name QueryListActionsResponse
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsResponse
 */
export const QueryListActionsResponse = {
  typeUrl: "/lumera.action.QueryListActionsResponse",
  is(o: any): o is QueryListActionsResponse {
    return o && (o.$typeUrl === QueryListActionsResponse.typeUrl || Array.isArray(o.actions) && (!o.actions.length || Action.is(o.actions[0])) && typeof o.total === "bigint");
  },
  isAmino(o: any): o is QueryListActionsResponseAmino {
    return o && (o.$typeUrl === QueryListActionsResponse.typeUrl || Array.isArray(o.actions) && (!o.actions.length || Action.isAmino(o.actions[0])) && typeof o.total === "bigint");
  },
  encode(message: QueryListActionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.total !== BigInt(0)) {
      writer.uint32(24).uint64(message.total);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListActionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListActionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actions.push(Action.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.total = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryListActionsResponse>): QueryListActionsResponse {
    const message = createBaseQueryListActionsResponse();
    message.actions = object.actions?.map(e => Action.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    message.total = object.total !== undefined && object.total !== null ? BigInt(object.total.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryListActionsResponseAmino): QueryListActionsResponse {
    const message = createBaseQueryListActionsResponse();
    message.actions = object.actions?.map(e => Action.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = BigInt(object.total);
    }
    return message;
  },
  toAmino(message: QueryListActionsResponse): QueryListActionsResponseAmino {
    const obj: any = {};
    if (message.actions) {
      obj.actions = message.actions.map(e => e ? Action.toAmino(e) : undefined);
    } else {
      obj.actions = message.actions;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    obj.total = message.total !== BigInt(0) ? message.total?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListActionsResponseAminoMsg): QueryListActionsResponse {
    return QueryListActionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListActionsResponseProtoMsg): QueryListActionsResponse {
    return QueryListActionsResponse.decode(message.value);
  },
  toProto(message: QueryListActionsResponse): Uint8Array {
    return QueryListActionsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryListActionsResponse): QueryListActionsResponseProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryListActionsResponse",
      value: QueryListActionsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListActionsResponse.typeUrl)) {
      return;
    }
    Action.registerTypeUrl();
    PageResponse.registerTypeUrl();
  }
};
function createBaseQueryListActionsBySuperNodeRequest(): QueryListActionsBySuperNodeRequest {
  return {
    superNodeAddress: "",
    pagination: undefined
  };
}
/**
 * List actions for a specific supernode
 * @name QueryListActionsBySuperNodeRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsBySuperNodeRequest
 */
export const QueryListActionsBySuperNodeRequest = {
  typeUrl: "/lumera.action.QueryListActionsBySuperNodeRequest",
  is(o: any): o is QueryListActionsBySuperNodeRequest {
    return o && (o.$typeUrl === QueryListActionsBySuperNodeRequest.typeUrl || typeof o.superNodeAddress === "string");
  },
  isAmino(o: any): o is QueryListActionsBySuperNodeRequestAmino {
    return o && (o.$typeUrl === QueryListActionsBySuperNodeRequest.typeUrl || typeof o.superNodeAddress === "string");
  },
  encode(message: QueryListActionsBySuperNodeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.superNodeAddress !== "") {
      writer.uint32(10).string(message.superNodeAddress);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListActionsBySuperNodeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListActionsBySuperNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.superNodeAddress = reader.string();
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
  fromPartial(object: DeepPartial<QueryListActionsBySuperNodeRequest>): QueryListActionsBySuperNodeRequest {
    const message = createBaseQueryListActionsBySuperNodeRequest();
    message.superNodeAddress = object.superNodeAddress ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListActionsBySuperNodeRequestAmino): QueryListActionsBySuperNodeRequest {
    const message = createBaseQueryListActionsBySuperNodeRequest();
    if (object.superNodeAddress !== undefined && object.superNodeAddress !== null) {
      message.superNodeAddress = object.superNodeAddress;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListActionsBySuperNodeRequest): QueryListActionsBySuperNodeRequestAmino {
    const obj: any = {};
    obj.superNodeAddress = message.superNodeAddress === "" ? undefined : message.superNodeAddress;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListActionsBySuperNodeRequestAminoMsg): QueryListActionsBySuperNodeRequest {
    return QueryListActionsBySuperNodeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListActionsBySuperNodeRequestProtoMsg): QueryListActionsBySuperNodeRequest {
    return QueryListActionsBySuperNodeRequest.decode(message.value);
  },
  toProto(message: QueryListActionsBySuperNodeRequest): Uint8Array {
    return QueryListActionsBySuperNodeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListActionsBySuperNodeRequest): QueryListActionsBySuperNodeRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryListActionsBySuperNodeRequest",
      value: QueryListActionsBySuperNodeRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListActionsBySuperNodeRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};
function createBaseQueryListActionsByBlockHeightRequest(): QueryListActionsByBlockHeightRequest {
  return {
    blockHeight: BigInt(0),
    pagination: undefined
  };
}
/**
 * List actions by block height
 * @name QueryListActionsByBlockHeightRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListActionsByBlockHeightRequest
 */
export const QueryListActionsByBlockHeightRequest = {
  typeUrl: "/lumera.action.QueryListActionsByBlockHeightRequest",
  is(o: any): o is QueryListActionsByBlockHeightRequest {
    return o && (o.$typeUrl === QueryListActionsByBlockHeightRequest.typeUrl || typeof o.blockHeight === "bigint");
  },
  isAmino(o: any): o is QueryListActionsByBlockHeightRequestAmino {
    return o && (o.$typeUrl === QueryListActionsByBlockHeightRequest.typeUrl || typeof o.blockHeight === "bigint");
  },
  encode(message: QueryListActionsByBlockHeightRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(8).int64(message.blockHeight);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListActionsByBlockHeightRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListActionsByBlockHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.int64();
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
  fromPartial(object: DeepPartial<QueryListActionsByBlockHeightRequest>): QueryListActionsByBlockHeightRequest {
    const message = createBaseQueryListActionsByBlockHeightRequest();
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListActionsByBlockHeightRequestAmino): QueryListActionsByBlockHeightRequest {
    const message = createBaseQueryListActionsByBlockHeightRequest();
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = BigInt(object.blockHeight);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListActionsByBlockHeightRequest): QueryListActionsByBlockHeightRequestAmino {
    const obj: any = {};
    obj.blockHeight = message.blockHeight !== BigInt(0) ? message.blockHeight?.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListActionsByBlockHeightRequestAminoMsg): QueryListActionsByBlockHeightRequest {
    return QueryListActionsByBlockHeightRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListActionsByBlockHeightRequestProtoMsg): QueryListActionsByBlockHeightRequest {
    return QueryListActionsByBlockHeightRequest.decode(message.value);
  },
  toProto(message: QueryListActionsByBlockHeightRequest): Uint8Array {
    return QueryListActionsByBlockHeightRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListActionsByBlockHeightRequest): QueryListActionsByBlockHeightRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryListActionsByBlockHeightRequest",
      value: QueryListActionsByBlockHeightRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListActionsByBlockHeightRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};
function createBaseQueryListExpiredActionsRequest(): QueryListExpiredActionsRequest {
  return {
    pagination: undefined
  };
}
/**
 * List expired actions
 * @name QueryListExpiredActionsRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryListExpiredActionsRequest
 */
export const QueryListExpiredActionsRequest = {
  typeUrl: "/lumera.action.QueryListExpiredActionsRequest",
  is(o: any): o is QueryListExpiredActionsRequest {
    return o && o.$typeUrl === QueryListExpiredActionsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryListExpiredActionsRequestAmino {
    return o && o.$typeUrl === QueryListExpiredActionsRequest.typeUrl;
  },
  encode(message: QueryListExpiredActionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListExpiredActionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListExpiredActionsRequest();
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
  fromPartial(object: DeepPartial<QueryListExpiredActionsRequest>): QueryListExpiredActionsRequest {
    const message = createBaseQueryListExpiredActionsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryListExpiredActionsRequestAmino): QueryListExpiredActionsRequest {
    const message = createBaseQueryListExpiredActionsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryListExpiredActionsRequest): QueryListExpiredActionsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryListExpiredActionsRequestAminoMsg): QueryListExpiredActionsRequest {
    return QueryListExpiredActionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListExpiredActionsRequestProtoMsg): QueryListExpiredActionsRequest {
    return QueryListExpiredActionsRequest.decode(message.value);
  },
  toProto(message: QueryListExpiredActionsRequest): Uint8Array {
    return QueryListExpiredActionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListExpiredActionsRequest): QueryListExpiredActionsRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryListExpiredActionsRequest",
      value: QueryListExpiredActionsRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryListExpiredActionsRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};
function createBaseQueryActionByMetadataRequest(): QueryActionByMetadataRequest {
  return {
    actionType: 0,
    metadataQuery: "",
    pagination: undefined
  };
}
/**
 * Query actions by metadata field
 * @name QueryActionByMetadataRequest
 * @package lumera.action
 * @see proto type: lumera.action.QueryActionByMetadataRequest
 */
export const QueryActionByMetadataRequest = {
  typeUrl: "/lumera.action.QueryActionByMetadataRequest",
  is(o: any): o is QueryActionByMetadataRequest {
    return o && (o.$typeUrl === QueryActionByMetadataRequest.typeUrl || isSet(o.actionType) && typeof o.metadataQuery === "string");
  },
  isAmino(o: any): o is QueryActionByMetadataRequestAmino {
    return o && (o.$typeUrl === QueryActionByMetadataRequest.typeUrl || isSet(o.actionType) && typeof o.metadataQuery === "string");
  },
  encode(message: QueryActionByMetadataRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.actionType !== 0) {
      writer.uint32(8).int32(message.actionType);
    }
    if (message.metadataQuery !== "") {
      writer.uint32(18).string(message.metadataQuery);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryActionByMetadataRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActionByMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionType = reader.int32() as any;
          break;
        case 2:
          message.metadataQuery = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryActionByMetadataRequest>): QueryActionByMetadataRequest {
    const message = createBaseQueryActionByMetadataRequest();
    message.actionType = object.actionType ?? 0;
    message.metadataQuery = object.metadataQuery ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryActionByMetadataRequestAmino): QueryActionByMetadataRequest {
    const message = createBaseQueryActionByMetadataRequest();
    if (object.actionType !== undefined && object.actionType !== null) {
      message.actionType = object.actionType;
    }
    if (object.metadataQuery !== undefined && object.metadataQuery !== null) {
      message.metadataQuery = object.metadataQuery;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryActionByMetadataRequest): QueryActionByMetadataRequestAmino {
    const obj: any = {};
    obj.actionType = message.actionType === 0 ? undefined : message.actionType;
    obj.metadataQuery = message.metadataQuery === "" ? undefined : message.metadataQuery;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryActionByMetadataRequestAminoMsg): QueryActionByMetadataRequest {
    return QueryActionByMetadataRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActionByMetadataRequestProtoMsg): QueryActionByMetadataRequest {
    return QueryActionByMetadataRequest.decode(message.value);
  },
  toProto(message: QueryActionByMetadataRequest): Uint8Array {
    return QueryActionByMetadataRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryActionByMetadataRequest): QueryActionByMetadataRequestProtoMsg {
    return {
      typeUrl: "/lumera.action.QueryActionByMetadataRequest",
      value: QueryActionByMetadataRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(QueryActionByMetadataRequest.typeUrl)) {
      return;
    }
    PageRequest.registerTypeUrl();
  }
};