import express from "express";
// importing controllers
import { AuthController } from "../controllers/AuthController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
//importing validators
import {loginValidation, registerValidation} from "../validations/AuthValidation.js";
import {validate} from "../middlewares/Validator.js";

const authRouter = express.Router();
const authController = new AuthController();

// API routes
authRouter.post('/register', registerValidation, validate, AsyncHandler(authController.register.bind(authController)));
authRouter.post('/login', loginValidation, validate, AsyncHandler(authController.login.bind(authController)));

export default authRouter;