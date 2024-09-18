import jwt from 'jsonwebtoken';
import { myConfig } from '../config/config.js';
import { Session } from '../model/session.model.js';

export const jsonWebToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const userData = jwt.verify(token, myConfig.SECRETKEY);
        const sessionAuth = await Session.findById(userData.sessionId);
        const authenticated = sessionAuth.sessionKey === userData.sessionKey;
        if (authenticated) req.user = userData;

        // Call next() to move to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token errors or other errors
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}