// deno-lint-ignore-file no-explicit-any
//
// Disable `no-explicit-any` lint rule for this file.
// This is b/c we're stretching the TypeScript type system in this file
// as it is. Use of `any` is to get around JS-related limitations.
// But in practice (and for use in apps), we would want to keep this rule

import { pipe } from "https://deno.land/x/fp_ts/function.ts"

/**
 * Overload of built-in `boolean` type.
 * Why? In case we ever want to overload the built-in `boolean` type
 * Buuut... mainly for fun. This `Bool` type matches more w/ Elm
 * (which was half the point anyway)
 */
export type Bool = boolean

/**
 * Overload of built-in `boolean` type.
 * Add pipe-able `Bool` functions w/o naming clash
 */
export const Bool = {
  or: (left: Bool) => (right: Bool) => left || right,
  and: (left: Bool) => (right: Bool) => left && right,
  not: (cond: Bool) => !cond,
  xor: (left: Bool) => (right: Bool) =>
    ((left as any)^(right as any)) === 1
}

/**
 * Order-able.
 * Anything that can be sorted
 */
export type Ord
  = string
  | number
  | Date
  | [Ord, Ord]
  | Ord[]

/**
 * Order-able.
 * Anything that can be sorted
 */
export const Ord = {
  compare: <T>(a: Ord & T, b: Ord & T): number => {
    // Shouldn't be necessary to check a _and_ b.
    // If the type system is doing it's job they need to be the same type
    // But helpful for the reader maybe?

    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b)
    }
    else if (typeof a === "number" && typeof b === "number") {
      return a - b
    }
    else if (a instanceof Date && b instanceof Date) {
      // typescript doesn't know how to deal with date math
      // so we have to cast to `any`
      // deno-lint-ignore no-explicit-any
      return (a as any) - (b as any)
    }

    // sort by the first element in tuple / array
    else if (a instanceof Array && b instanceof Array) {

      // undefined or empty arrays will take the bottom of the sort order
      // (though `undefined` shouldn't be possible if the type system
      //  is doing it's job)
      if (!a || a.length === 0) {
        return -Infinity
      }
      else if (!b || b.length === 0) {
        return Infinity
      }

      if (typeof a[0] === "string" && typeof b[0] === "string") {
        // check length if first elements are the same, longer arrays sort last
        if (a[0].localeCompare(b[0]) === 0) {
          return a.length - b.length
        }
        else {
          return a[0].localeCompare(b[0])
        }
      }
      else if (typeof a[0] === "number" && typeof b[0] === "number") {
        // check length if first elements are the same, longer arrays sort last
        if (a[0] - b[0] === 0) {
          return a.length - b.length
        }
        else {
          return a[0] - b[0]
        }
      }
      else if (a[0] instanceof Date && b[0] instanceof Date) {
        // check length if first elements are the same, longer arrays sort last
        // deno-lint-ignore no-explicit-any
        if ((a[0] as any) - (b[0] as any) === 0) {
          return a.length - b.length
        }
        else {
          // deno-lint-ignore no-explicit-any
          return (a[0] as any) - (b[0] as any)
        }
      }
    }
    return 0
  },
}

/**
 * inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Tuple.hs
 */
export type Tuple<T, U> = [T, U]

/**
 * inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Tuple.hs
 */
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

/**
 * There is a built-in `Math` module, but we're missing partial application
 * and pipe-able math operators.
 * Inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Basics.hs
 */
export type Num = number

/**
 * There is a built-in `Math` module, but we're missing partial application
 * and pipe-able math operators.
 * Inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Basics.hs
 */
export const Num = {
  add: (value1: Num) => (value2: Num) => value1 + value2,
}

// Maybe
// 
// imp: https://engineering.dollarshaveclub.com/typescript-maybe-type-and-module-627506ecc5c8 
// inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Maybe.hs

export enum MaybeType {
  Just = 'maybe-type__just',
  Nothing = 'maybe-type__nothing',
}

/**
 * Holds some value (a value in a box!)
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

/**
 * `Nothing` constructor. Creates a `Nothing`
 */
export const Nothing: Nothing = {
  type: MaybeType.Nothing
}

/**
 * `Just` constructor. 'Boxes' a value
 * 
 * @param value the value to 'box'
 * @returns 'boxed' value
 */
export const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value,
})

/**
 * May contain a value.
 * Useful replacement for uncertainty in TypeScript.
 */
