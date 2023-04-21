// import { Num } from './Num.ts'
// import { Bool } from './Bool.ts'
import { Maybe, just, nothing } from './Monad'
// import { Eq } from './Eq.ts'
// import { Ord } from './Ord.ts'
// import { Tuple } from './Tuple.ts'

import { curry } from "./utils/curry";

// export function repeat<A>(num: number, a: A): A[]
// export function repeat<A>(num: number, a: A): unknown {
//   return curry(function(_num: number, _a: A) {
//     const list = []
//     for (let i = 0; i < _num; i++) {
//       list.push(_a)
//     }
//     return list
//   })(num, a);
// }

export const isEmpty = <T>(t: T[]) =>
  t.length === 0

export const length = <T>(t: T[]) =>
  t.length

export type Init = {
  <T>(size: number, initFn: (index: number) => T): T[];
  <T>(size: number): <U extends T>(initFn: (index: number) => U) => U[];
}

export const init: Init = curry(<T>(size: number, initFn: (i: number) => T): T[] =>
  Array(size).fill(0).map((value, index) => initFn(index)));

export type Repeat = {
  <T>(size: number, item: T): T[];
  <T>(size: number): <U extends T>(item: U) => U[];
}

export const repeat: Repeat = curry(<T>(size: number, item: T) =>
  Array(size).fill(item));

export type Get = {
  <T>(index: number, itemArray: T[]): Maybe<T>;
  <T>(index: number): <U extends T>(itemArray: U[]) => Maybe<U>;
}

export const get: Get = curry(<T>(index: number, t: T[]): Maybe<T> => {
  if (t[index] !== undefined) {
    return just(t[index])
  }
  else {
    return nothing()
  }
})

export type Set = {
  <T>(index: number, item: T, itemArray: T[]): T[];
  <T>(index: number, item: T): (itemArray: T[]) => T[];
  <T>(index: number): {
    <U extends T>(item: U, itemArray: U[]): U[];
    <U extends T>(item: U): (itemArray: U[]) => U[];
  }
}

export const set: Set = curry(<T>(index: number, item: T, itemArray: T[]): T[] => {
  if (itemArray[index] !== undefined) {
    return itemArray.map((v, i) => i === index ? item : v)
  }
  else {
    return itemArray
  }
})

export type Push = {
  <T>(item: T, list: T[]): T[];
  <T>(item: T): (list: T[]) => T[];
}

export const push: Push = curry(<T>(item: T, list: T[]): T[] => [...list, item])

export type Prepend = {
  <T>(item: T, list: T[]): T[];
  <T>(item: T): (list: T[]) => T[];
}

export const prepend: Prepend = curry(<T>(item: T, list: T[]): T[] => [item, ...list])

export type FoldFn<T, U> = {
  (t: T, u: U): U;
  (t: T): (u: U) => U;
}

export type Fold = {
  <T, U>(foldFn: FoldFn<T, U>, initial: U, list: T[]): U;
  <T, U>(foldFn: FoldFn<T, U>, initial: U): (list: T[]) => U;
  <T, U>(foldFn: FoldFn<T, U>): {
    <V extends T, W extends U>(initial: V, list: W[]): W;
    <V extends T, W extends U>(initial: V): (list: W[]) => W;
  }
}

export const foldr: Fold = curry(<T, U>(foldFn: FoldFn<T, U>, initial: U, list: T[]): U =>
  list.reduceRight((acc, cur) => foldFn(cur, acc), initial))

export const foldl: Fold = curry(<T, U>(foldFn: FoldFn<T, U>, initial: U, list: T[]): U =>
  list.reduce((acc, cur) => foldFn(cur, acc), initial))

// export type Range = {
//   (a: number, b: number): b[];
//   (a: number): (b: number) => number[];
// }

// export const range: Range = curry(<T>(a: number, b: number) => Array(n).fill(t))

/**
 * TODO
 */
// export type Range = 
//   & (<A>(num: number, a: A) => A[])
//   & (<A>(num: number) => (a: A) => A[])

// /**
//  * TODO
//  */
// export const range: Range = curry(<A>(num: number, a: A) => {
//   const list = []
//   for (let i = 0; i < num; i++) {
//     list.push(a)
//   }
//   return list
// });

// export function range<A>(num: number, a: A): A[]
// export function range<A>(num: number): (a: A) => A[]
// export function range(): unknown {
//   return curry(function<A>(num: number, a: A) {
//     const list = []
//     for (let i = 0; i < num; i++) {
//       list.push(a)
//     }
//     return list 
//   })
// }

// range(1, [2])
// range(1)('foo')


// export const List = {

//   empty: (): List<never> => [],

//   singleton: <T>(t: T): List<T> => [t],

//   repeat: <T>(num: Num) => (t: T) => {
//     const list = []
//     for (let i = 0; i < num; i++) {
//       list.push(t)
//     }
//     return list
//   },

