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

export const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value,
})

export const Maybe = {

  withDefault: <T>(_default: T) => (m1: Maybe<T>): T =>
    m1.type === MaybeType.Just
      ? m1.value
      : _default,

  isNothing: <T>(a: Maybe<T>) =>
    a.type === MaybeType.Nothing,

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

  andThen: <T, U>(callback: (p1: T) => Maybe<U>) => (m1: Maybe<T>) =>
    m1.type === MaybeType.Just
      ? callback
      : () => Nothing,
}
