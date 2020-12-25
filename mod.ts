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
import { bold, brightGreen, magenta } from "https://deno.land/std@0.82.0/fmt/colors.ts";
import { tracker } from "./utils/tracker.ts";
import { logger } from "./utils/logger.ts";
import { ServerConfig } from "./utils/types.ts";

// Read ServerConfig
const config: ServerConfig = await JSON.parse(await Deno.readTextFile("./config.json"));

//import all routers
import thatApiGuyRouter from "./routers/thatapiguy.ts";
import customRouter from "./routers/custom.ts";
import nekobotRouter from  "./routers/nekobot.ts";
// create new app
const app = new Application();

// add tracker
app.use(async (ctx: Context, next) => {
    if (String(ctx.request.url).includes("favicon") === false) tracker(ctx);
    await next();
    return;
});

//add all routers
app.use(thatApiGuyRouter.routes());
app.use(thatApiGuyRouter.allowedMethods());
app.use(customRouter.routes());
app.use(customRouter.allowedMethods());
app.use(nekobotRouter.routes());
app.use(nekobotRouter.allowedMethods());
//start server
logger.info(`${magenta("Listening")}  ${bold("[")}${brightGreen(String(config.server.port))}${bold("]")}`);
await app.listen({ port: config.server.port });