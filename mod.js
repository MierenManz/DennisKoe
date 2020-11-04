import { Application, Context } from "https://deno.land/x/abc@v1.2.0/mod.ts";
import { logger } from "./utils/logger.js";
const app = new Application();

const config = JSON.parse(Deno.readTextFileSync('./config.json'));

import thatapiguyRouter from "./routers/thatapiguy.js";
import urbanRouter from "./routers/urban.js";
import redditRouter from "./routers/reddit.js";
import nekobotRouter from "./routers/nekobot.js";

thatapiguyRouter(app.group("thatapiguy"));
urbanRouter(app.group("urban"));
redditRouter(app.group("reddit"));
nekobotRouter(app.group("nekobot"));

app.start({ port: config.port });   
logger.info('Listening on port ' + config.port);