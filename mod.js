import { Application, Context } from "https://deno.land/x/abc@v1.2.0/mod.ts";
import { logger } from "./utils/logger.js";
const app = new Application();

const config = JSON.parse(Deno.readTextFileSync('./config.json'));

import thatapiguyRouter from "./routers/thatapiguy.js";
import urbanRouter from "./routers/urban.js";

thatapiguyRouter(app.group("thatapiguy"));
urbanRouter(app.group("urban"));

app.start({ port: config.port });   
logger.info('Listening on port ' + config.port);