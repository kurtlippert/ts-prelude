import { expect, test } from 'bun:test'

import * as Ord from "Ord"
// import * as Arr from "Arr"
// import { apply } from "../utils/apply"
// import { pipe } from "../utils/pipe"
// import { flow } from "../utils/flow"

test("'Ord' compare function", () => {
    expect(Ord.compare(1, 2)).toEqual(-1)
    expect(Ord.compare(2, 1)).toEqual(1)
//   expect(Arr.length([])).toEqual(0)
//   expect(Arr.isEmpty([])).toEqual(true)
//   expect(Arr.length([1,2,3])).toEqual(3)
})

// test("'Arr' 'initialize' tests", () => {
//   expect(Arr.initialize(4)(() => 0)).toEqual([0,0,0,0])
//   expect(Arr.initialize(4, () => 0)).toEqual([0,0,0,0])
//   expect(apply(Arr.initialize, 4, () => 0)).toEqual([0,0,0,0])
//   expect(pipe(4, Arr.initialize)(() => 0)).toEqual([0,0,0,0])
//   expect(flow(Arr.initialize(4), Arr.length)(() => 0)).toEqual(4)
// })