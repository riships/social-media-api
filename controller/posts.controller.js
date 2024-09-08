import { getLocation } from "../helper/location.js"
import { Post } from "../model/post.model.js"
import { Session } from "../model/session.model.js";
import User from "../model/user.model.js";



export const createPost = async (req, res) => {
    const { content, visibility, tags } = req.body;
    const newLocation = await getLocation();
    const { sessionId } = req.cookies;
    const { files } = req;

    try {
        let { userId } = await Session.findById(sessionId)
        let createdPost = new Post({ author: userId, content, media: files, visibility, tags, location: newLocation });
        let post = await createdPost.save();
        if (!post) {
            return res.status(500).send({ success: false, message: 'Failed to create new post' });
        }
        await User.findByIdAndUpdate(userId, { $push: { posts: createdPost._id } });
        return res.status(201).send({ success: true, message: "Post added successfully" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ success: false, message: 'Failed to create new post', error: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find({}).populate("likes", "comments");
        if (!posts) {
            res.status(404).send({ success: false, message: "Post not available!" })
        }
        return res.status(200).send({ success: true, posts: posts })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal sever error", error: error.message })
    }
}


export const getPostById = async (req, res) => {
    let { postId } = req.params
    try {
        let post = await Post.findById(postId).populate("likes", "comments");
        if (!post) {
            return res.status(500).send({ success: false, message: "Post not found!" })
        }
        return res.status(200).send({ success: true, post: post })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error", error: error.message })
    }
}

export const getUserPosts = async (req, res) => {
    let { userId } = req.params
    try {
        let userPosts = await Post.find({ userId: userId });
        if (!userPosts) {
            return res.status(500).send({ success: false, message: "Posts not found for the user!" })
        }
        return res.status(200).send({ success: true, post: userPosts })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error!", error: error.message })
    }
}


