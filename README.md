## Notes on currying
Why are there none? After all, there are currying implementations we could use.  

While true, they don't (yet) support generic types (i.e. Dependent typing).
Until then, we lose some of the typing benefit.  

`// add examples...`

## Notes on Type and Primitive Replacements

We've added the following (redundant) types:
* `Str`
* `Num`
* `Bool`
* `List`
* `Tuple`

All of which are represented in TypeScript / JavaScript in some form.
A few things here:  

1. Wanted types to be Capital Case (start w/ a capital letter)
2. Wanted there to be a module associated with the type
3. Wanted ability to redefine these types (add constraints etc.)
4. Potentially aid in type signature readibility

Downsides are:  

1. Typescript will report the type as their base primitives
   unless one of the `ts-prelude` functions are called.
2. Having this mix b/t custom vs primitive types can be confusing.

### Maybe Type

### Tuple Type

base type: `[T, U]`

inspired by: 
https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Tuple.hs
