import validator from 'validator';
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const { Schema } = mongoose


const userSchema = new Schema({
    file: { type: Object },
    name: { type: String, minLength: [5, 'Must be at least , got {VALUE}'], required: true },
    email: { type: String, unique: true, required: 'Email address is required', validate: [validator.isEmail, 'Invalid email'] },
    gender: { type: String, enum: { values: ["Male", "Female", "Other"], message: '{VALUE} is not supported' } },
    password: { type: String, required: true, minLength: [9, 'Must be at least 9, got {VALUE}'] },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LikePost' }],
    activeSessios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
})


userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

const User = mongoose.model("User", userSchema, "users")

export default User;

