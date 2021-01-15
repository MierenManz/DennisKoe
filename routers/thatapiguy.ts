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

// Imports
import { Context, Router } from "../deps.ts";
import { API_KEYS } from "../utils/common.ts";


// Interfaces
interface Categories {
    id?: number;
    name?: string;
}
interface TagBody {
    breeds: string[];
    categories?: Categories[];
    id: string;
    url: string;
    width: number;
    height: number;
}
interface TagContext extends Context {
    params: {
        test: string;
        id: string;
    };
}


// create new router
const router = new Router({ prefix: "/tag", methods: ["GET"] });


// router for ThatApiGuy (TAG)
router.get("/:id", async (ctx: TagContext) => {
    const api: string = ctx.params.id.substr(0, 3);
    if (api === "cat" || api === "dog") {
        const body: TagBody = await (await fetch(`https://api.the${api}api.com/v1/images/search?api_key=${API_KEYS[api]}`)).json();
        ctx.response.body = body;
    }
    return;
});


// Export router
export default router;