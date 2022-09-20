import { Ord } from './Ord.ts'
import { List } from './List.ts'

/**
 * Represents an ordered, unique set of values of the same type.  
 * Elements can also be Tuples or Lists of Sequences
 */
export type Seq<T> = T[]

export const Seq = {

  empty: (): Seq<Ord> => [],

  equals: <T extends Ord>(a: Seq<T>) => (b: Seq<T>): boolean => {
    if (!b) return false
    if (a.length != b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] instanceof Array && b[i] instanceof Array) {
        // deno-lint-ignore no-explicit-any
        if(!Seq.equals(a[i] as any)(b[i] as any)) {
          return false
        }
      }
      else if (Ord.compare(a[i], b[i]) !== 0) {
        return false
      }
    }
    return true
  },

  singleton: (a: Ord): Seq<Ord> => [a],

  fromList: <T extends Ord>(list: List<T>): Seq<T> =>
    list.sort(Ord.compare).filter((value: unknown, index: number, sortedList: unknown[]) => {
      if (value instanceof Array) {
        // deno-lint-ignore no-explicit-any
        return !Seq.equals(value)(sortedList[index - 1] as any)
      }
      else {
        return value != sortedList[index - 1]
      }
    }),

  insert: <T extends Ord>(a: T) => (b: Seq<T>): Seq<T> =>
    Seq.fromList([...b, a])
}
