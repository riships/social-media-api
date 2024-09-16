import express from "express";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";
import { toggleFriendship } from "../controller/friendship.controller.js";
const router = express.Router();

router.post("/toggle-friendship/:friendId", jsonWebToken, toggleFriendship)



export default router;