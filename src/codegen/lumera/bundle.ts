// @ts-nocheck
/* eslint-disable */
import * as _11 from "./supernode/tx";
import * as _12 from "./supernode/supernode_state";
import * as _13 from "./supernode/supernode_account_history";
import * as _14 from "./supernode/super_node";
import * as _15 from "./supernode/query";
import * as _16 from "./supernode/params";
import * as _17 from "./supernode/metrics_aggregate";
import * as _18 from "./supernode/ip_address_history";
import * as _19 from "./supernode/genesis";
import * as _20 from "./supernode/evidence";
import * as _21 from "./lumeraid/tx";
import * as _22 from "./lumeraid/query";
import * as _23 from "./lumeraid/params";
import * as _24 from "./lumeraid/handshake_info";
import * as _25 from "./lumeraid/genesis";
import * as _26 from "./claim/tx";
import * as _27 from "./claim/query";
import * as _28 from "./claim/params";
import * as _29 from "./claim/genesis";
import * as _30 from "./claim/claim_record";
import * as _31 from "./action/tx";
import * as _32 from "./action/query";
import * as _33 from "./action/params";
import * as _34 from "./action/metadata";
import * as _35 from "./action/genesis";
import * as _36 from "./action/action_type";
import * as _37 from "./action/action_state";
import * as _38 from "./action/action";
import * as _224 from "./supernode/tx.amino";
import * as _225 from "./lumeraid/tx.amino";
import * as _226 from "./claim/tx.amino";
import * as _227 from "./action/tx.amino";
import * as _228 from "./supernode/tx.registry";
import * as _229 from "./lumeraid/tx.registry";
import * as _230 from "./claim/tx.registry";
import * as _231 from "./action/tx.registry";
import * as _232 from "./supernode/query.rpc.func";
import * as _233 from "./lumeraid/query.rpc.func";
import * as _234 from "./claim/query.rpc.func";
import * as _235 from "./action/query.rpc.func";
import * as _236 from "./supernode/query.rpc.Query";
import * as _237 from "./lumeraid/query.rpc.Query";
import * as _238 from "./claim/query.rpc.Query";
import * as _239 from "./action/query.rpc.Query";
import * as _240 from "./supernode/tx.rpc.func";
import * as _241 from "./lumeraid/tx.rpc.func";
import * as _242 from "./claim/tx.rpc.func";
import * as _243 from "./action/tx.rpc.func";
import * as _244 from "./supernode/tx.rpc.msg";
import * as _245 from "./lumeraid/tx.rpc.msg";
import * as _246 from "./claim/tx.rpc.msg";
import * as _247 from "./action/tx.rpc.msg";
import * as _387 from "./rpc.query";
import * as _388 from "./rpc.tx";
export namespace lumera {
  export const supernode = {
    ..._11,
    ..._12,
    ..._13,
    ..._14,
    ..._15,
    ..._16,
    ..._17,
    ..._18,
    ..._19,
    ..._20,
    ..._224,
    ..._228,
    ..._232,
    ..._236,
    ..._240,
    ..._244
  };
  export const lumeraid = {
    ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._25,
    ..._225,
    ..._229,
    ..._233,
    ..._237,
    ..._241,
    ..._245
  };
  export const claim = {
    ..._26,
    ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._226,
    ..._230,
    ..._234,
    ..._238,
    ..._242,
    ..._246
  };
  export const action = {
    ..._31,
    ..._32,
    ..._33,
    ..._34,
    ..._35,
    ..._36,
    ..._37,
    ..._38,
    ..._227,
    ..._231,
    ..._235,
    ..._239,
    ..._243,
    ..._247
  };
  export const ClientFactory = {
    ..._387,
    ..._388
  };
}