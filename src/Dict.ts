import { Str } from './Str.ts'
import { Maybe, Just, Nothing, MaybeType } from './Maybe.ts'

export type Dict<K extends string | number | symbol, T> = Record<K, T>

export const Dict = {

  empty: () => ({}),

  member: <T>(key: Str) => (dict: Dict<Str, T>) =>
    dict[key] ? true : false,

  size: <T>(dict: Dict<Str, T>) =>
  Object.keys(dict).length,

  keys: <T>(dict: Dict<Str, T>) =>
    Object.keys(dict).sort(),

  values: <T>(dict: Dict<Str, T>) =>
    Object.keys(dict).sort().map(key => dict[key]),

  fromList: <T>(list: Dict<Str, unknown>[]) =>
    list
      .sort((a, b) => Object.keys(a)[0]
      .localeCompare(Object.keys(b)[0]))
      .reduce((acc, cur) => Object.assign(acc, { [Object.keys(cur)[0]]: Object.values(cur)[0] }), {}),

  toList: <T>(dict: Dict<Str, T>) =>
    Object.keys(dict).map(key => ({ [key]: dict[key] })),

  // Get the value associated with a key. If the key is not found, return
  // @Nothing@. This is useful when you are not sure if a key will be in the
  // dictionary.
  //
  // > const animals = fromList([ Tuple('Tom', 'Cat'), Tuple('Jerry', 'Mouse') ])
  // >
  // > Obj.get("Tom")(animals) == Just('Cat')
  // > Obj.get("Jerry")(animals) == Just('Mouse')
  // > Obj.get("Spike")(animals) == Nothing
  get: <T>(key: Str) => (dict: Dict<Str, T>): Maybe<T> =>
    dict[key]
      ? Just(dict[key])
      : Nothing,

  insert: <T>(key: Str) => (value: T) => (dict: Dict<Str, T>): Dict<Str, T> =>
    ({ ...dict, [key]: value }),

  remove: <T>(key: Str) => (dict: Dict<Str, T>): Dict<Str, T> =>
    Object.keys(dict).reduce(
      (acc, cur) => cur === key
        ? acc
        : ({ ...acc, [cur]: dict[cur] }),
    {}),

  /**
   * Attempts to update dictionary value at @param key with @param alterFn
   * If it fails, nothing happens, otherwise the value is updated
   */
  update: <T>(key: Str) => (alterFn: (maybeValue: Maybe<T>) => Maybe<T>) => (dict: Dict<Str, T>): Dict<Str, T> =>
    Object.keys(dict).reduce(
      (acc, cur) => {
        if (cur === key) {
          // check result of alter function
          const result = alterFn(Just(dict[cur]))
          return result.type === MaybeType.Nothing
            ? { ...acc, [cur]: dict[cur] }
            : {
                ...acc,
                [cur]: result.value // must be T since we checked for `Nothing`
              }
        } else {
          return { ...acc, [cur]: dict[cur] }
        }
      },
    {}),
}
