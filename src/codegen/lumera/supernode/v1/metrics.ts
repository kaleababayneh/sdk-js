// @ts-nocheck
/* eslint-disable */
import { isSet, DeepPartial } from "../../../helpers";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * PortState defines tri-state port reporting. UNKNOWN is the default for proto3
 * and is treated as "not reported / not measured".
 */
export enum PortState {
  PORT_STATE_UNKNOWN = 0,
  PORT_STATE_OPEN = 1,
  PORT_STATE_CLOSED = 2,
  UNRECOGNIZED = -1,
}
export const PortStateAmino = PortState;
export function portStateFromJSON(object: any): PortState {
  switch (object) {
    case 0:
    case "PORT_STATE_UNKNOWN":
      return PortState.PORT_STATE_UNKNOWN;
    case 1:
    case "PORT_STATE_OPEN":
      return PortState.PORT_STATE_OPEN;
    case 2:
    case "PORT_STATE_CLOSED":
      return PortState.PORT_STATE_CLOSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PortState.UNRECOGNIZED;
  }
}
export function portStateToJSON(object: PortState): string {
  switch (object) {
    case PortState.PORT_STATE_UNKNOWN:
      return "PORT_STATE_UNKNOWN";
    case PortState.PORT_STATE_OPEN:
      return "PORT_STATE_OPEN";
    case PortState.PORT_STATE_CLOSED:
      return "PORT_STATE_CLOSED";
    case PortState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * PortStatus reports the state of a specific TCP port.
 * @name PortStatus
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.PortStatus
 */
export interface PortStatus {
  port: number;
  state: PortState;
}
export interface PortStatusProtoMsg {
  typeUrl: "/lumera.supernode.v1.PortStatus";
  value: Uint8Array;
}
/**
 * PortStatus reports the state of a specific TCP port.
 * @name PortStatusAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.PortStatus
 */
export interface PortStatusAmino {
  port: number;
  state: PortState;
}
export interface PortStatusAminoMsg {
  type: "/lumera.supernode.v1.PortStatus";
  value: PortStatusAmino;
}
/**
 * SupernodeMetrics defines the structured metrics reported by a supernode.
 * @name SupernodeMetrics
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SupernodeMetrics
 */
export interface SupernodeMetrics {
  /**
   * Semantic version of the supernode software.
   */
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
  /**
   * CPU metrics.
   */
  cpuCoresTotal: number;
  cpuUsagePercent: number;
  /**
   * Memory metrics (GB).
   */
  memTotalGb: number;
  memUsagePercent: number;
  memFreeGb: number;
  /**
   * Storage metrics (GB).
   */
  diskTotalGb: number;
  diskUsagePercent: number;
  diskFreeGb: number;
  /**
   * Uptime and connectivity.
   */
  uptimeSeconds: number;
  peersCount: number;
  /**
   * Tri-state port reporting for required ports.
   */
  openPorts: PortStatus[];
}
export interface SupernodeMetricsProtoMsg {
  typeUrl: "/lumera.supernode.v1.SupernodeMetrics";
  value: Uint8Array;
}
/**
 * SupernodeMetrics defines the structured metrics reported by a supernode.
 * @name SupernodeMetricsAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SupernodeMetrics
 */
export interface SupernodeMetricsAmino {
  /**
   * Semantic version of the supernode software.
   */
  version_major: number;
  version_minor: number;
  version_patch: number;
  /**
   * CPU metrics.
   */
  cpu_cores_total: number;
  cpu_usage_percent: number;
  /**
   * Memory metrics (GB).
   */
  mem_total_gb: number;
  mem_usage_percent: number;
  mem_free_gb: number;
  /**
   * Storage metrics (GB).
   */
  disk_total_gb: number;
  disk_usage_percent: number;
  disk_free_gb: number;
  /**
   * Uptime and connectivity.
   */
  uptime_seconds: number;
  peers_count: number;
  /**
   * Tri-state port reporting for required ports.
   */
  open_ports: PortStatusAmino[];
}
export interface SupernodeMetricsAminoMsg {
  type: "/lumera.supernode.v1.SupernodeMetrics";
  value: SupernodeMetricsAmino;
}
/**
 * SupernodeMetricsState stores the latest metrics state for a validator.
 * @name SupernodeMetricsState
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SupernodeMetricsState
 */
export interface SupernodeMetricsState {
  validatorAddress: string;
  metrics?: SupernodeMetrics;
  reportCount: bigint;
  height: bigint;
}
export interface SupernodeMetricsStateProtoMsg {
  typeUrl: "/lumera.supernode.v1.SupernodeMetricsState";
  value: Uint8Array;
}
/**
 * SupernodeMetricsState stores the latest metrics state for a validator.
 * @name SupernodeMetricsStateAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SupernodeMetricsState
 */
export interface SupernodeMetricsStateAmino {
  validator_address: string;
  metrics?: SupernodeMetricsAmino;
  report_count: string;
  height: string;
}
export interface SupernodeMetricsStateAminoMsg {
  type: "/lumera.supernode.v1.SupernodeMetricsState";
  value: SupernodeMetricsStateAmino;
}
function createBasePortStatus(): PortStatus {
  return {
    port: 0,
    state: 0
  };
}
/**
 * PortStatus reports the state of a specific TCP port.
 * @name PortStatus
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.PortStatus
 */
export const PortStatus = {
  typeUrl: "/lumera.supernode.v1.PortStatus",
  is(o: any): o is PortStatus {
    return o && (o.$typeUrl === PortStatus.typeUrl || typeof o.port === "number" && isSet(o.state));
  },
  isAmino(o: any): o is PortStatusAmino {
    return o && (o.$typeUrl === PortStatus.typeUrl || typeof o.port === "number" && isSet(o.state));
  },
  encode(message: PortStatus, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.port !== 0) {
      writer.uint32(8).uint32(message.port);
    }
    if (message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PortStatus {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePortStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port = reader.uint32();
          break;
        case 2:
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PortStatus>): PortStatus {
    const message = createBasePortStatus();
    message.port = object.port ?? 0;
    message.state = object.state ?? 0;
    return message;
  },
  fromAmino(object: PortStatusAmino): PortStatus {
    const message = createBasePortStatus();
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    return message;
  },
  toAmino(message: PortStatus): PortStatusAmino {
    const obj: any = {};
    obj.port = message.port === 0 ? undefined : message.port;
    obj.state = message.state === 0 ? undefined : message.state;
    return obj;
  },
  fromAminoMsg(object: PortStatusAminoMsg): PortStatus {
    return PortStatus.fromAmino(object.value);
  },
  fromProtoMsg(message: PortStatusProtoMsg): PortStatus {
    return PortStatus.decode(message.value);
  },
  toProto(message: PortStatus): Uint8Array {
    return PortStatus.encode(message).finish();
  },
  toProtoMsg(message: PortStatus): PortStatusProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.PortStatus",
      value: PortStatus.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseSupernodeMetrics(): SupernodeMetrics {
  return {
    versionMajor: 0,
    versionMinor: 0,
    versionPatch: 0,
    cpuCoresTotal: 0,
    cpuUsagePercent: 0,
    memTotalGb: 0,
    memUsagePercent: 0,
    memFreeGb: 0,
    diskTotalGb: 0,
    diskUsagePercent: 0,
    diskFreeGb: 0,
    uptimeSeconds: 0,
    peersCount: 0,
    openPorts: []
  };
}
/**
 * SupernodeMetrics defines the structured metrics reported by a supernode.
 * @name SupernodeMetrics
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SupernodeMetrics
 */
export const SupernodeMetrics = {
  typeUrl: "/lumera.supernode.v1.SupernodeMetrics",
  is(o: any): o is SupernodeMetrics {
    return o && (o.$typeUrl === SupernodeMetrics.typeUrl || typeof o.versionMajor === "number" && typeof o.versionMinor === "number" && typeof o.versionPatch === "number" && typeof o.cpuCoresTotal === "number" && typeof o.cpuUsagePercent === "number" && typeof o.memTotalGb === "number" && typeof o.memUsagePercent === "number" && typeof o.memFreeGb === "number" && typeof o.diskTotalGb === "number" && typeof o.diskUsagePercent === "number" && typeof o.diskFreeGb === "number" && typeof o.uptimeSeconds === "number" && typeof o.peersCount === "number" && Array.isArray(o.openPorts) && (!o.openPorts.length || PortStatus.is(o.openPorts[0])));
  },
  isAmino(o: any): o is SupernodeMetricsAmino {
    return o && (o.$typeUrl === SupernodeMetrics.typeUrl || typeof o.version_major === "number" && typeof o.version_minor === "number" && typeof o.version_patch === "number" && typeof o.cpu_cores_total === "number" && typeof o.cpu_usage_percent === "number" && typeof o.mem_total_gb === "number" && typeof o.mem_usage_percent === "number" && typeof o.mem_free_gb === "number" && typeof o.disk_total_gb === "number" && typeof o.disk_usage_percent === "number" && typeof o.disk_free_gb === "number" && typeof o.uptime_seconds === "number" && typeof o.peers_count === "number" && Array.isArray(o.open_ports) && (!o.open_ports.length || PortStatus.isAmino(o.open_ports[0])));
  },
  encode(message: SupernodeMetrics, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.versionMajor !== 0) {
      writer.uint32(8).uint32(message.versionMajor);
    }
    if (message.versionMinor !== 0) {
      writer.uint32(16).uint32(message.versionMinor);
    }
    if (message.versionPatch !== 0) {
      writer.uint32(24).uint32(message.versionPatch);
    }
    if (message.cpuCoresTotal !== 0) {
      writer.uint32(33).double(message.cpuCoresTotal);
    }
    if (message.cpuUsagePercent !== 0) {
      writer.uint32(41).double(message.cpuUsagePercent);
    }
    if (message.memTotalGb !== 0) {
      writer.uint32(49).double(message.memTotalGb);
    }
    if (message.memUsagePercent !== 0) {
      writer.uint32(57).double(message.memUsagePercent);
    }
    if (message.memFreeGb !== 0) {
      writer.uint32(65).double(message.memFreeGb);
    }
    if (message.diskTotalGb !== 0) {
      writer.uint32(73).double(message.diskTotalGb);
    }
    if (message.diskUsagePercent !== 0) {
      writer.uint32(81).double(message.diskUsagePercent);
    }
    if (message.diskFreeGb !== 0) {
      writer.uint32(89).double(message.diskFreeGb);
    }
    if (message.uptimeSeconds !== 0) {
      writer.uint32(97).double(message.uptimeSeconds);
    }
    if (message.peersCount !== 0) {
      writer.uint32(104).uint32(message.peersCount);
    }
    for (const v of message.openPorts) {
      PortStatus.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SupernodeMetrics {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupernodeMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.versionMajor = reader.uint32();
          break;
        case 2:
          message.versionMinor = reader.uint32();
          break;
        case 3:
          message.versionPatch = reader.uint32();
          break;
        case 4:
          message.cpuCoresTotal = reader.double();
          break;
        case 5:
          message.cpuUsagePercent = reader.double();
          break;
        case 6:
          message.memTotalGb = reader.double();
          break;
        case 7:
          message.memUsagePercent = reader.double();
          break;
        case 8:
          message.memFreeGb = reader.double();
          break;
        case 9:
          message.diskTotalGb = reader.double();
          break;
        case 10:
          message.diskUsagePercent = reader.double();
          break;
        case 11:
          message.diskFreeGb = reader.double();
          break;
        case 12:
          message.uptimeSeconds = reader.double();
          break;
        case 13:
          message.peersCount = reader.uint32();
          break;
        case 14:
          message.openPorts.push(PortStatus.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SupernodeMetrics>): SupernodeMetrics {
    const message = createBaseSupernodeMetrics();
    message.versionMajor = object.versionMajor ?? 0;
    message.versionMinor = object.versionMinor ?? 0;
    message.versionPatch = object.versionPatch ?? 0;
    message.cpuCoresTotal = object.cpuCoresTotal ?? 0;
    message.cpuUsagePercent = object.cpuUsagePercent ?? 0;
    message.memTotalGb = object.memTotalGb ?? 0;
    message.memUsagePercent = object.memUsagePercent ?? 0;
    message.memFreeGb = object.memFreeGb ?? 0;
    message.diskTotalGb = object.diskTotalGb ?? 0;
    message.diskUsagePercent = object.diskUsagePercent ?? 0;
    message.diskFreeGb = object.diskFreeGb ?? 0;
    message.uptimeSeconds = object.uptimeSeconds ?? 0;
    message.peersCount = object.peersCount ?? 0;
    message.openPorts = object.openPorts?.map(e => PortStatus.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SupernodeMetricsAmino): SupernodeMetrics {
    const message = createBaseSupernodeMetrics();
    if (object.version_major !== undefined && object.version_major !== null) {
      message.versionMajor = object.version_major;
    }
    if (object.version_minor !== undefined && object.version_minor !== null) {
      message.versionMinor = object.version_minor;
    }
    if (object.version_patch !== undefined && object.version_patch !== null) {
      message.versionPatch = object.version_patch;
    }
    if (object.cpu_cores_total !== undefined && object.cpu_cores_total !== null) {
      message.cpuCoresTotal = object.cpu_cores_total;
    }
    if (object.cpu_usage_percent !== undefined && object.cpu_usage_percent !== null) {
      message.cpuUsagePercent = object.cpu_usage_percent;
    }
    if (object.mem_total_gb !== undefined && object.mem_total_gb !== null) {
      message.memTotalGb = object.mem_total_gb;
    }
    if (object.mem_usage_percent !== undefined && object.mem_usage_percent !== null) {
      message.memUsagePercent = object.mem_usage_percent;
    }
    if (object.mem_free_gb !== undefined && object.mem_free_gb !== null) {
      message.memFreeGb = object.mem_free_gb;
    }
    if (object.disk_total_gb !== undefined && object.disk_total_gb !== null) {
      message.diskTotalGb = object.disk_total_gb;
    }
    if (object.disk_usage_percent !== undefined && object.disk_usage_percent !== null) {
      message.diskUsagePercent = object.disk_usage_percent;
    }
    if (object.disk_free_gb !== undefined && object.disk_free_gb !== null) {
      message.diskFreeGb = object.disk_free_gb;
    }
    if (object.uptime_seconds !== undefined && object.uptime_seconds !== null) {
      message.uptimeSeconds = object.uptime_seconds;
    }
    if (object.peers_count !== undefined && object.peers_count !== null) {
      message.peersCount = object.peers_count;
    }
    message.openPorts = object.open_ports?.map(e => PortStatus.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SupernodeMetrics): SupernodeMetricsAmino {
    const obj: any = {};
    obj.version_major = message.versionMajor === 0 ? undefined : message.versionMajor;
    obj.version_minor = message.versionMinor === 0 ? undefined : message.versionMinor;
    obj.version_patch = message.versionPatch === 0 ? undefined : message.versionPatch;
    obj.cpu_cores_total = message.cpuCoresTotal === 0 ? undefined : message.cpuCoresTotal;
    obj.cpu_usage_percent = message.cpuUsagePercent === 0 ? undefined : message.cpuUsagePercent;
    obj.mem_total_gb = message.memTotalGb === 0 ? undefined : message.memTotalGb;
    obj.mem_usage_percent = message.memUsagePercent === 0 ? undefined : message.memUsagePercent;
    obj.mem_free_gb = message.memFreeGb === 0 ? undefined : message.memFreeGb;
    obj.disk_total_gb = message.diskTotalGb === 0 ? undefined : message.diskTotalGb;
    obj.disk_usage_percent = message.diskUsagePercent === 0 ? undefined : message.diskUsagePercent;
    obj.disk_free_gb = message.diskFreeGb === 0 ? undefined : message.diskFreeGb;
    obj.uptime_seconds = message.uptimeSeconds === 0 ? undefined : message.uptimeSeconds;
    obj.peers_count = message.peersCount === 0 ? undefined : message.peersCount;
    if (message.openPorts) {
      obj.open_ports = message.openPorts.map(e => e ? PortStatus.toAmino(e) : undefined);
    } else {
      obj.open_ports = message.openPorts;
    }
    return obj;
  },
  fromAminoMsg(object: SupernodeMetricsAminoMsg): SupernodeMetrics {
    return SupernodeMetrics.fromAmino(object.value);
  },
  fromProtoMsg(message: SupernodeMetricsProtoMsg): SupernodeMetrics {
    return SupernodeMetrics.decode(message.value);
  },
  toProto(message: SupernodeMetrics): Uint8Array {
    return SupernodeMetrics.encode(message).finish();
  },
  toProtoMsg(message: SupernodeMetrics): SupernodeMetricsProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.SupernodeMetrics",
      value: SupernodeMetrics.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(SupernodeMetrics.typeUrl)) {
      return;
    }
    PortStatus.registerTypeUrl();
  }
};
function createBaseSupernodeMetricsState(): SupernodeMetricsState {
  return {
    validatorAddress: "",
    metrics: undefined,
    reportCount: BigInt(0),
    height: BigInt(0)
  };
}
/**
 * SupernodeMetricsState stores the latest metrics state for a validator.
 * @name SupernodeMetricsState
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SupernodeMetricsState
 */
export const SupernodeMetricsState = {
  typeUrl: "/lumera.supernode.v1.SupernodeMetricsState",
  is(o: any): o is SupernodeMetricsState {
    return o && (o.$typeUrl === SupernodeMetricsState.typeUrl || typeof o.validatorAddress === "string" && typeof o.reportCount === "bigint" && typeof o.height === "bigint");
  },
  isAmino(o: any): o is SupernodeMetricsStateAmino {
    return o && (o.$typeUrl === SupernodeMetricsState.typeUrl || typeof o.validator_address === "string" && typeof o.report_count === "bigint" && typeof o.height === "bigint");
  },
  encode(message: SupernodeMetricsState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.metrics !== undefined) {
      SupernodeMetrics.encode(message.metrics, writer.uint32(18).fork()).ldelim();
    }
    if (message.reportCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.reportCount);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(32).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SupernodeMetricsState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupernodeMetricsState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.metrics = SupernodeMetrics.decode(reader, reader.uint32());
          break;
        case 3:
          message.reportCount = reader.uint64();
          break;
        case 4:
          message.height = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SupernodeMetricsState>): SupernodeMetricsState {
    const message = createBaseSupernodeMetricsState();
    message.validatorAddress = object.validatorAddress ?? "";
    message.metrics = object.metrics !== undefined && object.metrics !== null ? SupernodeMetrics.fromPartial(object.metrics) : undefined;
    message.reportCount = object.reportCount !== undefined && object.reportCount !== null ? BigInt(object.reportCount.toString()) : BigInt(0);
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SupernodeMetricsStateAmino): SupernodeMetricsState {
    const message = createBaseSupernodeMetricsState();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.metrics !== undefined && object.metrics !== null) {
      message.metrics = SupernodeMetrics.fromAmino(object.metrics);
    }
    if (object.report_count !== undefined && object.report_count !== null) {
      message.reportCount = BigInt(object.report_count);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: SupernodeMetricsState): SupernodeMetricsStateAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.metrics = message.metrics ? SupernodeMetrics.toAmino(message.metrics) : undefined;
    obj.report_count = message.reportCount !== BigInt(0) ? message.reportCount?.toString() : undefined;
    obj.height = message.height !== BigInt(0) ? message.height?.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SupernodeMetricsStateAminoMsg): SupernodeMetricsState {
    return SupernodeMetricsState.fromAmino(object.value);
  },
  fromProtoMsg(message: SupernodeMetricsStateProtoMsg): SupernodeMetricsState {
    return SupernodeMetricsState.decode(message.value);
  },
  toProto(message: SupernodeMetricsState): Uint8Array {
    return SupernodeMetricsState.encode(message).finish();
  },
  toProtoMsg(message: SupernodeMetricsState): SupernodeMetricsStateProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.SupernodeMetricsState",
      value: SupernodeMetricsState.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(SupernodeMetricsState.typeUrl)) {
      return;
    }
    SupernodeMetrics.registerTypeUrl();
  }
};