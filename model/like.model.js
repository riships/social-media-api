import mongoose, { Schema } from "mongoose";

const likePostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // Fixing the typo
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the Post model
        ref: 'Post',
        required: true
    }
}, { timestamps: true });  // Optional: Add timestamps to track when likes are created/updated

const LikePost = mongoose.model('LikePost', likePostSchema, 'Likes');

export default LikePost;
