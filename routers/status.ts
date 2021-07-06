// Imports
import { ms, Router } from "../deps.ts";

// Interfaces
interface Operational {
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
      dogAPI: results[0],
      catAPI: results[1],
      urbanAPI: results[2],
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
  const urls: string[] = [
    "https://api.thedogapi.com/v1/images/search",
    "https://api.thecatapi.com/v1/images/search",
    // Need to find shorter response body to test for ping
    "https://api.urbandictionary.com/v0/define?term=olla%20kalla",
  ];
  const promiseMap = urls.map((x) => fetch(x));
  const result: string[] = await Promise.all(promiseMap)
    .then((x) => {
      return x.map((y) => y.ok ? "online" : "offline");
    });

  return result;
}

// Export router
export default router;
