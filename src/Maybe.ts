export enum MaybeType {
  Just = 'maybe-type__just',
  Nothing = 'maybe-type__nothing',
}

/**
 * Holds some value
 */
export interface Just<T> {
  type: typeof MaybeType.Just
  value: T
}

/**
 * Represents the absence of a value
 */
export interface Nothing {
  type: typeof MaybeType.Nothing
}

/**
 * May contain a value.
 * Useful replacement for uncertainty in TypeScript. 
 */
export type Maybe<T>
  = Just<T>
  | Nothing


export const Nothing: Nothing = {
  type: MaybeType.Nothing
}

/**
 * Holds some value
 */
export const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value,
})

// TODO: replace w/ module (i.e "import { withDefault } from 'ts-prelude/Maybe'")
// TODO: replace w/ module (i.e "import { Maybe } from 'ts-prelude'")
// ^^ Usage: `Maybe.withDefault`
export const Maybe = {

  /**
   * "unfolds" the Maybe into the value (if Just), the default otherwise  
   * 
   * see: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Maybe.hs
   * 
   * @example
   * Maybe.withDefault(100)(Just(42)) === 42
   * Maybe.withDefault(100)(Nothing) === 100
   * Maybe.withDefault("unknown")(Dict.get("Tom")(Dict.empty)) === "unknown"
   */
  withDefault: <T>(_default: T) => (m1: Maybe<T>): T =>
    m1.type === MaybeType.Just
      ? m1.value
      : _default,

  /**
   * 
   */
  isNothing: <T>(a: Maybe<T>) =>
    a.type === MaybeType.Nothing,

  /**
   * Transform a @Maybe@ value with a given function:
   * 
   * @example
   * Maybe.map(Math.sqrt)(Just(9)) === Just(3)
   * Maybe.map(Math.sqrt)(Nothing) === Nothing
   * Maybe.map(Math.sqrt)(Str.toFloat("9")) === Just(3)
   * Maybe.map(Math.sqrt)(Str.toFloat("x")) === Nothing
   */
  map: <T, U>(fn: (p1: T) => U) => (m1: Maybe<T>): Maybe<U> => {
    const result = m1.type === MaybeType.Just ? m1.value : undefined
    // TODO: remove the boolean cast. Replace w/ explicity comparison
    // deno-lint-ignore no-extra-boolean-cast
    if (!!result) {
      const newResult = result as T
      return Just(fn(newResult))
    } else {
      return Nothing
    }
  },

/**
 * Apply a function if all the arguments are @Just@ a value.
 *
 * @example
 * Maybe.map2(Math.add)(Just(3))(Just(4)) === Just(7)
 * Maybe.map2(Num.add)(Just(3))(Nothing) === Nothing
 * Maybe.map2(Num.add)(Nothing)(Just(4)) === Nothing
 * Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("123")) === Just(124)
 * Maybe.map2(Num.add)(Str.toInt("x"))(Str.toInt("123")) === Nothing
 * Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("1.3")) === Nothing
 */
  map2: <T, U, V>(fn: (p1: T) => (p2: U) => V) => (m1: Maybe<T>) => (m2: Maybe<U>): Maybe<V> => {
    const result1 = m1.type === MaybeType.Just ? m1.value : undefined
    const result2 = m2.type === MaybeType.Just ? m2.value : undefined
    // TODO: remove the boolean cast. Replace w/ explicity comparison
    if (!!result1 && !!result2) {
      const newResult1 = result1 as T
      const newResult2 = result2 as U
      return Just(fn(newResult1)(newResult2))
    }
    else {
      return Nothing
    }
  },

  map3: <T, U, V, W>(fn: (p1: T) => (p2: U) => (p3: V) => W) => (m1: Maybe<T>) => (m2: Maybe<U>) => (m3: Maybe<V>): Maybe<W> => {
    const result1 = m1.type === MaybeType.Just ? m1.value : undefined
    const result2 = m2.type === MaybeType.Just ? m2.value : undefined
    const result3 = m3.type === MaybeType.Just ? m3.value : undefined
    // TODO: remove the boolean cast. Replace w/ explicity comparison
    if (!!result1 && !!result2 && !!result3) {
      const newResult1 = result1 as T
      const newResult2 = result2 as U
      const newResult3 = result3 as V
      return Just(fn(newResult1)(newResult2)(newResult3))
    }
    else {
      return Nothing
    }
  },

  map4: <T, U, V, W, X>(fn: (p1: T) => (p2: U) => (p3: V) => (p4: W) => X) => (m1: Maybe<T>) => (m2: Maybe<U>) => (m3: Maybe<V>) => (m4: Maybe<W>): Maybe<X> => {
    const result1 = m1.type === MaybeType.Just ? m1.value : undefined
    const result2 = m2.type === MaybeType.Just ? m2.value : undefined
    const result3 = m3.type === MaybeType.Just ? m3.value : undefined
    const result4 = m4.type === MaybeType.Just ? m4.value : undefined
    // TODO: remove the boolean cast. Replace w/ explicity comparison
    if (!!result1 && !!result2 && !!result3 && !!result4) {
      const newResult1 = result1 as T
      const newResult2 = result2 as U
      const newResult3 = result3 as V
      const newResult4 = result4 as W
      return Just(fn(newResult1)(newResult2)(newResult3)(newResult4))
    }
    else {
      return Nothing
    }
  },

  map5: <T, U, V, W, X, Y>(fn: (p1: T) => (p2: U) => (p3: V) => (p4: W) => (p5: X) => Y) => (m1: Maybe<T>) => (m2: Maybe<U>) => (m3: Maybe<V>) => (m4: Maybe<W>) => (m5: Maybe<X>): Maybe<Y> => {
    const result1 = m1.type === MaybeType.Just ? m1.value : undefined
    const result2 = m2.type === MaybeType.Just ? m2.value : undefined
    const result3 = m3.type === MaybeType.Just ? m3.value : undefined
    const result4 = m4.type === MaybeType.Just ? m4.value : undefined
    const result5 = m5.type === MaybeType.Just ? m5.value : undefined
    // TODO: remove the boolean cast. Replace w/ explicity comparison
    if (!!result1 && !!result2 && !!result3 && !!result4 && !!result5) {
      const newResult1 = result1 as T
      const newResult2 = result2 as U
      const newResult3 = result3 as V
      const newResult4 = result4 as W
      const newResult5 = result5 as X
      return Just(fn(newResult1)(newResult2)(newResult3)(newResult4)(newResult5))
    }
    else {
      return Nothing
    }
  },

  /**
   * Chain together many computations that may fail
   * 
   * @example
   * const toValidMonth = (month: Num): Maybe<Num> =>
   *   1 <= month && month <= 12
   *     ? Just(month)
   *     : Nothing
   * 
   * const parseMonth = (userInput: Str): Maybe<Num> =>
   *   pipe(
   *     Str.toInt(userInput),
   *     Maybe.andThen(toValidMonth)
   *   )
   */
  andThen: <T, U>(callback: (p1: T) => Maybe<U>) => (m1: Maybe<T>) =>
    m1.type === MaybeType.Just
      ? callback(m1.value)
      : Nothing,
}
