// Imports
import { Router } from "../deps.ts";

// create new router
const router = new Router({ prefix: "/tag", methods: ["GET"] });

router.get("/cat", async function (ctx) {
  const body = await fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => res.json());

  ctx.response.body = body;
  return;
});

router.get("/dog", async function (ctx) {
  const body = await fetch("https://api.thedogapi.com/v1/images/search")
    .then((res) => res.json());

  ctx.response.body = body;
  return;
});

// Export router
export default router;
