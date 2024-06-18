import express from "express";
import {register, login} from "../apiLogic/user.js";
const authRouter = express.Router();

authRouter.post('/register', register)

authRouter.post('/login', async (req, res) => {
    login(req, res);
})

export default authRouter;