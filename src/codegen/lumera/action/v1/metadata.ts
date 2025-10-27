// @ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/**
 * SenseMetadata contains information for Sense actions.
 * This metadata is directly embedded in the Action.metadata field.
 * For RequestAction:
 *   - Required: data_hash, dd_and_fingerprints_ic
 *   - Optional: collection_id, group_id
 * Keeper will add:
 *   - dd_and_fingerprints_max (from module params)
 * For FinalizeAction:
 *   - Required: dd_and_fingerprints_ids, signatures
 * @name SenseMetadata
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.SenseMetadata
 */
export interface SenseMetadata {
  /**
   * RequestAction required fields
   */
  dataHash: string;
  ddAndFingerprintsIc: bigint;
  /**
   * RequestAction optional fields
   */
  collectionId: string;
  groupId: string;
  /**
   * Added by Keeper
   */
  ddAndFingerprintsMax: bigint;
  /**
   * FinalizeAction fields
   */
  ddAndFingerprintsIds: string[];
  signatures: string;
}
export interface SenseMetadataProtoMsg {
  typeUrl: "/lumera.action.v1.SenseMetadata";
  value: Uint8Array;
}
/**
 * SenseMetadata contains information for Sense actions.
 * This metadata is directly embedded in the Action.metadata field.
 * For RequestAction:
 *   - Required: data_hash, dd_and_fingerprints_ic
 *   - Optional: collection_id, group_id
 * Keeper will add:
 *   - dd_and_fingerprints_max (from module params)
 * For FinalizeAction:
 *   - Required: dd_and_fingerprints_ids, signatures
 * @name SenseMetadataAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.SenseMetadata
 */
export interface SenseMetadataAmino {
  /**
   * RequestAction required fields
   */
  data_hash: string;
  dd_and_fingerprints_ic: string;
  /**
   * RequestAction optional fields
   */
  collection_id: string;
  group_id: string;
  /**
   * Added by Keeper
   */
  dd_and_fingerprints_max: string;
  /**
   * FinalizeAction fields
   */
  dd_and_fingerprints_ids: string[];
  signatures: string;
}
export interface SenseMetadataAminoMsg {
  type: "/lumera.action.v1.SenseMetadata";
  value: SenseMetadataAmino;
}
/**
 * CascadeMetadata contains information for Cascade actions.
 * This metadata is directly embedded in the Action.metadata field.
 * For RequestAction:
 *   - Required: data_hash, file_name, rq_ids_ic, signatures
 * Keeper will add:
 *   - rq_ids_max (from module params)
 * For FinalizeAction:
 *   - Required: rq_ids_ids
 * @name CascadeMetadata
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.CascadeMetadata
 */
export interface CascadeMetadata {
  /**
   * RequestAction required fields
   */
  dataHash: string;
  fileName: string;
  rqIdsIc: bigint;
  /**
   * Added by Keeper
   */
  rqIdsMax: bigint;
  /**
   * FinalizeAction fields
   */
  rqIdsIds?: string[];
  /**
   * RequestAction required field
   */
  signatures: string;
  /**
   * Indicates whether the action is publicly visible. Set to true to
   * mark the action as visible to all users; set to false for private
   * or restricted actions.
   */
  public: boolean;
}
export interface CascadeMetadataProtoMsg {
  typeUrl: "/lumera.action.v1.CascadeMetadata";
  value: Uint8Array;
}
/**
 * CascadeMetadata contains information for Cascade actions.
 * This metadata is directly embedded in the Action.metadata field.
 * For RequestAction:
 *   - Required: data_hash, file_name, rq_ids_ic, signatures
 * Keeper will add:
 *   - rq_ids_max (from module params)
 * For FinalizeAction:
 *   - Required: rq_ids_ids
 * @name CascadeMetadataAmino
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.CascadeMetadata
 */
