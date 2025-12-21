// @ts-nocheck
/* eslint-disable */
import * as _11 from "./supernode/v1/tx";
import * as _12 from "./supernode/v1/supernode_state";
import * as _13 from "./supernode/v1/supernode_account_history";
import * as _14 from "./supernode/v1/super_node";
import * as _15 from "./supernode/v1/query";
import * as _16 from "./supernode/v1/params";
import * as _17 from "./supernode/v1/metrics_aggregate";
import * as _18 from "./supernode/v1/metrics";
import * as _19 from "./supernode/v1/ip_address_history";
import * as _20 from "./supernode/v1/genesis";
import * as _21 from "./supernode/v1/evidence";
import * as _22 from "./supernode/module/v1/module";
import * as _23 from "./lumeraid/tx";
import * as _24 from "./lumeraid/query";
import * as _25 from "./lumeraid/params";
import * as _26 from "./lumeraid/handshake_info";
import * as _27 from "./lumeraid/genesis";
import * as _28 from "./claim/tx";
import * as _29 from "./claim/query";
import * as _30 from "./claim/params";
import * as _31 from "./claim/genesis";
import * as _32 from "./claim/claim_record";
import * as _33 from "./action/v1/tx";
import * as _34 from "./action/v1/query";
import * as _35 from "./action/v1/params";
import * as _36 from "./action/v1/metadata";
import * as _37 from "./action/v1/genesis";
import * as _38 from "./action/v1/action_type";
import * as _39 from "./action/v1/action_state";
import * as _40 from "./action/v1/action";
import * as _41 from "./action/module/v1/module";
import * as _217 from "./supernode/v1/tx.amino";
import * as _218 from "./lumeraid/tx.amino";
import * as _219 from "./claim/tx.amino";
import * as _220 from "./action/v1/tx.amino";
import * as _221 from "./supernode/v1/tx.registry";
import * as _222 from "./lumeraid/tx.registry";
import * as _223 from "./claim/tx.registry";
import * as _224 from "./action/v1/tx.registry";
import * as _225 from "./supernode/v1/query.rpc.func";
import * as _226 from "./lumeraid/query.rpc.func";
import * as _227 from "./claim/query.rpc.func";
import * as _228 from "./action/v1/query.rpc.func";
import * as _229 from "./supernode/v1/query.rpc.Query";
import * as _230 from "./lumeraid/query.rpc.Query";
import * as _231 from "./claim/query.rpc.Query";
import * as _232 from "./action/v1/query.rpc.Query";
import * as _233 from "./supernode/v1/tx.rpc.func";
import * as _234 from "./lumeraid/tx.rpc.func";
import * as _235 from "./claim/tx.rpc.func";
import * as _236 from "./action/v1/tx.rpc.func";
import * as _237 from "./supernode/v1/tx.rpc.msg";
import * as _238 from "./lumeraid/tx.rpc.msg";
import * as _239 from "./claim/tx.rpc.msg";
import * as _240 from "./action/v1/tx.rpc.msg";
import * as _362 from "./rpc.query";
import * as _363 from "./rpc.tx";
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
      ..._21,
      ..._217,
      ..._221,
      ..._225,
      ..._229,
      ..._233,
      ..._237
    };
    export namespace module {
      export const v1 = {
        ..._22
      };
    }
  }
  export const lumeraid = {
    ..._23,
    ..._24,
    ..._25,
    ..._26,
    ..._27,
    ..._218,
    ..._222,
    ..._226,
    ..._230,
    ..._234,
    ..._238
  };
  export const claim = {
    ..._28,
    ..._29,
    ..._30,
    ..._31,
    ..._32,
    ..._219,
    ..._223,
    ..._227,
    ..._231,
    ..._235,
    ..._239
  };
  export namespace action {
    export const v1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._39,
      ..._40,
      ..._220,
      ..._224,
      ..._228,
      ..._232,
      ..._236,
      ..._240
    };
    export namespace module {
      export const v1 = {
        ..._41
      };
    }
  }
  export const ClientFactory = {
    ..._362,
    ..._363
  };
}