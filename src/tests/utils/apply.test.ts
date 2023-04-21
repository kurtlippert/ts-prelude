import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts"

import { Str } from '../../Str.ts'
import { Num } from '../../Num.ts'

import { apply as ap } from "../../utils/apply.ts";
import { Just, Maybe } from "../../Monad.ts/index";

Deno.test("'apply' function", () => {
  const add = (a: number) => (b: number): Num => a + b
  const len = (s: Str): Num => s.length
  assertEquals(
    ap(len, 'a'),
    1
  )
  assertEquals(
    ap(add, 3, len('aaa')),
    6
  )
  assertEquals(
    ap(
      Maybe.map2,
      Num.add,
      Str.toInt("1"),
      Str.toInt("123")
    ),
    Just(124)
  )
})
