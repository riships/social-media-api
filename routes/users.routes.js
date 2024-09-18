import express from "express";
import {
    findAndUpdateUser,
    getAllUsers,
    getUserById,
    logOut,
    logOutAllDevices,
    userLogin,
    userSignUp
} from "../controller/users.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";
var router = express.Router();


router.post("/signup", upload.single('file'), userSignUp);

router.post("/signin", userLogin);

router.get("/get-details/:userId", getUserById);

router.get("/get-all-details", getAllUsers);

router.post("/logout", jsonWebToken, logOut);

router.post("/logout-all-devices", jsonWebToken, logOutAllDevices);

router.put("/update-details/:userId", upload.single('file'), findAndUpdateUser);



export default router