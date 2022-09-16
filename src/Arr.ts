import { Bool } from './Bool.ts'
import { Num } from './Num.ts'
import { Maybe, Just, Nothing } from './Maybe.ts'

export type Arr<T> = T[]

/**
 * Array-related operations. Generally you can use `List`
 */
export const Arr = {
  /**
   * Returns an empty JS array
   * 
   * Should this be a function?
   * 
   * @example
   * Arr.empty() === []
   */
  empty: (): Arr<unknown> => [],

  /**
   * Determines if an array is empty 
   * 
   * @example
   * Arr.isEmpty(Arr.empty()) === true
   */
  isEmpty: <T>(arr: Arr<T>): Bool => arr.length === 0,

  /**
   * Return the length of an array
   * 
   * @example
   * Arr.length([1, 2, 3]) === 3
   */
  length: <T>(arr: Arr<T>): number => arr.length,

  /**
   * 
   * Initialize an array. @initialize n f@ creates an array of length @n@ with
   * the element at index @i@ initialized to the result of @(f i)@.
   * 
   * @example
   * Arr.initialize(4)(i => i + 1) === [0,1,2,3]
   * Arr.initialize(4)(i => i * i) === [0,1,4,9]
   * Arr.initialize(4)(always 0)  == fromList [0,0,0,0] 
   */
  initialize: <T>(length: Num) => (fn: (a: Num) => T): Arr<T> => {
    const newArr: Arr<T> = []
    for (let i = 0; i < length; i++) {
      newArr.push(fn(i))
    }
    return newArr
  },

  repeat: <T>(a: Num) => (b: T): Arr<T> => {
    const newArr: Arr<T> = []
    for (let i = 0; i < a; i++) {
      newArr.push(b)
    }
    return newArr
  },

  get: <T>(index: Num) => (arr: Arr<T>): Maybe<T> => {
    if (arr[index]) {
      return Just(arr[index])
    }
    else {
      return Nothing
    }
  },

  set: <T>(index: Num) => (element: T) => (arr: Arr<T>): Arr<T> => {
    const newArr: Arr<T> = []
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        newArr.push(element)
      }
      newArr.push(arr[i])
    }
    return newArr
  },

  push: <T>(element: T) => (arr: Arr<T>): Arr<T> =>
    [...arr, element],

  foldl: <T, U>(fn: (_: U) => (_: T) => U) => (acc: U) => (arr: Arr<T>): U => {
    if (arr.length === 0) return acc
    acc = fn(acc)(arr[0])
    for (let i = 1; i < arr.length; i++) {
      acc = fn(acc)(arr[i])
    }
    return acc
  },

  foldr: <T, U>(fn: (_: T) => (_: U) => U) => (acc: U) => (arr: Arr<T>): U => {
    if (arr.length === 0) return acc
    acc = fn(arr[arr.length-1])(acc)
    for (let i = arr.length-2; i >= 0; i--) {
      acc = fn(arr[i])(acc)
    }
    return acc
  },

  filter: <A>(fn: (_: A) => Bool) => (arr: Arr<A>): Arr<A> =>
    arr.filter(fn),

  map: <A, B>(fn: (_: A) => B) => (arr: Arr<A>): Arr<B> =>
    arr.map(fn),

  indexedMap: <A, B>(fn: (_: Num) => (_: A) => B) => (arr: Arr<A>): Arr<B> =>
    arr.map((value: A, index: Num) => fn(index)(value)),

  append: <A>(arrleft: Arr<A>) => (arrRight: Arr<A>): Arr<A> =>
    [...arrleft, ...arrRight],

  slice: <A>(start: Num) => (end: Num) => (arr: Arr<A>): Arr<A> =>
    arr.slice(start, end)

}
