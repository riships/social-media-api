import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

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
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).send({ message: "Invalid Email or Passwor" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Email or Password" });
        }
        return res.status(200).send({ message: "Login successful", userId: user._id });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
