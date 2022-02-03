/**
 */
export type Tuple<T, U> = [T, U]

export const Tuple = {
  /**
   * Create a 2-tuple.
   * 
   * NOTE: generally, you can use `[fst, snd]` syntax to produce tuples.
   * But you might want to use this function as part of a pipeable chain,
   * so partial application might be advantageous. It also informs the 
   * reader of intent.
   *
   * @example
   * pair(3)(4) == [3, 4]
   * 
   * const zip = <T, U>(xs: T[]) => (ys: U[]): [U, T][] =>
   *   List.map2(Tuple.pair(xs)(ys))
   */
  pair: <T, U>(fst: T) => (snd: U): Tuple<T, U> =>
    [fst, snd],

  first: <T, U>(t: Tuple<T, U>): T =>
    t[0],

  second: <T, U>(t: Tuple<T, U>): U =>
    t[1],

  mapFirst: <T, U, X>(mapFst: (fst: T) => X) => (t: Tuple<T, U>): Tuple<X, U> =>
    [mapFst(t[0]), t[1]],

  mapSecond: <T, U, Y>(mapSnd: (snd: U) => Y) => (t: Tuple<T, U>): Tuple<T, Y> =>
    [t[0], mapSnd(t[1])],

  mapBoth: <T, U, X, Y>(mapFst: (fst: T) => X) => (mapSnd: (snd: U) => Y) => (t: Tuple<T, U>): Tuple<X, Y> =>
    [mapFst(t[0]), mapSnd(t[1])]
}
