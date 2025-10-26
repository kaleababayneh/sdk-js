// @ts-nocheck
/* eslint-disable */
import * as _2 from "./app/runtime/v1alpha1/module";
import * as _3 from "./app/v1alpha1/config";
import * as _4 from "./app/v1alpha1/module";
import * as _5 from "./app/v1alpha1/query";
import * as _6 from "./auth/module/v1/module";
import * as _7 from "./auth/v1beta1/auth";
import * as _8 from "./auth/v1beta1/genesis";
import * as _9 from "./auth/v1beta1/query";
import * as _10 from "./auth/v1beta1/tx";
import * as _11 from "./authz/module/v1/module";
import * as _12 from "./authz/v1beta1/authz";
import * as _13 from "./authz/v1beta1/event";
import * as _14 from "./authz/v1beta1/genesis";
import * as _15 from "./authz/v1beta1/query";
import * as _16 from "./authz/v1beta1/tx";
import * as _17 from "./autocli/v1/options";
import * as _18 from "./autocli/v1/query";
import * as _19 from "./bank/module/v1/module";
import * as _20 from "./bank/v1beta1/authz";
import * as _21 from "./bank/v1beta1/bank";
import * as _22 from "./bank/v1beta1/genesis";
import * as _23 from "./bank/v1beta1/query";
import * as _24 from "./bank/v1beta1/tx";
import * as _25 from "./base/abci/v1beta1/abci";
import * as _26 from "./base/node/v1beta1/query";
import * as _27 from "./base/query/v1beta1/pagination";
import * as _28 from "./base/reflection/v1beta1/reflection";
import * as _29 from "./base/reflection/v2alpha1/reflection";
import * as _30 from "./base/tendermint/v1beta1/query";
import * as _31 from "./base/tendermint/v1beta1/types";
import * as _32 from "./base/v1beta1/coin";
import * as _33 from "./benchmark/module/v1/module";
import * as _34 from "./benchmark/v1/benchmark";
import * as _35 from "./benchmark/v1/tx";
import * as _36 from "./circuit/module/v1/module";
import * as _37 from "./circuit/v1/query";
import * as _38 from "./circuit/v1/tx";
import * as _39 from "./circuit/v1/types";
import * as _40 from "./consensus/module/v1/module";
import * as _41 from "./consensus/v1/query";
import * as _42 from "./consensus/v1/tx";
import * as _43 from "./counter/module/v1/module";
import * as _44 from "./counter/v1/query";
import * as _45 from "./counter/v1/tx";
import * as _46 from "./crisis/module/v1/module";
import * as _47 from "./crisis/v1beta1/genesis";
import * as _48 from "./crisis/v1beta1/tx";
import * as _49 from "./crypto/ed25519/keys";
import * as _50 from "./crypto/hd/v1/hd";
import * as _51 from "./crypto/keyring/v1/record";
import * as _52 from "./crypto/multisig/keys";
import * as _53 from "./crypto/secp256k1/keys";
import * as _54 from "./crypto/secp256r1/keys";
import * as _55 from "./distribution/module/v1/module";
import * as _56 from "./distribution/v1beta1/distribution";
import * as _57 from "./distribution/v1beta1/genesis";
import * as _58 from "./distribution/v1beta1/query";
import * as _59 from "./distribution/v1beta1/tx";
import * as _60 from "./epochs/module/v1/module";
import * as _61 from "./epochs/v1beta1/events";
import * as _62 from "./epochs/v1beta1/genesis";
import * as _63 from "./epochs/v1beta1/query";
import * as _64 from "./evidence/module/v1/module";
import * as _65 from "./evidence/v1beta1/evidence";
import * as _66 from "./evidence/v1beta1/genesis";
import * as _67 from "./evidence/v1beta1/query";
import * as _68 from "./evidence/v1beta1/tx";
import * as _69 from "./feegrant/module/v1/module";
import * as _70 from "./feegrant/v1beta1/feegrant";
import * as _71 from "./feegrant/v1beta1/genesis";
import * as _72 from "./feegrant/v1beta1/query";
import * as _73 from "./feegrant/v1beta1/tx";
import * as _74 from "./genutil/module/v1/module";
import * as _75 from "./genutil/v1beta1/genesis";
import * as _76 from "./gov/module/v1/module";
import * as _77 from "./gov/v1/genesis";
import * as _78 from "./gov/v1/gov";
import * as _79 from "./gov/v1/query";
import * as _80 from "./gov/v1/tx";
import * as _81 from "./gov/v1beta1/genesis";
import * as _82 from "./gov/v1beta1/gov";
import * as _83 from "./gov/v1beta1/query";
import * as _84 from "./gov/v1beta1/tx";
import * as _85 from "./group/module/v1/module";
import * as _86 from "./group/v1/events";
import * as _87 from "./group/v1/genesis";
import * as _88 from "./group/v1/query";
import * as _89 from "./group/v1/tx";
import * as _90 from "./group/v1/types";
import * as _91 from "./mint/module/v1/module";
import * as _92 from "./mint/v1beta1/genesis";
import * as _93 from "./mint/v1beta1/mint";
import * as _94 from "./mint/v1beta1/query";
import * as _95 from "./mint/v1beta1/tx";
import * as _96 from "./msg/textual/v1/textual";
import * as _97 from "./msg/v1/msg";
import * as _98 from "./nft/module/v1/module";
import * as _99 from "./nft/v1beta1/event";
import * as _100 from "./nft/v1beta1/genesis";
import * as _101 from "./nft/v1beta1/nft";
import * as _102 from "./nft/v1beta1/query";
import * as _103 from "./nft/v1beta1/tx";
import * as _104 from "./orm/module/v1alpha1/module";
import * as _105 from "./orm/query/v1alpha1/query";
import * as _106 from "./orm/v1/orm";
import * as _107 from "./orm/v1alpha1/schema";
import * as _108 from "./params/module/v1/module";
import * as _109 from "./params/v1beta1/params";
import * as _110 from "./params/v1beta1/query";
import * as _111 from "./protocolpool/module/v1/module";
import * as _112 from "./protocolpool/v1/genesis";
import * as _113 from "./protocolpool/v1/query";
import * as _114 from "./protocolpool/v1/tx";
import * as _115 from "./protocolpool/v1/types";
import * as _116 from "./query/v1/query";
import * as _117 from "./reflection/v1/reflection";
import * as _118 from "./slashing/module/v1/module";
import * as _119 from "./slashing/v1beta1/genesis";
import * as _120 from "./slashing/v1beta1/query";
import * as _121 from "./slashing/v1beta1/slashing";
import * as _122 from "./slashing/v1beta1/tx";
import * as _123 from "./staking/module/v1/module";
import * as _124 from "./staking/v1beta1/authz";
import * as _125 from "./staking/v1beta1/genesis";
import * as _126 from "./staking/v1beta1/query";
import * as _127 from "./staking/v1beta1/staking";
import * as _128 from "./staking/v1beta1/tx";
import * as _129 from "./store/internal/kv/v1beta1/kv";
import * as _130 from "./store/snapshots/v1/snapshot";
import * as _131 from "./store/streaming/abci/grpc";
import * as _132 from "./store/v1beta1/commit_info";
import * as _133 from "./store/v1beta1/listening";
import * as _134 from "./tx/config/v1/config";
import * as _135 from "./tx/signing/v1beta1/signing";
import * as _136 from "./tx/v1beta1/service";
import * as _137 from "./tx/v1beta1/tx";
import * as _138 from "./upgrade/module/v1/module";
import * as _139 from "./upgrade/v1beta1/query";
import * as _140 from "./upgrade/v1beta1/tx";
import * as _141 from "./upgrade/v1beta1/upgrade";
import * as _142 from "./vesting/module/v1/module";
import * as _143 from "./vesting/v1beta1/tx";
import * as _144 from "./vesting/v1beta1/vesting";
import * as _224 from "./auth/v1beta1/tx.amino";
import * as _225 from "./authz/v1beta1/tx.amino";
import * as _226 from "./bank/v1beta1/tx.amino";
import * as _227 from "./benchmark/v1/tx.amino";
import * as _228 from "./circuit/v1/tx.amino";
import * as _229 from "./consensus/v1/tx.amino";
import * as _230 from "./counter/v1/tx.amino";
import * as _231 from "./crisis/v1beta1/tx.amino";
import * as _232 from "./distribution/v1beta1/tx.amino";
import * as _233 from "./evidence/v1beta1/tx.amino";
import * as _234 from "./feegrant/v1beta1/tx.amino";
import * as _235 from "./gov/v1/tx.amino";
import * as _236 from "./gov/v1beta1/tx.amino";
import * as _237 from "./group/v1/tx.amino";
import * as _238 from "./mint/v1beta1/tx.amino";
import * as _239 from "./nft/v1beta1/tx.amino";
import * as _240 from "./protocolpool/v1/tx.amino";
import * as _241 from "./slashing/v1beta1/tx.amino";
import * as _242 from "./staking/v1beta1/tx.amino";
import * as _243 from "./upgrade/v1beta1/tx.amino";
import * as _244 from "./vesting/v1beta1/tx.amino";
import * as _245 from "./auth/v1beta1/tx.registry";
import * as _246 from "./authz/v1beta1/tx.registry";
import * as _247 from "./bank/v1beta1/tx.registry";
import * as _248 from "./benchmark/v1/tx.registry";
import * as _249 from "./circuit/v1/tx.registry";
import * as _250 from "./consensus/v1/tx.registry";
import * as _251 from "./counter/v1/tx.registry";
import * as _252 from "./crisis/v1beta1/tx.registry";
import * as _253 from "./distribution/v1beta1/tx.registry";
import * as _254 from "./evidence/v1beta1/tx.registry";
import * as _255 from "./feegrant/v1beta1/tx.registry";
import * as _256 from "./gov/v1/tx.registry";
import * as _257 from "./gov/v1beta1/tx.registry";
import * as _258 from "./group/v1/tx.registry";
import * as _259 from "./mint/v1beta1/tx.registry";
import * as _260 from "./nft/v1beta1/tx.registry";
import * as _261 from "./protocolpool/v1/tx.registry";
import * as _262 from "./slashing/v1beta1/tx.registry";
import * as _263 from "./staking/v1beta1/tx.registry";
import * as _264 from "./upgrade/v1beta1/tx.registry";
import * as _265 from "./vesting/v1beta1/tx.registry";
import * as _266 from "./app/v1alpha1/query.rpc.func";
import * as _267 from "./auth/v1beta1/query.rpc.func";
import * as _268 from "./authz/v1beta1/query.rpc.func";
import * as _269 from "./autocli/v1/query.rpc.func";
import * as _270 from "./bank/v1beta1/query.rpc.func";
import * as _271 from "./base/node/v1beta1/query.rpc.func";
import * as _272 from "./base/reflection/v1beta1/reflection.rpc.func";
import * as _273 from "./base/reflection/v2alpha1/reflection.rpc.func";
import * as _274 from "./base/tendermint/v1beta1/query.rpc.func";
import * as _275 from "./circuit/v1/query.rpc.func";
import * as _276 from "./consensus/v1/query.rpc.func";
import * as _277 from "./counter/v1/query.rpc.func";
import * as _278 from "./distribution/v1beta1/query.rpc.func";
import * as _279 from "./epochs/v1beta1/query.rpc.func";
import * as _280 from "./evidence/v1beta1/query.rpc.func";
import * as _281 from "./feegrant/v1beta1/query.rpc.func";
import * as _282 from "./gov/v1/query.rpc.func";
import * as _283 from "./gov/v1beta1/query.rpc.func";
import * as _284 from "./group/v1/query.rpc.func";
import * as _285 from "./mint/v1beta1/query.rpc.func";
import * as _286 from "./nft/v1beta1/query.rpc.func";
import * as _287 from "./orm/query/v1alpha1/query.rpc.func";
import * as _288 from "./params/v1beta1/query.rpc.func";
import * as _289 from "./protocolpool/v1/query.rpc.func";
import * as _290 from "./reflection/v1/reflection.rpc.func";
import * as _291 from "./slashing/v1beta1/query.rpc.func";
import * as _292 from "./staking/v1beta1/query.rpc.func";
import * as _293 from "./tx/v1beta1/service.rpc.func";
import * as _294 from "./upgrade/v1beta1/query.rpc.func";
import * as _295 from "./app/v1alpha1/query.rpc.Query";
import * as _296 from "./auth/v1beta1/query.rpc.Query";
import * as _297 from "./authz/v1beta1/query.rpc.Query";
import * as _298 from "./autocli/v1/query.rpc.Query";
import * as _299 from "./bank/v1beta1/query.rpc.Query";
import * as _300 from "./base/node/v1beta1/query.rpc.Service";
import * as _301 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _302 from "./circuit/v1/query.rpc.Query";
import * as _303 from "./consensus/v1/query.rpc.Query";
import * as _304 from "./counter/v1/query.rpc.Query";
import * as _305 from "./distribution/v1beta1/query.rpc.Query";
import * as _306 from "./epochs/v1beta1/query.rpc.Query";
import * as _307 from "./evidence/v1beta1/query.rpc.Query";
import * as _308 from "./feegrant/v1beta1/query.rpc.Query";
import * as _309 from "./gov/v1/query.rpc.Query";
import * as _310 from "./gov/v1beta1/query.rpc.Query";
import * as _311 from "./group/v1/query.rpc.Query";
import * as _312 from "./mint/v1beta1/query.rpc.Query";
import * as _313 from "./nft/v1beta1/query.rpc.Query";
import * as _314 from "./orm/query/v1alpha1/query.rpc.Query";
import * as _315 from "./params/v1beta1/query.rpc.Query";
import * as _316 from "./protocolpool/v1/query.rpc.Query";
import * as _317 from "./slashing/v1beta1/query.rpc.Query";
import * as _318 from "./staking/v1beta1/query.rpc.Query";
import * as _319 from "./tx/v1beta1/service.rpc.Service";
import * as _320 from "./upgrade/v1beta1/query.rpc.Query";
import * as _321 from "./auth/v1beta1/tx.rpc.func";
import * as _322 from "./authz/v1beta1/tx.rpc.func";
import * as _323 from "./bank/v1beta1/tx.rpc.func";
import * as _324 from "./benchmark/v1/tx.rpc.func";
import * as _325 from "./circuit/v1/tx.rpc.func";
import * as _326 from "./consensus/v1/tx.rpc.func";
import * as _327 from "./counter/v1/tx.rpc.func";
import * as _328 from "./crisis/v1beta1/tx.rpc.func";
import * as _329 from "./distribution/v1beta1/tx.rpc.func";
import * as _330 from "./evidence/v1beta1/tx.rpc.func";
import * as _331 from "./feegrant/v1beta1/tx.rpc.func";
import * as _332 from "./gov/v1/tx.rpc.func";
import * as _333 from "./gov/v1beta1/tx.rpc.func";
import * as _334 from "./group/v1/tx.rpc.func";
import * as _335 from "./mint/v1beta1/tx.rpc.func";
import * as _336 from "./nft/v1beta1/tx.rpc.func";
import * as _337 from "./protocolpool/v1/tx.rpc.func";
import * as _338 from "./slashing/v1beta1/tx.rpc.func";
import * as _339 from "./staking/v1beta1/tx.rpc.func";
import * as _340 from "./upgrade/v1beta1/tx.rpc.func";
import * as _341 from "./vesting/v1beta1/tx.rpc.func";
import * as _342 from "./auth/v1beta1/tx.rpc.msg";
import * as _343 from "./authz/v1beta1/tx.rpc.msg";
import * as _344 from "./bank/v1beta1/tx.rpc.msg";
import * as _345 from "./benchmark/v1/tx.rpc.msg";
import * as _346 from "./circuit/v1/tx.rpc.msg";
import * as _347 from "./consensus/v1/tx.rpc.msg";
import * as _348 from "./counter/v1/tx.rpc.msg";
import * as _349 from "./crisis/v1beta1/tx.rpc.msg";
import * as _350 from "./distribution/v1beta1/tx.rpc.msg";
import * as _351 from "./evidence/v1beta1/tx.rpc.msg";
import * as _352 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _353 from "./gov/v1/tx.rpc.msg";
import * as _354 from "./gov/v1beta1/tx.rpc.msg";
import * as _355 from "./group/v1/tx.rpc.msg";
import * as _356 from "./mint/v1beta1/tx.rpc.msg";
import * as _357 from "./nft/v1beta1/tx.rpc.msg";
import * as _358 from "./protocolpool/v1/tx.rpc.msg";
import * as _359 from "./slashing/v1beta1/tx.rpc.msg";
import * as _360 from "./staking/v1beta1/tx.rpc.msg";
import * as _361 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _362 from "./vesting/v1beta1/tx.rpc.msg";
import * as _387 from "./rpc.query";
import * as _388 from "./rpc.tx";
export namespace cosmos {
  export namespace app {
    export namespace runtime {
      export const v1alpha1 = {
        ..._2
      };
    }
    export const v1alpha1 = {
      ..._3,
      ..._4,
      ..._5,
      ..._266,
      ..._295
    };
  }
  export namespace auth {
    export namespace module {
      export const v1 = {
        ..._6
      };
    }
    export const v1beta1 = {
      ..._7,
      ..._8,
      ..._9,
      ..._10,
      ..._224,
      ..._245,
      ..._267,
      ..._296,
      ..._321,
      ..._342
    };
  }
  export namespace authz {
    export namespace module {
      export const v1 = {
        ..._11
      };
    }
    export const v1beta1 = {
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._16,
      ..._225,
      ..._246,
      ..._268,
      ..._297,
      ..._322,
      ..._343
    };
  }
  export namespace autocli {
    export const v1 = {
      ..._17,
      ..._18,
      ..._269,
      ..._298
    };
  }
  export namespace bank {
    export namespace module {
      export const v1 = {
        ..._19
      };
    }
    export const v1beta1 = {
      ..._20,
      ..._21,
      ..._22,
      ..._23,
      ..._24,
      ..._226,
      ..._247,
      ..._270,
      ..._299,
      ..._323,
      ..._344
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._25
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._26,
        ..._271,
        ..._300
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._27
      };
    }
    export namespace reflection {
      export const v1beta1 = {
        ..._28,
        ..._272
      };
      export const v2alpha1 = {
        ..._29,
        ..._273
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._30,
        ..._31,
        ..._274,
        ..._301
      };
    }
    export const v1beta1 = {
      ..._32
    };
  }
  export namespace benchmark {
    export namespace module {
      export const v1 = {
        ..._33
      };
    }
    export const v1 = {
      ..._34,
      ..._35,
      ..._227,
      ..._248,
      ..._324,
      ..._345
    };
  }
  export namespace circuit {
    export namespace module {
      export const v1 = {
        ..._36
      };
    }
    export const v1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._228,
      ..._249,
      ..._275,
      ..._302,
      ..._325,
      ..._346
    };
  }
  export namespace consensus {
    export namespace module {
      export const v1 = {
        ..._40
      };
    }
    export const v1 = {
      ..._41,
      ..._42,
      ..._229,
      ..._250,
      ..._276,
      ..._303,
      ..._326,
      ..._347
    };
  }
  export namespace counter {
    export namespace module {
      export const v1 = {
        ..._43
      };
    }
    export const v1 = {
      ..._44,
      ..._45,
      ..._230,
      ..._251,
      ..._277,
      ..._304,
      ..._327,
      ..._348
    };
  }
  export namespace crisis {
    export namespace module {
      export const v1 = {
        ..._46
      };
    }
    export const v1beta1 = {
      ..._47,
      ..._48,
      ..._231,
      ..._252,
      ..._328,
      ..._349
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._49
    };
    export namespace hd {
      export const v1 = {
        ..._50
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._51
      };
    }
    export const multisig = {
      ..._52
    };
    export const secp256k1 = {
      ..._53
    };
    export const secp256r1 = {
      ..._54
    };
  }
  export namespace distribution {
    export namespace module {
      export const v1 = {
        ..._55
      };
    }
    export const v1beta1 = {
      ..._56,
      ..._57,
      ..._58,
      ..._59,
      ..._232,
      ..._253,
      ..._278,
      ..._305,
      ..._329,
      ..._350
    };
  }
  export namespace epochs {
    export namespace module {
      export const v1 = {
        ..._60
      };
    }
    export const v1beta1 = {
      ..._61,
      ..._62,
      ..._63,
      ..._279,
      ..._306
    };
  }
  export namespace evidence {
    export namespace module {
      export const v1 = {
        ..._64
      };
    }
    export const v1beta1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._68,
      ..._233,
      ..._254,
      ..._280,
      ..._307,
      ..._330,
      ..._351
    };
  }
  export namespace feegrant {
    export namespace module {
      export const v1 = {
        ..._69
      };
    }
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._73,
      ..._234,
      ..._255,
      ..._281,
      ..._308,
      ..._331,
      ..._352
    };
  }
  export namespace genutil {
    export namespace module {
      export const v1 = {
        ..._74
      };
    }
    export const v1beta1 = {
      ..._75
    };
  }
  export namespace gov {
    export namespace module {
      export const v1 = {
        ..._76
      };
    }
    export const v1 = {
      ..._77,
      ..._78,
      ..._79,
      ..._80,
      ..._235,
      ..._256,
      ..._282,
      ..._309,
      ..._332,
      ..._353
    };
    export const v1beta1 = {
      ..._81,
      ..._82,
      ..._83,
      ..._84,
      ..._236,
      ..._257,
      ..._283,
      ..._310,
      ..._333,
      ..._354
    };
  }
  export namespace group {
    export namespace module {
      export const v1 = {
        ..._85
      };
    }
    export const v1 = {
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._237,
      ..._258,
      ..._284,
      ..._311,
      ..._334,
      ..._355
    };
  }
  export namespace mint {
    export namespace module {
      export const v1 = {
        ..._91
      };
    }
    export const v1beta1 = {
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._238,
      ..._259,
      ..._285,
      ..._312,
      ..._335,
      ..._356
    };
  }
  export namespace msg {
    export namespace textual {
      export const v1 = {
        ..._96
      };
    }
    export const v1 = {
      ..._97
    };
  }
  export namespace nft {
    export namespace module {
      export const v1 = {
        ..._98
      };
    }
    export const v1beta1 = {
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._239,
      ..._260,
      ..._286,
      ..._313,
      ..._336,
      ..._357
    };
  }
  export namespace orm {
    export namespace module {
      export const v1alpha1 = {
        ..._104
      };
    }
    export namespace query {
      export const v1alpha1 = {
        ..._105,
        ..._287,
        ..._314
      };
    }
    export const v1 = {
      ..._106
    };
    export const v1alpha1 = {
      ..._107
    };
  }
  export namespace params {
    export namespace module {
      export const v1 = {
        ..._108
      };
    }
    export const v1beta1 = {
      ..._109,
      ..._110,
      ..._288,
      ..._315
    };
  }
  export namespace protocolpool {
    export namespace module {
      export const v1 = {
        ..._111
      };
    }
    export const v1 = {
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._240,
      ..._261,
      ..._289,
      ..._316,
      ..._337,
      ..._358
    };
  }
  export namespace query {
    export const v1 = {
      ..._116
    };
  }
  export namespace reflection {
    export const v1 = {
      ..._117,
      ..._290
    };
  }
  export namespace slashing {
    export namespace module {
      export const v1 = {
        ..._118
      };
    }
    export const v1beta1 = {
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._241,
      ..._262,
      ..._291,
      ..._317,
      ..._338,
      ..._359
    };
  }
  export namespace staking {
    export namespace module {
      export const v1 = {
        ..._123
      };
    }
    export const v1beta1 = {
      ..._124,
      ..._125,
      ..._126,
      ..._127,
      ..._128,
      ..._242,
      ..._263,
      ..._292,
      ..._318,
      ..._339,
      ..._360
    };
  }
  export namespace store {
    export namespace internal {
      export namespace kv {
        export const v1beta1 = {
          ..._129
        };
      }
    }
    export namespace snapshots {
      export const v1 = {
        ..._130
      };
    }
    export namespace streaming {
      export const abci = {
        ..._131
      };
    }
    export const v1beta1 = {
      ..._132,
      ..._133
    };
  }
  export namespace tx {
    export namespace config {
      export const v1 = {
        ..._134
      };
    }
    export namespace signing {
      export const v1beta1 = {
        ..._135
      };
    }
    export const v1beta1 = {
      ..._136,
      ..._137,
      ..._293,
      ..._319
    };
  }
  export namespace upgrade {
    export namespace module {
      export const v1 = {
        ..._138
      };
    }
    export const v1beta1 = {
      ..._139,
      ..._140,
      ..._141,
      ..._243,
      ..._264,
      ..._294,
      ..._320,
      ..._340,
      ..._361
    };
  }
  export namespace vesting {
    export namespace module {
      export const v1 = {
        ..._142
      };
    }
    export const v1beta1 = {
      ..._143,
      ..._144,
      ..._244,
      ..._265,
      ..._341,
      ..._362
    };
  }
  export const ClientFactory = {
    ..._387,
    ..._388
  };
}