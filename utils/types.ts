/*
 * 
 *        :::::::::  
 *       :+:    :+:  
 *      +:+    +:+  
 *     +#+    +:+   
 *    +#+    +#+    
 *   #+#    #+#     
 *  #########   enniskoe
 * 
 *  types.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

import { Context } from "https://deno.land/x/oak@v6.4.0/mod.ts";

export interface ServerConfig {
    port: number
}
export interface Keys {
    [cat: string]: string,
    dog: string
}

export interface Catergories {
    id?: number,
    name?: string
}
export interface Body {
    breeds: string[],
    categories?: Catergories[],
    id: string,
    url: string,
    width: number
    height: number
}
export interface ContextWithParams extends Context {
    params: {
        test: string,
        id: string
    }
}