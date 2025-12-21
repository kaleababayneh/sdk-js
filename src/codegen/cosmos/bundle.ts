// @ts-nocheck
/* eslint-disable */
import * as _88 from "./vesting/v1beta1/vesting";
import * as _89 from "./vesting/v1beta1/tx";
import * as _90 from "./vesting/module/v1/module";
import * as _91 from "./upgrade/v1beta1/upgrade";
import * as _92 from "./upgrade/v1beta1/tx";
import * as _93 from "./upgrade/v1beta1/query";
import * as _94 from "./upgrade/module/v1/module";
import * as _95 from "./tx/v1beta1/tx";
import * as _96 from "./tx/v1beta1/service";
import * as _97 from "./tx/signing/v1beta1/signing";
import * as _98 from "./tx/config/v1/config";
import * as _99 from "./store/v1beta1/listening";
import * as _100 from "./store/v1beta1/commit_info";
import * as _101 from "./store/streaming/abci/grpc";
import * as _102 from "./store/snapshots/v1/snapshot";
import * as _103 from "./store/internal/kv/v1beta1/kv";
import * as _104 from "./staking/v1beta1/tx";
import * as _105 from "./staking/v1beta1/staking";
import * as _106 from "./staking/v1beta1/query";
import * as _107 from "./staking/v1beta1/genesis";
import * as _108 from "./staking/v1beta1/authz";
import * as _109 from "./staking/module/v1/module";
import * as _110 from "./slashing/v1beta1/tx";
import * as _111 from "./slashing/v1beta1/slashing";
import * as _112 from "./slashing/v1beta1/query";
import * as _113 from "./slashing/v1beta1/genesis";
import * as _114 from "./slashing/module/v1/module";
import * as _115 from "./reflection/v1/reflection";
import * as _116 from "./query/v1/query";
import * as _117 from "./params/v1beta1/query";
import * as _118 from "./params/v1beta1/params";
import * as _119 from "./params/module/v1/module";
import * as _120 from "./orm/v1alpha1/schema";
import * as _121 from "./orm/v1/orm";
import * as _122 from "./orm/query/v1alpha1/query";
import * as _123 from "./orm/module/v1alpha1/module";
import * as _124 from "./nft/v1beta1/tx";
import * as _125 from "./nft/v1beta1/query";
import * as _126 from "./nft/v1beta1/nft";
import * as _127 from "./nft/v1beta1/genesis";
import * as _128 from "./nft/v1beta1/event";
import * as _129 from "./nft/module/v1/module";
import * as _130 from "./msg/v1/msg";
import * as _131 from "./msg/textual/v1/textual";
import * as _132 from "./mint/v1beta1/tx";
import * as _133 from "./mint/v1beta1/query";
import * as _134 from "./mint/v1beta1/mint";
import * as _135 from "./mint/v1beta1/genesis";
import * as _136 from "./mint/module/v1/module";
import * as _137 from "./group/v1/types";
import * as _138 from "./group/v1/tx";
import * as _139 from "./group/v1/query";
import * as _140 from "./group/v1/genesis";
import * as _141 from "./group/v1/events";
import * as _142 from "./group/module/v1/module";
import * as _143 from "./gov/v1beta1/tx";
import * as _144 from "./gov/v1beta1/query";
import * as _145 from "./gov/v1beta1/gov";
import * as _146 from "./gov/v1beta1/genesis";
import * as _147 from "./gov/v1/tx";
import * as _148 from "./gov/v1/query";
import * as _149 from "./gov/v1/gov";
import * as _150 from "./gov/v1/genesis";
import * as _151 from "./gov/module/v1/module";
import * as _152 from "./genutil/v1beta1/genesis";
import * as _153 from "./genutil/module/v1/module";
import * as _154 from "./feegrant/v1beta1/tx";
import * as _155 from "./feegrant/v1beta1/query";
import * as _156 from "./feegrant/v1beta1/genesis";
import * as _157 from "./feegrant/v1beta1/feegrant";
import * as _158 from "./feegrant/module/v1/module";
import * as _159 from "./evidence/v1beta1/tx";
import * as _160 from "./evidence/v1beta1/query";
import * as _161 from "./evidence/v1beta1/genesis";
import * as _162 from "./evidence/v1beta1/evidence";
import * as _163 from "./evidence/module/v1/module";
import * as _164 from "./distribution/v1beta1/tx";
import * as _165 from "./distribution/v1beta1/query";
import * as _166 from "./distribution/v1beta1/genesis";
import * as _167 from "./distribution/v1beta1/distribution";
import * as _168 from "./distribution/module/v1/module";
import * as _169 from "./crypto/secp256r1/keys";
import * as _170 from "./crypto/secp256k1/keys";
import * as _171 from "./crypto/multisig/keys";
import * as _172 from "./crypto/keyring/v1/record";
import * as _173 from "./crypto/hd/v1/hd";
import * as _174 from "./crypto/ed25519/keys";
import * as _175 from "./crisis/v1beta1/tx";
import * as _176 from "./crisis/v1beta1/genesis";
import * as _177 from "./crisis/module/v1/module";
import * as _178 from "./consensus/v1/tx";
import * as _179 from "./consensus/v1/query";
import * as _180 from "./consensus/module/v1/module";
import * as _181 from "./circuit/v1/types";
import * as _182 from "./circuit/v1/tx";
import * as _183 from "./circuit/v1/query";
import * as _184 from "./circuit/module/v1/module";
import * as _185 from "./base/v1beta1/coin";
import * as _186 from "./base/tendermint/v1beta1/types";
import * as _187 from "./base/tendermint/v1beta1/query";
import * as _188 from "./base/reflection/v2alpha1/reflection";
import * as _189 from "./base/reflection/v1beta1/reflection";
import * as _190 from "./base/query/v1beta1/pagination";
import * as _191 from "./base/node/v1beta1/query";
import * as _192 from "./base/abci/v1beta1/abci";
import * as _193 from "./bank/v1beta1/tx";
import * as _194 from "./bank/v1beta1/query";
import * as _195 from "./bank/v1beta1/genesis";
import * as _196 from "./bank/v1beta1/bank";
import * as _197 from "./bank/v1beta1/authz";
import * as _198 from "./bank/module/v1/module";
import * as _199 from "./autocli/v1/query";
import * as _200 from "./autocli/v1/options";
import * as _201 from "./authz/v1beta1/tx";
import * as _202 from "./authz/v1beta1/query";
import * as _203 from "./authz/v1beta1/genesis";
import * as _204 from "./authz/v1beta1/event";
import * as _205 from "./authz/v1beta1/authz";
import * as _206 from "./authz/module/v1/module";
import * as _207 from "./auth/v1beta1/tx";
import * as _208 from "./auth/v1beta1/query";
import * as _209 from "./auth/v1beta1/genesis";
import * as _210 from "./auth/v1beta1/auth";
import * as _211 from "./auth/module/v1/module";
import * as _212 from "./app/v1alpha1/query";
import * as _213 from "./app/v1alpha1/module";
import * as _214 from "./app/v1alpha1/config";
import * as _215 from "./app/runtime/v1alpha1/module";
import * as _241 from "./vesting/v1beta1/tx.amino";
import * as _242 from "./upgrade/v1beta1/tx.amino";
import * as _243 from "./staking/v1beta1/tx.amino";
import * as _244 from "./slashing/v1beta1/tx.amino";
import * as _245 from "./nft/v1beta1/tx.amino";
import * as _246 from "./mint/v1beta1/tx.amino";
import * as _247 from "./group/v1/tx.amino";
import * as _248 from "./gov/v1beta1/tx.amino";
import * as _249 from "./gov/v1/tx.amino";
import * as _250 from "./feegrant/v1beta1/tx.amino";
import * as _251 from "./evidence/v1beta1/tx.amino";
import * as _252 from "./distribution/v1beta1/tx.amino";
import * as _253 from "./crisis/v1beta1/tx.amino";
import * as _254 from "./consensus/v1/tx.amino";
import * as _255 from "./circuit/v1/tx.amino";
import * as _256 from "./bank/v1beta1/tx.amino";
import * as _257 from "./authz/v1beta1/tx.amino";
import * as _258 from "./auth/v1beta1/tx.amino";
import * as _259 from "./vesting/v1beta1/tx.registry";
import * as _260 from "./upgrade/v1beta1/tx.registry";
import * as _261 from "./staking/v1beta1/tx.registry";
import * as _262 from "./slashing/v1beta1/tx.registry";
import * as _263 from "./nft/v1beta1/tx.registry";
import * as _264 from "./mint/v1beta1/tx.registry";
import * as _265 from "./group/v1/tx.registry";
import * as _266 from "./gov/v1beta1/tx.registry";
import * as _267 from "./gov/v1/tx.registry";
import * as _268 from "./feegrant/v1beta1/tx.registry";
import * as _269 from "./evidence/v1beta1/tx.registry";
import * as _270 from "./distribution/v1beta1/tx.registry";
import * as _271 from "./crisis/v1beta1/tx.registry";
import * as _272 from "./consensus/v1/tx.registry";
import * as _273 from "./circuit/v1/tx.registry";
import * as _274 from "./bank/v1beta1/tx.registry";
import * as _275 from "./authz/v1beta1/tx.registry";
import * as _276 from "./auth/v1beta1/tx.registry";
import * as _277 from "./upgrade/v1beta1/query.rpc.func";
import * as _278 from "./tx/v1beta1/service.rpc.func";
import * as _279 from "./staking/v1beta1/query.rpc.func";
import * as _280 from "./slashing/v1beta1/query.rpc.func";
import * as _281 from "./reflection/v1/reflection.rpc.func";
import * as _282 from "./params/v1beta1/query.rpc.func";
import * as _283 from "./orm/query/v1alpha1/query.rpc.func";
import * as _284 from "./nft/v1beta1/query.rpc.func";
import * as _285 from "./mint/v1beta1/query.rpc.func";
import * as _286 from "./group/v1/query.rpc.func";
import * as _287 from "./gov/v1beta1/query.rpc.func";
import * as _288 from "./gov/v1/query.rpc.func";
import * as _289 from "./feegrant/v1beta1/query.rpc.func";
import * as _290 from "./evidence/v1beta1/query.rpc.func";
import * as _291 from "./distribution/v1beta1/query.rpc.func";
import * as _292 from "./consensus/v1/query.rpc.func";
import * as _293 from "./circuit/v1/query.rpc.func";
import * as _294 from "./base/tendermint/v1beta1/query.rpc.func";
import * as _295 from "./base/reflection/v2alpha1/reflection.rpc.func";
import * as _296 from "./base/reflection/v1beta1/reflection.rpc.func";
import * as _297 from "./base/node/v1beta1/query.rpc.func";
import * as _298 from "./bank/v1beta1/query.rpc.func";
import * as _299 from "./autocli/v1/query.rpc.func";
import * as _300 from "./authz/v1beta1/query.rpc.func";
import * as _301 from "./auth/v1beta1/query.rpc.func";
import * as _302 from "./app/v1alpha1/query.rpc.func";
import * as _303 from "./upgrade/v1beta1/query.rpc.Query";
import * as _304 from "./tx/v1beta1/service.rpc.Service";
import * as _305 from "./staking/v1beta1/query.rpc.Query";
import * as _306 from "./slashing/v1beta1/query.rpc.Query";
import * as _307 from "./params/v1beta1/query.rpc.Query";
import * as _308 from "./orm/query/v1alpha1/query.rpc.Query";
import * as _309 from "./nft/v1beta1/query.rpc.Query";
import * as _310 from "./mint/v1beta1/query.rpc.Query";
import * as _311 from "./group/v1/query.rpc.Query";
import * as _312 from "./gov/v1beta1/query.rpc.Query";
import * as _313 from "./gov/v1/query.rpc.Query";
import * as _314 from "./feegrant/v1beta1/query.rpc.Query";
import * as _315 from "./evidence/v1beta1/query.rpc.Query";
import * as _316 from "./distribution/v1beta1/query.rpc.Query";
import * as _317 from "./consensus/v1/query.rpc.Query";
import * as _318 from "./circuit/v1/query.rpc.Query";
import * as _319 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _320 from "./base/node/v1beta1/query.rpc.Service";
import * as _321 from "./bank/v1beta1/query.rpc.Query";
import * as _322 from "./autocli/v1/query.rpc.Query";
import * as _323 from "./authz/v1beta1/query.rpc.Query";
import * as _324 from "./auth/v1beta1/query.rpc.Query";
import * as _325 from "./app/v1alpha1/query.rpc.Query";
import * as _326 from "./vesting/v1beta1/tx.rpc.func";
import * as _327 from "./upgrade/v1beta1/tx.rpc.func";
import * as _328 from "./staking/v1beta1/tx.rpc.func";
import * as _329 from "./slashing/v1beta1/tx.rpc.func";
import * as _330 from "./nft/v1beta1/tx.rpc.func";
import * as _331 from "./mint/v1beta1/tx.rpc.func";
import * as _332 from "./group/v1/tx.rpc.func";
import * as _333 from "./gov/v1beta1/tx.rpc.func";
import * as _334 from "./gov/v1/tx.rpc.func";
import * as _335 from "./feegrant/v1beta1/tx.rpc.func";
import * as _336 from "./evidence/v1beta1/tx.rpc.func";
import * as _337 from "./distribution/v1beta1/tx.rpc.func";
import * as _338 from "./crisis/v1beta1/tx.rpc.func";
import * as _339 from "./consensus/v1/tx.rpc.func";
import * as _340 from "./circuit/v1/tx.rpc.func";
import * as _341 from "./bank/v1beta1/tx.rpc.func";
import * as _342 from "./authz/v1beta1/tx.rpc.func";
import * as _343 from "./auth/v1beta1/tx.rpc.func";
import * as _344 from "./vesting/v1beta1/tx.rpc.msg";
import * as _345 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _346 from "./staking/v1beta1/tx.rpc.msg";
import * as _347 from "./slashing/v1beta1/tx.rpc.msg";
import * as _348 from "./nft/v1beta1/tx.rpc.msg";
import * as _349 from "./mint/v1beta1/tx.rpc.msg";
import * as _350 from "./group/v1/tx.rpc.msg";
import * as _351 from "./gov/v1beta1/tx.rpc.msg";
import * as _352 from "./gov/v1/tx.rpc.msg";
import * as _353 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _354 from "./evidence/v1beta1/tx.rpc.msg";
import * as _355 from "./distribution/v1beta1/tx.rpc.msg";
import * as _356 from "./crisis/v1beta1/tx.rpc.msg";
import * as _357 from "./consensus/v1/tx.rpc.msg";
import * as _358 from "./circuit/v1/tx.rpc.msg";
import * as _359 from "./bank/v1beta1/tx.rpc.msg";
import * as _360 from "./authz/v1beta1/tx.rpc.msg";
import * as _361 from "./auth/v1beta1/tx.rpc.msg";
import * as _364 from "./rpc.query";
import * as _365 from "./rpc.tx";
export namespace cosmos {
  export namespace vesting {
    export const v1beta1 = {
      ..._88,
      ..._89,
      ..._241,
      ..._259,
      ..._326,
      ..._344
    };
    export namespace module {
      export const v1 = {
        ..._90
      };
    }
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._91,
      ..._92,
      ..._93,
      ..._242,
      ..._260,
      ..._277,
      ..._303,
      ..._327,
      ..._345
    };
    export namespace module {
      export const v1 = {
        ..._94
      };
    }
  }
  export namespace tx {
    export const v1beta1 = {
      ..._95,
      ..._96,
      ..._278,
      ..._304
    };
    export namespace signing {
      export const v1beta1 = {
        ..._97
      };
    }
    export namespace config {
      export const v1 = {
        ..._98
      };
    }
  }
  export namespace store {
    export const v1beta1 = {
      ..._99,
      ..._100
    };
    export namespace streaming {
      export const abci = {
        ..._101
      };
    }
    export namespace snapshots {
      export const v1 = {
        ..._102
      };
    }
    export namespace internal {
      export namespace kv {
        export const v1beta1 = {
          ..._103
        };
      }
    }
  }
  export namespace staking {
    export const v1beta1 = {
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._243,
      ..._261,
      ..._279,
      ..._305,
      ..._328,
      ..._346
    };
    export namespace module {
      export const v1 = {
        ..._109
      };
    }
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._244,
      ..._262,
      ..._280,
      ..._306,
      ..._329,
      ..._347
    };
    export namespace module {
      export const v1 = {
        ..._114
      };
    }
  }
  export namespace reflection {
    export const v1 = {
      ..._115,
      ..._281
    };
  }
  export namespace query {
    export const v1 = {
      ..._116
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._117,
      ..._118,
      ..._282,
      ..._307
    };
    export namespace module {
      export const v1 = {
        ..._119
      };
    }
  }
  export namespace orm {
    export const v1alpha1 = {
      ..._120
    };
    export const v1 = {
      ..._121
    };
    export namespace query {
      export const v1alpha1 = {
        ..._122,
        ..._283,
        ..._308
      };
    }
    export namespace module {
      export const v1alpha1 = {
        ..._123
      };
    }
  }
  export namespace nft {
    export const v1beta1 = {
      ..._124,
      ..._125,
      ..._126,
      ..._127,
      ..._128,
      ..._245,
      ..._263,
      ..._284,
      ..._309,
      ..._330,
      ..._348
    };
    export namespace module {
      export const v1 = {
        ..._129
      };
    }
  }
  export namespace msg {
    export const v1 = {
      ..._130
    };
    export namespace textual {
      export const v1 = {
        ..._131
      };
    }
  }
  export namespace mint {
    export const v1beta1 = {
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._246,
      ..._264,
      ..._285,
      ..._310,
      ..._331,
      ..._349
    };
    export namespace module {
      export const v1 = {
        ..._136
      };
    }
  }
  export namespace group {
    export const v1 = {
      ..._137,
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._247,
      ..._265,
      ..._286,
      ..._311,
      ..._332,
      ..._350
    };
    export namespace module {
      export const v1 = {
        ..._142
      };
    }
  }
  export namespace gov {
    export const v1beta1 = {
      ..._143,
      ..._144,
      ..._145,
      ..._146,
      ..._248,
      ..._266,
      ..._287,
      ..._312,
      ..._333,
      ..._351
    };
    export const v1 = {
      ..._147,
      ..._148,
      ..._149,
      ..._150,
      ..._249,
      ..._267,
      ..._288,
      ..._313,
      ..._334,
      ..._352
    };
    export namespace module {
      export const v1 = {
        ..._151
      };
    }
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._152
    };
    export namespace module {
      export const v1 = {
        ..._153
      };
    }
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._250,
      ..._268,
      ..._289,
      ..._314,
      ..._335,
      ..._353
    };
    export namespace module {
      export const v1 = {
        ..._158
      };
    }
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._159,
      ..._160,
      ..._161,
      ..._162,
      ..._251,
      ..._269,
      ..._290,
      ..._315,
      ..._336,
      ..._354
    };
    export namespace module {
      export const v1 = {
        ..._163
      };
    }
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._164,
      ..._165,
      ..._166,
      ..._167,
      ..._252,
      ..._270,
      ..._291,
      ..._316,
      ..._337,
      ..._355
    };
    export namespace module {
      export const v1 = {
        ..._168
      };
    }
  }
  export namespace crypto {
    export const secp256r1 = {
      ..._169
    };
    export const secp256k1 = {
      ..._170
    };
    export const multisig = {
      ..._171
    };
    export namespace keyring {
      export const v1 = {
        ..._172
      };
    }
    export namespace hd {
      export const v1 = {
        ..._173
      };
    }
    export const ed25519 = {
      ..._174
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._175,
      ..._176,
      ..._253,
      ..._271,
      ..._338,
      ..._356
    };
    export namespace module {
      export const v1 = {
        ..._177
      };
    }
  }
  export namespace consensus {
    export const v1 = {
      ..._178,
      ..._179,
      ..._254,
      ..._272,
      ..._292,
      ..._317,
      ..._339,
      ..._357
    };
    export namespace module {
      export const v1 = {
        ..._180
      };
    }
  }
  export namespace circuit {
    export const v1 = {
      ..._181,
      ..._182,
      ..._183,
      ..._255,
      ..._273,
      ..._293,
      ..._318,
      ..._340,
      ..._358
    };
    export namespace module {
      export const v1 = {
        ..._184
      };
    }
  }
  export namespace base {
    export const v1beta1 = {
      ..._185
    };
    export namespace tendermint {
      export const v1beta1 = {
        ..._186,
        ..._187,
        ..._294,
        ..._319
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._188,
        ..._295
      };
      export const v1beta1 = {
        ..._189,
        ..._296
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._190
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._191,
        ..._297,
        ..._320
      };
    }
    export namespace abci {
      export const v1beta1 = {
        ..._192
      };
    }
  }
  export namespace bank {
    export const v1beta1 = {
      ..._193,
      ..._194,
      ..._195,
      ..._196,
      ..._197,
      ..._256,
      ..._274,
      ..._298,
      ..._321,
      ..._341,
      ..._359
    };
    export namespace module {
      export const v1 = {
        ..._198
      };
    }
  }
  export namespace autocli {
    export const v1 = {
      ..._199,
      ..._200,
      ..._299,
      ..._322
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._205,
      ..._257,
      ..._275,
      ..._300,
      ..._323,
      ..._342,
      ..._360
    };
    export namespace module {
      export const v1 = {
        ..._206
      };
    }
  }
  export namespace auth {
    export const v1beta1 = {
      ..._207,
      ..._208,
      ..._209,
      ..._210,
      ..._258,
      ..._276,
      ..._301,
      ..._324,
      ..._343,
      ..._361
    };
    export namespace module {
      export const v1 = {
        ..._211
      };
    }
  }
  export namespace app {
    export const v1alpha1 = {
      ..._212,
      ..._213,
      ..._214,
      ..._302,
      ..._325
    };
    export namespace runtime {
      export const v1alpha1 = {
        ..._215
      };
    }
  }
  export const ClientFactory = {
    ..._364,
    ..._365
  };
}