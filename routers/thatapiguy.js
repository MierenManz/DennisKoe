import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import { logger } from "../utils/logger.js";

const keys = JSON.parse(Deno.readTextFileSync('./keys.json'));


export default function (router) {
    router.get("/doggo", async(c) => {
        let start = new Date().getTime();
        let body = await fetch("https://api.thedogapi.com/v1/images/search?api_key=" + keys.dogapi);
        console.log('Dog took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    });
    router.get("/catto", async(c) => {
        let start = new Date().getTime();
        let body = await fetch("https://api.thecatapi.com/v1/images/search?api_key=" + keys.catapi);
        console.log('Cat took: ' + (new Date().getTime() - start) + "ms");
        return body.json();
    });
}