export const Maybe = {

  withDefault: <T>(_default: T) => (m1: Maybe<T>): T =>
    m1.type === MaybeType.Just
      ? m1.value
      : _default,

  map: <T, U>(fn: (p1: T) => U) => (m1: Maybe<T>): Maybe<U> => {
    const result = m1.type === MaybeType.Just ? m1.value : undefined
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

/**
 * `Str` overloads built-in `string`, but this way we can add what we want 
 * w/o worrying about a clash between the two.
 * 
 * Inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Text.hs
 */
export type Str = string

/**
 * `Str` overloads built-in `string`, but this way we can add what we want 
 * w/o worrying about a clash between the two.
 * 
 * Inspired by: https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Text.hs
 */
export const Str = {

  /**
   * Determine if a string is empty.
   *
   * @example
   * isEmpty("") === true
   * isEmpty("the world") === false
   */
  isEmpty: (str: Str) => str.length === 0,

  /**
   * Get the length of a string.
   *
   * @example
   * length("innumerable") === 11
   * length("") === 0
   */
  length: (str: Str) => str.length,

  /**
   * Reverse a string.
   *
   * @example
   * reverse("stressed") === "desserts"
   */
  reverse: (str: Str) =>
    str.split("").reduce((acc: Str[], cur: Str) => [cur, ...acc], []).join(""),

  /**
   * Repeat a string /n/ times.
   *
   * @example
   * repeat(3)("ha") === "hahaha"
   * const repeatThree = repeat(3)
   * repeatThree("ha") === "hahaha"
   */
  repeat: (thisMany: Num) => (str: Str) => str.repeat(thisMany),

  // === BUILDING AND SPLITTING ===

  /**
   * Append two strings.
   *
   * @example
   * append("butter")("fly") === "butterfly"
   * const prependButter = append("butter")
   * prependButter("fly") === "butterfly"
   */
  append: (leftStr: Str) => (rightStr: Str) => leftStr + rightStr,

  /**
   * Concatenate may strings into one.
   *
   * @example
   * concat(["never", "the", "less"]) === "nevertheless"
   */
  concat: (strList: List<Str>) => strList.join(""),

  /**
   * Split a string using a given separator.
   *
   * @example
   * split(",")("cat,dog,cow") === ["cat", "dog", "cow"]
   *
   * const splitComma = split(",")
   * splitComma("cat,dog,cow") === ["cat", "dog", "cow"]
   */
  split: (separator: Str) => (str: Str) => str.split(separator),

  /**
   * Put many strings together with a given separator
   *
   * @example
   * join("a")(["H", "w", "ii", "n"])       === "Hawaiian"
   * join(" ")("cat", "dog", "cow")         === "cat dog cow"
   * join("/")(["home", "kurt", "Desktop"]  === "home/kurt/Desktop")
   *
   * const joinSlash = join("/")
   * joinSlash(["home", "kurt", "Desktop"]) === "home/kurt/Desktop"
   */
  join: (separator: Str) => (strList: List<Str>) => strList.join(separator),

  /**
   * Break a string into words, splitting on chunks of whitespace.
   *
   * @example
   * words("How are \t you? \n Good?") === ["How", "are", "you?", "Good?"]
   */
  words: (str: Str) => str.split(/\s/g).filter(s => s.length > 0),

  /**
   * Break a string into lines, splitting on newlines.
   *
   * @example
   * lines("How are you?\nGood?") === ["How are you?", "Good?"]
   */
  lines: (str: Str) => str.split(/\n/g),

  /**
   * Take a substring given a start and end index.
   * Negative indexes are taken starting from the /end/ of the list.
   *
   * @example
   * slice(7)(9)("snakes on a plane!") === "on"
   * slice(0)(6)("snakes on a plane!") === "snakes"
   * slice(0)(-7)("snakes on a plane!") === "snakes on a"
   * slice(-6)(-1)("snakes on a plane!") === "plane"
   */
  slice: (startIndex: Num) => (endIndex: Num) => (str: Str) => str.slice(startIndex, endIndex),

  /**
   * Take /n/ characters from the left side of a string.
   *
   * @example
   * left(2)("Mulder") === "Mu"
   */
  left: (take: Num) => (str: Str) => str.slice(0, take),

  /**
   * Take /n/ characters from the right side of a string.
   *
   * @example
   * right(2)("Scully") === "ly"
   */
  right: (take: Num) => (str: Str) => str.slice(-take),

  /**
   * Drop /n/ characters from the left side of a string.
   *
   * @example
   * dropLeft(2)("The Lone Gunmen") === "e Lone Gunmen"
   */
  dropLeft: (drop: Num) => (str: Str) => str.slice(drop),

  /**
   * Drop /n/ characters from the left side of a string.
   *
   * @example
   * dropRight(2)("Cigarette Smoking Man") === "Cigarette Smoking M"
   */
  dropRight: (drop: Num) => (str: Str) => str.slice(0, -drop),

  pad: (thisMany: Num) => (padding: Str) => (str: Str) => {
    const pad = padding.repeat(thisMany)
    return pad + str + pad
  },

  padLeft: (thisMany: Num) => (padding: Str) => (str: Str) => {
    const pad = padding.repeat(thisMany)
    return pad + str
  },

  padRight: (thisMany: Num) => (padding: Str) => (str: Str) => {
    const pad = padding.repeat(thisMany)
    return str + pad
  },

  fromNumber: (num: Num) => num.toString(),

  /** 
   * regex test, based on https://www.regular-expressions.info/floatingpoint.html
   * should match all numbers (even those w/ exponents)
   */ 
  isFloat: (str: Str) =>
    /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str),

  toFloat: (str: Str): Maybe<Num> => {
    // b/c `parseFloat` will match strings
    // we may not want to include
    if (!Str.isFloat(str)) {
      return Nothing
    }
    const parsedFloat = parseFloat(str)
    return Object.is(parsedFloat, NaN)
      ? Nothing
      : Just(parsedFloat)
  },

  /** 
   * regex test, based on https://www.regular-expressions.info/floatingpoint.html
   * should match all numbers (even those w/ exponents), except decimals 
   */ 
  isInt: (str: Str) =>
    /^[-+]?[0-9]+([eE][+]?[0-9]+)?$/.test(str),

  toInt: (str: Str): Maybe<Num> => {
    // b/c `parseInt` will match strings
    // we may not want to include
    if (!Str.isInt(str)) {
      return Nothing
    }
    const parsedInt = parseInt(str)
    return Object.is(parsedInt, NaN)
      ? Nothing
      : Just(parsedInt)
  },

  toList: (str: Str) => str.split(""),

  fromList: (strList: List<Str>) => strList.join(""),

  cons: (toPrepend: Str) => (str: Str) => toPrepend + str,

  uncons: (str: Str): Maybe<Tuple<Str, Str>> =>
    str.slice(0, 1) === ""
      ? Nothing
      : Just([str.slice(0, 1), str.slice(1, str.length)]),

  map: (tranformFunc: (char: Str) => Str) => (str: Str) =>
    str.split("").map(tranformFunc).join(""),

  filter: (testFunc: (char: Str) => boolean) => (str: Str) =>
    str.split("").filter(testFunc).join(""),

  foldl: <T>(foldFn: (p1: Str) => (p2: T) => T) => (accumulator: T) => (str: Str): T => {
    const chars = str.split("")
    for (const i of chars) {
      accumulator = foldFn(i)(accumulator)
    }
    return accumulator
  },

  foldr: <T>(foldFn: (p1: Str) => (p2: T) => T) => (accumulator: T) => (str: Str): T => {
    const chars = str.split("")
    for (let i = chars.length - 1; i >= 0; --i) {
      accumulator = foldFn(chars[i])(accumulator)
    }
    return accumulator
  },

  any: (testFn: (char: Str) => boolean) => (str: Str): boolean =>
    str.split("").some(testFn),

  /**
   * Determine whether **all** characters pass the test.
   * 
   * @example
   * all(isDigit)("90210") === True
   * all(isDigit)("R2-D2") === True
   * all(isDigit)("heart") === True
   */
  all: (testFn: (char: Str) => boolean) => (str: Str): boolean =>
    str.split("").every(testFn)
}

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

  fromList: <T>(list: Dict<Str, T>[]) =>
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

// List
// 
// ...

export type List<T> = T[]

export const List = {

}

/**
 * Represents an ordered, unique set of values of the same type.  
 * As well as Tuples and Lists of Sequences
 */
export type Seq<T> = T[]

/**
 * Represents an ordered, unique set of values of the same type.  
 * As well as Tuples and Lists of Sequences
 */
export const Seq = {

  empty: (): Seq<Ord> => [],

  equals: <T>(a: Seq<Ord & T>) => (b: Seq<Ord & T>): boolean => {
    if (!b) return false
    if (a.length != b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] instanceof Array && b[i] instanceof Array) {
        // deno-lint-ignore no-explicit-any
        if(!Seq.equals(a[i] as any)(b[i] as any)) {
          return false
        }
      }
      else if (a[i] != b[i]) {
        return false
      }
    }
    return true
  },

  singleton: (a: Ord): Seq<Ord> => [a],

  fromList: <T>(list: List<Ord & T>): Seq<Ord & T> =>
    list.sort(Ord.compare).filter((value, index, sortedList) => {
      if (value instanceof Array) {
        // deno-lint-ignore no-explicit-any
        return !Seq.equals(value)(sortedList[index - 1] as any)
      }
      else {
        return value != sortedList[index - 1]
      }
    }),

  insert: <T>(a: Ord & T) => (b: Seq<Ord & T>): Seq<Ord & T> =>
    Seq.fromList([...b, a])

}

