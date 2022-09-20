import { Opaque } from "./Opaque.ts";

/**
 * Array-related operations. Generally you can use `List`  
 * 
 * **NOTE all elements must be the same type**
 * 
 * From nri-prelude:  
 * "Representation of fast immutable arrays"
 */
export type Arr<T> = Opaque<T[], 'Arr'>
// export type Arr<T extends []> = {
//   type: T,
//   value: []
// }

// enum ArrEnum { _ = "" }
// export type Arr<T> = ArrEnum & []
