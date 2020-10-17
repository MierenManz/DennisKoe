import { Application } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import { logger } from "./utils/logger.ts";
const app = new Application();
const config = JSON.parse(Deno.readTextFileSync('./config.json'));

import thatapiguyRouter from "./routers/thatapiguy.ts";

thatapiguyRouter(app.group("thatapiguy"));


app.start({ port: config.port });
logger.info('Listening on port ' + config.port);