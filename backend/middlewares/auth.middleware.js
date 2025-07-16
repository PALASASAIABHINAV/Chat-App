import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send("Unauthorized, no token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded || !decoded.userId) {
            return res.status(401).send("Unauthorized, invalid token");
        }
        const user= await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).send("Unauthorized, user not found");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(500).send("Invalid token");
    }
}