// tests

// sets
const s1 = Seq.insert(new Date())

const animals = Dict.fromList([{ 'Tom': 'Cat' }, { 'Jerry': 'Mouse' }])
const getTom = Dict.get('Tom')(animals) // -> Just('Tom')
const getValues = Dict.values({1: 'cat', 2: 'dog'})
const objUpdate = Dict.update<Str>('a_first')(() => Nothing)({ 'a': 'thing'})
const objUpdate_1 = Dict.update<Str>('a_first')(Maybe.map(Str.right(2)))(animals)

// ts doesn't know what the generic 'T' type should be for the alter function, so this won't compile
// this would be similar to the Haskell or Elm compiler yelling at you to provide a type annotation
// const objUpdate_2 = Record.update('a_first')(Maybe.map(String.right(2)))(animals)

// this will fail to compile because the generic type (`number`) doesn't fit with the alter function
// also, it doesn't fit with the `animals` record, so double-fail
// const objUpdate_3 = Record.update<number>('a_first')(Maybe.map(String.right(2)))(animals)

// the generic annotation is correct, and the alter function is correct (it uses string), but the 
// record we are operating against isn't correct
// const objUpdate_4 = Record.update<string>('a_first')(Maybe.map(String.right(2)))(['a', 'b', 'c'])

