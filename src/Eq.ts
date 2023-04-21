import { Str } from './Str.ts'
import { Num } from './Num.ts'
import { Bool } from './Bool.ts'
import { List } from './List.ts'
import { Tuple } from './Tuple.ts'
import { Dict } from './Dict.ts'
import { Maybe } from './Monad.ts/index'

export type EqBaseType
  = Str
  | Num
  | Bool
  | Date

export type Eq
  = EqBaseType
  | List<EqBaseType>
  | Tuple<EqBaseType, EqBaseType>
  | Maybe<EqBaseType>
  | Dict<EqBaseType>

export const Eq = {
  equals: <T>(a: Eq & T, b: Eq & T): Bool => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a === b
    }
    else if (typeof a === 'number' && typeof b === 'number') {
      return a === b
    }
    else if (typeof a === 'boolean' && typeof b === 'boolean') {
      return a === b
    }
    else if (a instanceof Date && b instanceof Date) {
      return a.valueOf() === b.valueOf()
    }
    else if (a instanceof Array && b instanceof Array) {
      if (a.length === 0 && b.length === 0) {
        return true
      }
      else {
        if (a.length === b.length) {
          for (let i = 0; i < a.length; i++) {
            return Eq.equals(a[i], b[i])
          }
        }
        else {
          return false
        }
      }
    }
    // only types left are `Maybe`s and `Dict`s
    else if (typeof a === 'object' && typeof b === 'object') {
      // we know it's a `Maybe` if passes the following conditions:
      const maybeConditions = [
        Object.keys(a)[0],
        Object.keys(a)[0] === 'type',
        Object.values(a)[0] === 'maybe-type__just',
        Object.values(a)[1],
        Object.keys(b)[0],
        Object.keys(b)[0] === 'type',
        Object.values(b)[0] === 'maybe-type__just',
        Object.values(b)[1],

        // Note the recursive condition, this is b/c the
        // value could be a nested Dict, List, or Tuple
        Eq.equals(Object.values(a)[1], Object.values(b)[1]),
      ]
      if (maybeConditions.every(i => i)) {
        return true
      }
      else {
        if (Object.keys(a).length === 0 && Object.keys(b).length === 0) {
          return true
        }
        const dictConditions = [
          Object.keys(a).length === Object.keys(b).length,

          // all of the keys (which _must_ be strings) must equal
          ...Object.keys(a).map((key, index) => key === Object.keys(b)[index]),

          // all of the values must equal
          // to account for nested dictionaries, we recurse the `equals` function
          ...Object.values(a).map((value, index) => Eq.equals(value, Object.values(b)[index]))
        ]
        if (dictConditions.every(i => i)) {
          return true
        }
      }
    }

    // if we missed something, just return 'false'
    return false
  }
}
