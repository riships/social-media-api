import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deviceInfo: String,
    ipAddress: Object,
    loginTime: { type: Date, default: Date.now },
    sessionKey: { type: String, required: true }
});

export const Session = mongoose.model('Session', sessionSchema, "sessions");
