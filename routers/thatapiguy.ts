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
 *  thatapiguy.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

// import all types & classes
import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { API_KEYS, TagBody, TagContext } from "../utils/types.ts";

// create new router
const router = new Router({ prefix: "/tag" });

// router for ThatApiGuy (TAG)
router.get("/:id", async (ctx: TagContext) => {
    const api: string = ctx.params.id.substr(0, 3);
    if (api === "cat" || api === "dog") {
        const body: TagBody =await (await fetch(`https://api.the${api}api.com/v1/images/search?api_key=${API_KEYS[api]}`)).json();
        ctx.response.body = body;
    }
    return;
});

// export router
export default router;