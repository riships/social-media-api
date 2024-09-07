import express from "express";
import { userLogin, userSignUp } from "../controller/user.controller.js";
var router = express.Router();


router.post("/signup", userSignUp);

router.post("/signin", userLogin);


export default router