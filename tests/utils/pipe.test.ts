import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'

import { Str } from '../../src/Str.ts'
import { Num } from '../../src/Num.ts'

import { pipe } from '../../src/utils/pipe.ts'

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
