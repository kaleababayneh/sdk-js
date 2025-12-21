// @ts-nocheck
/* eslint-disable */
import { Policy, PolicyAmino } from "./policy";
import { FieldMask, FieldMaskAmino } from "../../protobuf/field_mask";
import { GetPolicyOptions, GetPolicyOptionsAmino } from "./options";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { DeepPartial } from "../../../helpers";
/**
 * Request message for `SetIamPolicy` method.
 * @name SetIamPolicyRequest
 * @package google.iam.v1
 * @see proto type: google.iam.v1.SetIamPolicyRequest
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The resource for which the policy is being specified.
   * See the operation documentation for the appropriate value for this field.
   */
  resource: string;
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a
   * valid policy but certain Cloud Platform services (such as Projects)
   * might reject them.
   */
  policy?: Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only
   * the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used:
   * 
   * `paths: "bindings, etag"`
   */
  updateMask?: FieldMask;
}
export interface SetIamPolicyRequestProtoMsg {
  typeUrl: "/google.iam.v1.SetIamPolicyRequest";
  value: Uint8Array;
}
/**
 * Request message for `SetIamPolicy` method.
 * @name SetIamPolicyRequestAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.SetIamPolicyRequest
 */
export interface SetIamPolicyRequestAmino {
  /**
   * REQUIRED: The resource for which the policy is being specified.
   * See the operation documentation for the appropriate value for this field.
   */
  resource: string;
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a
   * valid policy but certain Cloud Platform services (such as Projects)
   * might reject them.
   */
  policy?: PolicyAmino;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only
   * the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used:
   * 
   * `paths: "bindings, etag"`
   */
  update_mask?: FieldMaskAmino;
}
export interface SetIamPolicyRequestAminoMsg {
  type: "/google.iam.v1.SetIamPolicyRequest";
  value: SetIamPolicyRequestAmino;
}
/**
 * Request message for `GetIamPolicy` method.
 * @name GetIamPolicyRequest
 * @package google.iam.v1
 * @see proto type: google.iam.v1.GetIamPolicyRequest
 */
export interface GetIamPolicyRequest {
  /**
   * REQUIRED: The resource for which the policy is being requested.
   * See the operation documentation for the appropriate value for this field.
   */
  resource: string;
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptions;
}
export interface GetIamPolicyRequestProtoMsg {
  typeUrl: "/google.iam.v1.GetIamPolicyRequest";
  value: Uint8Array;
}
/**
 * Request message for `GetIamPolicy` method.
 * @name GetIamPolicyRequestAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.GetIamPolicyRequest
 */
export interface GetIamPolicyRequestAmino {
  /**
   * REQUIRED: The resource for which the policy is being requested.
   * See the operation documentation for the appropriate value for this field.
   */
  resource: string;
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptionsAmino;
}
export interface GetIamPolicyRequestAminoMsg {
  type: "/google.iam.v1.GetIamPolicyRequest";
  value: GetIamPolicyRequestAmino;
}
/**
 * Request message for `TestIamPermissions` method.
 * @name TestIamPermissionsRequest
 * @package google.iam.v1
 * @see proto type: google.iam.v1.TestIamPermissionsRequest
 */
export interface TestIamPermissionsRequest {
  /**
   * REQUIRED: The resource for which the policy detail is being requested.
   * See the operation documentation for the appropriate value for this field.
   */
  resource: string;
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as '*' or 'storage.*') are not allowed. For more
   * information see
   * [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions: string[];
}
export interface TestIamPermissionsRequestProtoMsg {
  typeUrl: "/google.iam.v1.TestIamPermissionsRequest";
  value: Uint8Array;
}
/**
 * Request message for `TestIamPermissions` method.
 * @name TestIamPermissionsRequestAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.TestIamPermissionsRequest
 */
