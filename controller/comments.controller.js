import PostComments from "../model/comments.model.js";
import User from "../model/user.model.js"
import { Post } from "../model/post.model.js"


export const addComments = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).send({
                success: false,
                message: "You need to login to comment on this post!"
            });
        }

        if (!req.params || !req.params.postId) {
            return res.status(400).send({
                success: false,
                message: "Post ID is missing in the request!"
            });
        }

        const { userId: commenter } = req.user;
        const { postId: commentTo } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).send({
                success: false,
                message: "Content is required to comment on this post!"
            });
        }

        // Create comment now
        const comment = await PostComments({ commenter, commentTo, content }).save();
        await User.findByIdAndUpdate(commenter, { $push: { comments: comment._id } });
        await Post.findByIdAndUpdate(commentTo, { $push: { comments: comment._id } });
        if (comment) {
            return res.status(201).send({ success: true, comment: comment })
        }

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message })
    }
}


export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).send({
                success: false,
                message: "Post Id is Required!"
            });
        }

        const post = await Post.findById(postId).populate('comments');

        if (!post.comments) {
            return res.status(400).send({
                success: false,
                message: "No comments found for this post!"
            });
        }
        return res.status(200).send({ success: true, comments: post.comments })
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message })
    }
}


export const deleteComment = async (req, res) => {
    try {
        const { userId } = req.user;
        const { commentId } = req.params;

        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "You are not authorize to delete this comment!"
            })
        }

        const user = await User.findById(userId);
        if (user._id.toString() === userId.toString) {
            return res.status(404).send({
                success: false,
                message: "You are not authorize to delete this comment!"
            })
        }
        const deletedComment = await PostComments.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(500).send({
                success: false,
                message: "Error in deleting comment!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Comment deleted successfully",
            comment: deletedComment
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message
        })
    }
}




export const updateComment = async (req, res) => {
    try {
        const { userId } = req.user;
        const { commentId } = req.params;
        const { content } = req.body;

        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "You are not authorize to update this comment!"
            })
        }

        const user = await User.findById(userId);
        if (user._id.toString() === userId.toString) {
            return res.status(404).send({
                success: false,
                message: "You are not authorize to update this comment!"
            })
        }
        const updatedComment = await PostComments.findByIdAndUpdate(commentId, { content: content });
        if (!updatedComment) {
            return res.status(500).send({
                success: false,
                message: "Error in updating comment!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Comment updated successfully.",
            comment: updatedComment
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message
        })
    }
}