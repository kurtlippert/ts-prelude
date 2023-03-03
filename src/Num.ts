// import { Bool } from "Bool"

export function add(a: number): (b: number) => number
export function add(a: number, b?: number): unknown {
  if (b) {
    return a + b
  }
  else {
    return function(altB: number) {
      return a + altB
    }
  }
}


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