export interface TestIamPermissionsRequestAmino {
  /**
   * REQUIRED: The resource for which the policy detail is being requested.
   * See the operation documentation for the appropriate value for this field.
   */
  resource: string;
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as '*' or 'storage.*') are not allowed. For more
   * information see
   * [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions: string[];
}
export interface TestIamPermissionsRequestAminoMsg {
  type: "/google.iam.v1.TestIamPermissionsRequest";
  value: TestIamPermissionsRequestAmino;
}
/**
 * Response message for `TestIamPermissions` method.
 * @name TestIamPermissionsResponse
 * @package google.iam.v1
 * @see proto type: google.iam.v1.TestIamPermissionsResponse
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions: string[];
}
export interface TestIamPermissionsResponseProtoMsg {
  typeUrl: "/google.iam.v1.TestIamPermissionsResponse";
  value: Uint8Array;
}
/**
 * Response message for `TestIamPermissions` method.
 * @name TestIamPermissionsResponseAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.TestIamPermissionsResponse
 */
export interface TestIamPermissionsResponseAmino {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions: string[];
}
export interface TestIamPermissionsResponseAminoMsg {
  type: "/google.iam.v1.TestIamPermissionsResponse";
  value: TestIamPermissionsResponseAmino;
}
function createBaseSetIamPolicyRequest(): SetIamPolicyRequest {
  return {
    resource: "",
    policy: undefined,
    updateMask: undefined
  };
}
/**
 * Request message for `SetIamPolicy` method.
 * @name SetIamPolicyRequest
 * @package google.iam.v1
 * @see proto type: google.iam.v1.SetIamPolicyRequest
 */
export const SetIamPolicyRequest = {
  typeUrl: "/google.iam.v1.SetIamPolicyRequest",
  is(o: any): o is SetIamPolicyRequest {
    return o && (o.$typeUrl === SetIamPolicyRequest.typeUrl || typeof o.resource === "string");
  },
  isAmino(o: any): o is SetIamPolicyRequestAmino {
    return o && (o.$typeUrl === SetIamPolicyRequest.typeUrl || typeof o.resource === "string");
  },
  encode(message: SetIamPolicyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.policy !== undefined) {
      Policy.encode(message.policy, writer.uint32(18).fork()).ldelim();
    }
    if (message.updateMask !== undefined) {
      FieldMask.encode(message.updateMask, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SetIamPolicyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetIamPolicyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.policy = Policy.decode(reader, reader.uint32());
          break;
        case 3:
          message.updateMask = FieldMask.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SetIamPolicyRequest>): SetIamPolicyRequest {
    const message = createBaseSetIamPolicyRequest();
    message.resource = object.resource ?? "";
    message.policy = object.policy !== undefined && object.policy !== null ? Policy.fromPartial(object.policy) : undefined;
    message.updateMask = object.updateMask !== undefined && object.updateMask !== null ? FieldMask.fromPartial(object.updateMask) : undefined;
    return message;
  },
  fromAmino(object: SetIamPolicyRequestAmino): SetIamPolicyRequest {
    const message = createBaseSetIamPolicyRequest();
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = object.resource;
    }
    if (object.policy !== undefined && object.policy !== null) {
      message.policy = Policy.fromAmino(object.policy);
    }
    if (object.update_mask !== undefined && object.update_mask !== null) {
      message.updateMask = FieldMask.fromAmino(object.update_mask);
    }
    return message;
  },
  toAmino(message: SetIamPolicyRequest): SetIamPolicyRequestAmino {
    const obj: any = {};
    obj.resource = message.resource === "" ? undefined : message.resource;
    obj.policy = message.policy ? Policy.toAmino(message.policy) : undefined;
    obj.update_mask = message.updateMask ? FieldMask.toAmino(message.updateMask) : undefined;
    return obj;
  },
  fromAminoMsg(object: SetIamPolicyRequestAminoMsg): SetIamPolicyRequest {
    return SetIamPolicyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: SetIamPolicyRequestProtoMsg): SetIamPolicyRequest {
    return SetIamPolicyRequest.decode(message.value);
  },
  toProto(message: SetIamPolicyRequest): Uint8Array {
    return SetIamPolicyRequest.encode(message).finish();
  },
  toProtoMsg(message: SetIamPolicyRequest): SetIamPolicyRequestProtoMsg {
    return {
      typeUrl: "/google.iam.v1.SetIamPolicyRequest",
      value: SetIamPolicyRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(SetIamPolicyRequest.typeUrl)) {
      return;
    }
    Policy.registerTypeUrl();
    FieldMask.registerTypeUrl();
  }
};
function createBaseGetIamPolicyRequest(): GetIamPolicyRequest {
  return {
    resource: "",
    options: undefined
  };
}
/**
 * Request message for `GetIamPolicy` method.
 * @name GetIamPolicyRequest
 * @package google.iam.v1
 * @see proto type: google.iam.v1.GetIamPolicyRequest
 */
