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
interface Keys {
    [cat: string]: string,
    dog: string
}

interface Catergories {
    id?: number,
    name?: string
}
interface Body {
    breeds: string[],
    categories?: Catergories[],
    id: string,
    url: string,
    width: number
    height: number
}
interface ContextWithParams extends Context {
    params: {
        test: string,
        id: string
    }
}
// import all features
import { Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { tracker } from "../utils/tracker.ts";

// read keys for request
const keys:Keys = await JSON.parse(await Deno.readTextFile('./keys.json'))
// create new router
const router = new Router({prefix: "/tag"})

router.get('/:id', async (ctx:ContextWithParams) => {
    tracker(ctx);
    const api: string = ctx.params.id.substr(0, 3);
    if (api === "cat" || api === "dog") {
        let body: Body = await (await fetch(`https://api.the${api}api.com/v1/images/search?api_key=${keys[api]}`)).json();
        ctx.response.body = body;
    }
    return;
});

// export router
export default router;