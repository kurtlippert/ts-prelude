# ts-prelude
Shameless port of [NoRedInk's haskell custom prelude](https://github.com/NoRedInk/haskell-libraries/blob/trunk/nri-prelude)
(which is itself a port of Elm's standard lib).  

### The problem with TS's `filter`  
![image](https://user-images.githubusercontent.com/5053769/180013214-88cf005f-385c-4692-ba6b-87c8e77acf8b.png)  

One of the goals of this project is to help TS out during these times of uncertainty

## Why write this?
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
