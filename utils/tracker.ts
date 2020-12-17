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
import { logger } from "../utils/logger.ts";

export function tracker(c:Context): void {
    logger.debug(`Tracker: [${c.request.method}]: [${c.request.ip}] => [${c.request.url}]`);
}