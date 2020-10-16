import express from "express";
const router = new express.Router();

import { catapi, dogapi } from "../keys.json";

router.get('/cat', async(req, res) => {
    let body = await fetch("https://api.thecatapi.com/v1/images/search?api_key=" + catapi);
    if(!body) return res.json({error: "offline"});
    return res.json(await body.json());
});
router.get('/dog', async(req, res) => {
    let body = await fetch("https://api.thedogapi.com/v1/images/search?api_key=" + dogapi);
    if(!body) return res.json({error: "offline"});
    return res.json(await body.json());
});

export default router;