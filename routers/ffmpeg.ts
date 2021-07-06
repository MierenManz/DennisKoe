// Imports
import { Context, ffmpeg, Router } from "../deps.ts";
import { logger } from "../utils/logger.ts";
import { serverConfig } from "../utils/config_files.ts";
import { Cache } from "../utils/cache_layer.ts";

// Interfaces
interface FfmpegSettings {
  ffmpegDir: string;
  input: string;
}

interface CrabboContext extends Context {
  params: {
    uppertext: string;
    lowertext: string;
  };
}

// Crabbo settings
const crabboSettings: FfmpegSettings = {
  ffmpegDir: serverConfig.ffmpeg.binary,
  input: serverConfig.ffmpeg.videos.crabbo.video,
};

const crabboCache = new Cache<Uint8Array>(
  serverConfig.ffmpeg.videos.crabbo.cacheLimit,
);

const crabboDefaultFilters = {
  fontfile: serverConfig.ffmpeg.videos.crabbo.font,
  fontsize: "60",
  fontcolor: "white",
  shadowcolor: "black",
  shadowx: "2",
  shadowy: "2",
};

// Router
const router = new Router({ prefix: "/ffmpeg", methods: ["GET"] });

router.get("/crabbo/:uppertext/:lowertext", async (ctx: CrabboContext) => {
  const begin = Date.now();
  const { uppertext, lowertext } = ctx.params;
  const key = `${uppertext}||${lowertext}`;
  let vid: Uint8Array;
  if (crabboCache.has(key)) {
    vid = crabboCache.get(key).unwrap();
    logger.debug(`Crabbo with ${key} is already cached!`);
  } else {
    logger.debug(`Crabbo with ${key} wasn't found in cache`);
    const ffmpegInstance = ffmpeg(crabboSettings);

    ffmpegInstance
      .videoBitrate("750k", true)
      .videoFilters({
        filterName: "drawtext",
        options: {
          text: uppertext,
          x: (856 / 2 - 30 * uppertext.length / 2),
          y: "H-240",
          ...crabboDefaultFilters,
        },
      }, {
        filterName: "drawtext",
        options: {
          text: lowertext,
          x: (856 / 2 - 30 * lowertext.length / 2),
          y: "H-170",
          ...crabboDefaultFilters,
        },
      });

    vid = await ffmpegInstance.save("pipe:1", false, {
      f: "mp4",
      movflags: "frag_keyframe+empty_moov",
    });

    crabboCache.set(key, vid).unwrap();
    logger.debug(`Finished rendering crabbo in: ${(Date.now() - begin)} ms`);
  }

  ctx.response.status = 200;
  ctx.response.body = vid;
  logger.debug(`Finished sending crabbo in: ${(Date.now() - begin)} ms`);
});

// Export router
export default router;
