// Imports
import { Context, Router } from "../deps.ts";


const router = new Router({ prefix: "/test", methods: ["GET"] });


router.get("/ree", (ctx: Context) => {
    ctx.response.body = "Hello from testing!";
    return;
});


// Export router
export default router;