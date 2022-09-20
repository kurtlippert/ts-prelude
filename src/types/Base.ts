import { Dict } from "../Dict.ts";
import { Empty } from "./Empty.ts";
import { Eq } from "../Eq.ts";
import { List } from "../List.ts";
import { Maybe } from "../Maybe.ts";
import { Num } from "./Num.ts";
import { Ord } from "../Ord.ts";
import { Str } from "./Str.ts";
import { Tuple } from "../Tuple.ts";
import { Arr } from "./Arr.ts";

/**
 * All the basic types
 */
export type Base =
  | Num
  | Str
  | Dict<unknown>
  // | List<unknown>
  | Arr<unknown>
  | Tuple<unknown, unknown>
  | Ord
  | Maybe<unknown>
  | Eq
  | Empty
