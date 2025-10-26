// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRequestAction, MsgRequestActionResponse, MsgFinalizeAction, MsgFinalizeActionResponse, MsgApproveAction, MsgApproveActionResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  requestAction(request: MsgRequestAction): Promise<MsgRequestActionResponse>;
  finalizeAction(request: MsgFinalizeAction): Promise<MsgFinalizeActionResponse>;
  approveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.requestAction = this.requestAction.bind(this);
    this.finalizeAction = this.finalizeAction.bind(this);
    this.approveAction = this.approveAction.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  requestAction(request: MsgRequestAction): Promise<MsgRequestActionResponse> {
    const data = MsgRequestAction.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Msg", "RequestAction", data);
    return promise.then(data => MsgRequestActionResponse.decode(new BinaryReader(data)));
  }
  finalizeAction(request: MsgFinalizeAction): Promise<MsgFinalizeActionResponse> {
    const data = MsgFinalizeAction.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Msg", "FinalizeAction", data);
    return promise.then(data => MsgFinalizeActionResponse.decode(new BinaryReader(data)));
  }
  approveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse> {
    const data = MsgApproveAction.encode(request).finish();
    const promise = this.rpc.request("lumera.action.Msg", "ApproveAction", data);
    return promise.then(data => MsgApproveActionResponse.decode(new BinaryReader(data)));
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};