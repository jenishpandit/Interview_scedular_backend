import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from "./routes/AuthRoute.js"
import techRouter from './routes/TechRoute.js';
import candidateRouter from './routes/CandidateRoute.js';
import noteRouter from './routes/NoteRoute.js';
import interviewRouter from './routes/InterviewRoute.js';
import DashBoardRouter from "./routes/DashBoardRoute.js";
import QnARouter from "./routes/QnARoute.js";
import { AppError , errorHandler } from './utils/AppError.js';
import { PORT } from './constants/constants.js';
import connectDB from "./database/connection.js";
import chalk from "chalk";
import swaggerSetup from "./utils/SwaggerSetup.js";
import {authMiddleware} from "./middlewares/AuthMiddleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api-docs', swaggerSetup);

app.use('/auth', authRouter);
app.use('/technology', authMiddleware, techRouter);
app.use('/candidate', authMiddleware, candidateRouter);
app.use('/note', authMiddleware,noteRouter);
app.use('/interview', authMiddleware, interviewRouter);
app.use('/dashboard', authMiddleware, DashBoardRouter);
app.use('/qna',authMiddleware, QnARouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler)
// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(chalk.greenBright(`Server is Running on Port ${PORT}`));
            console.log(chalk.greenBright(`Swagger http://localhost:${PORT}/api-docs`));
        });
    } catch (error) {
        console.error(chalk.redBright(`Error Starting The Server: ${error.message}`));
        process.exit(1);
    }
};

startServer();
