// @ts-nocheck
/* eslint-disable */
import { Coin, CoinAmino } from "../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { GlobalDecoderRegistry } from "../../registry";
import { DeepPartial } from "../../helpers";
/**
 * Params defines the parameters for the module.
 * @name Params
 * @package lumera.action
 * @see proto type: lumera.action.Params
 */
export interface Params {
  /**
   * Fees
   */
  baseActionFee: Coin;
  feePerKbyte: Coin;
  /**
   * Limits
   */
  maxActionsPerBlock: bigint;
  minSuperNodes: bigint;
  maxDdAndFingerprints: bigint;
  maxRaptorQSymbols: bigint;
  /**
   * Time Constraints
   */
  expirationDuration: Duration;
  minProcessingTime: Duration;
  maxProcessingTime: Duration;
  /**
   * Reward Distribution
   */
  superNodeFeeShare: string;
  foundationFeeShare: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/lumera.action.Params";
  value: Uint8Array;
}
/**
 * Params defines the parameters for the module.
 * @name ParamsAmino
 * @package lumera.action
 * @see proto type: lumera.action.Params
 */
export interface ParamsAmino {
  /**
   * Fees
   */
  base_action_fee: CoinAmino;
  fee_per_kbyte: CoinAmino;
  /**
   * Limits
   */
  max_actions_per_block: string;
  min_super_nodes: string;
  max_dd_and_fingerprints: string;
  max_raptor_q_symbols: string;
  /**
   * Time Constraints
   */
  expiration_duration: DurationAmino;
  min_processing_time: DurationAmino;
  max_processing_time: DurationAmino;
  /**
   * Reward Distribution
   */
  super_node_fee_share: string;
  foundation_fee_share: string;
}
export interface ParamsAminoMsg {
  type: "/lumera.action.Params";
  value: ParamsAmino;
}
function createBaseParams(): Params {
  return {
    baseActionFee: Coin.fromPartial({}),
    feePerKbyte: Coin.fromPartial({}),
    maxActionsPerBlock: BigInt(0),
    minSuperNodes: BigInt(0),
    maxDdAndFingerprints: BigInt(0),
    maxRaptorQSymbols: BigInt(0),
    expirationDuration: Duration.fromPartial({}),
    minProcessingTime: Duration.fromPartial({}),
    maxProcessingTime: Duration.fromPartial({}),
    superNodeFeeShare: "",
    foundationFeeShare: ""
  };
}
/**
 * Params defines the parameters for the module.
 * @name Params
 * @package lumera.action
 * @see proto type: lumera.action.Params
 */
