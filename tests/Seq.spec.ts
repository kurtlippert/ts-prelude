import { assertEquals, assert } from "https://deno.land/std@0.119.0/testing/asserts.ts";

import { pipe } from '../src/utils/pipe.ts'
import { flow } from '../src/utils/flow.ts'

import { Seq } from '../src/Seq.ts'
import { List } from '../src/List.ts'
import { Num } from '../src/Num.ts'
import { Bool } from '../src/Bool.ts'

Deno.test("'Seq' module functions", () => {
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
