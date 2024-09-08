import express from "express";
import { getAllUsers, getUserById, userLogin, userSignUp } from "../controller/user.controller.js";
var router = express.Router();


router.post("/signup", userSignUp);

router.post("/signin", userLogin);

router.get("/get-details/:userId", getUserById)


router.get("/get-all-details", getAllUsers)


export default router