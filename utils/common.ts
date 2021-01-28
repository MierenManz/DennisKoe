//Config Interface for config.json
interface ServerConfig {
    server: {
        port: number;
        isProduction: boolean;
    };
}


//Config Interface for keys.json
interface ApiKeys {
    [cat: string]: string;
    dog: string;
    rapidapi: string;
}


export const serverConfig: ServerConfig = await JSON.parse(await Deno.readTextFile("./config.json"));
export const API_KEYS: ApiKeys = await JSON.parse(await Deno.readTextFile("./keys.json"));