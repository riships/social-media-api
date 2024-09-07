import express from "express";
import { userSignUp } from "../controller/user.controller.js";
var router = express.Router();


router.post("/signup", userSignUp);


export default router