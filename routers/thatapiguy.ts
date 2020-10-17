import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import { logger } from "../utils/logger.ts";

const keys = JSON.parse(Deno.readTextFileSync('./config.json'));


export default function (g: Group) {
    g.get("/dog", async(c: Context) => {
        let start = new Date().getTime();
        let body = await fetch("https://api.thedogapi.com/v1/images/search?api_key=" + keys.dogapi);
        logger.debug('Dog took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    });
    g.get("/cat", async(c: Context) => {
        let start = new Date().getTime();
        let body = await fetch("https://api.thecatapi.com/v1/images/search?api_key=" + keys.catapi);
        logger.debug('Cat took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    });
}