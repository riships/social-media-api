import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deviceInfo: String,
    ipAddress: String,
    loginTime: { type: Date, default: Date.now },
    tokenId: String
});

export const Session = mongoose.model('Session', sessionSchema, "sessions");
