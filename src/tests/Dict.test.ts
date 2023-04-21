import { assertEquals, assert } from "https://deno.land/std@0.156.0/testing/asserts.ts"

import { Dict } from "../Dict.ts"
import { Num } from "../Num.ts"
import { Maybe } from '../Monad.ts/index'
 
Deno.test("'Dict' 'fromList' tests", () => {
  assertEquals(
    Dict.fromList([{ "Tom": "Cat" }, { "Jerry": "Mouse" }]),
    { "Tom": "Cat", "Jerry": "Mouse"}
  )

  // assertEquals(
  //   Dict.fromList([
  //     { "first": 1, "second": 2 },
  //     { "third": 3, "fourth": 4, "fifth": 5 }
  //   ]),
  //   {
  //     "first": 1,
  //     "second": 2,
  //     "third": 3,
  //     "fourth": 4,
  //     "fifth": 5
  //   }
  // )
})

Deno.test("'Dict' update tests", () => {
  const input: Dict<Num> = {
    'a': 1,
    'b': 2,
    'c': 3
  }
  const output: Dict<Num> = {
    'a': 3,
    'b': 2,
    'c': 3
  }
  assertEquals(
    // compile error
    // Dict.update('a')(Maybe.map(Num.add(2)))(input),

    // need to specify the type variable
    Dict.update<Num>('a')(Maybe.map(Num.add(2)))(input),
    output
  )

  assert(
      Dict.update<Num>('b')(Maybe.map(Num.sub(9)))(input) !==
      output
  )
})

// const animals = Dict.fromList([{ 'Tom': 'Cat' }, { 'Jerry': 'Mouse' }])
// const getTom = Dict.get('Tom')(animals) // -> Just('Tom')
// const getValues = Dict.values({1: 'cat', 2: 'dog'})
// const objUpdate = Dict.update<Str>('a_first')(() => Nothing)({ 'a': 'thing'})
// const objUpdate_1 = Dict.update<Str>('a_first')(Maybe.map(Str.right(2)))(animals)

// ts doesn't know what the generic 'T' type should be for the alter function, so this won't compile
// this would be similar to the Haskell or Elm compiler yelling at you to provide a type annotation
// const objUpdate_2 = Dict.update('a_first')(Maybe.map(String.right(2)))(animals)

// this will fail to compile because the generic type (`number`) doesn't fit with the alter function
// also, it doesn't fit with the `animals` record, so double-fail
// const objUpdate_3 = Dict.update<number>('a_first')(Maybe.map(String.right(2)))(animals)

// the generic annotation is correct, and the alter function is correct (it uses string), but the 
// record we are operating against isn't correct
// const objUpdate_4 = Dict.update<string>('a_first')(Maybe.map(String.right(2)))(['a', 'b', 'c'])

// the generic annotation matches the alter function (`Maybe<number>`), but the `animals` Dict
// expects `Dict<string, number>` (due to the `number` generic) but gets `Dict<string, string>`
// from animals instead
// const objUpdate_5 = Dict.update<number>('a_first')(Maybe.map(Number.add(2)))(animals)

// update function with pipe
// kinda messy
// const objUpdate_6 = pipe(animals, Dict.update<Str>('Jerry')(Maybe.map(Str.right(2))))

// update function with pipe and accessor
// a litte better
// const accessor = Dict.update<Str>('Jerry')
// const objUpdate_7 = pipe(animals, accessor(Maybe.map(Str.right(2))))

// update function with pipe and composed update
// probably best
// const objUpdate_8 = pipe(Str.right(2), Maybe.map, Dict.update<Str>('Jerry'))
// const updateResult = objUpdate_8(animals)

// const toValidMonth = (month: number) =>
//   1 <= month && month <= 12
//     ? Just(month) 
//     : Nothing

// w/o using pipe
// const parseMonth = (userInput: Str) =>
  // String.toNumber(userInput).chain(toValidMonth)
  // Maybe.andThen(toValidMonth)(String.toNumber(userInput))
  // pipe(Str.toInt(userInput), Maybe.andThen(toValidMonth))

// using pipe
// const parseMonth_p = (userInput: Str) =>
//   pipe(userInput, Str.toInt, Maybe.andThen(toValidMonth))

// 3
// const fromMaybeMapTest_1 = Maybe.map(Math.sqrt)(Just(9))
// const fromMaybeMapTest_1p = pipe(Just(9), Maybe.map(Math.sqrt))

// this one reads better but its generally more flexible to use `pipe`
// const fromMaybeMapTest_1a = Just(9).map(Math.sqrt)
// const fromMaybeMapTest_1a = Maybe.map(Math.sqrt)(Just(9))

// Nothing
// const fromMaybeMapTest_2 = Maybe.map(Math.sqrt)(Nothing)
