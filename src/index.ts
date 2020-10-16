import express from "express";
import fetch from "node-fetch";
import config from "./config.json";

import thatapiguyRouter from "./routers/thatapiguy";

const app = express();

app.use('/thatapiguy', thatapiguyRouter);

app.listen(config.port, () => {
    console.log('Denniskoe API > Running on port ' + config.port);
});