//   range: (a: Num, b: Num): List<Num> => {
//     const list: List<Num> = []
//     if (a > b) return list
//     for (let i = a; i <= b; i++) {
//       list.push(i)
//     }
//     return list
//   },

//   map: <T, U>(mapFn: (_: T) => U) => (list: List<T>): List<U> => {
//     if (list.length === 0) return []
//     const newList: List<U> = []
//     for (let i = 0; i < list.length; i++) {
//       newList.push(mapFn(list[i]))
//     }
//     return newList
//   },

//   indexedMap: <T, U>(mapFn: (index: Num) => (_: T) => U) => (list: List<T>): List<U> => {
//     if (list.length === 0) return []
//     const newList: List<U> = []
//     for (let i = 0; i < list.length; i++) {
//       newList.push(mapFn(i)(list[i]))
//     }
//     return newList
//   },

//   foldl: <T, U>(foldFn: (_: U) => (_: T) => U) => (u: U) => (list: List<T>): U => {
//     // imp 3
//     if (list.length === 0) return u 
//     u = foldFn(u)(list[0])
//     for (let i = 1; i < list.length; i++) {
//       u = foldFn(u)(list[i])
//     }
//     return u

//     // imp 2
//     // if (list.length === 0) return u
//     // u = foldFn(u)(list[0])
//     // return List.foldl(foldFn)(u)(list.slice(1))

//     // imp 1
//     // return list.reduce((acc, cur) => foldFn(acc)(cur), u)
//   },

//   foldr: <T, U>(foldFn: (_: T) => (_: U) => U) => (u: U) => (list: List<T>): U => {
//     // imp 3
//     if (list.length === 0) return u 
//     u = foldFn(list[list.length-1])(u)
//     for (let i = list.length-2; i >= 0; i--) {
//       u = foldFn(list[i])(u)
//     }
//     return u

//     // imp 2 (needs fixing)
//     // if (list.length === 0) return u 
//     // u = foldFn(list[list.length-1])(u)
//     // return List.foldr(foldFn)(u)(list.slice(0, list.length-1))

//     // imp 1
//     // return list.reduce((acc, cur) => foldFn(cur)(acc), u)
//   },

//   filter: <T>(filterFn: (_: T) => Bool) => (list: List<T>): List<T> =>
//     list.filter(filterFn),

//   filterMap: <T, U>(mapFn: (_: T) => Maybe<U>) => (list: List<T>): List<U> => {
//     const newList: List<U> = []
//     for (let i = 0; i < list.length - 1; i++) {
//       const newItem = mapFn(list[i])
//       if (newItem.type === MaybeType.Just) {
//         newList.push(newItem.value)
//       }
//     }
//     return newList
//   },

//   length: <T>(list: List<T>): Num =>
//     list.length,

//   reverse: <T>(list: List<T>): List<T> => {
//     const newList = []
//     for (let i = list.length-1; i >= 0; i--) {
//       newList.push(list[i])
//     }
//     return newList
//   },

//   member: <T>(value: Eq & T) => (list: List<Eq & T>): Bool => {
//     for (let i = 0; i < list.length; i++) {
//       if (Eq.equals(value, list[i])) {
//         return true
//       }
//     }
//     return false
//   },

//   all: <T>(test: (a: T) => Bool) => (list: List<T>): Bool => 
//     list.every(test),

//   any: <T>(test: (a: T) => Bool) => (list: List<T>): Bool =>
//     list.find(test) ? true : false,

//   maximum: <T>(list: List<T & Ord>): Maybe<T> => {
//     const sortedList = list.sort(Ord.compare)
//     const sortedListLength = list.sort(Ord.compare).length
//     if (sortedListLength > 0) {
//       return Just(sortedList[sortedListLength-1])
//     }
//     else {
//       return Nothing
//     }
//   },

//   minimum: <T>(list: List<T & Ord>): Maybe<T> => {
//     const sortedList = list.sort(Ord.compare)
//     const sortedListLength = list.sort(Ord.compare).length
//     if (sortedListLength > 0) {
//       return Just(sortedList[0])
//     }
//     else {
//       return Nothing
//     }
//   },

//   sum: (list: List<Num>): Num => {
//     let runningTotal = 0
//     for (let i = 0; i < list.length; i++) {
//       runningTotal = runningTotal + list[i]
//     }
//     return runningTotal
//   },

//   product: (list: List<Num>): Num => {
//     if (list.length === 0) return 0
//     let runningTotal = 1
//     for (let i = 0; i < list.length; i++) {
//       runningTotal = runningTotal * list[i]
//     }
//     return runningTotal
//   },

//   append: <T>(a: List<T>) => (b: List<T>): List<T> =>
//     [...a, ...b],

