import express from "express";
import { otpVeify, resetPassword, sendOtp } from "../controller/passwordReset.controller.js";
const router = express.Router();

router.post("/send", sendOtp);

router.post("/verify", otpVeify);

router.post("/reset-password", resetPassword)


export default router;