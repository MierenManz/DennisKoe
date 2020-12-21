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
 *  tracker.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */
import { Context } from "https://deno.land/x/oak@v6.4.0/context.ts";
import { Logger } from "https://deno.land/x/optic@1.0.2/mod.ts";

const logger = new Logger();

export function tracker(c:Context): void {
    logger.debug(`Tracker: [${c.request.method}]: [${c.request.ip}] => [${c.request.url}]`);
}