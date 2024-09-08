import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    content: {
        type: String,
        required: true,
        minLength: [15, "content's length should be 15"]
    },
    media: {
        type: Array,
    },
    visibility: {
        type: String,
        enum: ["Public", "Private"],
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    location: {
        type: Object
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export const Post = mongoose.model("Post", postSchema, "posts")