//   concat: <T>(listOfLists: List<List<T>>): List<T> => {
//     let newList: List<T> = []
//     for (let i = 0; i < listOfLists.length; i++) {
//       newList = [...newList, ...listOfLists[i]]
//     }
//     return newList
//   },

//   concatMap: <T, U>(mapFn: (a: T) => List<U>) => (list: List<T>): List<U> =>
//     List.concat(list.map(mapFn)),

//   intersperse: <T>(a: T) => (list: List<T>): List<T> => {
//     const newList = []
//     for (let i = 0; i < list.length; i++) {
//       newList.push(list[i])
//       if (i !== list.length - 1) {
//         newList.push(a)
//       }
//     }
//     return newList
//   },

//   map2: <T, U, V>(mapFn: (t: T) => (u: U) => V) => (tlist: List<T>) => (ulist: List<U>): List<V> => {
//     if (tlist.length === 0 || ulist.length === 0) return []
//     const newList: List<V> = []
//     const len = Maybe.withDefault
//       (0)
//       (List.minimum([tlist.length, ulist.length]))
//     for (let i = 0; i < len; i++) {
//       newList.push(mapFn(tlist[i])(ulist[i]))
//     }
//     return newList
//   },

//   map3: <T, U, V, W>(mapFn: (t: T) => (u: U) => (v: V) => W) => (tlist: List<T>) => (ulist: List<U>) => (vlist: List<V>): List<W> => {
//     if (tlist.length === 0 || ulist.length === 0 || vlist.length) return []
//     const newList: List<W> = []
//     const len = Maybe.withDefault
//       (0)
//       (List.minimum([tlist.length, ulist.length, vlist.length]))
//     for (let i = 0; i < len; i++) {
//       newList.push(mapFn(tlist[i])(ulist[i])(vlist[i]))
//     }
//     return newList
//   },

//   map4: <T, U, V, W, X>(mapFn: (t: T) => (u: U) => (v: V) => (w: W) => X) => (tlist: List<T>) => (ulist: List<U>) => (vlist: List<V>) => (wlist: List<W>): List<X> => {
//     if (tlist.length === 0 || ulist.length === 0 || vlist.length || wlist.length) return []
//     const newList: List<X> = []
//     const len = Maybe.withDefault
//       (0)
//       (List.minimum([tlist.length, ulist.length, vlist.length, wlist.length]))
//     for (let i = 0; i < len; i++) {
//       newList.push(mapFn(tlist[i])(ulist[i])(vlist[i])(wlist[i]))
//     }
//     return newList
//   },

//   map5: <T, U, V, W, X, Y>(mapFn: (t: T) => (u: U) => (v: V) => (w: W) => (x: X) => Y) => (tlist: List<T>) => (ulist: List<U>) => (vlist: List<V>) => (wlist: List<W>) => (xlist: List<X>): List<Y> => {
//     if (tlist.length === 0 || ulist.length === 0 || vlist.length || wlist.length || xlist.length) return []
//     const newList: List<Y> = []
//     const len = Maybe.withDefault
//       (0)
//       (List.minimum([tlist.length, ulist.length, vlist.length, wlist.length, xlist.length]))
//     for (let i = 0; i < len; i++) {
//       newList.push(mapFn(tlist[i])(ulist[i])(vlist[i])(wlist[i])(xlist[i]))
//     }
//     return newList
//   },

//   sort: <T>(list: List<Ord & T>): List<Ord & T> =>
//     list.sort(Ord.compare),

//   sortBy: <T>(fn: (t: T) => Ord) => (list: List<T>): List<T> =>
//     list.sort((a, b) => Ord.compare(fn(a), fn(b))),

//   sortWith: <T>(fn: (a: T) => (b: T) => Num) => (list: List<T>): List<T> =>
//     list.sort((a, b) => fn(a)(b)),

//   isEmpty: <T>(list: List<T>): Bool => list.length === 0,

//   head: <T>(list: List<T>): Maybe<T> =>
//     list.length > 0
//       ? Just(list[0])
//       : Nothing,

//   tail: <T>(list: List<T>): Maybe<List<T>> =>
//     list.length > 0
//       ? Just(list.slice(1, list.length))
//       : Nothing,

//   take: <T>(a: Num) => (list: List<T>): List<T> =>
//     list.slice(0, a),

//   drop: <T>(a: Num) => (list: List<T>): List<T> =>
//     list.slice(a, list.length),

//   partition: <T>(fn: (a: T) => Bool) => (list: List<T>): Tuple<List<T>, List<T>> =>
//     [list.filter(fn), list.filter(x => !fn(x))],

//   unzip: <T, U>(list: List<Tuple<T, U>>): Tuple<List<T>, List<U>> => {
//     const firstList: List<T> = []
//     const secondList: List<U> = []
//     for (let i = 0; i < list.length; i++) {
//       firstList.push(list[i][0])
//       secondList.push(list[i][1])
//     }
//     return [firstList, secondList]
//   }
// }
