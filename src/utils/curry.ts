/**
 * from https://medium.com/@juliomatcom/an-elegant-and-simple-curry-f-implementation-in-javascript-cf36252cff4c
 * 
 * types are mangled so this function shouldn't be used externally (at that point, just use something like ramda)
 */
export function curry(f: Function) {
  return function currify(): any {
    const args = Array.prototype.slice.call(arguments);
    return args.length >= f.length ?
      f.apply(null, args) :
      currify.bind(null, ...args as never[])
  }
}
