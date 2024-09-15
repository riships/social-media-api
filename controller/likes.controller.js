import LikePost from "../model/like.model.js";
import User from "../model/user.model.js";
import { Post } from "../model/post.model.js"



export const toggleForLikes = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const existingLike = await LikePost.findOne({ author: userId, post: id });
        if (existingLike) {
            const likePost = await LikePost.findByIdAndDelete(existingLike._id)
            await User.findByIdAndUpdate(userId, { $pull: { likes: likePost._id } })
            await Post.findByIdAndUpdate(id, { $pull: { likes: likePost._id } });
            return res.status(200).json({ message: "Post unliked successfully" });
        }
        const likePost = await new LikePost({ author: userId, post: id }).save();
        if (!likePost) {
            return res.status(404).send({ message: "Error in liking the post!" })
        }
        await User.findByIdAndUpdate(userId, { $push: { likes: likePost._id } })
        await Post.findByIdAndUpdate(id, { $push: { likes: likePost._id } });
        return res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

export const getLikes = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({ message: "Provide id to like the post!" })
        }
        const postLikes = await LikePost.find({ post: id });
        if (!postLikes) {
            return res.status(404).send({ message: "Post not found with this id!" })
        }
        res.status(200).send({ success: true, likes: postLikes })
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}