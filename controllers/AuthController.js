import {generateToken} from "../app/middlewares/jwt";
import User from "../models/User";

export class AuthController {
    constructor() {
    }

    async login(req, res, next) {
        try {
            let {email, password} = req.body;
            let user = await User.findOne({email: email}).select(+password);
            if (!user) return res.status(400).json({message: "email or password is not correct or null"});
            let pas = await User.findOne({password: password});
            if (!pas) return res.status(400).json({message: "email or password is not correct or null"});
            const payload = {id: user._id, email: user.email};
            const token = generateToken(payload);
            res.json({data: {user, token}});
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    async register(req, res, next) {
        try {
            await User.create(req.body);
            res.json("data inserted");
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}