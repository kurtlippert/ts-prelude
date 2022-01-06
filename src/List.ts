import { Num } from './Num.ts'
import { Bool } from './Bool.ts'
import { Maybe } from './Maybe.ts'

// export enum ListType {
//   Empty = 'list-type__empty',
//   NonEmpty = 'list-type__nonempty'
// }

// export interface Empty {
//   type: typeof ListType.Empty
// }

// export const Empty: Empty = {
//   type: ListType.Empty
// }

// export interface NonEmpty<T> {
//   value: T,
//   next: List<T>
// }

export type Empty = 'Empty'
export type Node<T> = { value: T, next: List<T> } 

export type List<T>
  = Empty
  | { value: T, next: List<T> }
  // | Node<T>
  // = NonEmpty<T>
  // | Empty

export const List = {

  empty: () => 'Empty',

  fromArray: <T>(array: Array<T>): List<T> => {
    if (array.length === 1) {
      return 'Empty'
    }
    return {
      value: array[0],
      next: List.fromArray(array.slice(1, array.length))
    }
  },

  fromArr: () => {},

  singleton: <T>(value: T): List<T> => ({ value, next: 'Empty' }),

  repeat: <T>(num: Num) => (value: T) => {
    const list: List<T> = {
      value,
      next: 'Empty'
    }
    let current = list
    for (let i = 0; i < num - 1; i++) {
      current.next = { value, next: 'Empty' }
      current = current.next
    }
    return list
  },

  range: (num1: Num) => (num2: Num): List<Num> => {
    if (num1 > num2) return 'Empty'
    const list: List<Num> = {
      value: num1,
      next: 'Empty'
    }
    let current = list
    for (let i = num1 + 1; i <= num2; i++) {
      current.next = { value: i, next: 'Empty' }
      current = current.next
    }
    return list
  },

  map: <T, U>(mapFn: (a: T) => U) => (list: List<T>): List<U> => {
    if (list === 'Empty') return 'Empty'
    if (list.next === 'Empty') return ({ value: mapFn(list.value), next: 'Empty' })
    let newList = {
      value: list.value,
      next: { ...list.next }
    }
    console.log(newList)
    let current: any = newList
    while (current.next !== 'Empty') {
      current.value = mapFn(current.value)
      current = current.next
    }
    return newList as any
    // current.next = {
    //   value: nextValue,
    //   next: null
    // }
  }
}


/**
 * The `List` constructor.
 * Does _not_ use built-in js arrays.
 * See `List.fromArray` or `List.fromArr` for that.
 * 
 * @example
 * L(1)(2)(3) === { value: 1, next: { value: 2, next: { value: 3, next: null } } } 
 * L(1) === { value: 1, next: 'Empty' }
 * L() === 'Empty' 
 */
export const L = <T>(initialValue?: T) => {
  if (!initialValue) return 'Empty'
  const list: List<T> = {
    value: initialValue,
    next: 'Empty'
  }
  return function iter(nextValue?: T) {
    if (!nextValue) return list
    // add node
    let current = list
    while (current.next !== 'Empty') {
      current = current.next as Node<T>
    }
    (current as any).next = {
      value: nextValue,
      next: 'Empty'
    }

    // return new function to add another node
    return (nextValue?: T) => iter(nextValue)
  }
}
