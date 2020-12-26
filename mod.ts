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

// Import oak app
import { Application, Context } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { bold, brightGreen, magenta } from "https://deno.land/std@0.82.0/fmt/colors.ts";
import { tracker } from "./utils/tracker.ts";
import { logger } from "./utils/logger.ts";
import { config } from "./utils/common.ts";
import { fileExist } from "./utils/filesystem.ts";

// Import all routers
import thatApiGuyRouter from "./routers/thatapiguy.ts";
import ffmpegRouter from "./routers/ffmpeg.ts";
import nekobotRouter from  "./routers/nekobot.ts";
import statusRouter from "./routers/status.ts";

// Create new app
const app = new Application();


// Add tracker
app.use(async (ctx: Context, next) => {
    if (String(ctx.request.url).includes("favicon") === false) tracker(ctx);
    await next();
    return;
});


// Add all routers
app.use(thatApiGuyRouter.routes());
app.use(thatApiGuyRouter.allowedMethods());
app.use(ffmpegRouter.routes());
app.use(ffmpegRouter.allowedMethods());
app.use(nekobotRouter.routes());
app.use(nekobotRouter.allowedMethods());
app.use(statusRouter.routes());
app.use(statusRouter.allowedMethods());


// Cache Directory
const cache = `${Deno.cwd()}/cache/`;

// Make cache dir if it doesn't exist
if (await fileExist(cache) === false) await Deno.mkdir(cache);


// Start server
logger.info(`${magenta("Listening")}  ${bold("[")}${brightGreen(String(config.server.port))}${bold("]")}`);
await app.listen({ port: config.server.port });