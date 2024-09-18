import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import { myConfig } from "../config/config.js";
import { Session } from "../model/session.model.js";
import { v4 as uuid4 } from 'uuid'

export const userSignUp = async (req, res) => {
    const { name, email, gender, password } = req.body;
    const { file } = req
    try {
        const newUser = new User({ file, name, email, gender, password });  // Create a new User object        
        // Insert the user object into the 'users' collection
        const user = await newUser.save();

        if (!user) {
            return res.status(500).json({ message: 'Failed to sign up user.' });
        }
        return res.status(201).json({ message: 'User successfully signed up!', user: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body
    
    const deviceInfo = req.useragent;
    const ipAddress = req.ip;
    let ua = Object.keys(deviceInfo).filter(key => deviceInfo[key] != false).reduce((result, key) => {
        result[key] = deviceInfo[key]
        return result;
    }, {})
    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).send({ message: "User Not Found!" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
                
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Email or Password" });
        }
        const sessionKey = uuid4();
        const session = await new Session({
            userId: user._id,
            deviceInfo: JSON.stringify(ua),
            ipAddress: ipAddress,
            sessionKey: sessionKey
        }).save();
        let token = jwt.sign({ userName: user.name, userId: user._id, sessionKey: sessionKey, sessionId: session._id }, myConfig.SECRETKEY, { expiresIn: '1h' });
        await User.findByIdAndUpdate(user._id, { $push: { activeSessios: session._id } });
        res.cookie("token", token, { maxAge: 3600000, httpOnly: true })
        res.status(200).send({ message: "Login successful", token: token });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}


export const getUserById = async (req, res) => {
    let userId = req.params.userId
    try {
        let user = await User.findOne({ _id: userId }).select('-password').populate("posts")
        if (!user) {
            return res.status(404).send("User not Found!")
        }
        res.status(200).send({ success: true, user: user })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}


export const getAllUsers = async (req, res) => {
    try {
        let user = await User.find({}).select('-password').populate("posts")
        if (!user) {
            return res.status(404).send("User not Found!")
        }
        res.status(200).send({ success: true, users: user })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}


export const logOut = async (req, res) => {
    try {
        let { sessionId, userId } = req.user

        let session = await Session.findByIdAndDelete(sessionId);
        if (!session) {
            return res.status(404).send({ message: "Error in logout" })
        }
        // Remove session id from user's active session
        let updatedActiveSession = await User.findByIdAndUpdate(userId, { $pull: { activeSessios: sessionId } });
        if (!updatedActiveSession) {
            return res.status(404).send({ message: "Error in logout" })
        }
        res.cookie("sessionId", null, { maxAge: Date.now(), httpOnly: true })
        res.status(200).send({ success: true, message: "Logout Successfully" })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}


export const logOutAllDevices = async (req, res) => {
    const { userId } = req.user;

    try {
        const logOutAllDevices = await Session.deleteMany({ userId: userId });
        const updateUserActiveSession = await User.findByIdAndUpdate(userId, { $set: { activeSessios: [] } })

        if (!logOutAllDevices && !updateUserActiveSession) {
            return res.status(404).send({ message: "Error in logout" })
        }
        res.status(200).send({ success: true, message: "Logout Successfully" })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}


export const findAndUpdateUser = async (req, res) => {
    let { userId } = req.user
    let { name, email, gender } = req.body
    try {
        let updatedUser = await User.findByIdAndUpdate(userId, { name, email, gender }, { new: true }).select('-password')
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}