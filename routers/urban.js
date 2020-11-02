import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
// import { logger } from "../utils/logger.js";

export default function (router) {
    router.get('/:word', async(c) => {
        let res = await fetch(`http://api.urbandictionary.com/v0/define?term=${c.params.word}`);
        if(!res) return null;
        let body = await res.text();
        body = await JSON.parse(body);
        return {
            def: body.list[0].definition.split("[").join("").split("]").join(""),
            link: body.list[0].permalink,
            author: body.list[0].author,
            date: body.list[0].written_on
        };
    })
}
