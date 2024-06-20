//importing main file
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import authRouter from './app/routes/userApi.js';
import techRouter from './app/routes/technologyApi.js';
import candidateRouter from './app/routes/candidateApi.js';
import path from 'path';
import { fileURLToPath } from 'url';
import globalError from './app/middlewares/globalError.js';
import AppError from './utils/AppError.js'
import noteRouter from './app/routes/noteApi.js';
import interviewRouter from './app/routes/interviewApi.js'
import swaggerDocument from 'swagger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


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
app.use('/uploads',express.static(path.join(__dirname,'/uploads'))) // uploading resume

//============NOTES API==========================
app.use('/', noteRouter);

//==========INTERVIEW API========================
app.use('/', interviewRouter);

app.all('*', (req, res, next) => {
    console.log("unauthorised api accessing")
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error
app.use(globalError)

// //conncting to the databases
mongoose.connect('mongodb://localhost:27017/interview_scheduler')
.then(() => console.log("connnected to the server successfully"))
.catch((err) => console.log("not connected to the database", err))

//conncting to the databases
// mongoose.connect('mongodb+srv://nikunj:LO4jkpzvIf8aEQWx@nestbackenddatabase.swu2swj.mongodb.net/?retryWrites=true&w=majority&appName=interview_scheduler')
// .then(() => console.log("connnected to the server successfully"))
// .catch((e) => console.log("not connected to the database",e ))

//connnecting to the server

//connnecting to the server
app.listen(PORT , () =>{
    console.log(`server created at ${PORT}`)
})