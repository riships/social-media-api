import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import { myConfig } from "../config/config.js";
import { Session } from "../model/session.model.js";

export const userSignUp = async (req, res) => {
    const { name, email, gender, password } = req.body;

    try {
        const newUser = new User({ name, email, gender, password });  // Create a new User object        
        // Insert the user object into the 'users' collection
        const user = await newUser.save();
        if (user) {
            return res.status(201).json({ message: 'User successfully signed up!', user: user });
        } else {
            return res.status(500).json({ message: 'Failed to sign up user.' });
        }
    } catch (error) {
        console.error('Error during sign up:', error.message);
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
            res.status(404).send({ message: "Invalid Email or Passwor" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Email or Password" });
        }
        let token = jwt.sign({ name: user.name, id: user._id }, myConfig.SECREKEY, { expiresIn: '1h' });
        const session = await new Session({
            userId: user._id,
            deviceInfo: JSON.stringify(ua),
            ipAddress: ipAddress,
            tokenId: token
        }).save()
        console.log(session);
        
        res.cookie("sessionId", session._id, { maxAge: 60000, httpOnly: true })
        res.status(200).send({ message: "Login successful", sessionId: session._id });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}


export const getUserById = async (req, res) => {
    let userId = req.params.userId
    try {
        let user = await User.findOne({ _id: userId })
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
        let user = await User.find({})
        if (!user) {
            return res.status(404).send("User not Found!")
        }
        res.status(200).send({ success: true, users: user })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}