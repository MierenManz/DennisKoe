// import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import { logger } from "../utils/logger.js";
import { tracker } from '../utils/tracker.js';

const rickrolls = JSON.parse(Deno.readTextFileSync('./assets/rickrolls.json'));

export default function (router) {
    router.get("/:link", async(c) => {
        let start = new Date().getTime();
        let result = false;
        for(var i =0; i < rickrolls.length; i++) {
            if(c.params.link.includes(rickrolls[i])) {
                result = true;
                break;
            }
        }
        logger.debug('rickroll took: ' + (new Date().getTime() - start) + "ms");
        return { result: result };
    }, tracker);
}