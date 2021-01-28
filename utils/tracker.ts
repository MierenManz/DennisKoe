import { Context, bold, brightBlue, brightGreen, magenta, red } from "../deps.ts";
import { logger } from "./logger.ts";


export function tracker(c: Context): void {
    logger.info(`${magenta("Request")}  ${bold("[")}${red(c.request.method)}${bold("]")}  ${bold("[")}${brightGreen(c.request.ip)}${bold("]")} ${bold(brightBlue("=>"))} ${bold("[")}${brightGreen(String(c.request.url))}${bold("]")}`);
}