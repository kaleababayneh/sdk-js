// @ts-nocheck
/* eslint-disable */
import { Params, ParamsAmino } from "./params";
import { ClaimRecord, ClaimRecordAmino } from "./claim_record";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { DeepPartial } from "../../helpers";
/**
 * GenesisState defines the claim module's genesis state.
 * @name GenesisState
 * @package lumera.claim
 * @see proto type: lumera.claim.GenesisState
 */
export interface GenesisState {
  /**
   * params defines all the parameters of the module.
   */
  params: Params;
  claimRecords: ClaimRecord[];
  totalClaimableAmount: bigint;
  claimsDenom: string;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/lumera.claim.GenesisState";
  value: Uint8Array;
}
/**
 * GenesisState defines the claim module's genesis state.
 * @name GenesisStateAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.GenesisState
 */
export interface GenesisStateAmino {
  /**
   * params defines all the parameters of the module.
   */
  params: ParamsAmino;
  claim_records: ClaimRecordAmino[];
  total_claimable_amount: string;
  claims_denom: string;
}
export interface GenesisStateAminoMsg {
  type: "/lumera.claim.GenesisState";
  value: GenesisStateAmino;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    claimRecords: [],
    totalClaimableAmount: BigInt(0),
    claimsDenom: ""
  };
}
/**
 * GenesisState defines the claim module's genesis state.
 * @name GenesisState
 * @package lumera.claim
 * @see proto type: lumera.claim.GenesisState
 */
export const GenesisState = {
  typeUrl: "/lumera.claim.GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.is(o.params) && Array.isArray(o.claimRecords) && (!o.claimRecords.length || ClaimRecord.is(o.claimRecords[0])) && typeof o.totalClaimableAmount === "bigint" && typeof o.claimsDenom === "string");
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.isAmino(o.params) && Array.isArray(o.claim_records) && (!o.claim_records.length || ClaimRecord.isAmino(o.claim_records[0])) && typeof o.total_claimable_amount === "bigint" && typeof o.claims_denom === "string");
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.claimRecords) {
      ClaimRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.totalClaimableAmount !== BigInt(0)) {
      writer.uint32(24).uint64(message.totalClaimableAmount);
    }
    if (message.claimsDenom !== "") {
      writer.uint32(34).string(message.claimsDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.claimRecords.push(ClaimRecord.decode(reader, reader.uint32()));
          break;
        case 3:
          message.totalClaimableAmount = reader.uint64();
          break;
        case 4:
          message.claimsDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.claimRecords = object.claimRecords?.map(e => ClaimRecord.fromPartial(e)) || [];
    message.totalClaimableAmount = object.totalClaimableAmount !== undefined && object.totalClaimableAmount !== null ? BigInt(object.totalClaimableAmount.toString()) : BigInt(0);
    message.claimsDenom = object.claimsDenom ?? "";
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.claimRecords = object.claim_records?.map(e => ClaimRecord.fromAmino(e)) || [];
    if (object.total_claimable_amount !== undefined && object.total_claimable_amount !== null) {
      message.totalClaimableAmount = BigInt(object.total_claimable_amount);
    }
    if (object.claims_denom !== undefined && object.claims_denom !== null) {
      message.claimsDenom = object.claims_denom;
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    if (message.claimRecords) {
      obj.claim_records = message.claimRecords.map(e => e ? ClaimRecord.toAmino(e) : undefined);
    } else {
      obj.claim_records = message.claimRecords;
    }
    obj.total_claimable_amount = message.totalClaimableAmount !== BigInt(0) ? message.totalClaimableAmount?.toString() : undefined;
    obj.claims_denom = message.claimsDenom === "" ? undefined : message.claimsDenom;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/lumera.claim.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(GenesisState.typeUrl)) {
      return;
    }
    Params.registerTypeUrl();
    ClaimRecord.registerTypeUrl();
  }
};