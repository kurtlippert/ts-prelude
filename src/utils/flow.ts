// This has been ripped directy from [fp-ts](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)
// (with some modifications). Reason is, Deno was having a time of it getting things resolved.
// Until the bits are sorted, we've just copy+paste the relevant function

/**
 * Performs left-to-right function composition.
 * The first argument may have any arity, the remaining arguments must be unary.  
 * 
 * NOTE that this function only supports up to 9 functions to compose.
 * We can add more as needed ¯\_(ツ)_/¯
 *
 * @example
 * import { flow } from 'fp-ts/function'
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * assert.strictEqual(f('aaa'), 6)
 */
export function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export function flow<A extends ReadonlyArray<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
export function flow(
  ab: <T>(...args: unknown[]) => T,
  bc?: <T>(...args: unknown[]) => T,
  cd?: <T>(...args: unknown[]) => T,
  de?: <T>(...args: unknown[]) => T,
  ef?: <T>(...args: unknown[]) => T,
  fg?: <T>(...args: unknown[]) => T,
  gh?: <T>(...args: unknown[]) => T,
  hi?: <T>(...args: unknown[]) => T,
  ij?: <T>(...args: unknown[]) => T
): unknown {
  // type predicate to prevent ts error: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
  const functions = [ab, bc, cd, de, ef, fg, gh, hi, ij]
    .filter((func): func is (<T>(...args: unknown[]) => T) => func !== undefined)

  // implementation solution https://www.talkinghightech.com/en/creating-compose-function/
  const [first, ...rest] = functions
  return (...args: unknown[]) => rest.reduce((acc, cur) => cur(acc), first(...args))
}
