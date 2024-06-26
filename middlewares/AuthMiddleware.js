import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../constants/constants.js";


if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

export const generateToken = (payload) => {
    try {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });  // 30 days expiration
    } catch (err) {
        console.error("Token generation error:", err);
        throw new Error("Token generation failed");
    }
};