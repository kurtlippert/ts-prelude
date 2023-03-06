// import { Bool } from './Bool.ts'
// import { Num } from './Num.ts'
import { Maybe, Just, Nothing } from "Maybe"

export function empty<a>(): a[] {
  return [] as a[]
}

/**
 * Determine if an array is empty.
 * 
 * @example
 * Arr.isEmpty([]) // = true
 */
export function isEmpty<T>(arr: T[]): boolean {
  return arr.length === 0
}

/**
 * Return the length of an array
 * 
 * @example
 * Arr.length([1, 2, 3]) // = 3
 */
export function length<T>(arr: T[]): number {
  return arr.length
}

/**
 * Initialize an array.
 * 
 * @example
 * Arr.initialize(4, i => i + 1) // = [0,1,2,3]
 * Arr.initialize(4, i => i * i) // = [0,1,4,9]
 * Arr.initialize(4, () => 0)    // = [0,0,0,0] 
 */
export function initialize<T>(len: number, fn: (a: number) => T): T[]
export function initialize<T>(len: number): (fn: (a: number) => T) => T[]
export function initialize<T>(len: number, fn?: (a: number) => T): unknown {
  if (fn !== undefined) {
    const newArr: T[] = []
    for (let i = 0; i < len; i++) {
      newArr.push(fn(i))
    }
    return newArr
  }
  else {
    return function(fn: (a: number) => T): T[] {
      const newArr: T[] = []
      for (let i = 0; i < len; i++) {
        newArr.push(fn(i))
      }
      return newArr
    }
  }
}

/**
 * Creates an array with a given length, filled with a default element.  
 * 
 * NOTE that `Arr.repeat(3, "cat")` would be the same as `Arr.initialize(3, () => "cat")`
 * TODO: Add partial application overloads
 * 
 * @example
 * Arr.repeat(5, 0) === [0,0,0,0,0]
 * Arr.repeat(5, "cat") === ["cat","cat","cat"]
 */
export function repeat<T>(a: number, b: T): T[]
export function repeat<T>(a: number): (b: T) => T[]
export function repeat<T>(a: number, b?: T): unknown {
  if (b !== undefined) {
    const newArr: T[] = []
    for (let i = 0; i < a; i++) {
      newArr.push(b)
    }
    return newArr
  }
  else {
    return function(b: T): T[] {
      const newArr: T[] = []
      for (let i = 0; i < a; i++) {
        newArr.push(b)
      }
      return newArr
    }
  }
}

/**
 * Return `Just` the element at the index or `Nothing` if index is out of range.
 * 
 * @example
 * Arr.get(0,  [0,1,2]) === Just(0)
 * Arr.get(2,  [0,1,2]) === Just(2)
 * Arr.get(5,  [0,1,2]) === Nothing
 * Arr.get(-1, [0,1,2]) === Nothing
 */
export function get<T>(index: number, arr: T[]): Maybe<T>
export function get<T>(index: number): (arr: T[]) => Maybe<T>
export function get<T>(index: number, arr?: T[]): unknown {
  if (arr !== undefined) {
    if (arr[index] !== undefined) {
      return Just(arr[index])
    }
    else {
      return Nothing
    }
  }
  else {
    return function(arr: T[]): Maybe<T> {
      if (arr[index as unknown as number] !== undefined) {
        return Just(arr[index as unknown as number])
      }
      else {
        return Nothing
      }
    }
  }
}

/**
 * Set the element at a particular index. Returns an updated array.  
 * If the index is out of range, the array is unaltered.  
 * 
 * @example
 * Arr.set(1, 7, [1,2,3]) === [1,7,3]
 * Arr.set(1, 7)([1,2,3]) === [1,7,3]
 * Arr.set(1)(7)([1,2,3]) === [1,7,3]
 * 
 * // NOTE If the last branch is selected, there wont be the option
 * // to partially apply the remaining parameters.  
 * 
 * // TODO: make this overload work? (if possible)  
 * // export function set<T>(index: Num): <T>(element: T, arr: Arr<T>) => Arr<T>
 * 
 * @example
 * Arr.set(1)(7, [1,2,3]) // <- will result in TS error
 * 
 * Arr.set(1)(7)([1,2,3]) // <- must do this (working on a fix)
 */
export function set<T>(index: number, element: T, arr: T[]): T[]
export function set<T>(index: number, element: T): (arr: T[]) => T[]
export function set<T>(index: number): (element: T) => (arr: T[]) => T[]
export function set<T>(index: number, element?: T, arr?: T[]): unknown {
  const newArr: T[] = []
  if (element !== undefined && arr !== undefined) {
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        newArr.push(element)
      }
      else {
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  else if (element !== undefined && arr === undefined) {
    return function(arr: T[]): T[] {
      for (let i = 0; i < arr.length; i++) {
        if (i === index) {
          newArr.push(element)
        }
        else {
          newArr.push(arr[i])
        }
      }
      return newArr
    }
  }
  else if (element === undefined && arr === undefined) {
    return function(element: T): (arr: T[]) => T[] {
      return function(arr: T[]): T[] {
        for (let i = 0; i < arr.length; i++) {
          if (i === index) {
            newArr.push(element)
          }
          else {
            newArr.push(arr[i])
          }
        }
        return newArr
      }
    }
  }
}

/**
 * Set the element at a particular index. Returns an updated array.  
 * If the index is out of range, the array is unaltered.  
 * 
 * **ONLY ALLOWS THE FORM `(a) -> (b, c)`**  
 * **Use `set` for the other forms**
 * @example
 * Arr.set_2(1)(7, [0,1,2])
 */
export function set_2<T>(index: number): (element: T, arr: T[]) => T[]
export function set_2<T>(index: number): unknown {
  const newArr: T[] = []
  return function(element: T, arr?: T[]): unknown {
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        if (i === index) {
          newArr.push(element)
        }
        else {
          newArr.push(arr[i])
        }
      }
      return newArr
    }
    else {
      return function(arr: T[]): T[] {
        for (let i = 0; i < arr.length; i++) {
          if (i === index) {
            newArr.push(element)
          }
          else {
            newArr.push(arr[i])
          }
        }
        return newArr
      }
    }
  }
}

