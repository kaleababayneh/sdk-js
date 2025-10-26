// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../binary";
import { Exact } from "../../helpers";
/**
 * Params defines the parameters for the module.
 * @name Params
 * @package lumera.claim
 * @see proto type: lumera.claim.Params
 */
export interface Params {
  enableClaims: boolean;
  claimEndTime: bigint;
  maxClaimsPerBlock: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/lumera.claim.Params";
  value: Uint8Array;
}
/**
 * Params defines the parameters for the module.
 * @name ParamsAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.Params
 */
export interface ParamsAmino {
  enable_claims: boolean;
  claim_end_time?: string;
  max_claims_per_block: string;
}
export interface ParamsAminoMsg {
  type: "/lumera.claim.Params";
  value: ParamsAmino;
}
/**
 * Params defines the parameters for the module.
 * @name ParamsSDKType
 * @package lumera.claim
 * @see proto type: lumera.claim.Params
 */
export interface ParamsSDKType {
  enable_claims: boolean;
  claim_end_time: bigint;
  max_claims_per_block: bigint;
}
function createBaseParams(): Params {
  return {
    enableClaims: false,
    claimEndTime: BigInt(0),
    maxClaimsPerBlock: BigInt(0)
  };
}
/**
 * Params defines the parameters for the module.
 * @name Params
 * @package lumera.claim
 * @see proto type: lumera.claim.Params
 */
export const Params = {
  typeUrl: "/lumera.claim.Params",
  is(o: any): o is Params {
    return o && (o.$typeUrl === Params.typeUrl || typeof o.enableClaims === "boolean" && typeof o.claimEndTime === "bigint" && typeof o.maxClaimsPerBlock === "bigint");
  },
  isSDK(o: any): o is ParamsSDKType {
    return o && (o.$typeUrl === Params.typeUrl || typeof o.enable_claims === "boolean" && typeof o.claim_end_time === "bigint" && typeof o.max_claims_per_block === "bigint");
  },
  isAmino(o: any): o is ParamsAmino {
    return o && (o.$typeUrl === Params.typeUrl || typeof o.enable_claims === "boolean" && typeof o.claim_end_time === "bigint" && typeof o.max_claims_per_block === "bigint");
  },
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enableClaims === true) {
      writer.uint32(8).bool(message.enableClaims);
    }
    if (message.claimEndTime !== BigInt(0)) {
      writer.uint32(24).int64(message.claimEndTime);
    }
    if (message.maxClaimsPerBlock !== BigInt(0)) {
      writer.uint32(32).uint64(message.maxClaimsPerBlock);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enableClaims = reader.bool();
          break;
        case 3:
          message.claimEndTime = reader.int64();
          break;
        case 4:
          message.maxClaimsPerBlock = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.enableClaims = object.enableClaims ?? false;
    message.claimEndTime = object.claimEndTime !== undefined && object.claimEndTime !== null ? BigInt(object.claimEndTime.toString()) : BigInt(0);
    message.maxClaimsPerBlock = object.maxClaimsPerBlock !== undefined && object.maxClaimsPerBlock !== null ? BigInt(object.maxClaimsPerBlock.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.enable_claims !== undefined && object.enable_claims !== null) {
      message.enableClaims = object.enable_claims;
    }
    if (object.claim_end_time !== undefined && object.claim_end_time !== null) {
      message.claimEndTime = BigInt(object.claim_end_time);
    }
    if (object.max_claims_per_block !== undefined && object.max_claims_per_block !== null) {
      message.maxClaimsPerBlock = BigInt(object.max_claims_per_block);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.enable_claims = message.enableClaims ?? false;
    obj.claim_end_time = message.claimEndTime !== BigInt(0) ? message.claimEndTime?.toString() : undefined;
    obj.max_claims_per_block = message.maxClaimsPerBlock ? message.maxClaimsPerBlock?.toString() : "0";
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/lumera.claim.Params",
      value: Params.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};