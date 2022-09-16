import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts"

import { Str } from '../../Str.ts'
import { Num } from '../../Num.ts'

import { pipe } from '../../utils/pipe.ts'

Deno.test("'pipe' function", () => {
  const len = (s: Str): Num => s.length
  const double = (n: Num): Num => n * 2
  assertEquals(
    pipe(3),
    3
  )
  assertEquals(
    pipe('aaa', len, double),
    6
  )

  // produces type error
  // pipe(len, double)
  // pipe('aaa', 'b')
})
