// @ts-nocheck
/* eslint-disable */
import * as _11 from "./supernode/v1/tx";
import * as _12 from "./supernode/v1/supernode_state";
import * as _13 from "./supernode/v1/supernode_account_history";
import * as _14 from "./supernode/v1/super_node";
import * as _15 from "./supernode/v1/query";
import * as _16 from "./supernode/v1/params";
import * as _17 from "./supernode/v1/metrics_aggregate";
import * as _18 from "./supernode/v1/ip_address_history";
import * as _19 from "./supernode/v1/genesis";
import * as _20 from "./supernode/v1/evidence";
import * as _21 from "./supernode/module/v1/module";
import * as _22 from "./lumeraid/tx";
import * as _23 from "./lumeraid/query";
import * as _24 from "./lumeraid/params";
import * as _25 from "./lumeraid/handshake_info";
import * as _26 from "./lumeraid/genesis";
import * as _27 from "./claim/tx";
import * as _28 from "./claim/query";
import * as _29 from "./claim/params";
import * as _30 from "./claim/genesis";
import * as _31 from "./claim/claim_record";
import * as _32 from "./action/v1/tx";
import * as _33 from "./action/v1/query";
import * as _34 from "./action/v1/params";
import * as _35 from "./action/v1/metadata";
import * as _36 from "./action/v1/genesis";
import * as _37 from "./action/v1/action_type";
import * as _38 from "./action/v1/action_state";
import * as _39 from "./action/v1/action";
import * as _40 from "./action/module/v1/module";
import * as _211 from "./supernode/v1/tx.amino";
import * as _212 from "./lumeraid/tx.amino";
import * as _213 from "./claim/tx.amino";
import * as _214 from "./action/v1/tx.amino";
import * as _215 from "./supernode/v1/tx.registry";
import * as _216 from "./lumeraid/tx.registry";
import * as _217 from "./claim/tx.registry";
import * as _218 from "./action/v1/tx.registry";
import * as _219 from "./supernode/v1/query.rpc.func";
import * as _220 from "./lumeraid/query.rpc.func";
import * as _221 from "./claim/query.rpc.func";
import * as _222 from "./action/v1/query.rpc.func";
import * as _223 from "./supernode/v1/query.rpc.Query";
import * as _224 from "./lumeraid/query.rpc.Query";
import * as _225 from "./claim/query.rpc.Query";
import * as _226 from "./action/v1/query.rpc.Query";
import * as _227 from "./supernode/v1/tx.rpc.func";
import * as _228 from "./lumeraid/tx.rpc.func";
import * as _229 from "./claim/tx.rpc.func";
import * as _230 from "./action/v1/tx.rpc.func";
import * as _231 from "./supernode/v1/tx.rpc.msg";
import * as _232 from "./lumeraid/tx.rpc.msg";
import * as _233 from "./claim/tx.rpc.msg";
import * as _234 from "./action/v1/tx.rpc.msg";
import * as _356 from "./rpc.query";
import * as _357 from "./rpc.tx";
export namespace lumera {
  export namespace supernode {
    export const v1 = {
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
      ..._211,
      ..._215,
      ..._219,
      ..._223,
      ..._227,
      ..._231
    };
    export namespace module {
      export const v1 = {
        ..._21
      };
    }
  }
  export const lumeraid = {
    ..._22,
    ..._23,
    ..._24,
    ..._25,
    ..._26,
    ..._212,
    ..._216,
    ..._220,
    ..._224,
    ..._228,
    ..._232
  };
  export const claim = {
    ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._31,
    ..._213,
    ..._217,
    ..._221,
    ..._225,
    ..._229,
    ..._233
  };
  export namespace action {
    export const v1 = {
      ..._32,
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._39,
      ..._214,
      ..._218,
      ..._222,
      ..._226,
      ..._230,
      ..._234
    };
    export namespace module {
      export const v1 = {
        ..._40
      };
    }
  }
  export const ClientFactory = {
    ..._356,
    ..._357
  };
}