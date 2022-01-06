export type Num = number

export const Num = {
  add: (a: Num) => (b: Num) => a + b,
  sqrt: (a: Num): Num => Math.sqrt(a)
}
