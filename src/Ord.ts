import { Str } from './Str.ts' 
import { Num } from './Num.ts'

export type OrdBaseType
  = Str
  | Num
  | Date

/**
 * Order-able.
 * Anything that can be sorted
 */
export type Ord
  = OrdBaseType 
  | [OrdBaseType, OrdBaseType]
  | OrdBaseType[]

export const Ord = {
  compare: <T extends Ord>(a: T, b: T): Num => {
    // Shouldn't be necessary to check a _and_ b.
    // If the type system is doing it's job they need to be the same type
    // But helpful for the reader maybe?

    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b)
    }
    else if (typeof a === "number" && typeof b === "number") {
      return a - b
    }
    else if (a instanceof Date && b instanceof Date) {
      // typescript doesn't know how to deal with date math
      // so we have to cast to `any`
      // deno-lint-ignore no-explicit-any
      return (a as any) - (b as any)
    }

    // sort by the first element in tuple / array
    else if (a instanceof Array && b instanceof Array) {

      // undefined or empty arrays will take the bottom of the sort order
      // (though `undefined` shouldn't be possible if the type system
      //  is doing it's job)
      if (!a || a.length === 0) {
        return -Infinity
      }
      else if (!b || b.length === 0) {
        return Infinity
      }

      if (typeof a[0] === "string" && typeof b[0] === "string") {
        // check length if first elements are the same, longer arrays sort last
        if (a[0].localeCompare(b[0]) === 0) {
          return a.length - b.length
        }
        else {
          return a[0].localeCompare(b[0])
        }
      }
      else if (typeof a[0] === "number" && typeof b[0] === "number") {
        // check length if first elements are the same, longer arrays sort last
        if (a[0] - b[0] === 0) {
          return a.length - b.length
        }
        else {
          return a[0] - b[0]
        }
      }
      else if (a[0] instanceof Date && b[0] instanceof Date) {
        // check length if first elements are the same, longer arrays sort last
        // deno-lint-ignore no-explicit-any
        if ((a[0] as any) - (b[0] as any) === 0) {
          return a.length - b.length
        }
        else {
          // deno-lint-ignore no-explicit-any
          return (a[0] as any) - (b[0] as any)
        }
      }
    }
    return 0
  }
}
