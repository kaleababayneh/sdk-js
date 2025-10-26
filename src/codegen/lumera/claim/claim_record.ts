// @ts-nocheck
/* eslint-disable */
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Exact } from "../../helpers";
import { GlobalDecoderRegistry } from "../../registry";
/**
 * @name ClaimRecord
 * @package lumera.claim
 * @see proto type: lumera.claim.ClaimRecord
 */
export interface ClaimRecord {
  oldAddress: string;
  balance: Coin[];
  claimed: boolean;
  claimTime: bigint;
  destAddress: string;
  vestedTier: number;
}
export interface ClaimRecordProtoMsg {
  typeUrl: "/lumera.claim.ClaimRecord";
  value: Uint8Array;
}
/**
 * @name ClaimRecordAmino
 * @package lumera.claim
 * @see proto type: lumera.claim.ClaimRecord
 */
export interface ClaimRecordAmino {
  oldAddress?: string;
  balance: CoinAmino[];
  claimed: boolean;
  claimTime?: string;
  destAddress?: string;
  vestedTier: number;
}
export interface ClaimRecordAminoMsg {
  type: "/lumera.claim.ClaimRecord";
  value: ClaimRecordAmino;
}
/**
 * @name ClaimRecordSDKType
 * @package lumera.claim
 * @see proto type: lumera.claim.ClaimRecord
 */
export interface ClaimRecordSDKType {
  oldAddress: string;
  balance: CoinSDKType[];
  claimed: boolean;
  claimTime: bigint;
  destAddress: string;
  vestedTier: number;
}
function createBaseClaimRecord(): ClaimRecord {
  return {
    oldAddress: "",
    balance: [],
    claimed: false,
    claimTime: BigInt(0),
    destAddress: "",
    vestedTier: 0
  };
}
/**
 * @name ClaimRecord
 * @package lumera.claim
 * @see proto type: lumera.claim.ClaimRecord
 */
export const ClaimRecord = {
  typeUrl: "/lumera.claim.ClaimRecord",
  is(o: any): o is ClaimRecord {
    return o && (o.$typeUrl === ClaimRecord.typeUrl || typeof o.oldAddress === "string" && Array.isArray(o.balance) && (!o.balance.length || Coin.is(o.balance[0])) && typeof o.claimed === "boolean" && typeof o.claimTime === "bigint" && typeof o.destAddress === "string" && typeof o.vestedTier === "number");
  },
  isSDK(o: any): o is ClaimRecordSDKType {
    return o && (o.$typeUrl === ClaimRecord.typeUrl || typeof o.oldAddress === "string" && Array.isArray(o.balance) && (!o.balance.length || Coin.isSDK(o.balance[0])) && typeof o.claimed === "boolean" && typeof o.claimTime === "bigint" && typeof o.destAddress === "string" && typeof o.vestedTier === "number");
  },
  isAmino(o: any): o is ClaimRecordAmino {
    return o && (o.$typeUrl === ClaimRecord.typeUrl || typeof o.oldAddress === "string" && Array.isArray(o.balance) && (!o.balance.length || Coin.isAmino(o.balance[0])) && typeof o.claimed === "boolean" && typeof o.claimTime === "bigint" && typeof o.destAddress === "string" && typeof o.vestedTier === "number");
  },
  encode(message: ClaimRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oldAddress !== "") {
      writer.uint32(10).string(message.oldAddress);
    }
    for (const v of message.balance) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.claimed === true) {
      writer.uint32(24).bool(message.claimed);
    }
    if (message.claimTime !== BigInt(0)) {
      writer.uint32(32).int64(message.claimTime);
    }
    if (message.destAddress !== "") {
      writer.uint32(42).string(message.destAddress);
    }
    if (message.vestedTier !== 0) {
      writer.uint32(48).uint32(message.vestedTier);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClaimRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oldAddress = reader.string();
          break;
        case 2:
          message.balance.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.claimed = reader.bool();
          break;
        case 4:
          message.claimTime = reader.int64();
          break;
        case 5:
          message.destAddress = reader.string();
          break;
        case 6:
          message.vestedTier = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<ClaimRecord>, I>>(object: I): ClaimRecord {
    const message = createBaseClaimRecord();
    message.oldAddress = object.oldAddress ?? "";
    message.balance = object.balance?.map(e => Coin.fromPartial(e)) || [];
    message.claimed = object.claimed ?? false;
    message.claimTime = object.claimTime !== undefined && object.claimTime !== null ? BigInt(object.claimTime.toString()) : BigInt(0);
    message.destAddress = object.destAddress ?? "";
    message.vestedTier = object.vestedTier ?? 0;
    return message;
  },
  fromAmino(object: ClaimRecordAmino): ClaimRecord {
    const message = createBaseClaimRecord();
    if (object.oldAddress !== undefined && object.oldAddress !== null) {
      message.oldAddress = object.oldAddress;
    }
    message.balance = object.balance?.map(e => Coin.fromAmino(e)) || [];
    if (object.claimed !== undefined && object.claimed !== null) {
      message.claimed = object.claimed;
    }
    if (object.claimTime !== undefined && object.claimTime !== null) {
      message.claimTime = BigInt(object.claimTime);
    }
    if (object.destAddress !== undefined && object.destAddress !== null) {
      message.destAddress = object.destAddress;
    }
    if (object.vestedTier !== undefined && object.vestedTier !== null) {
      message.vestedTier = object.vestedTier;
    }
    return message;
  },
  toAmino(message: ClaimRecord): ClaimRecordAmino {
    const obj: any = {};
    obj.oldAddress = message.oldAddress === "" ? undefined : message.oldAddress;
    if (message.balance) {
      obj.balance = message.balance.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.balance = message.balance;
    }
    obj.claimed = message.claimed ?? false;
    obj.claimTime = message.claimTime !== BigInt(0) ? message.claimTime?.toString() : undefined;
    obj.destAddress = message.destAddress === "" ? undefined : message.destAddress;
    obj.vestedTier = message.vestedTier ?? 0;
    return obj;
  },
  fromAminoMsg(object: ClaimRecordAminoMsg): ClaimRecord {
    return ClaimRecord.fromAmino(object.value);
  },
  fromProtoMsg(message: ClaimRecordProtoMsg): ClaimRecord {
    return ClaimRecord.decode(message.value);
  },
  toProto(message: ClaimRecord): Uint8Array {
    return ClaimRecord.encode(message).finish();
  },
  toProtoMsg(message: ClaimRecord): ClaimRecordProtoMsg {
    return {
      typeUrl: "/lumera.claim.ClaimRecord",
      value: ClaimRecord.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(ClaimRecord.typeUrl)) {
      return;
    }
    Coin.registerTypeUrl();
  }
};