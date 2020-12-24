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

// import all types & classes
import { Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";

const router = new Router({ prefix: "/test" });

router.get("/ree", (ctx: Context) => {
    ctx.response.body = "Hello from testing!";
    return;
});

export default router;
