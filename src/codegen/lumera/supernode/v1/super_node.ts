// @ts-nocheck
/* eslint-disable */
import { SuperNodeStateRecord, SuperNodeStateRecordAmino } from "./supernode_state";
import { Evidence, EvidenceAmino } from "./evidence";
import { IPAddressHistory, IPAddressHistoryAmino } from "./ip_address_history";
import { MetricsAggregate, MetricsAggregateAmino } from "./metrics_aggregate";
import { SupernodeAccountHistory, SupernodeAccountHistoryAmino } from "./supernode_account_history";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { GlobalDecoderRegistry } from "../../../registry";
import { DeepPartial } from "../../../helpers";
/**
 * @name SuperNode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SuperNode
 */
export interface SuperNode {
  validatorAddress: string;
  states: SuperNodeStateRecord[];
  evidence: Evidence[];
  prevIpAddresses: IPAddressHistory[];
  note: string;
  metrics?: MetricsAggregate;
  supernodeAccount: string;
  p2pPort: string;
  prevSupernodeAccounts: SupernodeAccountHistory[];
}
export interface SuperNodeProtoMsg {
  typeUrl: "/lumera.supernode.v1.SuperNode";
  value: Uint8Array;
}
/**
 * @name SuperNodeAmino
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SuperNode
 */
export interface SuperNodeAmino {
  validator_address: string;
  states: SuperNodeStateRecordAmino[];
  evidence: EvidenceAmino[];
  prev_ip_addresses: IPAddressHistoryAmino[];
  note: string;
  metrics?: MetricsAggregateAmino;
  supernode_account: string;
  p2p_port: string;
  prev_supernode_accounts: SupernodeAccountHistoryAmino[];
}
export interface SuperNodeAminoMsg {
  type: "/lumera.supernode.v1.SuperNode";
  value: SuperNodeAmino;
}
function createBaseSuperNode(): SuperNode {
  return {
    validatorAddress: "",
    states: [],
    evidence: [],
    prevIpAddresses: [],
    note: "",
    metrics: undefined,
    supernodeAccount: "",
    p2pPort: "",
    prevSupernodeAccounts: []
  };
}
/**
 * @name SuperNode
 * @package lumera.supernode.v1
 * @see proto type: lumera.supernode.v1.SuperNode
 */
