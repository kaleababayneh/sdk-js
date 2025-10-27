// @ts-nocheck
/* eslint-disable */
import { Coin, CoinAmino } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { DeepPartial } from "../../helpers";
/**
 * Params defines the parameters for the module.
 * @name Params
 * @package lumera.supernode
 * @see proto type: lumera.supernode.Params
 */
export interface Params {
  minimumStakeForSn: Coin;
  reportingThreshold: bigint;
  slashingThreshold: bigint;
  metricsThresholds: string;
  evidenceRetentionPeriod: string;
  slashingFraction: string;
  inactivityPenaltyPeriod: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/lumera.supernode.Params";
  value: Uint8Array;
}
/**
 * Params defines the parameters for the module.
 * @name ParamsAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.Params
 */
export interface ParamsAmino {
  minimum_stake_for_sn: CoinAmino;
  reporting_threshold: string;
  slashing_threshold: string;
  metrics_thresholds: string;
  evidence_retention_period: string;
  slashing_fraction: string;
  inactivity_penalty_period: string;
}
export interface ParamsAminoMsg {
  type: "lumera/x/supernode/v1/Params";
  value: ParamsAmino;
}
function createBaseParams(): Params {
  return {
    minimumStakeForSn: Coin.fromPartial({}),
    reportingThreshold: BigInt(0),
    slashingThreshold: BigInt(0),
    metricsThresholds: "",
    evidenceRetentionPeriod: "",
    slashingFraction: "",
    inactivityPenaltyPeriod: ""
  };
}
/**
 * Params defines the parameters for the module.
 * @name Params
 * @package lumera.supernode
 * @see proto type: lumera.supernode.Params
 */
export const Params = {
  typeUrl: "/lumera.supernode.Params",
  aminoType: "lumera/x/supernode/v1/Params",
  is(o: any): o is Params {
    return o && (o.$typeUrl === Params.typeUrl || Coin.is(o.minimumStakeForSn) && typeof o.reportingThreshold === "bigint" && typeof o.slashingThreshold === "bigint" && typeof o.metricsThresholds === "string" && typeof o.evidenceRetentionPeriod === "string" && typeof o.slashingFraction === "string" && typeof o.inactivityPenaltyPeriod === "string");
  },
  isAmino(o: any): o is ParamsAmino {
    return o && (o.$typeUrl === Params.typeUrl || Coin.isAmino(o.minimum_stake_for_sn) && typeof o.reporting_threshold === "bigint" && typeof o.slashing_threshold === "bigint" && typeof o.metrics_thresholds === "string" && typeof o.evidence_retention_period === "string" && typeof o.slashing_fraction === "string" && typeof o.inactivity_penalty_period === "string");
  },
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minimumStakeForSn !== undefined) {
      Coin.encode(message.minimumStakeForSn, writer.uint32(10).fork()).ldelim();
    }
    if (message.reportingThreshold !== BigInt(0)) {
      writer.uint32(16).uint64(message.reportingThreshold);
    }
    if (message.slashingThreshold !== BigInt(0)) {
      writer.uint32(24).uint64(message.slashingThreshold);
    }
    if (message.metricsThresholds !== "") {
      writer.uint32(34).string(message.metricsThresholds);
    }
    if (message.evidenceRetentionPeriod !== "") {
      writer.uint32(42).string(message.evidenceRetentionPeriod);
    }
    if (message.slashingFraction !== "") {
      writer.uint32(50).string(message.slashingFraction);
    }
    if (message.inactivityPenaltyPeriod !== "") {
      writer.uint32(58).string(message.inactivityPenaltyPeriod);
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
          message.minimumStakeForSn = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.reportingThreshold = reader.uint64();
          break;
        case 3:
          message.slashingThreshold = reader.uint64();
          break;
        case 4:
          message.metricsThresholds = reader.string();
          break;
        case 5:
          message.evidenceRetentionPeriod = reader.string();
          break;
        case 6:
          message.slashingFraction = reader.string();
          break;
        case 7:
          message.inactivityPenaltyPeriod = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = createBaseParams();
    message.minimumStakeForSn = object.minimumStakeForSn !== undefined && object.minimumStakeForSn !== null ? Coin.fromPartial(object.minimumStakeForSn) : undefined;
    message.reportingThreshold = object.reportingThreshold !== undefined && object.reportingThreshold !== null ? BigInt(object.reportingThreshold.toString()) : BigInt(0);
    message.slashingThreshold = object.slashingThreshold !== undefined && object.slashingThreshold !== null ? BigInt(object.slashingThreshold.toString()) : BigInt(0);
    message.metricsThresholds = object.metricsThresholds ?? "";
    message.evidenceRetentionPeriod = object.evidenceRetentionPeriod ?? "";
    message.slashingFraction = object.slashingFraction ?? "";
    message.inactivityPenaltyPeriod = object.inactivityPenaltyPeriod ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.minimum_stake_for_sn !== undefined && object.minimum_stake_for_sn !== null) {
      message.minimumStakeForSn = Coin.fromAmino(object.minimum_stake_for_sn);
    }
    if (object.reporting_threshold !== undefined && object.reporting_threshold !== null) {
      message.reportingThreshold = BigInt(object.reporting_threshold);
    }
    if (object.slashing_threshold !== undefined && object.slashing_threshold !== null) {
      message.slashingThreshold = BigInt(object.slashing_threshold);
    }
    if (object.metrics_thresholds !== undefined && object.metrics_thresholds !== null) {
      message.metricsThresholds = object.metrics_thresholds;
    }
    if (object.evidence_retention_period !== undefined && object.evidence_retention_period !== null) {
      message.evidenceRetentionPeriod = object.evidence_retention_period;
    }
    if (object.slashing_fraction !== undefined && object.slashing_fraction !== null) {
      message.slashingFraction = object.slashing_fraction;
    }
    if (object.inactivity_penalty_period !== undefined && object.inactivity_penalty_period !== null) {
      message.inactivityPenaltyPeriod = object.inactivity_penalty_period;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.minimum_stake_for_sn = message.minimumStakeForSn ? Coin.toAmino(message.minimumStakeForSn) : Coin.toAmino(Coin.fromPartial({}));
    obj.reporting_threshold = message.reportingThreshold !== BigInt(0) ? message.reportingThreshold?.toString() : undefined;
    obj.slashing_threshold = message.slashingThreshold !== BigInt(0) ? message.slashingThreshold?.toString() : undefined;
    obj.metrics_thresholds = message.metricsThresholds === "" ? undefined : message.metricsThresholds;
    obj.evidence_retention_period = message.evidenceRetentionPeriod === "" ? undefined : message.evidenceRetentionPeriod;
    obj.slashing_fraction = message.slashingFraction === "" ? undefined : message.slashingFraction;
    obj.inactivity_penalty_period = message.inactivityPenaltyPeriod === "" ? undefined : message.inactivityPenaltyPeriod;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params): ParamsAminoMsg {
    return {
      type: "lumera/x/supernode/v1/Params",
      value: Params.toAmino(message)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/lumera.supernode.Params",
      value: Params.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(Params.typeUrl)) {
      return;
    }
    Coin.registerTypeUrl();
  }
};