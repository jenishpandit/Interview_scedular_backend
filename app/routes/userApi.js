import express from "express";
import {register, login} from "../services/user.js";
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    register(req, res);
})

authRouter.post('/login', async (req, res) => {
    login(req, res);
    })

export default authRouter;