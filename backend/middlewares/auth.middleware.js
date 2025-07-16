import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send("Unauthorized, no token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(500).send("Invalid token");
    }
}