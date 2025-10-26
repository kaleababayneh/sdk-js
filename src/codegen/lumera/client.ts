// @ts-nocheck
/* eslint-disable */
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as lumeraActionTxRegistry from "./action/tx.registry";
import * as lumeraClaimTxRegistry from "./claim/tx.registry";
import * as lumeraLumeraidTxRegistry from "./lumeraid/tx.registry";
import * as lumeraSupernodeTxRegistry from "./supernode/tx.registry";
import * as lumeraActionTxAmino from "./action/tx.amino";
import * as lumeraClaimTxAmino from "./claim/tx.amino";
import * as lumeraLumeraidTxAmino from "./lumeraid/tx.amino";
import * as lumeraSupernodeTxAmino from "./supernode/tx.amino";
export const lumeraAminoConverters = {
  ...lumeraActionTxAmino.AminoConverter,
  ...lumeraClaimTxAmino.AminoConverter,
  ...lumeraLumeraidTxAmino.AminoConverter,
  ...lumeraSupernodeTxAmino.AminoConverter
};
export const lumeraProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...lumeraActionTxRegistry.registry, ...lumeraClaimTxRegistry.registry, ...lumeraLumeraidTxRegistry.registry, ...lumeraSupernodeTxRegistry.registry];
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