export const Params = {
  typeUrl: "/lumera.action.Params",
  is(o: any): o is Params {
    return o && (o.$typeUrl === Params.typeUrl || Coin.is(o.baseActionFee) && Coin.is(o.feePerKbyte) && typeof o.maxActionsPerBlock === "bigint" && typeof o.minSuperNodes === "bigint" && typeof o.maxDdAndFingerprints === "bigint" && typeof o.maxRaptorQSymbols === "bigint" && Duration.is(o.expirationDuration) && Duration.is(o.minProcessingTime) && Duration.is(o.maxProcessingTime) && typeof o.superNodeFeeShare === "string" && typeof o.foundationFeeShare === "string");
  },
  isAmino(o: any): o is ParamsAmino {
    return o && (o.$typeUrl === Params.typeUrl || Coin.isAmino(o.base_action_fee) && Coin.isAmino(o.fee_per_kbyte) && typeof o.max_actions_per_block === "bigint" && typeof o.min_super_nodes === "bigint" && typeof o.max_dd_and_fingerprints === "bigint" && typeof o.max_raptor_q_symbols === "bigint" && Duration.isAmino(o.expiration_duration) && Duration.isAmino(o.min_processing_time) && Duration.isAmino(o.max_processing_time) && typeof o.super_node_fee_share === "string" && typeof o.foundation_fee_share === "string");
  },
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseActionFee !== undefined) {
      Coin.encode(message.baseActionFee, writer.uint32(10).fork()).ldelim();
    }
    if (message.feePerKbyte !== undefined) {
      Coin.encode(message.feePerKbyte, writer.uint32(18).fork()).ldelim();
    }
    if (message.maxActionsPerBlock !== BigInt(0)) {
      writer.uint32(24).uint64(message.maxActionsPerBlock);
    }
    if (message.minSuperNodes !== BigInt(0)) {
      writer.uint32(32).uint64(message.minSuperNodes);
    }
    if (message.maxDdAndFingerprints !== BigInt(0)) {
      writer.uint32(40).uint64(message.maxDdAndFingerprints);
    }
    if (message.maxRaptorQSymbols !== BigInt(0)) {
      writer.uint32(48).uint64(message.maxRaptorQSymbols);
    }
    if (message.expirationDuration !== undefined) {
      Duration.encode(message.expirationDuration, writer.uint32(58).fork()).ldelim();
    }
    if (message.minProcessingTime !== undefined) {
      Duration.encode(message.minProcessingTime, writer.uint32(66).fork()).ldelim();
    }
    if (message.maxProcessingTime !== undefined) {
      Duration.encode(message.maxProcessingTime, writer.uint32(74).fork()).ldelim();
    }
    if (message.superNodeFeeShare !== "") {
      writer.uint32(82).string(message.superNodeFeeShare);
    }
    if (message.foundationFeeShare !== "") {
      writer.uint32(90).string(message.foundationFeeShare);
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
          message.baseActionFee = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.feePerKbyte = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.maxActionsPerBlock = reader.uint64();
          break;
        case 4:
          message.minSuperNodes = reader.uint64();
          break;
        case 5:
          message.maxDdAndFingerprints = reader.uint64();
          break;
        case 6:
          message.maxRaptorQSymbols = reader.uint64();
          break;
        case 7:
          message.expirationDuration = Duration.decode(reader, reader.uint32());
          break;
        case 8:
          message.minProcessingTime = Duration.decode(reader, reader.uint32());
          break;
        case 9:
          message.maxProcessingTime = Duration.decode(reader, reader.uint32());
          break;
        case 10:
          message.superNodeFeeShare = reader.string();
          break;
        case 11:
          message.foundationFeeShare = reader.string();
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
    message.baseActionFee = object.baseActionFee !== undefined && object.baseActionFee !== null ? Coin.fromPartial(object.baseActionFee) : undefined;
    message.feePerKbyte = object.feePerKbyte !== undefined && object.feePerKbyte !== null ? Coin.fromPartial(object.feePerKbyte) : undefined;
    message.maxActionsPerBlock = object.maxActionsPerBlock !== undefined && object.maxActionsPerBlock !== null ? BigInt(object.maxActionsPerBlock.toString()) : BigInt(0);
    message.minSuperNodes = object.minSuperNodes !== undefined && object.minSuperNodes !== null ? BigInt(object.minSuperNodes.toString()) : BigInt(0);
    message.maxDdAndFingerprints = object.maxDdAndFingerprints !== undefined && object.maxDdAndFingerprints !== null ? BigInt(object.maxDdAndFingerprints.toString()) : BigInt(0);
    message.maxRaptorQSymbols = object.maxRaptorQSymbols !== undefined && object.maxRaptorQSymbols !== null ? BigInt(object.maxRaptorQSymbols.toString()) : BigInt(0);
    message.expirationDuration = object.expirationDuration !== undefined && object.expirationDuration !== null ? Duration.fromPartial(object.expirationDuration) : undefined;
    message.minProcessingTime = object.minProcessingTime !== undefined && object.minProcessingTime !== null ? Duration.fromPartial(object.minProcessingTime) : undefined;
    message.maxProcessingTime = object.maxProcessingTime !== undefined && object.maxProcessingTime !== null ? Duration.fromPartial(object.maxProcessingTime) : undefined;
    message.superNodeFeeShare = object.superNodeFeeShare ?? "";
    message.foundationFeeShare = object.foundationFeeShare ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.base_action_fee !== undefined && object.base_action_fee !== null) {
      message.baseActionFee = Coin.fromAmino(object.base_action_fee);
    }
    if (object.fee_per_kbyte !== undefined && object.fee_per_kbyte !== null) {
      message.feePerKbyte = Coin.fromAmino(object.fee_per_kbyte);
    }
    if (object.max_actions_per_block !== undefined && object.max_actions_per_block !== null) {
      message.maxActionsPerBlock = BigInt(object.max_actions_per_block);
    }
    if (object.min_super_nodes !== undefined && object.min_super_nodes !== null) {
      message.minSuperNodes = BigInt(object.min_super_nodes);
    }
    if (object.max_dd_and_fingerprints !== undefined && object.max_dd_and_fingerprints !== null) {
      message.maxDdAndFingerprints = BigInt(object.max_dd_and_fingerprints);
    }
    if (object.max_raptor_q_symbols !== undefined && object.max_raptor_q_symbols !== null) {
      message.maxRaptorQSymbols = BigInt(object.max_raptor_q_symbols);
    }
    if (object.expiration_duration !== undefined && object.expiration_duration !== null) {
      message.expirationDuration = Duration.fromAmino(object.expiration_duration);
    }
    if (object.min_processing_time !== undefined && object.min_processing_time !== null) {
      message.minProcessingTime = Duration.fromAmino(object.min_processing_time);
    }
    if (object.max_processing_time !== undefined && object.max_processing_time !== null) {
      message.maxProcessingTime = Duration.fromAmino(object.max_processing_time);
    }
    if (object.super_node_fee_share !== undefined && object.super_node_fee_share !== null) {
      message.superNodeFeeShare = object.super_node_fee_share;
    }
    if (object.foundation_fee_share !== undefined && object.foundation_fee_share !== null) {
      message.foundationFeeShare = object.foundation_fee_share;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.base_action_fee = message.baseActionFee ? Coin.toAmino(message.baseActionFee) : Coin.toAmino(Coin.fromPartial({}));
    obj.fee_per_kbyte = message.feePerKbyte ? Coin.toAmino(message.feePerKbyte) : Coin.toAmino(Coin.fromPartial({}));
    obj.max_actions_per_block = message.maxActionsPerBlock !== BigInt(0) ? message.maxActionsPerBlock?.toString() : undefined;
    obj.min_super_nodes = message.minSuperNodes !== BigInt(0) ? message.minSuperNodes?.toString() : undefined;
    obj.max_dd_and_fingerprints = message.maxDdAndFingerprints !== BigInt(0) ? message.maxDdAndFingerprints?.toString() : undefined;
    obj.max_raptor_q_symbols = message.maxRaptorQSymbols !== BigInt(0) ? message.maxRaptorQSymbols?.toString() : undefined;
    obj.expiration_duration = message.expirationDuration ? Duration.toAmino(message.expirationDuration) : undefined;
    obj.min_processing_time = message.minProcessingTime ? Duration.toAmino(message.minProcessingTime) : undefined;
    obj.max_processing_time = message.maxProcessingTime ? Duration.toAmino(message.maxProcessingTime) : Duration.toAmino(Duration.fromPartial({}));
    obj.super_node_fee_share = message.superNodeFeeShare === "" ? undefined : message.superNodeFeeShare;
    obj.foundation_fee_share = message.foundationFeeShare === "" ? undefined : message.foundationFeeShare;
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
      typeUrl: "/lumera.action.Params",
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