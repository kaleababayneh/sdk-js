// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/**
 * Encapsulates settings provided to GetIamPolicy.
 * @name GetPolicyOptions
 * @package google.iam.v1
 * @see proto type: google.iam.v1.GetPolicyOptions
 */
export interface GetPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy.
   * 
   * Valid values are 0, 1, and 3. Requests specifying an invalid value will be
   * rejected.
   * 
   * Requests for policies with any conditional role bindings must specify
   * version 3. Policies with no conditional role bindings may specify any valid
   * value or leave the field unset.
   * 
   * The policy in the response might use the policy version that you specified,
   * or it might use a lower policy version. For example, if you specify version
   * 3, but the policy has no conditional role bindings, the response uses
   * version 1.
   * 
   * To learn which resources support conditions in their IAM policies, see the
   * [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  requestedPolicyVersion: number;
}
export interface GetPolicyOptionsProtoMsg {
  typeUrl: "/google.iam.v1.GetPolicyOptions";
  value: Uint8Array;
}
/**
 * Encapsulates settings provided to GetIamPolicy.
 * @name GetPolicyOptionsAmino
 * @package google.iam.v1
 * @see proto type: google.iam.v1.GetPolicyOptions
 */
export interface GetPolicyOptionsAmino {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy.
   * 
   * Valid values are 0, 1, and 3. Requests specifying an invalid value will be
   * rejected.
   * 
   * Requests for policies with any conditional role bindings must specify
   * version 3. Policies with no conditional role bindings may specify any valid
   * value or leave the field unset.
   * 
   * The policy in the response might use the policy version that you specified,
   * or it might use a lower policy version. For example, if you specify version
   * 3, but the policy has no conditional role bindings, the response uses
   * version 1.
   * 
   * To learn which resources support conditions in their IAM policies, see the
   * [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  requested_policy_version: number;
}
export interface GetPolicyOptionsAminoMsg {
  type: "/google.iam.v1.GetPolicyOptions";
  value: GetPolicyOptionsAmino;
}
function createBaseGetPolicyOptions(): GetPolicyOptions {
  return {
    requestedPolicyVersion: 0
  };
}
/**
 * Encapsulates settings provided to GetIamPolicy.
 * @name GetPolicyOptions
 * @package google.iam.v1
 * @see proto type: google.iam.v1.GetPolicyOptions
 */
export const GetPolicyOptions = {
  typeUrl: "/google.iam.v1.GetPolicyOptions",
  is(o: any): o is GetPolicyOptions {
    return o && (o.$typeUrl === GetPolicyOptions.typeUrl || typeof o.requestedPolicyVersion === "number");
  },
  isAmino(o: any): o is GetPolicyOptionsAmino {
    return o && (o.$typeUrl === GetPolicyOptions.typeUrl || typeof o.requested_policy_version === "number");
  },
  encode(message: GetPolicyOptions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.requestedPolicyVersion !== 0) {
      writer.uint32(8).int32(message.requestedPolicyVersion);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GetPolicyOptions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPolicyOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestedPolicyVersion = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetPolicyOptions>): GetPolicyOptions {
    const message = createBaseGetPolicyOptions();
    message.requestedPolicyVersion = object.requestedPolicyVersion ?? 0;
    return message;
  },
  fromAmino(object: GetPolicyOptionsAmino): GetPolicyOptions {
    const message = createBaseGetPolicyOptions();
    if (object.requested_policy_version !== undefined && object.requested_policy_version !== null) {
      message.requestedPolicyVersion = object.requested_policy_version;
    }
    return message;
  },
  toAmino(message: GetPolicyOptions): GetPolicyOptionsAmino {
    const obj: any = {};
    obj.requested_policy_version = message.requestedPolicyVersion === 0 ? undefined : message.requestedPolicyVersion;
    return obj;
  },
  fromAminoMsg(object: GetPolicyOptionsAminoMsg): GetPolicyOptions {
    return GetPolicyOptions.fromAmino(object.value);
  },
  fromProtoMsg(message: GetPolicyOptionsProtoMsg): GetPolicyOptions {
    return GetPolicyOptions.decode(message.value);
  },
  toProto(message: GetPolicyOptions): Uint8Array {
    return GetPolicyOptions.encode(message).finish();
  },
  toProtoMsg(message: GetPolicyOptions): GetPolicyOptionsProtoMsg {
    return {
      typeUrl: "/google.iam.v1.GetPolicyOptions",
      value: GetPolicyOptions.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};