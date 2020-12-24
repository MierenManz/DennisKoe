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

/*
 * Private Interfaces
 * 
 * Do not export any of these.
 * They should only be used as part of bigger interfaces!
 * Only those bigger interfaces should be exported
 * 
 * DON'T FUCKING TOUCH
 */

//Private Interface for TagBody.categories
interface Categories {
    id?: number;
    name?: string;
}

interface Operational {
    quotesAPI: string;
    dogAPI: string;
    catAPI: string;
    urbanAPI: string;
}

/*
 * Exportable Interfaces
 * 
 * Everything under here can be exported!
 */

//Config Interface for config.json
export interface ServerConfig {
    server: {
        port: number;
        isProduction: boolean;
    };
}

//Config Interface for keys.json
export interface ApiKeys {
    [cat: string]: string;
    dog: string;
    rapidapi: string;
}

//Settings Interface for Ffmpeg
export interface FfmpegSettings {
    ffmpegDir?: string;
    niceness?: number;
    fatalError?: boolean;
    source?: string;
}

//Extended Context for Crabbo
export interface CrabboContext extends Context {
    params: {
        uppertext: string;
        bottomtext: string;
    };
}

//Extended Context for Tag API
export interface TagContext extends Context {
    params: {
        test: string;
        id: string;
    };
}

//Body Interface for Status
export interface StatusBody {
    responseTime: number;
    operational: Operational;
}

//Body Interface for Tag API
export interface TagBody {
    breeds: string[];
    categories?: Categories[];
    id: string;
    url: string;
    width: number;
    height: number;
}

export const API_KEYS: ApiKeys = JSON.parse(
    await Deno.readTextFile("./keys.json"),
);