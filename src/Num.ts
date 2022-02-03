import { Bool } from './Bool.ts'

export type Num = number

export const Num = {
  add: (a: Num) => (b: Num) => a + b,
  sub: (a: Num) => (b: Num) => a - b,
  sqrt: (a: Num): Num => Math.sqrt(a),
  isEven: (a: Num): Bool => a % 2 === 0
}
