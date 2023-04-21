// import { Bool } from "Bool"

import { Maybe } from "Monad";
import { curry } from "./utils/curry";

export type Add = {
  (a: number, b: number): number;
  (a: number): (b: number) => number;
}

export const add: Add = curry((a: number, b: number): number => a + b);

// export function add(a: number): (b: number) => number
// export function add(a: number, b: number): number
// export function add(a: number, b?: number): unknown {
//   if (b) {
//     return a + b
//   }
//   else {
//     return function(b: number) {
//       return a + b
//     }
//   }
// }


// export function fromNum
// type _Num = number

// export interface Num extends _Num {
//   isBaseType: boolean
// }

// export type Num = number

// export const Num = {
//   add: (a: Num) => (b: Num) => a + b,
//   sub: (a: Num) => (b: Num) => a - b,
//   sqrt: (a: Num): Num => Math.sqrt(a),
//   isEven: (a: Num): Bool => a % 2 === 0
// }
