import express from "express";
import { createPost, getAllPosts, getPostById, getUserPosts } from "../controller/posts.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
const router = express.Router();

router.post('/', upload.array("files"), createPost)

router.get("/all", getAllPosts)

router.get("/:postId", getPostById)

router.get("/user/:userId", getUserPosts)


export default router;