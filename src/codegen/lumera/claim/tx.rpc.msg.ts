// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgClaim, MsgClaimResponse, MsgDelayedClaim, MsgDelayedClaimResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Claim defines a message for claiming tokens. */
  claim(request: MsgClaim): Promise<MsgClaimResponse>;
  delayedClaim(request: MsgDelayedClaim): Promise<MsgDelayedClaimResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* UpdateParams defines a (governance) operation for updating the module
   parameters. The authority defaults to the x/gov module account. */
  updateParams = async (request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> => {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("lumera.claim.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  };
  /* Claim defines a message for claiming tokens. */
  claim = async (request: MsgClaim): Promise<MsgClaimResponse> => {
    const data = MsgClaim.encode(request).finish();
    const promise = this.rpc.request("lumera.claim.Msg", "Claim", data);
    return promise.then(data => MsgClaimResponse.decode(new BinaryReader(data)));
  };
  /* DelayedClaim */
  delayedClaim = async (request: MsgDelayedClaim): Promise<MsgDelayedClaimResponse> => {
    const data = MsgDelayedClaim.encode(request).finish();
    const promise = this.rpc.request("lumera.claim.Msg", "DelayedClaim", data);
    return promise.then(data => MsgDelayedClaimResponse.decode(new BinaryReader(data)));
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};