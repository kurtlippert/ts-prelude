import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { pipe } from "https://deno.land/x/fp_ts/function.ts"

import { Seq, List, Num, Str, Dict, Maybe, Ord } from './index.ts'

Deno.test("Set, fromList tests", () => {
  assertEquals(
    Seq.fromList([[1],[1],[2,1],[],[3],[]]),
    [[],[1],[2,1],[3]]
  )

  assertEquals(
    pipe(
      [[1], [1], [2,1], [], [3], []],
      Seq.fromList
    ),
    [[], [1], [2,1], [3]]
  )

  assertEquals(
    // need to specify the type we're inserting b/c typescript can't infer it
    Seq.insert<List<Num>> ([]) (Seq.fromList ([[1],[1],[2,1],[],[3],[]])),
    [[],[1],[2,1],[3]]
  )

})
