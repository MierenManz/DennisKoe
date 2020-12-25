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
 *  nekobot.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

// Imports
import { Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";


// Interfaces
interface NekoContext extends Context {
    params: {
        id: string;
        text: string;
    };
}
const router = new Router({ prefix: "/nekobot", methods: ["GET"] });

router.get("/:id/:text", (ctx: NekoContext) => {
    ctx.response.body = `https://nekobot.xyz/api/imagegen?type=${ctx.params.id}&text=${ctx.params.text}&raw=1`;
    return;
});


// Export router
export default router;
