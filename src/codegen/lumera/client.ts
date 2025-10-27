// @ts-nocheck
/* eslint-disable */
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as lumeraSupernodeV1TxRegistry from "./supernode/v1/tx.registry";
import * as lumeraLumeraidTxRegistry from "./lumeraid/tx.registry";
import * as lumeraClaimTxRegistry from "./claim/tx.registry";
import * as lumeraActionV1TxRegistry from "./action/v1/tx.registry";
import * as lumeraSupernodeV1TxAmino from "./supernode/v1/tx.amino";
import * as lumeraLumeraidTxAmino from "./lumeraid/tx.amino";
import * as lumeraClaimTxAmino from "./claim/tx.amino";
import * as lumeraActionV1TxAmino from "./action/v1/tx.amino";
export const lumeraAminoConverters = {
  ...lumeraSupernodeV1TxAmino.AminoConverter,
  ...lumeraLumeraidTxAmino.AminoConverter,
  ...lumeraClaimTxAmino.AminoConverter,
  ...lumeraActionV1TxAmino.AminoConverter
};
export const lumeraProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...lumeraSupernodeV1TxRegistry.registry, ...lumeraLumeraidTxRegistry.registry, ...lumeraClaimTxRegistry.registry, ...lumeraActionV1TxRegistry.registry];
export const getSigningLumeraClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...lumeraProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...lumeraAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningLumeraClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningLumeraClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: registry as any,
    aminoTypes
  });
  return client;
};