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

// import all features
import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import {Keys, ContextWithParams, Body} from "../utils/types.ts";

// read keys for request
const keys:Keys = await JSON.parse(await Deno.readTextFile('./keys.json'))

// create new router
const router = new Router({prefix: "/tag"})

// router for ThatApiGuy (TAG)
router.get('/:id', async (ctx:ContextWithParams) => {
    const api: string = ctx.params.id.substr(0, 3);
    if (api === "cat" || api === "dog") {
        let body: Body = await (await fetch(`https://api.the${api}api.com/v1/images/search?api_key=${keys[api]}`)).json();
        ctx.response.body = body;
    }
    return;
});

// export router
export default router;