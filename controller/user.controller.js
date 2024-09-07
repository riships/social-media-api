import User from "../model/user.model.js";

export const userSignUp = async (req, res) => {
    const { name, email, gender, password } = req.body;

    try {
        const newUser = new User({ name, email, gender, password });  // Create a new User object        
        // Insert the user object into the 'users' collection
        const user = await newUser.save();
        if (user) {
            return res.status(201).json({ message: 'User successfully signed up!', userId: user });
        } else {
            return res.status(500).json({ message: 'Failed to sign up user.' });
        }
    } catch (error) {
        console.error('Error during sign up:', error.message);
        return res.status(500).json({ message: error.message });
    }
};
