import { assertEquals, assert } from "https://deno.land/std@0.119.0/testing/asserts.ts";

import { pipe } from './pipe.ts'
import { flow } from './flow.ts'

import { Seq, List, Num, Str, Dict, Maybe, Ord, Bool } from './index.ts'

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

Deno.test("'Set' module functions", () => {
  assertEquals(
    Seq.fromList([[1],[1],[2,1],[],[3],[]]),
    [[],[1],[2,1],[3]]
  )

  // or.... (maybe more readable?)
  assertEquals(
    pipe(
      [[1], [1], [2,1], [], [3], []],
      Seq.fromList
    ),
    [[], [1], [2,1], [3]]
  )

  assertEquals(
    // Need to specify the type we're inserting b/c typescript can't infer it.
    Seq.insert<List<Num>>([])(Seq.fromList ([[1],[1],[2,1],[],[3],[]])),
    [[],[1],[2,1],[3]]
  )

  assertEquals(
    // Alt way to write this
    // In JS, the parens for the function can go anywhere
    // (so long as they are the next symbol picked up by the compiler).
    // We take advantage of this to produce something that (kinda?)
    // reads a little better
    Seq.insert<List<Num>>
      ([])
      (Seq.fromList ([[1],[1],[2,1],[],[3],[]])),
    [[],[1],[2,1],[3]]
  )

  assertEquals(
    // 3rd way to write this
    Seq.insert<List<Num>>
      // We need the params here (even tho they're
      // technically just noise)
      ([])

      // _may_ read a little better?
      // At this point, these things come down to style.
      // _I_ personally really like using pipe often.
      // It seems to read more left-to-right imo but there
      // is a bit of noise to this w/ the extra parens + `pipe`.
      // This would likely confuse many linters requiring customizations,
      // but one can dream...
      (pipe(
        [[1],[1],[2,1],[],[3],[]],
        Seq.fromList
      )),

    [[],[1],[2,1],[3]]
  )

  // Produces type error
  // ...
})

Deno.test("'Set' equals tests", () => {
  assert(
    Seq.equals([])([])
  )

  assert(
    pipe(
      Seq.equals([1])([2]),
      Bool.not
    )
  )

  assert(
    Seq.equals
      ([1,2,[1,3]])
      ([1,2,[1,3]])
  )

  assert(
    Seq.equals
      ([new Date('12-01-2021'), new Date('12-12-2021'), new Date('12-05-2021')])
      ([new Date('12-01-2021'), new Date('12-12-2021'), new Date('12-05-2021')])
  )
})
