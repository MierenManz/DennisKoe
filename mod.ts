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
import { tracker } from "./utils/tracker.ts";
import { ServerConfig } from "./utils/types.ts";

// Read ServerConfig
const config:ServerConfig = await JSON.parse(await Deno.readTextFile('./config.json'));

//import all routers
import thatApiGuyRouter from "./routers/thatapiguy.ts";
import customRouter from "./routers/custom.ts";

// create new app
const app = new Application();


// add tracker
app.use(async (ctx:Context, next) => {
    if (String(ctx.request.url).includes('favicon') === false) tracker(ctx);
    await next();
    return;
});

//add all routers
app.use(thatApiGuyRouter.routes());
app.use(thatApiGuyRouter.allowedMethods());
app.use(customRouter.routes());
app.use(customRouter.allowedMethods());

//start server
await app.listen({ port: config.server.port });