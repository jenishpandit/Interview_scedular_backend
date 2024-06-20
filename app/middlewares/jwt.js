import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
// console.log(SECRET_KEY);

//token verifier middleware
const jwtAuthMiddleware = ( req, res, next) => {
    const auth =req.headers.authorization;
    if(!auth) return next();
    const token = req.headers.authorization.split(" ")[1];
    if(!token)
        {
            return res.status(401).json({error : "unauthorized"});
        }
    
    try{
        const decoded = jwt.verify( token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error : "invalid token"});
    }
}

//generating token function
const generateToken = (userData)=> {
    return jwt.sign({userData}, SECRET_KEY, {expiresIn : 2.592e+6});
}

export {jwtAuthMiddleware, generateToken};
