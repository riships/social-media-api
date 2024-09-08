import express from "express";
import { 
    findAndUpdateUser, 
    getAllUsers, 
    getUserById, 
    logOut, 
    logOutAllDevices, 
    userLogin, 
    userSignUp } from "../controller/users.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
var router = express.Router();


router.post("/signup", upload.single('file'), userSignUp);

router.post("/signin", userLogin);

router.get("/get-details/:userId", getUserById);

router.get("/get-all-details", getAllUsers);

router.post("/logout", logOut);

router.post("/logout-all-devices", logOutAllDevices);

router.put("/update-details/:userId", findAndUpdateUser);



export default router