import { Str } from './Str.ts'
import { Num } from './Num.ts'
import { Bool } from './Bool.ts'
import { List } from './List.ts'
import { Maybe, Just, Nothing, MaybeType } from './Maybe.ts'

/**
 * Doesn't really make sense to allow the key to be
 * something other than a string since JS coerces numbers into a string
 * and symbols don't have comparability like strings or numbers do. 
 * As a result, we only really need one type parameter (the type of the value)
 */
export type Dict<T> = { [P in Str]?: T}

export const d = <T>(a: Dict<T>) => a

export const Dict = {

  empty: () => ({}),

  member: <T>(key: Str) => (dict: Dict<T>): Bool =>
    dict[key] ? true : false,

  size: <T>(dict: Dict<T>): Num =>
    Object.keys(dict).length,

  isEmpty: <T>(dict: Dict<T>): Bool =>
    Object.keys(dict).length === 0,

  keys: <T>(dict: Dict<T>) =>
    Object.keys(dict).sort(),

  values: <T>(dict: Dict<T>) =>
    Object.keys(dict).sort().map(key => dict[key]),

  fromList: <T>(list: List<Dict<T>>) =>
    list
      .sort((a, b) => Object.keys(a)[0]
      .localeCompare(Object.keys(b)[0]))
      .reduce((acc, cur) => Object.assign(acc, { [Object.keys(cur)[0]]: Object.values(cur)[0] }), {}),

  toList: <T>(dict: Dict<T>) =>
    Object.keys(dict).map(key => ({ [key]: dict[key] })),

  /**
   * Get the value associated with a key. If the key is not found, return
   * @Nothing@. This is useful when you are not sure if a key will be in the
   * dictionary.
   *
   * @example
   * > const animals = Dict.fromList([ ['Tom', 'Cat'], ['Jerry', 'Mouse'] ])
   * >
   * > Dict.get("Tom")(animals) == Just('Cat')
   * > Dict.get("Jerry")(animals) == Just('Mouse')
   * > Dict.get("Spike")(animals) == Nothing
   */
  get: (key: Str) => <T>(dict: Dict<T>): Maybe<T> => {
    if (dict[key]) {
      // typescript unable to (infer?) `dict[key]` is not `undefined`
      // for some reason. Hence the `T` cast here
      return Just(dict[key] as T)
    }
    else {
      return Nothing
    }
  },

  insert: <T>(key: Str) => (value: T) => (dict: Dict<T>): Dict<T> =>
    ({ ...dict, [key]: value }),

  remove: <T>(key: Str) => (dict: Dict<T>): Dict<T> =>
    Object.keys(dict).reduce(
      (acc, cur) => cur === key
        ? acc
        : ({ ...acc, [cur]: dict[cur] }),
    {}),

  /**
   * Attempts to update dictionary value at @param key with @param alterFn
   * If it fails, nothing happens, otherwise the value is updated
   */
  update: <T>(key: Str) => (alterFn: (_: Maybe<T>) => Maybe<T>) => (dict: Dict<T>): Dict<T> =>
    Object.keys(dict).reduce(
      (acc, cur) => {
        if (cur === key) {
          // check result of alter function
          const result = alterFn(Just(dict[cur] as T))
          return result.type === MaybeType.Nothing
            ? { ...acc, [cur]: dict[cur] }
            : {
                ...acc,
                [cur]: result.value
              }
        } else {
          return { ...acc, [cur]: dict[cur] }
        }
      },
    {}),

  singleton: <A>(key: Str) => (value: A) => ({ [key]: value }),

  union: <A>(dictLeft: Dict<A>) => (dictRight: Dict<A>): Dict<A> =>
    ({ ...dictRight, ...dictLeft }),

  /** 
   * Keep a key-value pair when its key appears in the second dictionary.
   * Preference is given to values in the first dictionary.
   */
  intersect: <A>(dictLeft: Dict<A>) => (dictRight: Dict<A>): Dict<A> => {
    const dictLeftKeys = Object.keys(dictLeft)
    const dictRightKeys = Object.keys(dictRight)
    if (dictLeftKeys.length === 0 || dictRightKeys.length === 0) return ({})
    const intersectingEntries: Dict<A> = {}
    for (let i = 0; i < dictLeftKeys.length; i++) {
      if (dictRightKeys.includes(dictLeftKeys[i])) {
        intersectingEntries[dictLeftKeys[i]] = dictLeft[dictLeftKeys[i]]
      }
    }
    return intersectingEntries
  },

  /**
   * Keep a key-value pair when its key does not appear in the second dictionary.
   */
  diff: <A>(dictLeft: Dict<A>) => (dictRight: Dict<A>): Dict<A> => {
    const dictLeftKeys = Object.keys(dictLeft)
    const dictRightKeys = Object.keys(dictRight)
    if (dictLeftKeys.length === 0 || dictRightKeys.length === 0) return ({})
    const differentEntries: Dict<A> = {}
    for (let i = 0; i < dictLeftKeys.length; i++) {
      if (!dictRightKeys.includes(dictLeftKeys[i])) {
        differentEntries[dictLeftKeys[i]] = dictLeft[dictLeftKeys[i]]
      }
    }
    return differentEntries
  },

  // merge: <A, B, C>
  //   (leftFn:  (key: Str) => (leftValue: A) => (accumulator: C) => C) =>
  //   (bothFn:  (key: Str) => (leftValue: A) => (rightValue: B) => (accumulator: C) => C) =>
  //   (rightFn: (key: Str) => (leftValue: B) => (accumulator: C) => C) =>
  //   (leftDict: Dict<A>) =>
  //   (rightDict: Dict<B>) =>
  //   (initialAccumulator: C): C => {
  //     const leftKeys = Object.keys(leftDict)
  //     const rightKeys = Object.keys(rightDict)
  //     if (leftKeys.length === 0 && rightKeys.length === 0) {
  //       return initialAccumulator 
  //     }
  //     else if (leftKeys.length === 0) {
  //       return rightKeys.reduce((acc, cur) =>
  //         rightFn(cur)(rightDict[cur] as B)(acc),
  //         initialAccumulator
  //       )
  //     }
  //     else if (rightKeys.length === 0) {
  //       return leftKeys.reduce((acc, cur) =>
  //         leftFn(cur)(leftDict[cur] as A)(acc),
  //         initialAccumulator
  //       )
  //     }
  //     else {
  //       // both dictionary's non-empty

  //     }
  //     const accumulatedleft = leftKeys.reduce((acc, cur) => leftFn(cur)(leftDict[cur] as A)(acc))
  //     const a = rightFn('a')(1 as unknown as B)(0 as unknown as C)
  //   }

}
