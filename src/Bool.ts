export type Bool = boolean

export const Bool = {
  or: (left: Bool) => (right: Bool): Bool => left || right,
  and: (left: Bool) => (right: Bool): Bool => left && right,
  not: (cond: Bool): Bool => !cond,
  xor: (left: Bool) => (right: Bool): Bool =>
    ((left as any)^(right as any)) === 1
}