/**
 * Push an element onto the end of an array.
 * 
 * TODO: Add partial application overloads
 * 
 * @example
 * Arr.push(3, [1,2]) === [1,2,3]
 */
export function push<T>(element: T, arr: T[]): T[]
export function push<T>(element: T): (arr: T[]) => T[]
export function push<T>(element: T, arr?: T[]): unknown {
  if (arr !== undefined) {
    return [...arr, element]
  }
  else {
    return function(arr: T[]): T[] {
      return [...arr, element]
    }
  }
}

/**
 * Prepend a value to an array.
 * 
 * TODO: Look into faster solutions.
 * 
 * @example
 * Arr.prepend(0, [1,2,3]) // = [0,1,2,3]
 * Arr.prepend(0)([1,2,3]) // = [0,1,2,3]
 */
export function prepend<T>(element: T): (arr: T[]) => T[]
export function prepend<T>(element: T, arr?: T[]): unknown {
  if (arr) {
    const newArr = arr.slice()
    newArr.unshift(element)
    return newArr
  }
  else {
    return function(arr: T[]): T[] {
      const newArr = arr.slice()
      newArr.unshift(element)
      return newArr
    }
  }
}

/**
 * Reduce an array from the left. Read @foldl@ as fold from the left.
 * 
 * @example
 * // 3 forms
 * Arr.foldl(Num.add, 0, [1,2,3]) // = 6
 * Arr.foldl(Num.add, 0)([1,2,3]) // = 6 
 * Arr.foldl(Num.add)(0)([1,2,3]) // = 6
 * 
 * // 3 forms
 * Arr.foldl(Arr.prepend, [], [1,2,3]) // = [3,2,1]
 * Arr.foldl(Arr.prepend, [])([1,2,3]) // = [3,2,1]
 * Arr.foldl(Arr.prepend)([])([1,2,3]) // = [3,2,1]
 */
export function foldl<a, b>(fn: (a: a) => (b: b) => b, acc: b, arr: a[]): b
export function foldl<a, b>(fn: (a: a) => (b: b) => b, acc: b): (arr: a[]) => b
export function foldl<a, b>(fn: (a: a) => (b: b) => b): (acc: b) => (arr: a[]) => b
export function foldl<a, b>(fn: (a: a) => (b: b) => b, acc?: b, arr?: a[]): unknown {
  if (acc !== undefined && arr !== undefined) {
    if (arr.length === 0) return acc
    let newArr = fn(arr[0])(acc)
    for (let i = 1; i < arr.length; i++) {
      newArr = fn(arr[i])(newArr)
    }
    return newArr
  }
  else if (acc !== undefined && arr === undefined) {
    return function(arr: a[]): b {
      if (arr.length === 0) return acc
      let newArr = fn(arr[0])(acc)
      for (let i = 1; i < arr.length; i++) {
        newArr = fn(arr[i])(newArr)
      }
      return newArr
    }
  }
  else if (acc === undefined && arr === undefined) {
    return function(acc: b): (arr: a[]) => b {
      return function(arr: a[]): b {
        if (arr.length === 0) return acc
        let newArr = fn(arr[0])(acc)
        for (let i = 1; i < arr.length; i++) {
          newArr = fn(arr[i])(newArr)
        }
        return newArr
      }
    }
  }
}

/**
 * Set the element at a particular index. Returns an updated array.  
 * If the index is out of range, the array is unaltered.  
 * 
 * **ONLY ALLOWS THE FORM `(a) -> (b, c)`**  
 * **Use `set` for the other forms**
 * @example
 * Arr.set_2(1)(7, [0,1,2])
 */

// foldl: <T, U>(fn: (_: U) => (_: T) => U) => (acc: U) => (arr: Arr<T>): U => {
//   if (arr.length === 0) return acc
//   acc = fn(acc)(arr[0])
//   for (let i = 1; i < arr.length; i++) {
//     acc = fn(acc)(arr[i])
//   }
//   return acc
// },

// foldr: <T, U>(fn: (_: T) => (_: U) => U) => (acc: U) => (arr: Arr<T>): U => {
//   if (arr.length === 0) return acc
//   acc = fn(arr[arr.length-1])(acc)
//   for (let i = arr.length-2; i >= 0; i--) {
//     acc = fn(arr[i])(acc)
//   }
//   return acc
// },

// filter: <A>(fn: (_: A) => Bool) => (arr: Arr<A>): Arr<A> =>
//   arr.filter(fn),

// map: <A, B>(fn: (_: A) => B) => (arr: Arr<A>): Arr<B> =>
//   arr.map(fn),

// indexedMap: <A, B>(fn: (_: Num) => (_: A) => B) => (arr: Arr<A>): Arr<B> =>
//   arr.map((value: A, index: Num) => fn(index)(value)),

// append: <A>(arrleft: Arr<A>) => (arrRight: Arr<A>): Arr<A> =>
//   [...arrleft, ...arrRight],

// slice: <A>(start: Num) => (end: Num) => (arr: Arr<A>): Arr<A> =>
//   arr.slice(start, end)
