/**
 * Similar to built in JS Function.prototype.apply()
 *
 * @example
 * // without apply
 * const result = Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("123"))
 * 
 * // with apply
 * const result = apply(
 *   Maybe.map2,
 *   Num.add,
 *   Str.toInt("1"),
 *   Str.toInt("123")
 * ) // = 124
 */
export function apply<A, B>(ab: (a: A) => B, a: A): B
export function apply<A, B, C>(ac: (a: A, b: B) => C, a: A, b: B): C
export function apply<A, B, C, D>(ad: (a: A, b: B, c: C) => D, a: A, b: B, c: C): D
export function apply<A, B, C, D, E>(ae: (a: A, b: B, c: C, d: D) => E, a: A, b: B, c: C, d: D): E
export function apply<A, B, C, D, E, F>(
  af: (a: A, b: B, c: C, d: D, e: E) => F,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
): F
export function apply<A, B, C, D, E, F, G>(
  ag: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
): G
export function apply<A, B, C, D, E, F, G, H>(
  ah: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
): H
export function apply<A, B, C, D, E, F, G, H, I>(
  ai: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
): I
export function apply<A, B, C, D, E, F, G, H, I, J>(
  aj: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I
): J
export function apply<A, B, C, D, E, F, G, H, I, J, K>(
  ak: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => K,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J
): K
export function apply<A, B, C, D, E, F, G, H, I, J, K, L>(
  al: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => L,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K
): L
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  am: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L) => M,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L
): M
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  an: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M) => N,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M
): N
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  ao: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N) => O,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M,
  n: N
): O
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  ap: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O) => P,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M,
  n: N,
  o: O
): P
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  aq: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P) => Q,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M,
  n: N,
  o: O,
  p: P
): Q
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  ar: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q) => R,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M,
  n: N,
  o: O,
  p: P,
  q: Q
): R
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  as: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R) => S,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M,
  n: N,
  o: O,
  p: P,
  q: Q,
  r: R
): S
export function apply<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  at: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S) => T,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  l: L,
  m: M,
  n: N,
  o: O,
  p: P,
  q: Q,
  r: R,
  s: S
): T
export function apply(func: (...args: unknown[]) => unknown, ...params: unknown[]): unknown {
  return params.reduce((acc: any, cur) => acc(cur), func)
}
