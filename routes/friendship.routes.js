import express from "express";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";
import { resToFriendRequest, toggleFriendship } from "../controller/friendship.controller.js";
const router = express.Router();

router.post("/toggle-friendship/:friendId", jsonWebToken, toggleFriendship)

router.post("/response-to-request/:friendId", jsonWebToken, resToFriendRequest)



export default router;