// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRequestAction, MsgRequestActionResponse, MsgFinalizeAction, MsgFinalizeActionResponse, MsgApproveAction, MsgApproveActionResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** RequestAction defines a message for requesting an action. */
  requestAction(request: MsgRequestAction): Promise<MsgRequestActionResponse>;
  /** FinalizeAction defines a message for finalizing an action. */
  finalizeAction(request: MsgFinalizeAction): Promise<MsgFinalizeActionResponse>;
  /** ApproveAction defines a message for approving an action. */
  approveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse>;
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
    const promise = this.rpc.request("lumera.action.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  };
  /* RequestAction defines a message for requesting an action. */
  requestAction = async (request: MsgRequestAction): Promise<MsgRequestActionResponse> => {
    const data = MsgRequestAction.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Msg", "RequestAction", data);
    return promise.then(data => MsgRequestActionResponse.decode(new BinaryReader(data)));
  };
  /* FinalizeAction defines a message for finalizing an action. */
  finalizeAction = async (request: MsgFinalizeAction): Promise<MsgFinalizeActionResponse> => {
    const data = MsgFinalizeAction.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Msg", "FinalizeAction", data);
    return promise.then(data => MsgFinalizeActionResponse.decode(new BinaryReader(data)));
  };
  /* ApproveAction defines a message for approving an action. */
  approveAction = async (request: MsgApproveAction): Promise<MsgApproveActionResponse> => {
    const data = MsgApproveAction.encode(request).finish();
    const promise = this.rpc.request("lumera.action.v1.Msg", "ApproveAction", data);
    return promise.then(data => MsgApproveActionResponse.decode(new BinaryReader(data)));
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};