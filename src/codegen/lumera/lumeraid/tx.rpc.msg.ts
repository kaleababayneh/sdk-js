// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
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
    const promise = this.rpc.request("lumera.lumeraid.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};