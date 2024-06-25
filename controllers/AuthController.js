import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";
import {generateToken} from "../middlewares/AuthMiddleware.js";

export class AuthController {
    constructor() {}

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.status(400).json({ message: "email or password is not correct or null" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "email or password is not correct or null" });

            const payload = { id: user._id, email: user.email };
            const token = generateToken(payload);

            const userResponse = user.toObject();
            delete userResponse.password;

            successResponse(res, { user: userResponse, token }, "Login successful")
        } catch (err) {
            console.log('err : ', err);
            errorResponse(err);
        }
    }

    async register(req, res) {
        try {
            const { password, ...rest } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            await User.create({ ...rest, password: hashedPassword });
            successResponse(res, null, "Registration successful", 201);
        } catch (err) {
            errorResponse(res, err.message, 400);
        }
    }
}
