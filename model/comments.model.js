const commentsSchema = new Schema({
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
        minLength: [6, 'Comment should have a minimum of 6 characters'],
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

export const PostComments = model('PostComments', commentsSchema, 'Comments');
