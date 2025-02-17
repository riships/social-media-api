import express from "express";
import { addComments, deleteComment, getComments, updateComment } from "../controller/comments.controller.js";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";

const router = express.Router();


router.post("/:postId", jsonWebToken, addComments);

router.get("/:postId", getComments);

router.delete("/:commentId", jsonWebToken, deleteComment)

router.put("/:commentId", jsonWebToken, updateComment)


export default router;