export const SuperNode = {
  typeUrl: "/lumera.supernode.v1.SuperNode",
  is(o: any): o is SuperNode {
    return o && (o.$typeUrl === SuperNode.typeUrl || typeof o.validatorAddress === "string" && Array.isArray(o.states) && (!o.states.length || SuperNodeStateRecord.is(o.states[0])) && Array.isArray(o.evidence) && (!o.evidence.length || Evidence.is(o.evidence[0])) && Array.isArray(o.prevIpAddresses) && (!o.prevIpAddresses.length || IPAddressHistory.is(o.prevIpAddresses[0])) && typeof o.note === "string" && typeof o.supernodeAccount === "string" && typeof o.p2pPort === "string" && Array.isArray(o.prevSupernodeAccounts) && (!o.prevSupernodeAccounts.length || SupernodeAccountHistory.is(o.prevSupernodeAccounts[0])));
  },
  isAmino(o: any): o is SuperNodeAmino {
    return o && (o.$typeUrl === SuperNode.typeUrl || typeof o.validator_address === "string" && Array.isArray(o.states) && (!o.states.length || SuperNodeStateRecord.isAmino(o.states[0])) && Array.isArray(o.evidence) && (!o.evidence.length || Evidence.isAmino(o.evidence[0])) && Array.isArray(o.prev_ip_addresses) && (!o.prev_ip_addresses.length || IPAddressHistory.isAmino(o.prev_ip_addresses[0])) && typeof o.note === "string" && typeof o.supernode_account === "string" && typeof o.p2p_port === "string" && Array.isArray(o.prev_supernode_accounts) && (!o.prev_supernode_accounts.length || SupernodeAccountHistory.isAmino(o.prev_supernode_accounts[0])));
  },
  encode(message: SuperNode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    for (const v of message.states) {
      SuperNodeStateRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.evidence) {
      Evidence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.prevIpAddresses) {
      IPAddressHistory.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.note !== "") {
      writer.uint32(42).string(message.note);
    }
    if (message.metrics !== undefined) {
      MetricsAggregate.encode(message.metrics, writer.uint32(50).fork()).ldelim();
    }
    if (message.supernodeAccount !== "") {
      writer.uint32(58).string(message.supernodeAccount);
    }
    if (message.p2pPort !== "") {
      writer.uint32(66).string(message.p2pPort);
    }
    for (const v of message.prevSupernodeAccounts) {
      SupernodeAccountHistory.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SuperNode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.states.push(SuperNodeStateRecord.decode(reader, reader.uint32()));
          break;
        case 3:
          message.evidence.push(Evidence.decode(reader, reader.uint32()));
          break;
        case 4:
          message.prevIpAddresses.push(IPAddressHistory.decode(reader, reader.uint32()));
          break;
        case 5:
          message.note = reader.string();
          break;
        case 6:
          message.metrics = MetricsAggregate.decode(reader, reader.uint32());
          break;
        case 7:
          message.supernodeAccount = reader.string();
          break;
        case 8:
          message.p2pPort = reader.string();
          break;
        case 9:
          message.prevSupernodeAccounts.push(SupernodeAccountHistory.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SuperNode>): SuperNode {
    const message = createBaseSuperNode();
    message.validatorAddress = object.validatorAddress ?? "";
    message.states = object.states?.map(e => SuperNodeStateRecord.fromPartial(e)) || [];
    message.evidence = object.evidence?.map(e => Evidence.fromPartial(e)) || [];
    message.prevIpAddresses = object.prevIpAddresses?.map(e => IPAddressHistory.fromPartial(e)) || [];
    message.note = object.note ?? "";
    message.metrics = object.metrics !== undefined && object.metrics !== null ? MetricsAggregate.fromPartial(object.metrics) : undefined;
    message.supernodeAccount = object.supernodeAccount ?? "";
    message.p2pPort = object.p2pPort ?? "";
    message.prevSupernodeAccounts = object.prevSupernodeAccounts?.map(e => SupernodeAccountHistory.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SuperNodeAmino): SuperNode {
    const message = createBaseSuperNode();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    message.states = object.states?.map(e => SuperNodeStateRecord.fromAmino(e)) || [];
    message.evidence = object.evidence?.map(e => Evidence.fromAmino(e)) || [];
    message.prevIpAddresses = object.prev_ip_addresses?.map(e => IPAddressHistory.fromAmino(e)) || [];
    if (object.note !== undefined && object.note !== null) {
      message.note = object.note;
    }
    if (object.metrics !== undefined && object.metrics !== null) {
      message.metrics = MetricsAggregate.fromAmino(object.metrics);
    }
    if (object.supernode_account !== undefined && object.supernode_account !== null) {
      message.supernodeAccount = object.supernode_account;
    }
    if (object.p2p_port !== undefined && object.p2p_port !== null) {
      message.p2pPort = object.p2p_port;
    }
    message.prevSupernodeAccounts = object.prev_supernode_accounts?.map(e => SupernodeAccountHistory.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SuperNode): SuperNodeAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    if (message.states) {
      obj.states = message.states.map(e => e ? SuperNodeStateRecord.toAmino(e) : undefined);
    } else {
      obj.states = message.states;
    }
    if (message.evidence) {
      obj.evidence = message.evidence.map(e => e ? Evidence.toAmino(e) : undefined);
    } else {
      obj.evidence = message.evidence;
    }
    if (message.prevIpAddresses) {
      obj.prev_ip_addresses = message.prevIpAddresses.map(e => e ? IPAddressHistory.toAmino(e) : undefined);
    } else {
      obj.prev_ip_addresses = message.prevIpAddresses;
    }
    obj.note = message.note === "" ? undefined : message.note;
    obj.metrics = message.metrics ? MetricsAggregate.toAmino(message.metrics) : undefined;
    obj.supernode_account = message.supernodeAccount === "" ? undefined : message.supernodeAccount;
    obj.p2p_port = message.p2pPort === "" ? undefined : message.p2pPort;
    if (message.prevSupernodeAccounts) {
      obj.prev_supernode_accounts = message.prevSupernodeAccounts.map(e => e ? SupernodeAccountHistory.toAmino(e) : undefined);
    } else {
      obj.prev_supernode_accounts = message.prevSupernodeAccounts;
    }
    return obj;
  },
  fromAminoMsg(object: SuperNodeAminoMsg): SuperNode {
    return SuperNode.fromAmino(object.value);
  },
  fromProtoMsg(message: SuperNodeProtoMsg): SuperNode {
    return SuperNode.decode(message.value);
  },
  toProto(message: SuperNode): Uint8Array {
    return SuperNode.encode(message).finish();
  },
  toProtoMsg(message: SuperNode): SuperNodeProtoMsg {
    return {
      typeUrl: "/lumera.supernode.v1.SuperNode",
      value: SuperNode.encode(message).finish()
    };
  },
  registerTypeUrl() {
    if (!GlobalDecoderRegistry.registerExistingTypeUrl(SuperNode.typeUrl)) {
      return;
    }
    SuperNodeStateRecord.registerTypeUrl();
    Evidence.registerTypeUrl();
    IPAddressHistory.registerTypeUrl();
    MetricsAggregate.registerTypeUrl();
    SupernodeAccountHistory.registerTypeUrl();
  }
};