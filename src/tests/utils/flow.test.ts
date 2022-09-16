import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts"

import { Str } from '../../Str.ts'
import { Num } from '../../Num.ts'

import { flow } from '../../utils/flow.ts'

Deno.test("'flow' function", () => {
  const len = (s: Str): Num => s.length
  const double = (n: Num): Num => n * 2
  const doubleLen = flow(len, double)
  assertEquals(
    doubleLen('aaa'),
    6
  )
  assertEquals(
    flow(len)('aaa'),
    3
  )

  // produces type errors
  // flow(len, double(2))
  // flow('aaa', len)
})
