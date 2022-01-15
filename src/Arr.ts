import { Bool } from './Bool.ts'
import { Num } from './Num.ts'
import { Maybe, Just, Nothing } from './Maybe.ts'

export type Arr<T> = T[]

export const Arr = {
  empty: (): Arr<unknown> => [],

  isEmpty: <T>(arr: Arr<T>): Bool => arr.length === 0,

  length: <T>(arr: Arr<T>): number => arr.length,

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

}
