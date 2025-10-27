// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../binary";
import { DeepPartial, isSet } from "../../helpers";
/**
 * @name MetricsAggregate_MetricsEntry
 * @package lumera.supernode
 * @see proto type: lumera.supernode.undefined
 */
export interface MetricsAggregate_MetricsEntry {
  key: string;
  value: number;
}
export interface MetricsAggregate_MetricsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
/**
 * @name MetricsAggregate_MetricsEntryAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MetricsAggregate_MetricsEntry
 */
export interface MetricsAggregate_MetricsEntryAmino {
  key: string;
  value: number;
}
export interface MetricsAggregate_MetricsEntryAminoMsg {
  type: string;
  value: MetricsAggregate_MetricsEntryAmino;
}
/**
 * @name MetricsAggregate
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MetricsAggregate
 */
export interface MetricsAggregate {
  metrics: {
    [key: string]: number;
  };
  reportCount: bigint;
  height: bigint;
}
export interface MetricsAggregateProtoMsg {
  typeUrl: "/lumera.supernode.MetricsAggregate";
  value: Uint8Array;
}
/**
 * @name MetricsAggregateAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MetricsAggregate
 */
export interface MetricsAggregateAmino {
  metrics: {
    [key: string]: number;
  };
  report_count: string;
  height: string;
}
export interface MetricsAggregateAminoMsg {
  type: "/lumera.supernode.MetricsAggregate";
  value: MetricsAggregateAmino;
}
function createBaseMetricsAggregate_MetricsEntry(): MetricsAggregate_MetricsEntry {
  return {
    key: "",
    value: 0
  };
}
/**
 * @name MetricsAggregate_MetricsEntry
 * @package lumera.supernode
 * @see proto type: lumera.supernode.undefined
 */
export const MetricsAggregate_MetricsEntry = {
  encode(message: MetricsAggregate_MetricsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MetricsAggregate_MetricsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetricsAggregate_MetricsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MetricsAggregate_MetricsEntry>): MetricsAggregate_MetricsEntry {
    const message = createBaseMetricsAggregate_MetricsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
  fromAmino(object: MetricsAggregate_MetricsEntryAmino): MetricsAggregate_MetricsEntry {
    const message = createBaseMetricsAggregate_MetricsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: MetricsAggregate_MetricsEntry): MetricsAggregate_MetricsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === 0 ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: MetricsAggregate_MetricsEntryAminoMsg): MetricsAggregate_MetricsEntry {
    return MetricsAggregate_MetricsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: MetricsAggregate_MetricsEntryProtoMsg): MetricsAggregate_MetricsEntry {
    return MetricsAggregate_MetricsEntry.decode(message.value);
  },
  toProto(message: MetricsAggregate_MetricsEntry): Uint8Array {
    return MetricsAggregate_MetricsEntry.encode(message).finish();
  },
  registerTypeUrl() {}
};
function createBaseMetricsAggregate(): MetricsAggregate {
  return {
    metrics: {},
    reportCount: BigInt(0),
    height: BigInt(0)
  };
}
/**
 * @name MetricsAggregate
 * @package lumera.supernode
 * @see proto type: lumera.supernode.MetricsAggregate
 */
export const MetricsAggregate = {
  typeUrl: "/lumera.supernode.MetricsAggregate",
  is(o: any): o is MetricsAggregate {
    return o && (o.$typeUrl === MetricsAggregate.typeUrl || isSet(o.metrics) && typeof o.reportCount === "bigint" && typeof o.height === "bigint");
  },
  isAmino(o: any): o is MetricsAggregateAmino {
    return o && (o.$typeUrl === MetricsAggregate.typeUrl || isSet(o.metrics) && typeof o.report_count === "bigint" && typeof o.height === "bigint");
  },
  encode(message: MetricsAggregate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    Object.entries(message.metrics).forEach(([key, value]) => {
      MetricsAggregate_MetricsEntry.encode({
        key: key as any,
        value
      }, writer.uint32(9).fork()).ldelim();
    });
    if (message.reportCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.reportCount);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(24).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MetricsAggregate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetricsAggregate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = MetricsAggregate_MetricsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.metrics[entry1.key] = entry1.value;
          }
          break;
        case 2:
          message.reportCount = reader.uint64();
          break;
        case 3:
          message.height = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MetricsAggregate>): MetricsAggregate {
    const message = createBaseMetricsAggregate();
    message.metrics = Object.entries(object.metrics ?? {}).reduce<{
      [key: string]: number;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Number(value);
      }
      return acc;
    }, {});
    message.reportCount = object.reportCount !== undefined && object.reportCount !== null ? BigInt(object.reportCount.toString()) : BigInt(0);
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MetricsAggregateAmino): MetricsAggregate {
    const message = createBaseMetricsAggregate();
    message.metrics = Object.entries(object.metrics ?? {}).reduce<{
      [key: string]: number;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Number(value);
      }
      return acc;
    }, {});
    if (object.report_count !== undefined && object.report_count !== null) {
      message.reportCount = BigInt(object.report_count);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: MetricsAggregate): MetricsAggregateAmino {
    const obj: any = {};
    obj.metrics = {};
    if (message.metrics) {
      Object.entries(message.metrics).forEach(([k, v]) => {
        obj.metrics[k] = v;
      });
    }
    obj.report_count = message.reportCount !== BigInt(0) ? message.reportCount?.toString() : undefined;
    obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MetricsAggregateAminoMsg): MetricsAggregate {
    return MetricsAggregate.fromAmino(object.value);
  },
  fromProtoMsg(message: MetricsAggregateProtoMsg): MetricsAggregate {
    return MetricsAggregate.decode(message.value);
  },
  toProto(message: MetricsAggregate): Uint8Array {
    return MetricsAggregate.encode(message).finish();
  },
  toProtoMsg(message: MetricsAggregate): MetricsAggregateProtoMsg {
    return {
      typeUrl: "/lumera.supernode.MetricsAggregate",
      value: MetricsAggregate.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};