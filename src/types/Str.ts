import { Opaque } from "./Opaque.ts";

/**
 * Strings / Text  
 * 
 * @example
 * "cat", "dog", "1", "-1", ""
 */
export type Str = Opaque<string, 'Str'>
