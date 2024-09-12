import jwt from 'jsonwebtoken';
import { myConfig } from '../config/config.js';

export const jsonWebToken = async (req, res, next) => {
    try {
        const { sessionId } = req.cookies;
        if (!sessionId) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const userData = jwt.verify(sessionId, myConfig.SECREKEY);
        req.user = userData;

        // Call next() to move to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token errors or other errors
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}