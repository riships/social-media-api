import express from "express";
import { createPost, deletePostById, getAllPosts, getPostById, getUserPosts } from "../controller/posts.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { jsonWebToken } from "../middlewares/jwt.middleware.js";
const router = express.Router();

router.post('/', jsonWebToken, upload.array("files"), createPost)

router.get("/all", getAllPosts)

router.get("/:postId", getPostById)

router.get("/user/:userId", getUserPosts)

router.delete('/:postId', jsonWebToken, deletePostById)


export default router;