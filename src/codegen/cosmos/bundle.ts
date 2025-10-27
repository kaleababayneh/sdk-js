// @ts-nocheck
/* eslint-disable */
import * as _80 from "./vesting/v1beta1/vesting";
import * as _81 from "./vesting/v1beta1/tx";
import * as _82 from "./vesting/module/v1/module";
import * as _83 from "./upgrade/v1beta1/upgrade";
import * as _84 from "./upgrade/v1beta1/tx";
import * as _85 from "./upgrade/v1beta1/query";
import * as _86 from "./upgrade/module/v1/module";
import * as _87 from "./tx/v1beta1/tx";
import * as _88 from "./tx/v1beta1/service";
import * as _89 from "./tx/signing/v1beta1/signing";
import * as _90 from "./tx/config/v1/config";
import * as _91 from "./store/v1beta1/listening";
import * as _92 from "./store/v1beta1/commit_info";
import * as _93 from "./store/streaming/abci/grpc";
import * as _94 from "./store/snapshots/v1/snapshot";
import * as _95 from "./store/internal/kv/v1beta1/kv";
import * as _96 from "./staking/v1beta1/tx";
import * as _97 from "./staking/v1beta1/staking";
import * as _98 from "./staking/v1beta1/query";
import * as _99 from "./staking/v1beta1/genesis";
import * as _100 from "./staking/v1beta1/authz";
import * as _101 from "./staking/module/v1/module";
import * as _102 from "./slashing/v1beta1/tx";
import * as _103 from "./slashing/v1beta1/slashing";
import * as _104 from "./slashing/v1beta1/query";
import * as _105 from "./slashing/v1beta1/genesis";
import * as _106 from "./slashing/module/v1/module";
import * as _107 from "./reflection/v1/reflection";
import * as _108 from "./query/v1/query";
import * as _109 from "./protocolpool/v1/types";
import * as _110 from "./protocolpool/v1/tx";
import * as _111 from "./protocolpool/v1/query";
import * as _112 from "./protocolpool/v1/genesis";
import * as _113 from "./protocolpool/module/v1/module";
import * as _114 from "./params/v1beta1/query";
import * as _115 from "./params/v1beta1/params";
import * as _116 from "./params/module/v1/module";
import * as _117 from "./orm/v1alpha1/schema";
import * as _118 from "./orm/v1/orm";
import * as _119 from "./orm/query/v1alpha1/query";
import * as _120 from "./orm/module/v1alpha1/module";
import * as _121 from "./nft/v1beta1/tx";
import * as _122 from "./nft/v1beta1/query";
import * as _123 from "./nft/v1beta1/nft";
import * as _124 from "./nft/v1beta1/genesis";
import * as _125 from "./nft/v1beta1/event";
import * as _126 from "./nft/module/v1/module";
import * as _127 from "./msg/v1/msg";
import * as _128 from "./msg/textual/v1/textual";
import * as _129 from "./mint/v1beta1/tx";
import * as _130 from "./mint/v1beta1/query";
import * as _131 from "./mint/v1beta1/mint";
import * as _132 from "./mint/v1beta1/genesis";
import * as _133 from "./mint/module/v1/module";
import * as _134 from "./group/v1/types";
import * as _135 from "./group/v1/tx";
import * as _136 from "./group/v1/query";
import * as _137 from "./group/v1/genesis";
import * as _138 from "./group/v1/events";
import * as _139 from "./group/module/v1/module";
import * as _140 from "./gov/v1beta1/tx";
import * as _141 from "./gov/v1beta1/query";
import * as _142 from "./gov/v1beta1/gov";
import * as _143 from "./gov/v1beta1/genesis";
import * as _144 from "./gov/v1/tx";
import * as _145 from "./gov/v1/query";
import * as _146 from "./gov/v1/gov";
import * as _147 from "./gov/v1/genesis";
import * as _148 from "./gov/module/v1/module";
import * as _149 from "./genutil/v1beta1/genesis";
import * as _150 from "./genutil/module/v1/module";
import * as _151 from "./feegrant/v1beta1/tx";
import * as _152 from "./feegrant/v1beta1/query";
import * as _153 from "./feegrant/v1beta1/genesis";
import * as _154 from "./feegrant/v1beta1/feegrant";
import * as _155 from "./feegrant/module/v1/module";
import * as _156 from "./evidence/v1beta1/tx";
import * as _157 from "./evidence/v1beta1/query";
import * as _158 from "./evidence/v1beta1/genesis";
import * as _159 from "./evidence/v1beta1/evidence";
import * as _160 from "./evidence/module/v1/module";
import * as _161 from "./epochs/v1beta1/query";
import * as _162 from "./epochs/v1beta1/genesis";
import * as _163 from "./epochs/v1beta1/events";
import * as _164 from "./epochs/module/v1/module";
import * as _165 from "./distribution/v1beta1/tx";
import * as _166 from "./distribution/v1beta1/query";
import * as _167 from "./distribution/v1beta1/genesis";
import * as _168 from "./distribution/v1beta1/distribution";
import * as _169 from "./distribution/module/v1/module";
import * as _170 from "./crypto/secp256r1/keys";
import * as _171 from "./crypto/secp256k1/keys";
import * as _172 from "./crypto/multisig/keys";
import * as _173 from "./crypto/keyring/v1/record";
import * as _174 from "./crypto/hd/v1/hd";
import * as _175 from "./crypto/ed25519/keys";
import * as _176 from "./crisis/v1beta1/tx";
import * as _177 from "./crisis/v1beta1/genesis";
import * as _178 from "./crisis/module/v1/module";
import * as _179 from "./counter/v1/tx";
import * as _180 from "./counter/v1/query";
import * as _181 from "./counter/module/v1/module";
import * as _182 from "./consensus/v1/tx";
import * as _183 from "./consensus/v1/query";
import * as _184 from "./consensus/module/v1/module";
import * as _185 from "./circuit/v1/types";
import * as _186 from "./circuit/v1/tx";
import * as _187 from "./circuit/v1/query";
import * as _188 from "./circuit/module/v1/module";
import * as _189 from "./benchmark/v1/tx";
import * as _190 from "./benchmark/v1/benchmark";
import * as _191 from "./benchmark/module/v1/module";
import * as _192 from "./base/v1beta1/coin";
import * as _193 from "./base/tendermint/v1beta1/types";
import * as _194 from "./base/tendermint/v1beta1/query";
import * as _195 from "./base/reflection/v2alpha1/reflection";
import * as _196 from "./base/reflection/v1beta1/reflection";
import * as _197 from "./base/query/v1beta1/pagination";
import * as _198 from "./base/node/v1beta1/query";
import * as _199 from "./base/abci/v1beta1/abci";
import * as _200 from "./bank/v1beta1/tx";
import * as _201 from "./bank/v1beta1/query";
import * as _202 from "./bank/v1beta1/genesis";
import * as _203 from "./bank/v1beta1/bank";
import * as _204 from "./bank/v1beta1/authz";
import * as _205 from "./bank/module/v1/module";
import * as _206 from "./autocli/v1/query";
import * as _207 from "./autocli/v1/options";
import * as _208 from "./authz/v1beta1/tx";
import * as _209 from "./authz/v1beta1/query";
import * as _210 from "./authz/v1beta1/genesis";
import * as _211 from "./authz/v1beta1/event";
import * as _212 from "./authz/v1beta1/authz";
import * as _213 from "./authz/module/v1/module";
import * as _214 from "./auth/v1beta1/tx";
import * as _215 from "./auth/v1beta1/query";
import * as _216 from "./auth/v1beta1/genesis";
import * as _217 from "./auth/v1beta1/auth";
import * as _218 from "./auth/module/v1/module";
import * as _219 from "./app/v1alpha1/query";
import * as _220 from "./app/v1alpha1/module";
import * as _221 from "./app/v1alpha1/config";
import * as _222 from "./app/runtime/v1alpha1/module";
import * as _248 from "./vesting/v1beta1/tx.amino";
import * as _249 from "./upgrade/v1beta1/tx.amino";
import * as _250 from "./staking/v1beta1/tx.amino";
import * as _251 from "./slashing/v1beta1/tx.amino";
import * as _252 from "./protocolpool/v1/tx.amino";
import * as _253 from "./nft/v1beta1/tx.amino";
import * as _254 from "./mint/v1beta1/tx.amino";
import * as _255 from "./group/v1/tx.amino";
import * as _256 from "./gov/v1beta1/tx.amino";
import * as _257 from "./gov/v1/tx.amino";
import * as _258 from "./feegrant/v1beta1/tx.amino";
import * as _259 from "./evidence/v1beta1/tx.amino";
import * as _260 from "./distribution/v1beta1/tx.amino";
import * as _261 from "./crisis/v1beta1/tx.amino";
import * as _262 from "./counter/v1/tx.amino";
import * as _263 from "./consensus/v1/tx.amino";
import * as _264 from "./circuit/v1/tx.amino";
import * as _265 from "./benchmark/v1/tx.amino";
import * as _266 from "./bank/v1beta1/tx.amino";
import * as _267 from "./authz/v1beta1/tx.amino";
import * as _268 from "./auth/v1beta1/tx.amino";
import * as _269 from "./vesting/v1beta1/tx.registry";
import * as _270 from "./upgrade/v1beta1/tx.registry";
import * as _271 from "./staking/v1beta1/tx.registry";
import * as _272 from "./slashing/v1beta1/tx.registry";
import * as _273 from "./protocolpool/v1/tx.registry";
import * as _274 from "./nft/v1beta1/tx.registry";
import * as _275 from "./mint/v1beta1/tx.registry";
import * as _276 from "./group/v1/tx.registry";
import * as _277 from "./gov/v1beta1/tx.registry";
import * as _278 from "./gov/v1/tx.registry";
import * as _279 from "./feegrant/v1beta1/tx.registry";
import * as _280 from "./evidence/v1beta1/tx.registry";
import * as _281 from "./distribution/v1beta1/tx.registry";
import * as _282 from "./crisis/v1beta1/tx.registry";
import * as _283 from "./counter/v1/tx.registry";
import * as _284 from "./consensus/v1/tx.registry";
import * as _285 from "./circuit/v1/tx.registry";
import * as _286 from "./benchmark/v1/tx.registry";
import * as _287 from "./bank/v1beta1/tx.registry";
import * as _288 from "./authz/v1beta1/tx.registry";
import * as _289 from "./auth/v1beta1/tx.registry";
import * as _290 from "./upgrade/v1beta1/query.rpc.func";
import * as _291 from "./tx/v1beta1/service.rpc.func";
import * as _292 from "./staking/v1beta1/query.rpc.func";
import * as _293 from "./slashing/v1beta1/query.rpc.func";
import * as _294 from "./reflection/v1/reflection.rpc.func";
import * as _295 from "./protocolpool/v1/query.rpc.func";
import * as _296 from "./params/v1beta1/query.rpc.func";
import * as _297 from "./orm/query/v1alpha1/query.rpc.func";
import * as _298 from "./nft/v1beta1/query.rpc.func";
import * as _299 from "./mint/v1beta1/query.rpc.func";
import * as _300 from "./group/v1/query.rpc.func";
import * as _301 from "./gov/v1beta1/query.rpc.func";
import * as _302 from "./gov/v1/query.rpc.func";
import * as _303 from "./feegrant/v1beta1/query.rpc.func";
import * as _304 from "./evidence/v1beta1/query.rpc.func";
import * as _305 from "./epochs/v1beta1/query.rpc.func";
import * as _306 from "./distribution/v1beta1/query.rpc.func";
import * as _307 from "./counter/v1/query.rpc.func";
import * as _308 from "./consensus/v1/query.rpc.func";
import * as _309 from "./circuit/v1/query.rpc.func";
import * as _310 from "./base/tendermint/v1beta1/query.rpc.func";
import * as _311 from "./base/reflection/v2alpha1/reflection.rpc.func";
import * as _312 from "./base/reflection/v1beta1/reflection.rpc.func";
import * as _313 from "./base/node/v1beta1/query.rpc.func";
import * as _314 from "./bank/v1beta1/query.rpc.func";
import * as _315 from "./autocli/v1/query.rpc.func";
import * as _316 from "./authz/v1beta1/query.rpc.func";
import * as _317 from "./auth/v1beta1/query.rpc.func";
import * as _318 from "./app/v1alpha1/query.rpc.func";
import * as _319 from "./upgrade/v1beta1/query.rpc.Query";
import * as _320 from "./tx/v1beta1/service.rpc.Service";
import * as _321 from "./staking/v1beta1/query.rpc.Query";
import * as _322 from "./slashing/v1beta1/query.rpc.Query";
import * as _323 from "./protocolpool/v1/query.rpc.Query";
import * as _324 from "./params/v1beta1/query.rpc.Query";
import * as _325 from "./orm/query/v1alpha1/query.rpc.Query";
import * as _326 from "./nft/v1beta1/query.rpc.Query";
import * as _327 from "./mint/v1beta1/query.rpc.Query";
import * as _328 from "./group/v1/query.rpc.Query";
import * as _329 from "./gov/v1beta1/query.rpc.Query";
import * as _330 from "./gov/v1/query.rpc.Query";
import * as _331 from "./feegrant/v1beta1/query.rpc.Query";
import * as _332 from "./evidence/v1beta1/query.rpc.Query";
import * as _333 from "./epochs/v1beta1/query.rpc.Query";
import * as _334 from "./distribution/v1beta1/query.rpc.Query";
import * as _335 from "./counter/v1/query.rpc.Query";
import * as _336 from "./consensus/v1/query.rpc.Query";
import * as _337 from "./circuit/v1/query.rpc.Query";
import * as _338 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _339 from "./base/node/v1beta1/query.rpc.Service";
import * as _340 from "./bank/v1beta1/query.rpc.Query";
import * as _341 from "./autocli/v1/query.rpc.Query";
import * as _342 from "./authz/v1beta1/query.rpc.Query";
import * as _343 from "./auth/v1beta1/query.rpc.Query";
import * as _344 from "./app/v1alpha1/query.rpc.Query";
import * as _345 from "./vesting/v1beta1/tx.rpc.func";
import * as _346 from "./upgrade/v1beta1/tx.rpc.func";
import * as _347 from "./staking/v1beta1/tx.rpc.func";
import * as _348 from "./slashing/v1beta1/tx.rpc.func";
import * as _349 from "./protocolpool/v1/tx.rpc.func";
import * as _350 from "./nft/v1beta1/tx.rpc.func";
import * as _351 from "./mint/v1beta1/tx.rpc.func";
import * as _352 from "./group/v1/tx.rpc.func";
import * as _353 from "./gov/v1beta1/tx.rpc.func";
import * as _354 from "./gov/v1/tx.rpc.func";
import * as _355 from "./feegrant/v1beta1/tx.rpc.func";
import * as _356 from "./evidence/v1beta1/tx.rpc.func";
import * as _357 from "./distribution/v1beta1/tx.rpc.func";
import * as _358 from "./crisis/v1beta1/tx.rpc.func";
import * as _359 from "./counter/v1/tx.rpc.func";
import * as _360 from "./consensus/v1/tx.rpc.func";
import * as _361 from "./circuit/v1/tx.rpc.func";
import * as _362 from "./benchmark/v1/tx.rpc.func";
import * as _363 from "./bank/v1beta1/tx.rpc.func";
import * as _364 from "./authz/v1beta1/tx.rpc.func";
import * as _365 from "./auth/v1beta1/tx.rpc.func";
import * as _366 from "./vesting/v1beta1/tx.rpc.msg";
import * as _367 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _368 from "./staking/v1beta1/tx.rpc.msg";
import * as _369 from "./slashing/v1beta1/tx.rpc.msg";
import * as _370 from "./protocolpool/v1/tx.rpc.msg";
import * as _371 from "./nft/v1beta1/tx.rpc.msg";
import * as _372 from "./mint/v1beta1/tx.rpc.msg";
import * as _373 from "./group/v1/tx.rpc.msg";
import * as _374 from "./gov/v1beta1/tx.rpc.msg";
import * as _375 from "./gov/v1/tx.rpc.msg";
import * as _376 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _377 from "./evidence/v1beta1/tx.rpc.msg";
import * as _378 from "./distribution/v1beta1/tx.rpc.msg";
import * as _379 from "./crisis/v1beta1/tx.rpc.msg";
import * as _380 from "./counter/v1/tx.rpc.msg";
import * as _381 from "./consensus/v1/tx.rpc.msg";
import * as _382 from "./circuit/v1/tx.rpc.msg";
import * as _383 from "./benchmark/v1/tx.rpc.msg";
import * as _384 from "./bank/v1beta1/tx.rpc.msg";
import * as _385 from "./authz/v1beta1/tx.rpc.msg";
import * as _386 from "./auth/v1beta1/tx.rpc.msg";
import * as _389 from "./rpc.query";
import * as _390 from "./rpc.tx";
export namespace cosmos {
  export namespace vesting {
    export const v1beta1 = {
      ..._80,
      ..._81,
      ..._248,
      ..._269,
      ..._345,
      ..._366
    };
    export namespace module {
      export const v1 = {
        ..._82
      };
    }
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._83,
      ..._84,
      ..._85,
      ..._249,
      ..._270,
      ..._290,
      ..._319,
      ..._346,
      ..._367
    };
    export namespace module {
      export const v1 = {
        ..._86
      };
    }
  }
  export namespace tx {
    export const v1beta1 = {
      ..._87,
      ..._88,
      ..._291,
      ..._320
    };
    export namespace signing {
      export const v1beta1 = {
        ..._89
      };
    }
    export namespace config {
      export const v1 = {
        ..._90
      };
    }
  }
  export namespace store {
    export const v1beta1 = {
      ..._91,
      ..._92
    };
    export namespace streaming {
      export const abci = {
        ..._93
      };
    }
    export namespace snapshots {
      export const v1 = {
        ..._94
      };
    }
    export namespace internal {
      export namespace kv {
        export const v1beta1 = {
          ..._95
        };
      }
    }
  }
  export namespace staking {
    export const v1beta1 = {
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._250,
      ..._271,
      ..._292,
      ..._321,
      ..._347,
      ..._368
    };
    export namespace module {
      export const v1 = {
        ..._101
      };
    }
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._251,
      ..._272,
      ..._293,
      ..._322,
      ..._348,
      ..._369
    };
    export namespace module {
      export const v1 = {
        ..._106
      };
    }
  }
  export namespace reflection {
    export const v1 = {
      ..._107,
      ..._294
    };
  }
  export namespace query {
    export const v1 = {
      ..._108
    };
  }
  export namespace protocolpool {
    export const v1 = {
      ..._109,
      ..._110,
      ..._111,
      ..._112,
      ..._252,
      ..._273,
      ..._295,
      ..._323,
      ..._349,
      ..._370
    };
    export namespace module {
      export const v1 = {
        ..._113
      };
    }
  }
  export namespace params {
    export const v1beta1 = {
      ..._114,
      ..._115,
      ..._296,
      ..._324
    };
    export namespace module {
      export const v1 = {
        ..._116
      };
    }
  }
  export namespace orm {
    export const v1alpha1 = {
      ..._117
    };
    export const v1 = {
      ..._118
    };
    export namespace query {
      export const v1alpha1 = {
        ..._119,
        ..._297,
        ..._325
      };
    }
    export namespace module {
      export const v1alpha1 = {
        ..._120
      };
    }
  }
  export namespace nft {
    export const v1beta1 = {
      ..._121,
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._253,
      ..._274,
      ..._298,
      ..._326,
      ..._350,
      ..._371
    };
    export namespace module {
      export const v1 = {
        ..._126
      };
    }
  }
  export namespace msg {
    export const v1 = {
      ..._127
    };
    export namespace textual {
      export const v1 = {
        ..._128
      };
    }
  }
  export namespace mint {
    export const v1beta1 = {
      ..._129,
      ..._130,
      ..._131,
      ..._132,
      ..._254,
      ..._275,
      ..._299,
      ..._327,
      ..._351,
      ..._372
    };
    export namespace module {
      export const v1 = {
        ..._133
      };
    }
  }
  export namespace group {
    export const v1 = {
      ..._134,
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._255,
      ..._276,
      ..._300,
      ..._328,
      ..._352,
      ..._373
    };
    export namespace module {
      export const v1 = {
        ..._139
      };
    }
  }
  export namespace gov {
    export const v1beta1 = {
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._256,
      ..._277,
      ..._301,
      ..._329,
      ..._353,
      ..._374
    };
    export const v1 = {
      ..._144,
      ..._145,
      ..._146,
      ..._147,
      ..._257,
      ..._278,
      ..._302,
      ..._330,
      ..._354,
      ..._375
    };
    export namespace module {
      export const v1 = {
        ..._148
      };
    }
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._149
    };
    export namespace module {
      export const v1 = {
        ..._150
      };
    }
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._151,
      ..._152,
      ..._153,
      ..._154,
      ..._258,
      ..._279,
      ..._303,
      ..._331,
      ..._355,
      ..._376
    };
    export namespace module {
      export const v1 = {
        ..._155
      };
    }
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._156,
      ..._157,
      ..._158,
      ..._159,
      ..._259,
      ..._280,
      ..._304,
      ..._332,
      ..._356,
      ..._377
    };
    export namespace module {
      export const v1 = {
        ..._160
      };
    }
  }
  export namespace epochs {
    export const v1beta1 = {
      ..._161,
      ..._162,
      ..._163,
      ..._305,
      ..._333
    };
    export namespace module {
      export const v1 = {
        ..._164
      };
    }
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._165,
      ..._166,
      ..._167,
      ..._168,
      ..._260,
      ..._281,
      ..._306,
      ..._334,
      ..._357,
      ..._378
    };
    export namespace module {
      export const v1 = {
        ..._169
      };
    }
  }
  export namespace crypto {
    export const secp256r1 = {
      ..._170
    };
    export const secp256k1 = {
      ..._171
    };
    export const multisig = {
      ..._172
    };
    export namespace keyring {
      export const v1 = {
        ..._173
      };
    }
    export namespace hd {
      export const v1 = {
        ..._174
      };
    }
    export const ed25519 = {
      ..._175
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._176,
      ..._177,
      ..._261,
      ..._282,
      ..._358,
      ..._379
    };
    export namespace module {
      export const v1 = {
        ..._178
      };
    }
  }
  export namespace counter {
    export const v1 = {
      ..._179,
      ..._180,
      ..._262,
      ..._283,
      ..._307,
      ..._335,
      ..._359,
      ..._380
    };
    export namespace module {
      export const v1 = {
        ..._181
      };
    }
  }
  export namespace consensus {
    export const v1 = {
      ..._182,
      ..._183,
      ..._263,
      ..._284,
      ..._308,
      ..._336,
      ..._360,
      ..._381
    };
    export namespace module {
      export const v1 = {
        ..._184
      };
    }
  }
  export namespace circuit {
    export const v1 = {
      ..._185,
      ..._186,
      ..._187,
      ..._264,
      ..._285,
      ..._309,
      ..._337,
      ..._361,
      ..._382
    };
    export namespace module {
      export const v1 = {
        ..._188
      };
    }
  }
  export namespace benchmark {
    export const v1 = {
      ..._189,
      ..._190,
      ..._265,
      ..._286,
      ..._362,
      ..._383
    };
    export namespace module {
      export const v1 = {
        ..._191
      };
    }
  }
  export namespace base {
    export const v1beta1 = {
      ..._192
    };
    export namespace tendermint {
      export const v1beta1 = {
        ..._193,
        ..._194,
        ..._310,
        ..._338
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._195,
        ..._311
      };
      export const v1beta1 = {
        ..._196,
        ..._312
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._197
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._198,
        ..._313,
        ..._339
      };
    }
    export namespace abci {
      export const v1beta1 = {
        ..._199
      };
    }
  }
  export namespace bank {
    export const v1beta1 = {
      ..._200,
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._266,
      ..._287,
      ..._314,
      ..._340,
      ..._363,
      ..._384
    };
    export namespace module {
      export const v1 = {
        ..._205
      };
    }
  }
  export namespace autocli {
    export const v1 = {
      ..._206,
      ..._207,
      ..._315,
      ..._341
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._208,
      ..._209,
      ..._210,
      ..._211,
      ..._212,
      ..._267,
      ..._288,
      ..._316,
      ..._342,
      ..._364,
      ..._385
    };
    export namespace module {
      export const v1 = {
        ..._213
      };
    }
  }
  export namespace auth {
    export const v1beta1 = {
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._268,
      ..._289,
      ..._317,
      ..._343,
      ..._365,
      ..._386
    };
    export namespace module {
      export const v1 = {
        ..._218
      };
    }
  }
  export namespace app {
    export const v1alpha1 = {
      ..._219,
      ..._220,
      ..._221,
      ..._318,
      ..._344
    };
    export namespace runtime {
      export const v1alpha1 = {
        ..._222
      };
    }
  }
  export const ClientFactory = {
    ..._389,
    ..._390
  };
}