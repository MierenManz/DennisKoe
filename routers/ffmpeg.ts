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
 *  ffmpeg.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

// Imports
import { Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import ffmpeg from "https://deno.land/x/deno_ffmpeg@1.2.2/mod.ts";
import { config } from "../utils/common.ts";
import { fileExist } from "../utils/filesystem.ts";
import { logger } from "../utils/logger.ts";


// Interfaces
interface FfmpegSettings {
    ffmpegDir?: string;
    niceness?: number;
    fatalError?: boolean;
    source?: string;
}
interface CrabboContext extends Context {
    params: {
        uppertext: string;
        bottomtext: string;
    };
}


// Cache Directory for crabbo mp4's
const crabboCacheRoot = `${Deno.cwd()}/cache/crabbovids/`;


// Make Cache Directory if it doesn't exist yet
if (await fileExist(crabboCacheRoot) === false) await Deno.mkdir(crabboCacheRoot);


// FfmpegSettings
const crabboSettings: FfmpegSettings = {
    ffmpegDir: (Deno.build.os === 'windows' ? "./ffmpeg/ffmpeg.exe" : "ffmpeg"),
    fatalError: true,
    source: "./assets/crabbo/crab.mp4"
};


// Router
const router = new Router({ prefix: "/ffmpeg", methods: ["GET"] });


router.get("/crabbo/:uppertext/:bottomtext", async (ctx: CrabboContext) => {
    const begin: number = Date.now();
    const crabboFfmpegInstance = ffmpeg(crabboSettings);
    ctx.response.status = 200;
    const filename = `${ctx.params.uppertext},${ctx.params.bottomtext}.mp4`;
    if (await fileExist(crabboCacheRoot + filename) === false) {
        logger.debug(`Crabbo with ${filename} is not cached yet. Creating it now!`);
        const end = new Promise((resolve) => crabboFfmpegInstance.on("end", resolve));
        crabboFfmpegInstance.videoBitrate(1050, true).videoFilters({
            filterName: "drawtext",
            options: {
                // vind een manier om fontfile werkend te krijgen
                fontfile: `${Deno.cwd()}/assets/crabbo/comicsans.ttf`,
                text: ctx.params.uppertext,
                fontsize: "60",
                x: (856 / 2 - 30 * ctx.params.uppertext.length / 2),
                y: "H-240",
                fontcolor: "white",
                shadowcolor: "black",
                shadowx: "2",
                shadowy: "2",
            },
            }, {
            filterName: "drawtext",
            options: {
                // vind een manier om fontfile werkend te krijgen
                fontfile: `${Deno.cwd()}/assets/crabbo/comicsans.ttf`,
                text: ctx.params.bottomtext,
                fontsize: "60",
                x: (856 / 2 - 30 * ctx.params.bottomtext.length / 2),
                y: "H-170",
                fontcolor: "white",
                shadowcolor: "black",
                shadowx: "2",
                shadowy: "2",
            },
        }).save(crabboCacheRoot + filename);
        await end;
        logger.debug(`Finished rendering crabbo in: ${((Date.now() - begin) / 1000).toFixed(3)} seconds`);
    } else {
        logger.debug(`Crabbo with ${filename} is already cached!`);
    }
    if (config.server.isProduction === false) ctx.response.headers.set("Content-Type", "video/mp4");
    ctx.response.body = await Deno.readFile(crabboCacheRoot + filename);
    logger.debug(`Finished sending crabbo in: ${((Date.now() - begin) / 1000).toFixed(3)} seconds`);
    let total = 0;
    for await (const file of Deno.readDir(crabboCacheRoot)) {
        total += (await Deno.stat(crabboCacheRoot + file.name)).size / 1024 / 1024 / 1024;
    }
    if (total >= 5) {
        const start: number = Date.now();
        for await (const file of Deno.readDir(crabboCacheRoot)) {
            Deno.remove(crabboCacheRoot + file.name);
        }
        logger.debug(`Crabbo cache has been cleared in ${Date.now() - start}ms!`);
    }
});


// Export router
export default router;