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
 *  nekobot.js
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
    router.get('/changemymind/:text', async(c) => {
        let start = new Date().getTime();
        let body;
        try {
            body = await fetch('https://nekobot.xyz/api/imagegen?type=changemymind&text=' + c.params.text);
        } catch(e) {
            logger.error(e);
            return { error: "NekobotAPI is offline"};
        }
        logger.debug('nekobot/changemymind took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    }, tracker);
    router.get('/clyde/:text', async(c) => {
        let start = new Date().getTime();
        let body;
        try {
            body = await fetch('https://nekobot.xyz/api/imagegen?type=clyde&text=' + c.params.text);
        } catch(e) {
            logger.error(e);
            return { error: "NekobotAPI is offline"};
        }
        logger.debug('nekobot/clyde took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    }, tracker);
    router.get('/trumptweet/:text', async(c) => {
        let start = new Date().getTime();
        let body;
        try {
            body = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + c.params.text);
        } catch(e) {
            logger.error(e);
            return { error: "NekobotAPI is offline"};
        }
        logger.debug('nekobot/trumptweet took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    }, tracker);
}
