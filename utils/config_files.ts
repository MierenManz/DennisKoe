// Config Interface for config.json
interface ServerConfig {
  serverPort: number;
  ffmpeg: {
    videos: {
      crabbo: {
        cacheLimit: number;
        video: string;
        font: string;
      };
    };
  };
  logger: {
    directory: string;
    disableColors: boolean;
    /** Debug levels
     * Level 0 means no debug
     * Level 1 means only debug in console
     * Level 2 means debug in log files & console
     */
    debugLevel: 0 | 1 | 2;
  };
}

export const serverConfig: ServerConfig = await JSON.parse(
  await Deno.readTextFile("./config.json"),
);
