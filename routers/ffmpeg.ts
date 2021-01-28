// Imports
import { Context, Router, ffmpeg } from "../deps.ts";
import { clearCache } from "../utils/clearcache.ts";
import { fileExist } from "../utils/filesystem.ts";
import { logger } from "../utils/logger.ts";


// Interfaces
interface FfmpegSettings {
    ffmpegDir: string;
    input: string
}
interface CrabboContext extends Context {
    params: {
        uppertext: string;
        bottomtext: string;
    };
}
interface ImposterContext extends Context {
    params: {
        name: string;
    };
}

// Cache Directory for crabbo mp4's
const crabboCacheRoot = `./cache/crabbovids/`;
const imposterCacheRoot = `./cache/impostervids/`;

// Make Cache Directory if it doesn't exist yet
if (!await fileExist(crabboCacheRoot)) await Deno.mkdir(crabboCacheRoot, {recursive: true});
if (!await fileExist(imposterCacheRoot)) await Deno.mkdir(imposterCacheRoot, {recursive: true});

// Crabbo settings
const crabboSettings: FfmpegSettings = {
    ffmpegDir: (Deno.build.os === 'windows') ? `./ffmpeg/ffmpeg.exe` : "ffmpeg",
    input: "./assets/crabbo/crab.mp4"
};


// Imposter settings
const imposterSettings: FfmpegSettings = {
    ffmpegDir: (Deno.build.os === 'windows') ? `./ffmpeg/ffmpeg.exe` : "ffmpeg",
    input: "./assets/imposter/video.mp4"
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
        await crabboFfmpegInstance.videoBitrate(1050, true).videoFilters({
            filterName: "drawtext",
            options: {
                fontfile: `./assets/crabbo/comicsans.ttf`,
                text: ctx.params.uppertext,
                fontsize: "60",
                x: (856 / 2 - 30 * ctx.params.uppertext.length / 2),
                y: "H-240",
                fontcolor: "white",
                shadowcolor: "black",
                shadowx: "2",
                shadowy: "2",
            }
        }, {
            filterName: "drawtext",
            options: {
                fontfile: `./assets/crabbo/comicsans.ttf`,
                text: ctx.params.bottomtext,
                fontsize: "60",
                x: (856 / 2 - 30 * ctx.params.bottomtext.length / 2),
                y: "H-170",
                fontcolor: "white",
                shadowcolor: "black",
                shadowx: "2",
                shadowy: "2",
            }
        }).save(crabboCacheRoot + filename);
        logger.debug(`Finished rendering crabbo in: ${(Date.now() - begin)} ms`);
    } else {
        logger.debug(`Crabbo with ${filename} is already cached!`);
    }
    ctx.response.body = await Deno.readFile(crabboCacheRoot + filename);
    logger.debug(`Finished sending crabbo in: ${(Date.now() - begin)} ms`);
    logger.debug(await clearCache(crabboCacheRoot, "crabbo", 5));
});


router.get("/imposter/:name", async (ctx: ImposterContext) => {
    console.log(ctx.request.headers);
    const begin: number = Date.now();
    const imposterFfmpegInstance = ffmpeg(imposterSettings);
    ctx.response.status = 200;
    const filename = `${ctx.params.name}.mp4`;
    if (!await fileExist(crabboCacheRoot + filename)) {
        logger.debug(`imposter with ${filename} is not cached yet. Creating it now!`);
        await imposterFfmpegInstance.videoBitrate(1050, true).videoFilters({
            filterName: "drawtext",
            options: {
                fontfile: `./assets/crabbo/comicsans.ttf`,
                text: ctx.params.name,
                fontsize: "60",
                x: (640 / 2 - 30 * ctx.params.name.length / 2),
                y: "H-120",
                fontcolor: "white",
                shadowcolor: "black",
                shadowx: "2",
                shadowy: "2",
            }
        }).save(imposterCacheRoot + filename);
        logger.debug(`Finished rendering Imposter in: ${(Date.now() - begin)} ms`);
    } else {
        logger.debug(`Imposter with ${filename} is already cached!`);
    }
    ctx.response.body = await Deno.readFile(imposterCacheRoot + filename);
    logger.debug(`Finished sending imposter in: ${(Date.now() - begin)} ms`);
    logger.debug(await clearCache(imposterCacheRoot, "imposter", 5));
});


// Export router
export default router;