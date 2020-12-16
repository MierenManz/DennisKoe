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
 *  tracker.js
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */
import { logger } from "../utils/logger.js";

export const tracker = next => c => {
    logger.debug(`Tracker: [${c.request.proto}] [${c.request.method}] [${c.request.url}]`); // Dunno waar ik kan zien van waar het request komt
    return next(c);
};