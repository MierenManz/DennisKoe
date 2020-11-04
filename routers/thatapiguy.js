// import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import { logger } from "../utils/logger.js";
import { tracker } from '../utils/tracker.js';

const keys = JSON.parse(Deno.readTextFileSync('./keys.json'));


export default function (router) {
    router.get("/dog", async(c) => {
        let start = new Date().getTime();
        let body;
        try {
            body = await fetch("https://api.thedogapi.com/v1/images/search?api_key=" + keys.dogapi);
        } catch(e) {
            logger.error(e);
            return { error: "DogAPI is offline"};
        }
        logger.debug('thatapiguy/dog took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    }, tracker);
    router.get("/cat", async(c) => {
        let start = new Date().getTime();
        let body;
        try {
            body = await fetch("https://api.thecatapi.com/v1/images/search?api_key=" + keys.catapi);
        } catch(e) {
            logger.error(e);
            return { error: "CatAPI is offline"};
        }
        logger.debug('thatapiguy/cat took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    }, tracker);
}