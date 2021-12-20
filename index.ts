import { Maybe, Just, Nothing } from 'purify-ts/Maybe'
import { List } from 'purify-ts/List'
import { Tuple } from 'purify-ts/Tuple'

export const FromMaybe = {

}

export const Num = {

  sqrt: (num: number) => Math.sqrt(num),

  add: (num1: number) => (num2: number) => num1 + num2
}

export const Obj = {

  empty: () => ({}),

  get: <T>(key: string) => (obj: { [key: string]: T }) =>
    obj[key]
      ? Just(obj[key])
      : Nothing

}

const a = { a: 1, b: 2 }
const b = Obj.get('c')(a)
