import { Str } from './Str.ts'
import { Num } from './Num.ts'
import { Bool } from './Bool.ts'
import { List } from './List.ts'
import { Maybe, Just, Nothing, MaybeType } from './Maybe.ts'

/**
 * Overload for the built-in `Record` type.
 * Doesn't really make sense to allow the key to be
 * something other than a string since JS coerces numbers into a string
 * and symbols don't have comparability like strings or numbers do. 
 * As a result, we only really need one type parameter (the type of the value)
 */
export type Dict<T> = { [P in Str]: T}

export const Dict = {

  empty: () => ({}),

  member: <T>(key: Str) => (dict: Dict<T>): Bool =>
    dict[key] ? true : false,

  size: <T>(dict: Dict<T>): Num =>
  Object.keys(dict).length,

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

  // Get the value associated with a key. If the key is not found, return
  // @Nothing@. This is useful when you are not sure if a key will be in the
  // dictionary.
  //
  // > const animals = Dict.fromList([ ['Tom', 'Cat'], ['Jerry', 'Mouse'] ])
  // >
  // > Dict.get("Tom")(animals) == Just('Cat')
  // > Dict.get("Jerry")(animals) == Just('Mouse')
  // > Dict.get("Spike")(animals) == Nothing
  get: <T>(key: Str) => (dict: Dict<T>): Maybe<T> =>
    dict[key]
      ? Just(dict[key])
      : Nothing,

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
  update: <T>(key: Str) => (alterFn: (maybeValue: Maybe<T>) => Maybe<T>) => (dict: Dict<T>): Dict<T> =>
    Object.keys(dict).reduce(
      (acc, cur) => {
        if (cur === key) {
          // check result of alter function
          const result = alterFn(Just(dict[cur]))
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
}
