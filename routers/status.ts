// Imports
import { ms, Router } from "../deps.ts";
import { API_KEYS } from "../utils/config_files.ts";

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
const STARTUP = Date.now();

// Router
const router = new Router({ prefix: "/status", methods: ["GET"] });

router.get("/ping", async function (ctx) {
  const requestStart: number = Date.now();
  const results = await getStatus();
  const responseOBJ: StatusBody = {
    responseTime: Date.now() - requestStart,
    operational: {
      quotesAPI: results[0],
      dogAPI: results[1],
      catAPI: results[2],
      urbanAPI: results[3],
    },
  };
  ctx.response.body = responseOBJ;
});

router.get("/uptime", function (ctx) {
  ctx.response.body = {
    uptime: ms(Date.now() - STARTUP, { long: true }),
    onlineSince: STARTUP,
  };
});

async function getStatus(): Promise<string[]> {
  const result: string[] = [];
  const urls: string[] = [
    "https://quotes15.p.rapidapi.com/quotes/random/",
    "https://api.thedogapi.com/v1/images/search",
    "https://api.thecatapi.com/v1/images/search",
    "http://api.urbandictionary.com/v0/define",
  ];

  for (const index of urls) {
    let succes = true;
    const headers = index === "0"
      ? [
        ["x-rapidapi-host", "quotes15.p.rapidapi.com"],
        ["x-rapidapi-key", API_KEYS.rapidapi],
      ]
      : undefined;

    try {
      await fetch(urls[parseInt(index)], {
        headers: headers,
      });
    } catch {
      succes = false;
    }

    result[parseInt(index)] = succes ? "online" : "offline";
  }

  return result;
}

// Export router
export default router;
