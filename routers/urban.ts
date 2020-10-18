import { Context } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import type { Group } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import { logger } from "../utils/logger.ts";

export default function (g: Group) {
    g.get(":word", async(c: Context) => {

    });
}