import { expect, test } from 'bun:test'

import * as Arr from "Arr"
import * as Num from "Num"
import { apply } from "../utils/apply"
import { pipe } from "../utils/pipe"
import { flow } from "../utils/flow"
// import { Just } from "Maybe"
// import { Dict, d } from "Dict"
// import { Num } from "Num";
// import { Str } from "Str";

test("'Arr' basic functions", () => {
  expect(Arr.length([])).toEqual(0)
  expect(Arr.isEmpty([])).toEqual(true)
  expect(Arr.length([1,2,3])).toEqual(3)
})

test("'Arr' 'initialize' tests", () => {
  expect(Arr.initialize(4)(() => 0)).toEqual([0,0,0,0])
  expect(Arr.initialize(4, () => 0)).toEqual([0,0,0,0])
  expect(apply(Arr.initialize, 4, () => 0)).toEqual([0,0,0,0])
  expect(pipe(4, Arr.initialize)(() => 0)).toEqual([0,0,0,0])
  expect(flow(Arr.initialize(4), Arr.length)(() => 0)).toEqual(4)
})

test("'Arr' 'foldl' tests", () => {
  expect(Arr.foldl(Num.add, 0, [1,2,3])).toEqual(6)
  expect(Arr.foldl(Arr.prepend, [], [1,2,3])).toEqual([3,2,1])
  // expect(apply(Arr.initialize, 4, () => 0)).toEqual([0,0,0,0])
  // expect(pipe(4, Arr.initialize)(() => 0)).toEqual([0,0,0,0])
  // expect(flow(Arr.initialize(4), Arr.length)(() => 0)).toEqual(4)
})

// test("'Arr' 'repeat' tests", () => {
//   expect(
//     Arr.repeat(4)(() => 0)[0](),
//     0 
//   )
//   assertEquals(
//     Arr.repeat(4)(() => 0).every(i => i() === 0),
//     true
//   )
//   assertEquals(
//     Arr.repeat(4)(0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     Arr.repeat(4, 0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     apply(Arr.repeat, 4, 0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     pipe(4, Arr.repeat)(0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     flow(Arr.repeat(4), Arr.length)(0),
//     4
//   )
// })

// Deno.test("'Arr' 'get' tests", () => {
//   assertEquals(
//     Arr.get(0)([0,1,2]),
//     Just(0)
//   )
//   assertEquals(
//     Arr.repeat(4)(() => 0).every(i => i() === 0),
//     true
//   )
//   assertEquals(
//     Arr.repeat(4)(0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     Arr.repeat(4, 0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     apply(Arr.repeat, 4, 0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     pipe(4, Arr.repeat)(0),
//     [0,0,0,0]
//   )
//   assertEquals(
//     flow(Arr.repeat(4), Arr.length)(0),
//     4
//   )
// })

// // TODO: separate into individual tests
// Deno.test("'Arr' 'set' tests", () => {
//   assertEquals(
//     Arr.set(1)(7)([0,1,2]),
//     [0,7,2]
//   )

//   // results in a type error
//   // use `set_2` instead
//   // assertEquals(
//   //   Arr.set(1)(7, [0,1,2]),
//   //   [0,7,2]
//   // )

//   assertEquals(
//     Arr.set_2(1)(7, [0,1,2]),
//     [0,7,2]
//   )

//   // results in a type error
//   // all elements need to be the type specified
//   // or TS will infer the type based on the first param
//   // assertEquals(
//   //   Arr.set_2(1)("foo", [0,1,3]),
//   //   [0,"foo",3]
//   // )
//   // assertEquals(
//   //   Arr.set(1)("foo")([0,1,3]),
//   //   [0,"foo",3]
//   // )
//   // assertEquals(
//   //   Arr.set(1, "foo")([0,1,3]),
//   //   [0,"foo",3]
//   // )

//   // type error
//   // assertEquals(
//   //   Arr.set(1, "foo", [0,1,3]),
//   //   [0,"foo",3]
//   // )

//   assertEquals(
//     Arr.set(1, 7)([0,1,2]),
//     [0,7,2]
//   )
//   assertEquals(
//     Arr.set(1, 7, [0,1,2]),
//     [0,7,2]
//   )
//   assertEquals(
//     apply(Arr.set, 1, 7, [0,1,2]),
//     [0,7,2]
//   )

//   // results in type error
//   // assertEquals(
//   //   pipe(1, Arr.set)(7, [0,1,2]),
//   //   [0,7,2]
//   // )

//   assertEquals(
//     pipe(1, Arr.set_2)(7, [0,1,2]),
//     [0,7,2]
//   )

//   assertEquals(
//     pipe(Arr.set(1, 7))([0,1,2]),
//     [0,7,2]
//   )

//   // if index is out of bounds, should just return
//   // the original array
//   assertEquals(
//     Arr.set(0, {'a': 1})([{},{}]),
//     [{'a': 1},{}]
//   )

//   // empty JSON objects are allowed
//   assertEquals(
//     Arr.set(0, {'a': 1})([{},{},{}]),
//     [{'a': 1},{},{}]
//   )

//   // as are empty Dicts
//   assertEquals(
//     Arr.set(0, {'a': 1})([d({}),d({}),d({})]),
//     [{'a': 1},d({}),d({})]
//   )

//   // won't allow this
//   // Arr.set on JS objects is tricky as we're extra strict on 
//   // this particular structure
//   // assertEquals(
//   //   Arr.set(1)({'a': 1})([{'c': 19}, {'b': 2}]),
//   //   [{'c': 19}, {'a': 1}]
//   // )

//   // instead try using a Dict:
//   assertEquals(
//     Arr.set(1)(d({'a': 1}))([d({'c': 19, 'd': 7}), d({'b': 2})]),
//     [d({'c': 19, 'd': 7}), d({'a': 1})]
//   )

//   // not everything needs to be a Dict tho
//   // TS can infer the type correctly if one of the values looks like a Dict
//   assertEquals(
//     Arr.set(1, d({'a': 1}), [{'b': 2}, {'c': 4}]),
//     [{'b': 2}, {'a': 1}]
//   )

//   // using the first overload
//   assertEquals(
//     Arr.set(1, d({'a': 1}), [d({'c': 19, 'd': 7}), d({'b': 2})]),
//     [d({'c': 19, 'd': 7}), d({'a': 1})]
//   )

//   // using "as" syntax 
//   assertEquals(
//     Arr.set(1, {'a': 1} as Dict<Num>, [{'c': 19, 'd': 7}, {'b': 2}]),
//     [{'c': 19, 'd': 7}, {'a': 1}]
//   )
// })

// Deno.test("'Arr' 'push' tests", () => {
//   assertEquals(
//     Arr.push<Num>(3, [1,2]),
//     [1,2,3]
//   )

//   // test overloads
//   assertEquals(
//     // Arr.push(3)([1,2]),
//     Arr.push(3 as Num)([1,2,3]),
//     [1,2,3]
//   )
// })
