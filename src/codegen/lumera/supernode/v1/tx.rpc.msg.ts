// @ts-nocheck
/* eslint-disable */
import { TxRpc } from "../../../types";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRegisterSupernode, MsgRegisterSupernodeResponse, MsgDeregisterSupernode, MsgDeregisterSupernodeResponse, MsgStartSupernode, MsgStartSupernodeResponse, MsgStopSupernode, MsgStopSupernodeResponse, MsgUpdateSupernode, MsgUpdateSupernodeResponse, MsgReportSupernodeMetrics, MsgReportSupernodeMetricsResponse } from "./tx";
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
  reportSupernodeMetrics(request: MsgReportSupernodeMetrics): Promise<MsgReportSupernodeMetricsResponse>;
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
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  };
  /* RegisterSupernode */
  registerSupernode = async (request: MsgRegisterSupernode): Promise<MsgRegisterSupernodeResponse> => {
    const data = MsgRegisterSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "RegisterSupernode", data);
    return promise.then(data => MsgRegisterSupernodeResponse.decode(new BinaryReader(data)));
  };
  /* DeregisterSupernode */
  deregisterSupernode = async (request: MsgDeregisterSupernode): Promise<MsgDeregisterSupernodeResponse> => {
    const data = MsgDeregisterSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "DeregisterSupernode", data);
    return promise.then(data => MsgDeregisterSupernodeResponse.decode(new BinaryReader(data)));
  };
  /* StartSupernode */
  startSupernode = async (request: MsgStartSupernode): Promise<MsgStartSupernodeResponse> => {
    const data = MsgStartSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "StartSupernode", data);
    return promise.then(data => MsgStartSupernodeResponse.decode(new BinaryReader(data)));
  };
  /* StopSupernode */
  stopSupernode = async (request: MsgStopSupernode): Promise<MsgStopSupernodeResponse> => {
    const data = MsgStopSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "StopSupernode", data);
    return promise.then(data => MsgStopSupernodeResponse.decode(new BinaryReader(data)));
  };
  /* UpdateSupernode */
  updateSupernode = async (request: MsgUpdateSupernode): Promise<MsgUpdateSupernodeResponse> => {
    const data = MsgUpdateSupernode.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "UpdateSupernode", data);
    return promise.then(data => MsgUpdateSupernodeResponse.decode(new BinaryReader(data)));
  };
  /* ReportSupernodeMetrics */
  reportSupernodeMetrics = async (request: MsgReportSupernodeMetrics): Promise<MsgReportSupernodeMetricsResponse> => {
    const data = MsgReportSupernodeMetrics.encode(request).finish();
    const promise = this.rpc.request("lumera.supernode.v1.Msg", "ReportSupernodeMetrics", data);
    return promise.then(data => MsgReportSupernodeMetricsResponse.decode(new BinaryReader(data)));
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};