// Imports
import { Application } from "./deps.ts";
import { logger } from "./utils/logger.ts";
import { serverConfig } from "./utils/config_files.ts";

// Import all routers
import thatApiGuyRouter from "./routers/thatapiguy.ts";
import ffmpegRouter from "./routers/ffmpeg.ts";
// import nekobotRouter from "./routers/nekobot.ts";
import statusRouter from "./routers/status.ts";

// Create new app
const app = new Application();

// Add tracker
app.use(async (ctx, next) => {
  if (!ctx.request.url.href.includes("favicon")) {
    logger.log(
      ctx.request.method + " REQUEST: [" + ctx.request.ip + "] >> " +
        ctx.request.url,
    );
  }
  await next();
  return;
});

// Add all routers
app.use(thatApiGuyRouter.routes());
app.use(thatApiGuyRouter.allowedMethods());
app.use(ffmpegRouter.routes());
app.use(ffmpegRouter.allowedMethods());
// app.use(nekobotRouter.routes());
// app.use(nekobotRouter.allowedMethods());
app.use(statusRouter.routes());
app.use(statusRouter.allowedMethods());
app.addEventListener("error", function (ctx) {
  console.log(ctx);
});
// Start server
logger.info(`Server started on port: ${serverConfig.serverPort}`);
await app.listen({ port: serverConfig.serverPort });
