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
 *  mod.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

// import oak app
import { Application, Context } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { tracker } from "./utils/tracker.ts"
import { ServerConfig } from "./utils/types.ts"

//read config
const config:ServerConfig = await JSON.parse(await Deno.readTextFile('./config.json'))

//import all routers
import thatApiGuy from "./routers/thatapiguy.ts";

// create new app
const app = new Application();


// add tracker
app.use(async (ctx:Context, next) => {
    await next();
    return tracker(ctx);
})

//add all routers
app.use(thatApiGuy.routes());
app.use(thatApiGuy.allowedMethods());

//start server
await app.listen({ port: config.port });