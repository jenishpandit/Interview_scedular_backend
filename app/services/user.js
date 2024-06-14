import express from "express";
import userSchema from '../schemas/userSchema.js';
import { jwtAuthMiddleware, generateToken } from '../controllers/jwt.js';

//creating user
async function register(req, res)
{
    try{
        let rawData = req.body;
        let data = await userSchema.create(rawData);
        // console.log(rawData);
         res.json(rawData);
     }catch(err){
         console.log(err);
         res.status(400).send(err);
     }
}

//login user
async function login(req, res, next)
{
    try{
        let {email, password} = req.body;
        let user = await userSchema.findOne({email : email}).select(+password);
        if(!user) return res.status(400).json({message : "email or password is not correct or null"});
        let pas = await userSchema.findOne({password : password});
        if(!pas) return res.status(400).json({message : "email or password is not correct or null"});
        const payload = { id : user._id , email: user.email };
        const token = generateToken(payload);
        // console.log('token',token);
        res.json({data: {user, token}}); 
     }catch(err){
         console.log(err);
         res.status(400).send(err);
     }
}

export  {register, login};