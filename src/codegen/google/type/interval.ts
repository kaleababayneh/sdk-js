// @ts-nocheck
/* eslint-disable */
import { Timestamp } from "../protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp, Exact } from "../../helpers";
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 * 
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 * @name Interval
 * @package google.type
 * @see proto type: google.type.Interval
 */
export interface Interval {
  /**
   * Optional. Inclusive start of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be the same
   * or after the start.
   */
  startTime?: Date;
  /**
   * Optional. Exclusive end of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be before the
   * end.
   */
  endTime?: Date;
}
export interface IntervalProtoMsg {
  typeUrl: "/google.type.Interval";
  value: Uint8Array;
}
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 * 
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 * @name IntervalAmino
 * @package google.type
 * @see proto type: google.type.Interval
 */
export interface IntervalAmino {
  /**
   * Optional. Inclusive start of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be the same
   * or after the start.
   */
  start_time?: string;
  /**
   * Optional. Exclusive end of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be before the
   * end.
   */
  end_time?: string;
}
export interface IntervalAminoMsg {
  type: "/google.type.Interval";
  value: IntervalAmino;
}
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 * 
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 * @name IntervalSDKType
 * @package google.type
 * @see proto type: google.type.Interval
 */
export interface IntervalSDKType {
  start_time?: Date;
  end_time?: Date;
}
function createBaseInterval(): Interval {
  return {
    startTime: undefined,
    endTime: undefined
  };
}
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 * 
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 * @name Interval
 * @package google.type
 * @see proto type: google.type.Interval
 */
export const Interval = {
  typeUrl: "/google.type.Interval",
  is(o: any): o is Interval {
    return o && o.$typeUrl === Interval.typeUrl;
  },
  isSDK(o: any): o is IntervalSDKType {
    return o && o.$typeUrl === Interval.typeUrl;
  },
  isAmino(o: any): o is IntervalAmino {
    return o && o.$typeUrl === Interval.typeUrl;
  },
  encode(message: Interval, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Interval {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterval();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial<I extends Exact<Partial<Interval>, I>>(object: I): Interval {
    const message = createBaseInterval();
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
  fromAmino(object: IntervalAmino): Interval {
    const message = createBaseInterval();
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    return message;
  },
  toAmino(message: Interval): IntervalAmino {
    const obj: any = {};
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: IntervalAminoMsg): Interval {
    return Interval.fromAmino(object.value);
  },
  fromProtoMsg(message: IntervalProtoMsg): Interval {
    return Interval.decode(message.value);
  },
  toProto(message: Interval): Uint8Array {
    return Interval.encode(message).finish();
  },
  toProtoMsg(message: Interval): IntervalProtoMsg {
    return {
      typeUrl: "/google.type.Interval",
      value: Interval.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};