export const GetIamPolicyRequest = {
  typeUrl: "/google.iam.v1.GetIamPolicyRequest",
  is(o: any): o is GetIamPolicyRequest {
    return o && (o.$typeUrl === GetIamPolicyRequest.typeUrl || typeof o.resource === "string");
  },
  isAmino(o: any): o is GetIamPolicyRequestAmino {
    return o && (o.$typeUrl === GetIamPolicyRequest.typeUrl || typeof o.resource === "string");
  },
  encode(message: GetIamPolicyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.options !== undefined) {
      GetPolicyOptions.encode(message.options, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetIamPolicyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIamPolicyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.options = GetPolicyOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetIamPolicyRequest>): GetIamPolicyRequest {
    const message = createBaseGetIamPolicyRequest();
    message.resource = object.resource ?? "";
    message.options = object.options !== undefined && object.options !== null ? GetPolicyOptions.fromPartial(object.options) : undefined;
    return message;
  },
  fromAmino(object: GetIamPolicyRequestAmino): GetIamPolicyRequest {
    const message = createBaseGetIamPolicyRequest();
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = object.resource;
    }
    if (object.options !== undefined && object.options !== null) {
      message.options = GetPolicyOptions.fromAmino(object.options);
    }
    return message;
  },
  toAmino(message: GetIamPolicyRequest): GetIamPolicyRequestAmino {
    const obj: any = {};
    obj.resource = message.resource === "" ? undefined : message.resource;
    obj.options = message.options ? GetPolicyOptions.toAmino(message.options) : undefined;
    return obj;
  },
  fromAminoMsg(object: GetIamPolicyRequestAminoMsg): GetIamPolicyRequest {
    return GetIamPolicyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: GetIamPolicyRequestProtoMsg): GetIamPolicyRequest {
    return GetIamPolicyRequest.decode(message.value);
  },
  toProto(message: GetIamPolicyRequest): Uint8Array {
    return GetIamPolicyRequest.encode(message).finish();
  },
  toProtoMsg(message: GetIamPolicyRequest): GetIamPolicyRequestProtoMsg {
    return {
      typeUrl: "/google.iam.v1.GetIamPolicyRequest",
      value: GetIamPolicyRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(GetIamPolicyRequest.typeUrl)) {
      return;
    }
    GetPolicyOptions.registerTypeUrl();
  }
};
function createBaseTestIamPermissionsRequest(): TestIamPermissionsRequest {
  return {
    resource: "",
    permissions: []
  };
}
/**
 * Request message for `TestIamPermissions` method.
 * @name TestIamPermissionsRequest
 * @package google.iam.v1
 * @see proto type: google.iam.v1.TestIamPermissionsRequest
 */
