// @ts-nocheck
/* eslint-disable */
import * as _82 from "./vesting/v1beta1/vesting";
import * as _83 from "./vesting/v1beta1/tx";
import * as _84 from "./vesting/module/v1/module";
import * as _85 from "./upgrade/v1beta1/upgrade";
import * as _86 from "./upgrade/v1beta1/tx";
import * as _87 from "./upgrade/v1beta1/query";
import * as _88 from "./upgrade/module/v1/module";
import * as _89 from "./tx/v1beta1/tx";
import * as _90 from "./tx/v1beta1/service";
import * as _91 from "./tx/signing/v1beta1/signing";
import * as _92 from "./tx/config/v1/config";
import * as _93 from "./store/v1beta1/listening";
import * as _94 from "./store/v1beta1/commit_info";
import * as _95 from "./store/streaming/abci/grpc";
import * as _96 from "./store/snapshots/v1/snapshot";
import * as _97 from "./store/internal/kv/v1beta1/kv";
import * as _98 from "./staking/v1beta1/tx";
import * as _99 from "./staking/v1beta1/staking";
import * as _100 from "./staking/v1beta1/query";
import * as _101 from "./staking/v1beta1/genesis";
import * as _102 from "./staking/v1beta1/authz";
import * as _103 from "./staking/module/v1/module";
import * as _104 from "./slashing/v1beta1/tx";
import * as _105 from "./slashing/v1beta1/slashing";
import * as _106 from "./slashing/v1beta1/query";
import * as _107 from "./slashing/v1beta1/genesis";
import * as _108 from "./slashing/module/v1/module";
import * as _109 from "./reflection/v1/reflection";
import * as _110 from "./query/v1/query";
import * as _111 from "./params/v1beta1/query";
import * as _112 from "./params/v1beta1/params";
import * as _113 from "./params/module/v1/module";
import * as _114 from "./orm/v1alpha1/schema";
import * as _115 from "./orm/v1/orm";
import * as _116 from "./orm/query/v1alpha1/query";
import * as _117 from "./orm/module/v1alpha1/module";
import * as _118 from "./nft/v1beta1/tx";
import * as _119 from "./nft/v1beta1/query";
import * as _120 from "./nft/v1beta1/nft";
import * as _121 from "./nft/v1beta1/genesis";
import * as _122 from "./nft/v1beta1/event";
import * as _123 from "./nft/module/v1/module";
import * as _124 from "./msg/v1/msg";
import * as _125 from "./msg/textual/v1/textual";
import * as _126 from "./mint/v1beta1/tx";
import * as _127 from "./mint/v1beta1/query";
import * as _128 from "./mint/v1beta1/mint";
import * as _129 from "./mint/v1beta1/genesis";
import * as _130 from "./mint/module/v1/module";
import * as _131 from "./group/v1/types";
import * as _132 from "./group/v1/tx";
import * as _133 from "./group/v1/query";
import * as _134 from "./group/v1/genesis";
import * as _135 from "./group/v1/events";
import * as _136 from "./group/module/v1/module";
import * as _137 from "./gov/v1beta1/tx";
import * as _138 from "./gov/v1beta1/query";
import * as _139 from "./gov/v1beta1/gov";
import * as _140 from "./gov/v1beta1/genesis";
import * as _141 from "./gov/v1/tx";
import * as _142 from "./gov/v1/query";
import * as _143 from "./gov/v1/gov";
import * as _144 from "./gov/v1/genesis";
import * as _145 from "./gov/module/v1/module";
import * as _146 from "./genutil/v1beta1/genesis";
import * as _147 from "./genutil/module/v1/module";
import * as _148 from "./feegrant/v1beta1/tx";
import * as _149 from "./feegrant/v1beta1/query";
import * as _150 from "./feegrant/v1beta1/genesis";
import * as _151 from "./feegrant/v1beta1/feegrant";
import * as _152 from "./feegrant/module/v1/module";
import * as _153 from "./evidence/v1beta1/tx";
import * as _154 from "./evidence/v1beta1/query";
import * as _155 from "./evidence/v1beta1/genesis";
import * as _156 from "./evidence/v1beta1/evidence";
import * as _157 from "./evidence/module/v1/module";
import * as _158 from "./distribution/v1beta1/tx";
import * as _159 from "./distribution/v1beta1/query";
import * as _160 from "./distribution/v1beta1/genesis";
import * as _161 from "./distribution/v1beta1/distribution";
import * as _162 from "./distribution/module/v1/module";
import * as _163 from "./crypto/secp256r1/keys";
import * as _164 from "./crypto/secp256k1/keys";
import * as _165 from "./crypto/multisig/keys";
import * as _166 from "./crypto/keyring/v1/record";
import * as _167 from "./crypto/hd/v1/hd";
import * as _168 from "./crypto/ed25519/keys";
import * as _169 from "./crisis/v1beta1/tx";
import * as _170 from "./crisis/v1beta1/genesis";
import * as _171 from "./crisis/module/v1/module";
import * as _172 from "./consensus/v1/tx";
import * as _173 from "./consensus/v1/query";
import * as _174 from "./consensus/module/v1/module";
import * as _175 from "./circuit/v1/types";
import * as _176 from "./circuit/v1/tx";
import * as _177 from "./circuit/v1/query";
import * as _178 from "./circuit/module/v1/module";
import * as _179 from "./base/v1beta1/coin";
import * as _180 from "./base/tendermint/v1beta1/types";
import * as _181 from "./base/tendermint/v1beta1/query";
import * as _182 from "./base/reflection/v2alpha1/reflection";
import * as _183 from "./base/reflection/v1beta1/reflection";
import * as _184 from "./base/query/v1beta1/pagination";
import * as _185 from "./base/node/v1beta1/query";
import * as _186 from "./base/abci/v1beta1/abci";
import * as _187 from "./bank/v1beta1/tx";
import * as _188 from "./bank/v1beta1/query";
import * as _189 from "./bank/v1beta1/genesis";
import * as _190 from "./bank/v1beta1/bank";
import * as _191 from "./bank/v1beta1/authz";
import * as _192 from "./bank/module/v1/module";
import * as _193 from "./autocli/v1/query";
import * as _194 from "./autocli/v1/options";
import * as _195 from "./authz/v1beta1/tx";
import * as _196 from "./authz/v1beta1/query";
import * as _197 from "./authz/v1beta1/genesis";
import * as _198 from "./authz/v1beta1/event";
import * as _199 from "./authz/v1beta1/authz";
import * as _200 from "./authz/module/v1/module";
import * as _201 from "./auth/v1beta1/tx";
import * as _202 from "./auth/v1beta1/query";
import * as _203 from "./auth/v1beta1/genesis";
import * as _204 from "./auth/v1beta1/auth";
import * as _205 from "./auth/module/v1/module";
import * as _206 from "./app/v1alpha1/query";
import * as _207 from "./app/v1alpha1/module";
import * as _208 from "./app/v1alpha1/config";
import * as _209 from "./app/runtime/v1alpha1/module";
import * as _235 from "./vesting/v1beta1/tx.amino";
import * as _236 from "./upgrade/v1beta1/tx.amino";
import * as _237 from "./staking/v1beta1/tx.amino";
import * as _238 from "./slashing/v1beta1/tx.amino";
import * as _239 from "./nft/v1beta1/tx.amino";
import * as _240 from "./mint/v1beta1/tx.amino";
import * as _241 from "./group/v1/tx.amino";
import * as _242 from "./gov/v1beta1/tx.amino";
import * as _243 from "./gov/v1/tx.amino";
import * as _244 from "./feegrant/v1beta1/tx.amino";
import * as _245 from "./evidence/v1beta1/tx.amino";
import * as _246 from "./distribution/v1beta1/tx.amino";
import * as _247 from "./crisis/v1beta1/tx.amino";
import * as _248 from "./consensus/v1/tx.amino";
import * as _249 from "./circuit/v1/tx.amino";
import * as _250 from "./bank/v1beta1/tx.amino";
import * as _251 from "./authz/v1beta1/tx.amino";
import * as _252 from "./auth/v1beta1/tx.amino";
import * as _253 from "./vesting/v1beta1/tx.registry";
import * as _254 from "./upgrade/v1beta1/tx.registry";
import * as _255 from "./staking/v1beta1/tx.registry";
import * as _256 from "./slashing/v1beta1/tx.registry";
import * as _257 from "./nft/v1beta1/tx.registry";
import * as _258 from "./mint/v1beta1/tx.registry";
import * as _259 from "./group/v1/tx.registry";
import * as _260 from "./gov/v1beta1/tx.registry";
import * as _261 from "./gov/v1/tx.registry";
import * as _262 from "./feegrant/v1beta1/tx.registry";
import * as _263 from "./evidence/v1beta1/tx.registry";
import * as _264 from "./distribution/v1beta1/tx.registry";
import * as _265 from "./crisis/v1beta1/tx.registry";
import * as _266 from "./consensus/v1/tx.registry";
import * as _267 from "./circuit/v1/tx.registry";
import * as _268 from "./bank/v1beta1/tx.registry";
import * as _269 from "./authz/v1beta1/tx.registry";
import * as _270 from "./auth/v1beta1/tx.registry";
import * as _271 from "./upgrade/v1beta1/query.rpc.func";
import * as _272 from "./tx/v1beta1/service.rpc.func";
import * as _273 from "./staking/v1beta1/query.rpc.func";
import * as _274 from "./slashing/v1beta1/query.rpc.func";
import * as _275 from "./reflection/v1/reflection.rpc.func";
import * as _276 from "./params/v1beta1/query.rpc.func";
import * as _277 from "./orm/query/v1alpha1/query.rpc.func";
import * as _278 from "./nft/v1beta1/query.rpc.func";
import * as _279 from "./mint/v1beta1/query.rpc.func";
import * as _280 from "./group/v1/query.rpc.func";
import * as _281 from "./gov/v1beta1/query.rpc.func";
import * as _282 from "./gov/v1/query.rpc.func";
import * as _283 from "./feegrant/v1beta1/query.rpc.func";
import * as _284 from "./evidence/v1beta1/query.rpc.func";
import * as _285 from "./distribution/v1beta1/query.rpc.func";
import * as _286 from "./consensus/v1/query.rpc.func";
import * as _287 from "./circuit/v1/query.rpc.func";
import * as _288 from "./base/tendermint/v1beta1/query.rpc.func";
import * as _289 from "./base/reflection/v2alpha1/reflection.rpc.func";
import * as _290 from "./base/reflection/v1beta1/reflection.rpc.func";
import * as _291 from "./base/node/v1beta1/query.rpc.func";
import * as _292 from "./bank/v1beta1/query.rpc.func";
import * as _293 from "./autocli/v1/query.rpc.func";
import * as _294 from "./authz/v1beta1/query.rpc.func";
import * as _295 from "./auth/v1beta1/query.rpc.func";
import * as _296 from "./app/v1alpha1/query.rpc.func";
import * as _297 from "./upgrade/v1beta1/query.rpc.Query";
import * as _298 from "./tx/v1beta1/service.rpc.Service";
import * as _299 from "./staking/v1beta1/query.rpc.Query";
import * as _300 from "./slashing/v1beta1/query.rpc.Query";
import * as _301 from "./params/v1beta1/query.rpc.Query";
import * as _302 from "./orm/query/v1alpha1/query.rpc.Query";
import * as _303 from "./nft/v1beta1/query.rpc.Query";
import * as _304 from "./mint/v1beta1/query.rpc.Query";
import * as _305 from "./group/v1/query.rpc.Query";
import * as _306 from "./gov/v1beta1/query.rpc.Query";
import * as _307 from "./gov/v1/query.rpc.Query";
import * as _308 from "./feegrant/v1beta1/query.rpc.Query";
import * as _309 from "./evidence/v1beta1/query.rpc.Query";
import * as _310 from "./distribution/v1beta1/query.rpc.Query";
import * as _311 from "./consensus/v1/query.rpc.Query";
import * as _312 from "./circuit/v1/query.rpc.Query";
import * as _313 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _314 from "./base/node/v1beta1/query.rpc.Service";
import * as _315 from "./bank/v1beta1/query.rpc.Query";
import * as _316 from "./autocli/v1/query.rpc.Query";
import * as _317 from "./authz/v1beta1/query.rpc.Query";
import * as _318 from "./auth/v1beta1/query.rpc.Query";
import * as _319 from "./app/v1alpha1/query.rpc.Query";
import * as _320 from "./vesting/v1beta1/tx.rpc.func";
import * as _321 from "./upgrade/v1beta1/tx.rpc.func";
import * as _322 from "./staking/v1beta1/tx.rpc.func";
import * as _323 from "./slashing/v1beta1/tx.rpc.func";
import * as _324 from "./nft/v1beta1/tx.rpc.func";
import * as _325 from "./mint/v1beta1/tx.rpc.func";
import * as _326 from "./group/v1/tx.rpc.func";
import * as _327 from "./gov/v1beta1/tx.rpc.func";
import * as _328 from "./gov/v1/tx.rpc.func";
import * as _329 from "./feegrant/v1beta1/tx.rpc.func";
import * as _330 from "./evidence/v1beta1/tx.rpc.func";
import * as _331 from "./distribution/v1beta1/tx.rpc.func";
import * as _332 from "./crisis/v1beta1/tx.rpc.func";
import * as _333 from "./consensus/v1/tx.rpc.func";
import * as _334 from "./circuit/v1/tx.rpc.func";
import * as _335 from "./bank/v1beta1/tx.rpc.func";
import * as _336 from "./authz/v1beta1/tx.rpc.func";
import * as _337 from "./auth/v1beta1/tx.rpc.func";
import * as _338 from "./vesting/v1beta1/tx.rpc.msg";
import * as _339 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _340 from "./staking/v1beta1/tx.rpc.msg";
import * as _341 from "./slashing/v1beta1/tx.rpc.msg";
import * as _342 from "./nft/v1beta1/tx.rpc.msg";
import * as _343 from "./mint/v1beta1/tx.rpc.msg";
import * as _344 from "./group/v1/tx.rpc.msg";
import * as _345 from "./gov/v1beta1/tx.rpc.msg";
import * as _346 from "./gov/v1/tx.rpc.msg";
import * as _347 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _348 from "./evidence/v1beta1/tx.rpc.msg";
import * as _349 from "./distribution/v1beta1/tx.rpc.msg";
import * as _350 from "./crisis/v1beta1/tx.rpc.msg";
import * as _351 from "./consensus/v1/tx.rpc.msg";
import * as _352 from "./circuit/v1/tx.rpc.msg";
import * as _353 from "./bank/v1beta1/tx.rpc.msg";
import * as _354 from "./authz/v1beta1/tx.rpc.msg";
import * as _355 from "./auth/v1beta1/tx.rpc.msg";
import * as _358 from "./rpc.query";
import * as _359 from "./rpc.tx";
export namespace cosmos {
  export namespace vesting {
    export const v1beta1 = {
      ..._82,
      ..._83,
      ..._235,
      ..._253,
      ..._320,
      ..._338
    };
    export namespace module {
      export const v1 = {
        ..._84
      };
    }
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._85,
      ..._86,
      ..._87,
      ..._236,
      ..._254,
      ..._271,
      ..._297,
      ..._321,
      ..._339
    };
    export namespace module {
      export const v1 = {
        ..._88
      };
    }
  }
  export namespace tx {
    export const v1beta1 = {
      ..._89,
      ..._90,
      ..._272,
      ..._298
    };
    export namespace signing {
      export const v1beta1 = {
        ..._91
      };
    }
    export namespace config {
      export const v1 = {
        ..._92
      };
    }
  }
  export namespace store {
    export const v1beta1 = {
      ..._93,
      ..._94
    };
    export namespace streaming {
      export const abci = {
        ..._95
      };
    }
    export namespace snapshots {
      export const v1 = {
        ..._96
      };
    }
    export namespace internal {
      export namespace kv {
        export const v1beta1 = {
          ..._97
        };
      }
    }
  }
  export namespace staking {
    export const v1beta1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._237,
      ..._255,
      ..._273,
      ..._299,
      ..._322,
      ..._340
    };
    export namespace module {
      export const v1 = {
        ..._103
      };
    }
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._238,
      ..._256,
      ..._274,
      ..._300,
      ..._323,
      ..._341
    };
    export namespace module {
      export const v1 = {
        ..._108
      };
    }
  }
  export namespace reflection {
    export const v1 = {
      ..._109,
      ..._275
    };
  }
  export namespace query {
    export const v1 = {
      ..._110
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._111,
      ..._112,
      ..._276,
      ..._301
    };
    export namespace module {
      export const v1 = {
        ..._113
      };
    }
  }
  export namespace orm {
    export const v1alpha1 = {
      ..._114
    };
    export const v1 = {
      ..._115
    };
    export namespace query {
      export const v1alpha1 = {
        ..._116,
        ..._277,
        ..._302
      };
    }
    export namespace module {
      export const v1alpha1 = {
        ..._117
      };
    }
  }
  export namespace nft {
    export const v1beta1 = {
      ..._118,
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._239,
      ..._257,
      ..._278,
      ..._303,
      ..._324,
      ..._342
    };
    export namespace module {
      export const v1 = {
        ..._123
      };
    }
  }
  export namespace msg {
    export const v1 = {
      ..._124
    };
    export namespace textual {
      export const v1 = {
        ..._125
      };
    }
  }
  export namespace mint {
    export const v1beta1 = {
      ..._126,
      ..._127,
      ..._128,
      ..._129,
      ..._240,
      ..._258,
      ..._279,
      ..._304,
      ..._325,
      ..._343
    };
    export namespace module {
      export const v1 = {
        ..._130
      };
    }
  }
  export namespace group {
    export const v1 = {
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._241,
      ..._259,
      ..._280,
      ..._305,
      ..._326,
      ..._344
    };
    export namespace module {
      export const v1 = {
        ..._136
      };
    }
  }
  export namespace gov {
    export const v1beta1 = {
      ..._137,
      ..._138,
      ..._139,
      ..._140,
      ..._242,
      ..._260,
      ..._281,
      ..._306,
      ..._327,
      ..._345
    };
    export const v1 = {
      ..._141,
      ..._142,
      ..._143,
      ..._144,
      ..._243,
      ..._261,
      ..._282,
      ..._307,
      ..._328,
      ..._346
    };
    export namespace module {
      export const v1 = {
        ..._145
      };
    }
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._146
    };
    export namespace module {
      export const v1 = {
        ..._147
      };
    }
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._148,
      ..._149,
      ..._150,
      ..._151,
      ..._244,
      ..._262,
      ..._283,
      ..._308,
      ..._329,
      ..._347
    };
    export namespace module {
      export const v1 = {
        ..._152
      };
    }
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._245,
      ..._263,
      ..._284,
      ..._309,
      ..._330,
      ..._348
    };
    export namespace module {
      export const v1 = {
        ..._157
      };
    }
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._158,
      ..._159,
      ..._160,
      ..._161,
      ..._246,
      ..._264,
      ..._285,
      ..._310,
      ..._331,
      ..._349
    };
    export namespace module {
      export const v1 = {
        ..._162
      };
    }
  }
  export namespace crypto {
    export const secp256r1 = {
      ..._163
    };
    export const secp256k1 = {
      ..._164
    };
    export const multisig = {
      ..._165
    };
    export namespace keyring {
      export const v1 = {
        ..._166
      };
    }
    export namespace hd {
      export const v1 = {
        ..._167
      };
    }
    export const ed25519 = {
      ..._168
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._169,
      ..._170,
      ..._247,
      ..._265,
      ..._332,
      ..._350
    };
    export namespace module {
      export const v1 = {
        ..._171
      };
    }
  }
  export namespace consensus {
    export const v1 = {
      ..._172,
      ..._173,
      ..._248,
      ..._266,
      ..._286,
      ..._311,
      ..._333,
      ..._351
    };
    export namespace module {
      export const v1 = {
        ..._174
      };
    }
  }
  export namespace circuit {
    export const v1 = {
      ..._175,
      ..._176,
      ..._177,
      ..._249,
      ..._267,
      ..._287,
      ..._312,
      ..._334,
      ..._352
    };
    export namespace module {
      export const v1 = {
        ..._178
      };
    }
  }
  export namespace base {
    export const v1beta1 = {
      ..._179
    };
    export namespace tendermint {
      export const v1beta1 = {
        ..._180,
        ..._181,
        ..._288,
        ..._313
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._182,
        ..._289
      };
      export const v1beta1 = {
        ..._183,
        ..._290
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._184
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._185,
        ..._291,
        ..._314
      };
    }
    export namespace abci {
      export const v1beta1 = {
        ..._186
      };
    }
  }
  export namespace bank {
    export const v1beta1 = {
      ..._187,
      ..._188,
      ..._189,
      ..._190,
      ..._191,
      ..._250,
      ..._268,
      ..._292,
      ..._315,
      ..._335,
      ..._353
    };
    export namespace module {
      export const v1 = {
        ..._192
      };
    }
  }
  export namespace autocli {
    export const v1 = {
      ..._193,
      ..._194,
      ..._293,
      ..._316
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._195,
      ..._196,
      ..._197,
      ..._198,
      ..._199,
      ..._251,
      ..._269,
      ..._294,
      ..._317,
      ..._336,
      ..._354
    };
    export namespace module {
      export const v1 = {
        ..._200
      };
    }
  }
  export namespace auth {
    export const v1beta1 = {
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._252,
      ..._270,
      ..._295,
      ..._318,
      ..._337,
      ..._355
    };
    export namespace module {
      export const v1 = {
        ..._205
      };
    }
  }
  export namespace app {
    export const v1alpha1 = {
      ..._206,
      ..._207,
      ..._208,
      ..._296,
      ..._319
    };
    export namespace runtime {
      export const v1alpha1 = {
        ..._209
      };
    }
  }
  export const ClientFactory = {
    ..._358,
    ..._359
  };
}