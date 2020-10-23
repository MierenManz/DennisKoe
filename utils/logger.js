import { ConsoleStream, Logger, TokenReplacer } from "https://deno.land/x/optic/mod.ts";

export const logger = new Logger();
logger.addStream(new ConsoleStream().withFormat(
    new TokenReplacer()
        .withFormat("{dateTime} {level} {msg} {metadata}")
        .withDateTimeFormat("hh:mm:ss YYYY-MM-DD")
        .withLevelPadding(10)
        .withColor()));