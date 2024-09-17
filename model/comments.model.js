import mongoose, { Schema } from "mongoose";

const commentsSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    commentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        trim: true,
        minLength: [6, 'Comment should have a minimum of 15 characters'],
        required: [true, "Comment is required, it can't be blank"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });

const PostComments = mongoose.model('PostComments', commentsSchema, 'Comments');
export default PostComments;
