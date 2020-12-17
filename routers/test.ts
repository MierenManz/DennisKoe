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
 *  test.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

import { Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { tracker } from "../utils/tracker.ts"

const router = new Router({prefix: "/test"})

router.get('/ree', async (ctx:Context) => {
    tracker(ctx);
    console.log(ctx.request.url)
    ctx.response.body = "Hello from testing!";
})

export default router;