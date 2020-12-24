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
 *  custom.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

// import all types & classes
import { Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import ffmpeg from "https://deno.land/x/deno_ffmpeg@1.2.2/mod.ts";
import { API_KEYS, CrabboContext, FfmpegSettings, ServerConfig, StatusBody } from "../utils/types.ts";
import { fileExist } from "../utils/filesystem.ts";
import { logger } from "../utils/logger.ts";

// Cache Directory for crabbo mp4's
const crabboCacheRoot = `${Deno.cwd()}/cache/crabbovids/`;

// Make Cache Directory if it doesn't exist yet
if (!await fileExist(crabboCacheRoot)) await Deno.mkdir(crabboCacheRoot);

// FfmpegSettings
const crabboSettings: FfmpegSettings = {
  ffmpegDir: (Deno.build.os === 'linux' ? "ffmpeg" : "./ffmpeg/ffmpeg"),
  fatalError: true,
  source: "./assets/crabbo/crab.mp4"
};

// Read ServerConfig
const config: ServerConfig = await JSON.parse(await Deno.readTextFile("./config.json"),);

// Router
const router = new Router({ prefix: "/custom", methods: ["GET", "POST"] });

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
    if (config.server.isProduction === false) {ctx.response.headers.set("Content-Type", "video/mp4");}
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

router.get("/status", async (ctx: Context) => {
    const start: number = Date.now();
    const results = await getStatus();
    const responseOBJ: StatusBody = {
        responseTime: Date.now() - start,
        operational: {
            quotesAPI: results[0],
            dogAPI: results[1],
            catAPI: results[2],
            urbanAPI: results[3],
        },
    };
    ctx.response.body = responseOBJ;
});

async function getStatus(): Promise<string[]> {
    const result: string[] = [];
    const urls: string[] = [
        `https://api.thedogapi.com/v1/images/search`,
        `https://api.thecatapi.com/v1/images/search`,
        "http://api.urbandictionary.com/v0/define?term=f",
    ];
    try {
        await fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
            headers: [
                ["x-rapidapi-host", "quotes15.p.rapidapi.com"],
                ["x-rapidapi-key", API_KEYS.rapidapi]
            ],
        });
        result.push("<:online:612617210514374656> Operationeel");
        logger.debug("https://quotes15.p.rapidapi.com/quotes/random/ : Online")
    } catch (e) {result.push("<:offline:612617210560512000> Offline");logger.debug("https://quotes15.p.rapidapi.com/quotes/random/ : Offline")}
    urls.forEach((path) => {
        try {
            fetch(path);
            result.push("<:online:612617210514374656> Operationeel");
            logger.debug(path + ": Online");
        } catch (e) {result.push("<:offline:612617210560512000> Offline");logger.debug(path + ": Offline")}
    });
    return result;
}
export default router;