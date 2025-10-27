// @ts-nocheck
/* eslint-disable */
import * as _0 from "./version/types";
import * as _1 from "./types/validator";
import * as _2 from "./types/types";
import * as _3 from "./types/params";
import * as _4 from "./types/evidence";
import * as _5 from "./types/block";
import * as _6 from "./p2p/types";
import * as _7 from "./libs/bits/types";
import * as _8 from "./crypto/proof";
import * as _9 from "./crypto/keys";
import * as _10 from "./abci/types";
export namespace tendermint {
  export const version = {
    ..._0
  };
  export const types = {
    ..._1,
    ..._2,
    ..._3,
    ..._4,
    ..._5
  };
  export const p2p = {
    ..._6
  };
  export namespace libs {
    export const bits = {
      ..._7
    };
  }
  export const crypto = {
    ..._8,
    ..._9
  };
  export const abci = {
    ..._10
  };
}