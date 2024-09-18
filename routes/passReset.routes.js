import express from "express";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";
import { sendOtp } from "../controller/passwordReset.controller.js";
const router = express.Router();

router.post("/send", jsonWebToken, sendOtp);

export default router;