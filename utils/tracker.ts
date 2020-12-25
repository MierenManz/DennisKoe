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
import { bold, brightBlue, brightGreen, magenta, red } from "https://deno.land/std@0.82.0/fmt/colors.ts";
import { logger } from "./logger.ts";


export function tracker(c: Context): void {
    logger.info(`${magenta("Request")}  ${bold("[")}${red(c.request.method)}${bold("]")}  ${bold("[")}${brightGreen(c.request.ip)}${bold("]")} ${bold(brightBlue("=>"))} ${bold("[")}${brightGreen(String(c.request.url))}${bold("]")}`);
}