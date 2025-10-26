// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../types";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRegisterSupernode, MsgRegisterSupernodeResponse, MsgDeregisterSupernode, MsgDeregisterSupernodeResponse, MsgStartSupernode, MsgStartSupernodeResponse, MsgStopSupernode, MsgStopSupernodeResponse, MsgUpdateSupernode, MsgUpdateSupernodeResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  registerSupernode(request: MsgRegisterSupernode): Promise<MsgRegisterSupernodeResponse>;
  deregisterSupernode(request: MsgDeregisterSupernode): Promise<MsgDeregisterSupernodeResponse>;
  startSupernode(request: MsgStartSupernode): Promise<MsgStartSupernodeResponse>;
  stopSupernode(request: MsgStopSupernode): Promise<MsgStopSupernodeResponse>;
  updateSupernode(request: MsgUpdateSupernode): Promise<MsgUpdateSupernodeResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.registerSupernode = this.registerSupernode.bind(this);
    this.deregisterSupernode = this.deregisterSupernode.bind(this);
    this.startSupernode = this.startSupernode.bind(this);
    this.stopSupernode = this.stopSupernode.bind(this);
    this.updateSupernode = this.updateSupernode.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  registerSupernode(request: MsgRegisterSupernode): Promise<MsgRegisterSupernodeResponse> {
    const data = MsgRegisterSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Msg", "RegisterSupernode", data);
    return promise.then(data => MsgRegisterSupernodeResponse.decode(new BinaryReader(data)));
  }
  deregisterSupernode(request: MsgDeregisterSupernode): Promise<MsgDeregisterSupernodeResponse> {
    const data = MsgDeregisterSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Msg", "DeregisterSupernode", data);
    return promise.then(data => MsgDeregisterSupernodeResponse.decode(new BinaryReader(data)));
  }
  startSupernode(request: MsgStartSupernode): Promise<MsgStartSupernodeResponse> {
    const data = MsgStartSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Msg", "StartSupernode", data);
    return promise.then(data => MsgStartSupernodeResponse.decode(new BinaryReader(data)));
  }
  stopSupernode(request: MsgStopSupernode): Promise<MsgStopSupernodeResponse> {
    const data = MsgStopSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Msg", "StopSupernode", data);
    return promise.then(data => MsgStopSupernodeResponse.decode(new BinaryReader(data)));
  }
  updateSupernode(request: MsgUpdateSupernode): Promise<MsgUpdateSupernodeResponse> {
    const data = MsgUpdateSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.Msg", "UpdateSupernode", data);
    return promise.then(data => MsgUpdateSupernodeResponse.decode(new BinaryReader(data)));
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};