export interface CascadeMetadataAmino {
  /**
   * RequestAction required fields
   */
  data_hash: string;
  file_name: string;
  rq_ids_ic: string;
  /**
   * Added by Keeper
   */
  rq_ids_max: string;
  /**
   * FinalizeAction fields
   */
  rq_ids_ids?: string[];
  /**
   * RequestAction required field
   */
  signatures: string;
  /**
   * Indicates whether the action is publicly visible. Set to true to
   * mark the action as visible to all users; set to false for private
   * or restricted actions.
   */
  public: boolean;
}
export interface CascadeMetadataAminoMsg {
  type: "/lumera.action.v1.CascadeMetadata";
  value: CascadeMetadataAmino;
}
function createBaseSenseMetadata(): SenseMetadata {
  return {
    dataHash: "",
    ddAndFingerprintsIc: BigInt(0),
    collectionId: "",
    groupId: "",
    ddAndFingerprintsMax: BigInt(0),
    ddAndFingerprintsIds: [],
    signatures: ""
  };
}
/**
 * SenseMetadata contains information for Sense actions.
 * This metadata is directly embedded in the Action.metadata field.
 * For RequestAction:
 *   - Required: data_hash, dd_and_fingerprints_ic
 *   - Optional: collection_id, group_id
 * Keeper will add:
 *   - dd_and_fingerprints_max (from module params)
 * For FinalizeAction:
 *   - Required: dd_and_fingerprints_ids, signatures
 * @name SenseMetadata
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.SenseMetadata
 */
export const SenseMetadata = {
  typeUrl: "/lumera.action.v1.SenseMetadata",
  is(o: any): o is SenseMetadata {
    return o && (o.$typeUrl === SenseMetadata.typeUrl || typeof o.dataHash === "string" && typeof o.ddAndFingerprintsIc === "bigint" && typeof o.collectionId === "string" && typeof o.groupId === "string" && typeof o.ddAndFingerprintsMax === "bigint" && Array.isArray(o.ddAndFingerprintsIds) && (!o.ddAndFingerprintsIds.length || typeof o.ddAndFingerprintsIds[0] === "string") && typeof o.signatures === "string");
  },
  isAmino(o: any): o is SenseMetadataAmino {
    return o && (o.$typeUrl === SenseMetadata.typeUrl || typeof o.data_hash === "string" && typeof o.dd_and_fingerprints_ic === "bigint" && typeof o.collection_id === "string" && typeof o.group_id === "string" && typeof o.dd_and_fingerprints_max === "bigint" && Array.isArray(o.dd_and_fingerprints_ids) && (!o.dd_and_fingerprints_ids.length || typeof o.dd_and_fingerprints_ids[0] === "string") && typeof o.signatures === "string");
  },
  encode(message: SenseMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dataHash !== "") {
      writer.uint32(10).string(message.dataHash);
    }
    if (message.ddAndFingerprintsIc !== BigInt(0)) {
      writer.uint32(16).uint64(message.ddAndFingerprintsIc);
    }
    if (message.collectionId !== "") {
      writer.uint32(26).string(message.collectionId);
    }
    if (message.groupId !== "") {
      writer.uint32(34).string(message.groupId);
    }
    if (message.ddAndFingerprintsMax !== BigInt(0)) {
      writer.uint32(40).uint64(message.ddAndFingerprintsMax);
    }
    for (const v of message.ddAndFingerprintsIds) {
      writer.uint32(50).string(v!);
    }
    if (message.signatures !== "") {
      writer.uint32(58).string(message.signatures);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SenseMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSenseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataHash = reader.string();
          break;
        case 2:
          message.ddAndFingerprintsIc = reader.uint64();
          break;
        case 3:
          message.collectionId = reader.string();
          break;
        case 4:
          message.groupId = reader.string();
          break;
        case 5:
          message.ddAndFingerprintsMax = reader.uint64();
          break;
        case 6:
          message.ddAndFingerprintsIds.push(reader.string());
          break;
        case 7:
          message.signatures = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SenseMetadata>): SenseMetadata {
    const message = createBaseSenseMetadata();
    message.dataHash = object.dataHash ?? "";
    message.ddAndFingerprintsIc = object.ddAndFingerprintsIc !== undefined && object.ddAndFingerprintsIc !== null ? BigInt(object.ddAndFingerprintsIc.toString()) : BigInt(0);
    message.collectionId = object.collectionId ?? "";
    message.groupId = object.groupId ?? "";
    message.ddAndFingerprintsMax = object.ddAndFingerprintsMax !== undefined && object.ddAndFingerprintsMax !== null ? BigInt(object.ddAndFingerprintsMax.toString()) : BigInt(0);
    message.ddAndFingerprintsIds = object.ddAndFingerprintsIds?.map(e => e) || [];
    message.signatures = object.signatures ?? "";
    return message;
  },
  fromAmino(object: SenseMetadataAmino): SenseMetadata {
    const message = createBaseSenseMetadata();
    if (object.data_hash !== undefined && object.data_hash !== null) {
      message.dataHash = object.data_hash;
    }
    if (object.dd_and_fingerprints_ic !== undefined && object.dd_and_fingerprints_ic !== null) {
      message.ddAndFingerprintsIc = BigInt(object.dd_and_fingerprints_ic);
    }
    if (object.collection_id !== undefined && object.collection_id !== null) {
      message.collectionId = object.collection_id;
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.groupId = object.group_id;
    }
    if (object.dd_and_fingerprints_max !== undefined && object.dd_and_fingerprints_max !== null) {
      message.ddAndFingerprintsMax = BigInt(object.dd_and_fingerprints_max);
    }
    message.ddAndFingerprintsIds = object.dd_and_fingerprints_ids?.map(e => e) || [];
    if (object.signatures !== undefined && object.signatures !== null) {
      message.signatures = object.signatures;
    }
    return message;
  },
  toAmino(message: SenseMetadata): SenseMetadataAmino {
    const obj: any = {};
    obj.data_hash = message.dataHash === "" ? undefined : message.dataHash;
    obj.dd_and_fingerprints_ic = message.ddAndFingerprintsIc !== BigInt(0) ? message.ddAndFingerprintsIc?.toString() : undefined;
    obj.collection_id = message.collectionId === "" ? undefined : message.collectionId;
    obj.group_id = message.groupId === "" ? undefined : message.groupId;
    obj.dd_and_fingerprints_max = message.ddAndFingerprintsMax !== BigInt(0) ? message.ddAndFingerprintsMax?.toString() : undefined;
    if (message.ddAndFingerprintsIds) {
      obj.dd_and_fingerprints_ids = message.ddAndFingerprintsIds.map(e => e);
    } else {
      obj.dd_and_fingerprints_ids = message.ddAndFingerprintsIds;
    }
    obj.signatures = message.signatures === "" ? undefined : message.signatures;
    return obj;
  },
  fromAminoMsg(object: SenseMetadataAminoMsg): SenseMetadata {
    return SenseMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: SenseMetadataProtoMsg): SenseMetadata {
    return SenseMetadata.decode(message.value);
  },
  toProto(message: SenseMetadata): Uint8Array {
    return SenseMetadata.encode(message).finish();
  },
  toProtoMsg(message: SenseMetadata): SenseMetadataProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.SenseMetadata",
      value: SenseMetadata.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};
