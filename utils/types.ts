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
    server: {
        port: number;
        isProduction: boolean;
    }
}
export interface ApiKeys {
    [cat: string]: string;
    dog: string;
}

interface Catergories {
    id?: number;
    name?: string;
}
export interface Body {
    breeds: string[];
    categories?: Catergories[];
    id: string;
    url: string;
    width: number;
    height: number;
}
export interface TagContext extends Context {
    params: {
        test: string;
        id: string;
    }
}
export interface FfmpegSettings {
    ffmpegDir?: string;
    niceness?: number;
    fatalError?: boolean;
    source?: string;
}
export interface CrabboContext extends Context {
    params: {
        uppertext: string;
        bottomtext: string;
    }
}