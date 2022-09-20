import { Opaque } from "./Opaque.ts";

/**
 * Numbers. Includes ints and floats  
 * 
 * @example
 * 1, 2, 3, -1, 1.0
 */
export type Num = Opaque<number, 'Num'>
