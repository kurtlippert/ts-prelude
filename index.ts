import { Maybe, Nothing, Just } from "purify-ts/Maybe"
import { List } from "purify-ts/List"
import { Tuple } from "purify-ts/Tuple"
import { pipe } from "fp-ts/function"

// Math extensions

export const Num = {
  add: (value1: number) => (value2: number) => value1 + value2,
}

// additional 'Maybe' helpers

export const FromMaybe = {

  withDefault: <T>(_default: T) => (maybe: Maybe<T>) =>
    maybe.orDefault(_default),

  andThen: <T, U>(callback: (value: T) => Maybe<U>) => (nextMaybe: Maybe<T>) =>
    nextMaybe.caseOf({
      Just: callback,
      Nothing: () => Nothing
    }),

  map: <T, U>(fn: (value: T) => U) => (maybe: Maybe<T>) =>
    maybe.map(fn),

  map2: <T, U, V>(fn: (value1: T) => (value2: U) => V) => (maybe1: Maybe<T>) => (maybe2: Maybe<U>) => {
    const result1 = maybe1.extract()
    const result2 = maybe2.extract()
    if (!!result1 && !!result2) {
      const newResult1 = result1 as T
      const newResult2 = result2 as U
      return Just(fn(newResult1)(newResult2))
    }
    else {
      return Nothing
    }
  },

  map3: <T, U, V, W>(fn: (value1: T) => (value2: U) => (value3: V) => W) => (maybe1: Maybe<T>) => (maybe2: Maybe<U>) => (maybe3: Maybe<V>) => {
    const result1 = maybe1.extract()
    const result2 = maybe2.extract()
    const result3 = maybe3.extract()
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

  map4: <T, U, V, W, X>(fn: (value1: T) => (value2: U) => (value3: V) => (value4: W) => X) => (maybe1: Maybe<T>) => (maybe2: Maybe<U>) => (maybe3: Maybe<V>) => (maybe4: Maybe<W>) => {
    const result1 = maybe1.extract()
    const result2 = maybe2.extract()
    const result3 = maybe3.extract()
    const result4 = maybe4.extract()
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

  map5: <T, U, V, W, X, Y>(fn: (value1: T) => (value2: U) => (value3: V) => (value4: W) => (value5: X) => Y) => (maybe1: Maybe<T>) => (maybe2: Maybe<U>) => (maybe3: Maybe<V>) => (maybe4: Maybe<W>) => (maybe5: Maybe<X>) => {
    const result1 = maybe1.extract()
    const result2 = maybe2.extract()
    const result3 = maybe3.extract()
    const result4 = maybe4.extract()
    const result5 = maybe5.extract()
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
}

// String Helpers
// to replace those found w/ `lodash` that don't really support `Maybe`
// inspired by https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Text.hs

export const String = {

  /**
   * Determine if a string is empty.
   *
   * @example
   * isEmpty("") === true
   * isEmpty("the world") === false
   */
  isEmpty: (str: string) => str.length === 0,

  /**
   * Get the length of a string.
   *
   * @example
   * length("innumerable") === 11
   * length("") === 0
   */
  length: (str: string) => str.length,

  /**
   * Reverse a string.
   *
   * @example
   * reverse("stressed") === "desserts"
   */
  reverse: (str: string) =>
    str.split("").reduce((acc: string[], cur: string) => [cur, ...acc], []).join(""),

  /**
   * Repeat a string /n/ times.
   *
   * @example
   * repeat(3)("ha") === "hahaha"
   * const repeatThree = repeat(3)
   * repeatThree("ha") === "hahaha"
   */
  repeat: (thisMany: number) => (str: string) => str.repeat(thisMany),

  // === BUILDING AND SPLITTING ===

  /**
   * Append two strings.
   *
   * @example
   * append("butter")("fly") === "butterfly"
   * const prependButter = append("butter")
   * prependButter("fly") === "butterfly"
   */
  append: (leftStr: string) => (rightStr: string) => leftStr + rightStr,

  /**
   * Concatenate may strings into one.
   *
   * @example
   * concat(["never", "the", "less"]) === "nevertheless"
   */
  concat: (strList: string[]) => strList.join(""),

  /**
   * Split a string using a given separator.
   *
   * @example
   * split(",")("cat,dog,cow") === ["cat", "dog", "cow"]
   *
   * const splitComma = split(",")
   * splitComma("cat,dog,cow") === ["cat", "dog", "cow"]
   */
  split: (separator: string) => (str: string) => str.split(separator),

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
  join: (separator: string) => (strList: string[]) => strList.join(separator),

  /**
   * Break a string into words, splitting on chunks of whitespace.
   *
   * @example
   * words("How are \t you? \n Good?") === ["How", "are", "you?", "Good?"]
   */
  words: (str: string) => str.split(/\s/g).filter(s => s.length > 0),

  /**
   * Break a string into lines, splitting on newlines.
   *
   * @example
   * lines("How are you?\nGood?") === ["How are you?", "Good?"]
   */
  lines: (str: string) => str.split(/\n/g),

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
  slice: (startIndex: number) => (endIndex: number) => (str: string) => str.slice(startIndex, endIndex),

  /**
   * Take /n/ characters from the left side of a string.
   *
   * @example
   * left(2)("Mulder") === "Mu"
   */
  left: (take: number) => (str: string) => str.slice(0, take),

  /**
   * Take /n/ characters from the right side of a string.
   *
   * @example
   * right(2)("Scully") === "ly"
   */
  right: (take: number) => (str: string) => str.slice(-take),

  /**
   * Drop /n/ characters from the left side of a string.
   *
   * @example
   * dropLeft(2)("The Lone Gunmen") === "e Lone Gunmen"
   */
  dropLeft: (drop: number) => (str: string) => str.slice(drop),

  /**
   * Drop /n/ characters from the left side of a string.
   *
   * @example
   * dropRight(2)("Cigarette Smoking Man") === "Cigarette Smoking M"
   */
  dropRight: (drop: number) => (str: string) => str.slice(0, -drop),

  pad: (thisMany: number) => (padding: string) => (str: string) => {
    const pad = padding.repeat(thisMany)
    return pad + str + pad
  },

  padLeft: (thisMany: number) => (padding: string) => (str: string) => {
    const pad = padding.repeat(thisMany)
    return pad + str
  },

  padRight: (thisMany: number) => (padding: string) => (str: string) => {
    const pad = padding.repeat(thisMany)
    return str + pad
  },

  isNumber: (str: string) =>
    Object.is(parseFloat(str), NaN)
      ? false
      : true,

  fromNumber: (num: number) => num.toString(),

  toNumber: (str: string) => {
    const parsedFloat = parseFloat(str)
    return Object.is(parsedFloat, NaN)
      ? Nothing
      : Just(parsedFloat)
  },

  toList: (str: string) => str.split(""),

  fromList: (strList: string[]) => strList.join(""),

  cons: (toPrepend: string) => (str: string) => toPrepend + str,

  uncons: (str: string) =>
    str.slice(0, 1) === ""
      ? Nothing
      : Just(Tuple(str.slice(0, 1), str.slice(1, str.length))),

  map: (tranformFunc: (char: string) => string) => (str: string) =>
    str.split("").map(tranformFunc).join(""),

  filter: (testFunc: (char: string) => boolean) => (str: string) =>
    str.split("").filter(testFunc).join(""),

  foldl: <T>(foldFn: (p1: string) => (p2: T) => T) => (accumulator: T) => (str: string): T => {
    const chars = str.split("")
    for (let i of chars) {
      accumulator = foldFn(i)(accumulator)
    }
    return accumulator
  },

  foldr: <T>(foldFn: (p1: string) => (p2: T) => T) => (accumulator: T) => (str: string): T => {
    const chars = str.split("")
    for (let i = chars.length - 1; i >= 0; --i) {
      accumulator = foldFn(List.at(i, chars).orDefault(""))(accumulator)
    }
    return accumulator
  }
}

export const Obj = {

  empty: () => ({}),

  values: <T>(record: Record<string, T>) =>
    Object.keys(record).sort().map(key => record[key]),

  fromList: <T>(list: Record<string, T>[]) =>
    list
      .sort((a, b) => Object.keys(a)[0]
      .localeCompare(Object.keys(b)[0]))
      .reduce((acc, cur) => Object.assign(acc, { [Object.keys(cur)[0]]: Object.values(cur)[0] }), {}),

  toList: <T>(record: Record<string, T>) =>
    Object.keys(record).map(key => ({ [key]: record[key] })),

  // Get the value associated with a key. If the key is not found, return
  // @Nothing@. This is useful when you are not sure if a key will be in the
  // dictionary.
  //
  // > const animals = fromList([ Tuple('Tom', 'Cat'), Tuple('Jerry', 'Mouse') ])
  // >
  // > Obj.get("Tom")(animals) == Just('Cat')
  // > Obj.get("Jerry")(animals) == Just('Mouse')
  // > Obj.get("Spike")(animals) == Nothing
  get: <T>(key: string) => (obj: { [key: string]: T }) =>
    obj[key]
      ? Just(obj[key])
      : Nothing
}

// tests

// const animals = Obj.fromList([ Tuple('Tom', 'Cat'), Tuple('Jerry', 'Mouse') ])
const animals = Obj.fromList([{ 'Tom': 'Cat' }, { 'Jerry': 'Mouse' }])
const getTom = Obj.get('Tom')(animals) // -> Just('Tom')

const toValidMonth = (month: number) =>
  1 <= month && month <= 12
    ? Just(month)
    : Nothing

// w/o using pipe
const parseMonth = (userInput: string) =>
  String.toNumber(userInput).chain(toValidMonth)

// using pipe
const parseMonth_p = (userInput: string) =>
  pipe(userInput, String.toNumber, FromMaybe.andThen(toValidMonth))

// 3
const fromMaybeMapTest_1 = FromMaybe.map(Math.sqrt)(Just(9))
const fromMaybeMapTest_1p = pipe(Just(9), FromMaybe.map(Math.sqrt))

// this one reads better but its generally more flexible to use `pipe`
const fromMaybeMapTest_1a = Just(9).map(Math.sqrt)

// Nothing
const fromMaybeMapTest_2 = FromMaybe.map(Math.sqrt)(Nothing)

