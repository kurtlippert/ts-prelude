# ts-prelude
Shameless port of [NoRedInk's haskell custom prelude](https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude)
(which is itself a port of Elm's standard lib).  

Standard libraries aren't really a thing in Javascript.
Pretty much what you get globally is what you get.
There isn't any swapping out of `Set` or `Date` objects if you
want to use your own. Javascript (and by extension typescript),
doesn't always support robust default functions (for example,
`string.parseFloat` will parse `33s` as `33`).  

Enter `ts-prelude`, which seeks to provide the TypeScript developer
(what is effectively) a series of helper / utility functions to solve
common problems in code (hence why these functions and classes
would already be a part of any language's standard lib).  

## Notes on utility libs (lodash, rambda, etc.)
The TypeScript support for these libs have problems:

* Uncertainty through union types like `string | undefined | null`
* FP functions (`pipe`, `flow`, `compose`, etc.) don't have great
  typings (errors that should be caught by the compiler are not)


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

* Wanted types to be Capital Case (start w/ a capital letter)
* Wanted there to be a module associated with the type
* Wanted ability to redefine these types (add constraints etc.)
* Potentially aid in type signature readibility

Downsides are:  

1. Typescript will report the type as their base primitives
   unless one of the `ts-prelude` functions are called.
2. Having this mix b/t custom vs primitive types can be confusing / 
   annoying.

## Notes on various `no-explicity-any` disables throughout the code
This is b/c we're stretching the TypeScript type system in these files
as it is. Use of `any` is to get around JS-related limitations.
But in practice (and for use in apps), we would want to keep this rule.

### Maybe Type

### Tuple Type

base type: `[T, U]`

inspired by: 
https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude/src/Tuple.hs

### 'v4-bun' branch
Deviating from the api I'd originally envisioned toward one that makes use of [function overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#overload-signatures-and-the-implementation-signature).
I've discovered that for particular signatures, I'm unable to get typings to work decently so you might notice `_2` appended function signatures.
I don't expect these forms to be used often so I'm ok with it for now. Hopefully the curry / partial application story gets better for TS.
For now, I think I'm happy with the change.

[bun.sh](https://bun.sh) is being used to run the code in place of [deno](https://deno.land) as an experiment. It's only really being used for it's testing capabilities so we're not really extending too far w/ this atm to judge it's utility.
