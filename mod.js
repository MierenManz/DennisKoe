import { Application, Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
//import { logger } from "./utils/logger.js";
const app = new Application();

const config = JSON.parse(Deno.readTextFileSync('./config.json'));

// const track: MiddlewareFunc = (next) => (c: Context) => {
//     console.log(c);
//     return next(c);
// };
// app.use(track(c));

// import apiRouter from "./routers/api.ts";
import thatapiguyRouter from "./routers/thatapiguy.js";
import urbanRouter from "./routers/urban.js";
// import nekobotRouter from "./routers/nekobot.ts";

// apiRouter(app.group(""));
thatapiguyRouter(app.group("thatapiguy"));
urbanRouter(app.group("urban"));
// nekobotRouter(app.group("nekobot"));

app.start({ port: config.port });   
//logger.info('Listening on port ' + config.port);