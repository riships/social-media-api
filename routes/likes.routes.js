import express from "express";
import { getLikes, toggleForLikes } from "../controller/likes.controller.js";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";

const router = express.Router();


router.get('/:id', getLikes);

router.post('/toggle/:id', jsonWebToken, toggleForLikes);

export default router;