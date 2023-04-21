import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts"

import { Dict } from "../Dict.ts"
import { Num } from "../Num.ts"
import { Just, Maybe, Nothing } from '../Monad.ts/index'
import { Str } from "../Str.ts";
import { pipe } from "../utils/pipe.ts";
 
Deno.test("Maybe.withDefault", () => {
  assertEquals(
    Maybe.withDefault(100)(Just(42)),
    42
  )
  assertEquals(
    Maybe.withDefault(100)(Nothing),
    100
  )
  assertEquals(
    Maybe.withDefault("unknown")(Dict.get("Tom")(Dict.empty())),
    "unknown"
  )
})

Deno.test("Maybe.isNothing", () => {
  assertEquals(
    Maybe.isNothing(Just(42)),
    false
  )
  assertEquals(
    Maybe.isNothing(Nothing),
    true
  )
})

Deno.test("Maybe.map", () => {
  assertEquals(
    Maybe.map(Math.sqrt)(Just(9)),
    Just(3),
    "map 'Math.sqrt' over 'Just(9)'"
  )
  assertEquals(
    Maybe.map(Math.sqrt)(Nothing),
    Nothing,
    "map 'Math.sqrt' over 'Nothing'"
  )
  assertEquals(
    Maybe.map(Math.sqrt)(Str.toFloat("9")),
    Just(3),
    "map 'Math.sqrt' over 'Str.toFloat(\"9\")'"
  )
  assertEquals(
    Maybe.map(Math.sqrt)(Str.toFloat("x")),
    Nothing,
    "map 'Math.sqrt' over 'Str.toFloat(\"x\")'"
  )
})

Deno.test("Maybe.map2", () => {
  assertEquals(
    Maybe.map2(Num.add)(Just(3))(Just(4)),
    Just(7)
  )
  assertEquals(
    Maybe.map2(Num.add)(Just(3))(Nothing),
    Nothing
  )
  assertEquals(
    Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("123")),
    Just(124)
  )
  assertEquals(
    Maybe.map2(Num.add)(Str.toInt("x"))(Str.toInt("123")),
    Nothing
  )
  assertEquals(
    Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("1.3")),
    Nothing
  )
})

Deno.test("Maybe.map3", () => {
  const input: Dict<Num> = {
    'a': 1,
    'b': 2,
    'c': 3
  }
  const expected: Dict<Num> = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4
  }
  assertEquals(
    Maybe.map3(Dict.insert)(Just('d'))(Just(4))(Just(input)),
    Just(expected)
  )
  // assertEquals(
  //   Maybe.map2(Num.add)(Just(3))(Nothing),
  //   Nothing
  // )
  // assertEquals(
  //   Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("123")),
  //   Just(124)
  // )
  // assertEquals(
  //   Maybe.map2(Num.add)(Str.toInt("x"))(Str.toInt("123")),
  //   Nothing
  // )
  // assertEquals(
  //   Maybe.map2(Num.add)(Str.toInt("1"))(Str.toInt("1.3")),
  //   Nothing
  // )
})

Deno.test("Maybe.andThen", () => {
  const toValidMonth = (month: Num): Maybe<Num> =>
    1 <= month && month <= 12
      ? Just(month)
      : Nothing

  assertEquals(
    pipe(
      Str.toInt('blah'),
      Maybe.andThen(toValidMonth)
    ),
    Nothing
  )
  assertEquals(
    pipe(
      Str.toInt('-1'),
      Maybe.andThen(toValidMonth)
    ),
    Nothing
  )
  assertEquals(
    pipe(
      Str.toInt('1'),
      Maybe.andThen(toValidMonth)
    ),
    Just(1)
  )
})

  // assertEquals(
  //   Dict.fromList([{ "Tom": "Cat" }, { "Jerry": "Mouse" }]),
  //   { "Tom": "Cat", "Jerry": "Mouse"}
  // )

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

// Deno.test("'Dict' update tests", () => {
//   const input: Dict<Num> = {
//     'a': 1,
//     'b': 2,
//     'c': 3
//   }
//   const output: Dict<Num> = {
//     'a': 3,
//     'b': 2,
//     'c': 3
//   }
//   assertEquals(
//     // compile error
//     // Dict.update('a')(Maybe.map(Num.add(2)))(input),

//     // need to specify the type variable
//     Dict.update<Num>('a')(Maybe.map(Num.add(2)))(input),
//     output
//   )

//   assert(
//       Dict.update<Num>('b')(Maybe.map(Num.sub(9)))(input) !==
//       output
//   )
// })

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
