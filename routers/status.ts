/*
 * 
 *        :::::::::  
 *       :+:    :+:  
 *      +:+    +:+  
 *     +#+    +:+   
 *    +#+    +#+    
 *   #+#    #+#     
 *  #########   enniskoe
 * 
 *  status.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

// Imports
import { Context, Router } from "../deps.ts";
import { API_KEYS } from "../utils/common.ts";
import { logger } from "../utils/logger.ts";


// Interfaces
interface Operational {
    quotesAPI: string;
    dogAPI: string;
    catAPI: string;
    urbanAPI: string;
}
interface StatusBody {
    responseTime: number;
    operational: Operational;
}


//
const STARTUP = new Date();


// Router
const router = new Router({ prefix: "/status", methods: ["GET"] });


router.get("/ping", async (ctx: Context) => {
    const requestStart: number = Date.now();
    const results = await getStatus();
    const responseOBJ: StatusBody = {
        responseTime: Date.now() - requestStart,
        operational: {
            quotesAPI: results[0],
            dogAPI: results[1],
            catAPI: results[2],
            urbanAPI: results[3],
        }
    };
    ctx.response.body = responseOBJ;
});


router.get("/uptime", (ctx: Context) => {
    const obj = {
        uptime: ((Date.now() - STARTUP.getTime()) / 1000).toFixed(0),
        onlineSince: STARTUP
    }
    ctx.response.body = obj;
});


async function getStatus(): Promise<string[]> {
    const result: string[] = [];
    const urls: string[] = [
        `https://api.thedogapi.com/v1/images/search`,
        `https://api.thecatapi.com/v1/images/search`,
        "http://api.urbandictionary.com/v0/define?term=f",
    ];
    try {
        await fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
            headers: [
                ["x-rapidapi-host", "quotes15.p.rapidapi.com"],
                ["x-rapidapi-key", API_KEYS.rapidapi]
            ],
        });
        result.push("<:online:612617210514374656> Operationeel");
        logger.debug("https://quotes15.p.rapidapi.com/quotes/random/ : Online")
    } catch (e) {
        result.push("<:offline:612617210560512000> Offline");logger.debug("https://quotes15.p.rapidapi.com/quotes/random/ : Offline");
    }
    urls.forEach((path) => {
        try {
            fetch(path);
            result.push("<:online:612617210514374656> Operationeel");
            logger.debug(path + ": Online");
        } catch (e) {
            result.push("<:offline:612617210560512000> Offline");
            logger.debug(path + ": Offline")
        }
    });
    return result;
}


// Export router
export default router;