import express from "express";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";
import { getFriends, getPendingFriendRequests, resToFriendRequest, toggleFriendship } from "../controller/friendship.controller.js";
const router = express.Router();

router.post("/toggle-friendship/:friendId", jsonWebToken, toggleFriendship);

router.post("/response-to-request/:friendId", jsonWebToken, resToFriendRequest);

router.get("/get-friends/:userId", getFriends);

router.get("/get-pending-requests", jsonWebToken, getPendingFriendRequests)



export default router;