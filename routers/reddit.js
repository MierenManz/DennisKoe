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
 *  reddit.js
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */
// import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import { logger } from "../utils/logger.js";
import { tracker } from '../utils/tracker.js';

export default function (router) {
    router.get("/search/:reddit", async(c) => {
        let start = new Date().getTime();
        let body;
        try {
            body = await fetch(`https://www.reddit.com/r/${c.params.reddit}.json?sort=top&t=week`);
        } catch(e) {
            logger.error(e);
            return { error: "Reddit is offline"};
        }
        console.log(body);
        // Moet nog gemaakt worden
        // let allowed = body.data.children.filter(post => !post.data_over_18);
        // logger.debug('reddit/search found: ' + body.data.children.length + '/' + allowed.length);
        // const random = Math.floor(Math.random() * allowed.length);
        // console.log(allowed[random].data.url);
        // logger.debug('reddit/search took: ' + (new Date().getTime() - start) + "ms");
        // return allowed[random].data.url;
        return "not-done";
    }, tracker);
}