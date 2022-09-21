export function or(left: boolean, right: boolean): boolean
export function or(left: boolean): (right: boolean) => boolean
export function or(left: boolean, right?: boolean): unknown {
  return left || right
}

export const Bool = {
  or: (left: boolean) => (right: boolean): boolean => left || right,
  and: (left: boolean) => (right: boolean): boolean => left && right,
  not: (cond: boolean): boolean => !cond,
  xor: (left: boolean) => (right: boolean): boolean =>
    // deno-lint-ignore no-explicit-any
    ((left as any)^(right as any)) === 1
}
