// @ts-nocheck
/* eslint-disable */
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as lumeraSupernodeTxRegistry from "./supernode/tx.registry";
import * as lumeraLumeraidTxRegistry from "./lumeraid/tx.registry";
import * as lumeraClaimTxRegistry from "./claim/tx.registry";
import * as lumeraActionTxRegistry from "./action/tx.registry";
import * as lumeraSupernodeTxAmino from "./supernode/tx.amino";
import * as lumeraLumeraidTxAmino from "./lumeraid/tx.amino";
import * as lumeraClaimTxAmino from "./claim/tx.amino";
import * as lumeraActionTxAmino from "./action/tx.amino";
export const lumeraAminoConverters = {
  ...lumeraSupernodeTxAmino.AminoConverter,
  ...lumeraLumeraidTxAmino.AminoConverter,
  ...lumeraClaimTxAmino.AminoConverter,
  ...lumeraActionTxAmino.AminoConverter
};
export const lumeraProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...lumeraSupernodeTxRegistry.registry, ...lumeraLumeraidTxRegistry.registry, ...lumeraClaimTxRegistry.registry, ...lumeraActionTxRegistry.registry];
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