function createBaseCascadeMetadata(): CascadeMetadata {
  return {
    dataHash: "",
    fileName: "",
    rqIdsIc: BigInt(0),
    rqIdsMax: BigInt(0),
    rqIdsIds: [],
    signatures: "",
    public: false
  };
}
/**
 * CascadeMetadata contains information for Cascade actions.
 * This metadata is directly embedded in the Action.metadata field.
 * For RequestAction:
 *   - Required: data_hash, file_name, rq_ids_ic, signatures
 * Keeper will add:
 *   - rq_ids_max (from module params)
 * For FinalizeAction:
 *   - Required: rq_ids_ids
 * @name CascadeMetadata
 * @package lumera.action.v1
 * @see proto type: lumera.action.v1.CascadeMetadata
 */
export const CascadeMetadata = {
  typeUrl: "/lumera.action.v1.CascadeMetadata",
  is(o: any): o is CascadeMetadata {
    return o && (o.$typeUrl === CascadeMetadata.typeUrl || typeof o.dataHash === "string" && typeof o.fileName === "string" && typeof o.rqIdsIc === "bigint" && typeof o.rqIdsMax === "bigint" && typeof o.signatures === "string" && typeof o.public === "boolean");
  },
  isAmino(o: any): o is CascadeMetadataAmino {
    return o && (o.$typeUrl === CascadeMetadata.typeUrl || typeof o.data_hash === "string" && typeof o.file_name === "string" && typeof o.rq_ids_ic === "bigint" && typeof o.rq_ids_max === "bigint" && typeof o.signatures === "string" && typeof o.public === "boolean");
  },
  encode(message: CascadeMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dataHash !== "") {
      writer.uint32(10).string(message.dataHash);
    }
    if (message.fileName !== "") {
      writer.uint32(18).string(message.fileName);
    }
    if (message.rqIdsIc !== BigInt(0)) {
      writer.uint32(24).uint64(message.rqIdsIc);
    }
    if (message.rqIdsMax !== BigInt(0)) {
      writer.uint32(32).uint64(message.rqIdsMax);
    }
    for (const v of message.rqIdsIds) {
      writer.uint32(42).string(v!);
    }
    if (message.signatures !== "") {
      writer.uint32(50).string(message.signatures);
    }
    if (message.public === true) {
      writer.uint32(56).bool(message.public);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CascadeMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCascadeMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataHash = reader.string();
          break;
        case 2:
          message.fileName = reader.string();
          break;
        case 3:
          message.rqIdsIc = reader.uint64();
          break;
        case 4:
          message.rqIdsMax = reader.uint64();
          break;
        case 5:
          message.rqIdsIds.push(reader.string());
          break;
        case 6:
          message.signatures = reader.string();
          break;
        case 7:
          message.public = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CascadeMetadata>): CascadeMetadata {
    const message = createBaseCascadeMetadata();
    message.dataHash = object.dataHash ?? "";
    message.fileName = object.fileName ?? "";
    message.rqIdsIc = object.rqIdsIc !== undefined && object.rqIdsIc !== null ? BigInt(object.rqIdsIc.toString()) : BigInt(0);
    message.rqIdsMax = object.rqIdsMax !== undefined && object.rqIdsMax !== null ? BigInt(object.rqIdsMax.toString()) : BigInt(0);
    message.rqIdsIds = object.rqIdsIds?.map(e => e) || [];
    message.signatures = object.signatures ?? "";
    message.public = object.public ?? false;
    return message;
  },
  fromAmino(object: CascadeMetadataAmino): CascadeMetadata {
    const message = createBaseCascadeMetadata();
    if (object.data_hash !== undefined && object.data_hash !== null) {
      message.dataHash = object.data_hash;
    }
    if (object.file_name !== undefined && object.file_name !== null) {
      message.fileName = object.file_name;
    }
    if (object.rq_ids_ic !== undefined && object.rq_ids_ic !== null) {
      message.rqIdsIc = BigInt(object.rq_ids_ic);
    }
    if (object.rq_ids_max !== undefined && object.rq_ids_max !== null) {
      message.rqIdsMax = BigInt(object.rq_ids_max);
    }
    message.rqIdsIds = object.rq_ids_ids?.map(e => e) || [];
    if (object.signatures !== undefined && object.signatures !== null) {
      message.signatures = object.signatures;
    }
    if (object.public !== undefined && object.public !== null) {
      message.public = object.public;
    }
    return message;
  },
  toAmino(message: CascadeMetadata): CascadeMetadataAmino {
    const obj: any = {};
    obj.data_hash = message.dataHash === "" ? undefined : message.dataHash;
    obj.file_name = message.fileName === "" ? undefined : message.fileName;
    obj.rq_ids_ic = message.rqIdsIc !== BigInt(0) ? message.rqIdsIc?.toString() : undefined;
    obj.rq_ids_max = message.rqIdsMax !== BigInt(0) ? message.rqIdsMax?.toString() : undefined;
    if (message.rqIdsIds) {
      obj.rq_ids_ids = message.rqIdsIds.map(e => e);
    } else {
      obj.rq_ids_ids = message.rqIdsIds;
    }
    obj.signatures = message.signatures === "" ? undefined : message.signatures;
    obj.public = message.public === false ? undefined : message.public;
    return obj;
  },
  fromAminoMsg(object: CascadeMetadataAminoMsg): CascadeMetadata {
    return CascadeMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: CascadeMetadataProtoMsg): CascadeMetadata {
    return CascadeMetadata.decode(message.value);
  },
  toProto(message: CascadeMetadata): Uint8Array {
    return CascadeMetadata.encode(message).finish();
  },
  toProtoMsg(message: CascadeMetadata): CascadeMetadataProtoMsg {
    return {
      typeUrl: "/lumera.action.v1.CascadeMetadata",
      value: CascadeMetadata.encode(message).finish()
    };
  },
  registerTypeUrl() {}
};