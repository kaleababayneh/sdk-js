// @ts-nocheck
/* eslint-disable */
import * as _213 from "./abci/types";
import * as _214 from "./crypto/keys";
import * as _215 from "./crypto/proof";
import * as _216 from "./libs/bits/types";
import * as _217 from "./p2p/types";
import * as _218 from "./types/block";
import * as _219 from "./types/evidence";
import * as _220 from "./types/params";
import * as _221 from "./types/types";
import * as _222 from "./types/validator";
import * as _223 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._213
  };
  export const crypto = {
    ..._214,
    ..._215
  };
  export namespace libs {
    export const bits = {
      ..._216
    };
  }
  export const p2p = {
    ..._217
  };
  export const types = {
    ..._218,
    ..._219,
    ..._220,
    ..._221,
    ..._222
  };
  export const version = {
    ..._223
  };
}