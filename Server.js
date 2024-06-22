import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import candidateRouter from './app/routes/candidateApi.js';
import noteRouter from './app/routes/noteApi.js';
import interviewRouter from './app/routes/interviewApi.js';
import { PORT } from './constants/constants.js';
import connectDB from "./database/connection.js";
import chalk from "chalk";
import authRouter from "./routes/AuthRoute.js"
import techRouter from './routes/TechRoute.js';
import swaggerSetup from "./utils/SwaggerSetup.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api-docs', swaggerSetup);

// API routes
app.use('/auth', authRouter);
app.use('/technology', techRouter);
app.use('/candidate', candidateRouter);
app.use('/note', noteRouter);
app.use('/interview', interviewRouter);

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
