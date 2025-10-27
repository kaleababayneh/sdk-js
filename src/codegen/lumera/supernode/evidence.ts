// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../binary";
import { DeepPartial } from "../../helpers";
/**
 * @name Evidence
 * @package lumera.supernode
 * @see proto type: lumera.supernode.Evidence
 */
export interface Evidence {
  reporterAddress: string;
  validatorAddress: string;
  actionId: string;
  evidenceType: string;
  description: string;
  severity: bigint;
  height: number;
}
export interface EvidenceProtoMsg {
  typeUrl: "/lumera.supernode.Evidence";
  value: Uint8Array;
}
/**
 * @name EvidenceAmino
 * @package lumera.supernode
 * @see proto type: lumera.supernode.Evidence
 */
export interface EvidenceAmino {
  reporter_address: string;
  validator_address: string;
  action_id: string;
  evidence_type: string;
  description: string;
  severity: string;
  height: number;
}
export interface EvidenceAminoMsg {
  type: "/lumera.supernode.Evidence";
  value: EvidenceAmino;
}
function createBaseEvidence(): Evidence {
  return {
    reporterAddress: "",
    validatorAddress: "",
    actionId: "",
    evidenceType: "",
    description: "",
    severity: BigInt(0),
    height: 0
  };
}
/**
 * @name Evidence
 * @package lumera.supernode
 * @see proto type: lumera.supernode.Evidence
 */
export const Evidence = {
  typeUrl: "/lumera.supernode.Evidence",
  is(o: any): o is Evidence {
    return o && (o.$typeUrl === Evidence.typeUrl || typeof o.reporterAddress === "string" && typeof o.validatorAddress === "string" && typeof o.actionId === "string" && typeof o.evidenceType === "string" && typeof o.description === "string" && typeof o.severity === "bigint" && typeof o.height === "number");
  },
  isAmino(o: any): o is EvidenceAmino {
    return o && (o.$typeUrl === Evidence.typeUrl || typeof o.reporter_address === "string" && typeof o.validator_address === "string" && typeof o.action_id === "string" && typeof o.evidence_type === "string" && typeof o.description === "string" && typeof o.severity === "bigint" && typeof o.height === "number");
  },
  encode(message: Evidence, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.reporterAddress !== "") {
      writer.uint32(10).string(message.reporterAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.actionId !== "") {
      writer.uint32(26).string(message.actionId);
    }
    if (message.evidenceType !== "") {
      writer.uint32(34).string(message.evidenceType);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.severity !== BigInt(0)) {
      writer.uint32(48).uint64(message.severity);
    }
    if (message.height !== 0) {
      writer.uint32(56).int32(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Evidence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reporterAddress = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.actionId = reader.string();
          break;
        case 4:
          message.evidenceType = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.severity = reader.uint64();
          break;
        case 7:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Evidence>): Evidence {
    const message = createBaseEvidence();
    message.reporterAddress = object.reporterAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.actionId = object.actionId ?? "";
    message.evidenceType = object.evidenceType ?? "";
    message.description = object.description ?? "";
    message.severity = object.severity !== undefined && object.severity !== null ? BigInt(object.severity.toString()) : BigInt(0);
    message.height = object.height ?? 0;
    return message;
  },
  fromAmino(object: EvidenceAmino): Evidence {
    const message = createBaseEvidence();
    if (object.reporter_address !== undefined && object.reporter_address !== null) {
      message.reporterAddress = object.reporter_address;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.action_id !== undefined && object.action_id !== null) {
      message.actionId = object.action_id;
    }
    if (object.evidence_type !== undefined && object.evidence_type !== null) {
      message.evidenceType = object.evidence_type;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.severity !== undefined && object.severity !== null) {
      message.severity = BigInt(object.severity);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height;
    }
    return message;
  },
  toAmino(message: Evidence): EvidenceAmino {
    const obj: any = {};
    obj.reporter_address = message.reporterAddress === "" ? undefined : message.reporterAddress;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.action_id = message.actionId === "" ? undefined : message.actionId;
    obj.evidence_type = message.evidenceType === "" ? undefined : message.evidenceType;
    obj.description = message.description === "" ? undefined : message.description;
    obj.severity = message.severity !== BigInt(0) ? message.severity?.toString() : undefined;
    obj.height = message.height === 0 ? undefined : message.height;
    return obj;
  },
  fromAminoMsg(object: EvidenceAminoMsg): Evidence {
    return Evidence.fromAmino(object.value);
  },
  fromProtoMsg(message: EvidenceProtoMsg): Evidence {
    return Evidence.decode(message.value);
  },
  toProto(message: Evidence): Uint8Array {
    return Evidence.encode(message).finish();
  },
  toProtoMsg(message: Evidence): EvidenceProtoMsg {
    return {
      typeUrl: "/lumera.supernode.Evidence",
      value: Evidence.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};