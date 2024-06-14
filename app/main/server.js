//importing main file
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import authRouter from '../routes/userApi.js';
import techRouter from '../routes/technologyApi.js';
import candidateRouter from '../routes/candidateApi.js';

const app = express();
const PORT = process.env.PORT || 3000;

//using middleware
app.use(express.json());
app.use(cors());

//=============USER_API==========================
app.use('/', authRouter);

//=========TECHNOLOGIES_API======================
app.use('/', techRouter);

//==========CANDIDATES_API=======================
app.use('/', candidateRouter);

//conncting to the databases
mongoose.connect('mongodb://localhost:27017/interview_scheduler')
.then(() => console.log("connnected to the server successfully"))
.catch(() => console.log("not connected to the database"))

//connnecting to the server
app.listen(PORT , () =>{
    console.log(`server created at ${PORT}`)
})