export const TestIamPermissionsRequest = {
  typeUrl: "/google.iam.v1.TestIamPermissionsRequest",
  is(o: any): o is TestIamPermissionsRequest {
    return o && (o.$typeUrl === TestIamPermissionsRequest.typeUrl || typeof o.resource === "string" && Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
  },
  isAmino(o: any): o is TestIamPermissionsRequestAmino {
    return o && (o.$typeUrl === TestIamPermissionsRequest.typeUrl || typeof o.resource === "string" && Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
  },
  encode(message: TestIamPermissionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    for (const v of message.permissions) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TestIamPermissionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTestIamPermissionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.permissions.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TestIamPermissionsRequest>): TestIamPermissionsRequest {
    const message = createBaseTestIamPermissionsRequest();
    message.resource = object.resource ?? "";
    message.permissions = object.permissions?.map(e => e) || [];
    return message;
  },
  fromAmino(object: TestIamPermissionsRequestAmino): TestIamPermissionsRequest {
    const message = createBaseTestIamPermissionsRequest();
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = object.resource;
    }
    message.permissions = object.permissions?.map(e => e) || [];
    return message;
  },
  toAmino(message: TestIamPermissionsRequest): TestIamPermissionsRequestAmino {
    const obj: any = {};
    obj.resource = message.resource === "" ? undefined : message.resource;
    if (message.permissions) {
      obj.permissions = message.permissions.map(e => e);
    } else {
      obj.permissions = message.permissions;
    }
    return obj;
  },
  fromAminoMsg(object: TestIamPermissionsRequestAminoMsg): TestIamPermissionsRequest {
    return TestIamPermissionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: TestIamPermissionsRequestProtoMsg): TestIamPermissionsRequest {
    return TestIamPermissionsRequest.decode(message.value);
  },
  toProto(message: TestIamPermissionsRequest): Uint8Array {
    return TestIamPermissionsRequest.encode(message).finish();
  },
  toProtoMsg(message: TestIamPermissionsRequest): TestIamPermissionsRequestProtoMsg {
    return {
      typeUrl: "/google.iam.v1.TestIamPermissionsRequest",
      value: TestIamPermissionsRequest.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseTestIamPermissionsResponse(): TestIamPermissionsResponse {
  return {
    permissions: []
  };
}
/**
 * Response message for `TestIamPermissions` method.
 * @name TestIamPermissionsResponse
 * @package google.iam.v1
 * @see proto type: google.iam.v1.TestIamPermissionsResponse
 */
export const TestIamPermissionsResponse = {
  typeUrl: "/google.iam.v1.TestIamPermissionsResponse",
  is(o: any): o is TestIamPermissionsResponse {
    return o && (o.$typeUrl === TestIamPermissionsResponse.typeUrl || Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
  },
  isAmino(o: any): o is TestIamPermissionsResponseAmino {
    return o && (o.$typeUrl === TestIamPermissionsResponse.typeUrl || Array.isArray(o.permissions) && (!o.permissions.length || typeof o.permissions[0] === "string"));
  },
  encode(message: TestIamPermissionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.permissions) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TestIamPermissionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTestIamPermissionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permissions.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TestIamPermissionsResponse>): TestIamPermissionsResponse {
    const message = createBaseTestIamPermissionsResponse();
    message.permissions = object.permissions?.map(e => e) || [];
    return message;
  },
  fromAmino(object: TestIamPermissionsResponseAmino): TestIamPermissionsResponse {
    const message = createBaseTestIamPermissionsResponse();
    message.permissions = object.permissions?.map(e => e) || [];
    return message;
  },
  toAmino(message: TestIamPermissionsResponse): TestIamPermissionsResponseAmino {
    const obj: any = {};
    if (message.permissions) {
      obj.permissions = message.permissions.map(e => e);
    } else {
      obj.permissions = message.permissions;
    }
    return obj;
  },
  fromAminoMsg(object: TestIamPermissionsResponseAminoMsg): TestIamPermissionsResponse {
    return TestIamPermissionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: TestIamPermissionsResponseProtoMsg): TestIamPermissionsResponse {
    return TestIamPermissionsResponse.decode(message.value);
  },
  toProto(message: TestIamPermissionsResponse): Uint8Array {
    return TestIamPermissionsResponse.encode(message).finish();
  },
  toProtoMsg(message: TestIamPermissionsResponse): TestIamPermissionsResponseProtoMsg {
    return {
      typeUrl: "/google.iam.v1.TestIamPermissionsResponse",
      value: TestIamPermissionsResponse.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};