// the generic annotation matches the alter function (`Maybe<number>`), but the `animals` Record
// expects `Record<string, number>` (due to the `number` generic) but gets `Record<string, string>`
// from animals instead
// const objUpdate_5 = Record.update<number>('a_first')(Maybe.map(Number.add(2)))(animals)

// update function with pipe
// kinda messy
const objUpdate_6 = pipe(animals, Dict.update<Str>('Jerry')(Maybe.map(Str.right(2))))

// update function with pipe and accessor
// a litte better
const accessor = Dict.update<Str>('Jerry')
const objUpdate_7 = pipe(animals, accessor(Maybe.map(Str.right(2))))

// update function with pipe and composed update
// probably best
const objUpdate_8 = pipe(Str.right(2), Maybe.map, Dict.update<Str>('Jerry'))
const updateResult = objUpdate_8(animals)

const toValidMonth = (month: number) =>
  1 <= month && month <= 12
    ? Just(month) 
    : Nothing

// w/o using pipe
const parseMonth = (userInput: Str) =>
  // String.toNumber(userInput).chain(toValidMonth)
  // Maybe.andThen(toValidMonth)(String.toNumber(userInput))
  pipe(Str.toInt(userInput), Maybe.andThen(toValidMonth))

// using pipe
const parseMonth_p = (userInput: Str) =>
  pipe(userInput, Str.toInt, Maybe.andThen(toValidMonth))

// 3
const fromMaybeMapTest_1 = Maybe.map(Math.sqrt)(Just(9))
const fromMaybeMapTest_1p = pipe(Just(9), Maybe.map(Math.sqrt))

// this one reads better but its generally more flexible to use `pipe`
// const fromMaybeMapTest_1a = Just(9).map(Math.sqrt)
const fromMaybeMapTest_1a = Maybe.map(Math.sqrt)(Just(9))

// Nothing
const fromMaybeMapTest_2 = Maybe.map(Math.sqrt)(Nothing)
