// @ts-nocheck
/* eslint-disable */
import * as _185 from "./action/action_state";
import * as _186 from "./action/action_type";
import * as _187 from "./action/action";
import * as _188 from "./action/genesis";
import * as _189 from "./action/metadata";
import * as _190 from "./action/params";
import * as _191 from "./action/query";
import * as _192 from "./action/tx";
import * as _193 from "./claim/claim_record";
import * as _194 from "./claim/genesis";
import * as _195 from "./claim/params";
import * as _196 from "./claim/query";
import * as _197 from "./claim/tx";
import * as _198 from "./lumeraid/genesis";
import * as _199 from "./lumeraid/handshake_info";
import * as _200 from "./lumeraid/params";
import * as _201 from "./lumeraid/query";
import * as _202 from "./lumeraid/tx";
import * as _203 from "./supernode/evidence";
import * as _204 from "./supernode/genesis";
import * as _205 from "./supernode/ip_address_history";
import * as _206 from "./supernode/metrics_aggregate";
import * as _207 from "./supernode/params";
import * as _208 from "./supernode/query";
import * as _209 from "./supernode/super_node";
import * as _210 from "./supernode/supernode_account_history";
import * as _211 from "./supernode/supernode_state";
import * as _212 from "./supernode/tx";
import * as _363 from "./action/tx.amino";
import * as _364 from "./claim/tx.amino";
import * as _365 from "./lumeraid/tx.amino";
import * as _366 from "./supernode/tx.amino";
import * as _367 from "./action/tx.registry";
import * as _368 from "./claim/tx.registry";
import * as _369 from "./lumeraid/tx.registry";
import * as _370 from "./supernode/tx.registry";
import * as _371 from "./action/query.rpc.func";
import * as _372 from "./claim/query.rpc.func";
import * as _373 from "./lumeraid/query.rpc.func";
import * as _374 from "./supernode/query.rpc.func";
import * as _375 from "./action/query.rpc.Query";
import * as _376 from "./claim/query.rpc.Query";
import * as _377 from "./lumeraid/query.rpc.Query";
import * as _378 from "./supernode/query.rpc.Query";
import * as _379 from "./action/tx.rpc.func";
import * as _380 from "./claim/tx.rpc.func";
import * as _381 from "./lumeraid/tx.rpc.func";
import * as _382 from "./supernode/tx.rpc.func";
import * as _383 from "./action/tx.rpc.msg";
import * as _384 from "./claim/tx.rpc.msg";
import * as _385 from "./lumeraid/tx.rpc.msg";
import * as _386 from "./supernode/tx.rpc.msg";
import * as _389 from "./rpc.query";
import * as _390 from "./rpc.tx";
export namespace lumera {
  export const action = {
    ..._185,
    ..._186,
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._192,
    ..._363,
    ..._367,
    ..._371,
    ..._375,
    ..._379,
    ..._383
  };
  export const claim = {
    ..._193,
    ..._194,
    ..._195,
    ..._196,
    ..._197,
    ..._364,
    ..._368,
    ..._372,
    ..._376,
    ..._380,
    ..._384
  };
  export const lumeraid = {
    ..._198,
    ..._199,
    ..._200,
    ..._201,
    ..._202,
    ..._365,
    ..._369,
    ..._373,
    ..._377,
    ..._381,
    ..._385
  };
  export const supernode = {
    ..._203,
    ..._204,
    ..._205,
    ..._206,
    ..._207,
    ..._208,
    ..._209,
    ..._210,
    ..._211,
    ..._212,
    ..._366,
    ..._370,
    ..._374,
    ..._378,
    ..._382,
    ..._386
  };
  export const ClientFactory = {
    ..._389,
    ..._390
  };
}