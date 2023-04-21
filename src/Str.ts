import { Num } from './Num.ts'
import { List } from './List.ts'
import { Maybe, Just, Nothing } from './Monad.ts/index'
import { Tuple } from './Tuple.ts'

export type Str = string

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
  concat: (strList: List<Str>): Str => strList.join(""),

  /**
   * Split a string using a given separator.
   *
   * @example
   * split(",")("cat,dog,cow") === ["cat", "dog", "cow"]
   *
   * const splitComma = split(",")
   * splitComma("cat,dog,cow") === ["cat", "dog", "cow"]
   */
  split: (separator: Str) => (str: Str): List<Str> => str.split(separator),

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
  join: (separator: Str) => (strList: List<Str>): Str => strList.join(separator),

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
