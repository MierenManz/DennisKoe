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
import { Router, send } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import ffmpeg from "https://deno.land/x/deno_ffmpeg@1.2.2/mod.ts";
import { CrabboContext, FfmpegSettings } from "../utils/types.ts";
import { FileSystem } from '../utils/filesystem.ts'

// Cache for crabbo mp4's
const crabboCacheRoot = `${Deno.cwd()}\\temp\\crabbovids\\`

// FfmpegSettings
const crabboSettings:FfmpegSettings = {
    ffmpegDir: "./ffmpeg/ffmpeg" + (Deno.build.os === "windows" ? '.exe' : ''),
    fatalError: true,
    source: "./assets/crabbo/crab.mp4"
}

// VideoRender instance for crabbo
const crabboFfmpegInstance = ffmpeg(crabboSettings);

// Router
const router = new Router({prefix: "/custom", methods: ["GET", "POST"]})


router.get('/crabbo/:uppertext/:bottomtext', async (ctx:CrabboContext) => {
    ctx.response.status = 200;
    const filename = `${ctx.params.uppertext},${ctx.params.bottomtext}.mp4`;
    if (await FileSystem.fileExist(crabboCacheRoot+filename) === false) {
        crabboFfmpegInstance.on('end', async() => {
            ctx.response.body = await Deno.readFile(crabboCacheRoot+filename);
        })
        await crabboFfmpegInstance.videoBitrate(1200, true).save(crabboCacheRoot+filename);
    }
    ctx.response.body = await Deno.readFile(crabboCacheRoot+filename);
});

export default router;