import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import authRouter from './app/routes/userApi.js';
import techRouter from './app/routes/technologyApi.js';
import candidateRouter from './app/routes/candidateApi.js';
import noteRouter from './app/routes/noteApi.js';
import interviewRouter from './app/routes/interviewApi.js';
import globalError from './app/middlewares/globalError.js';
import AppError from './utils/AppError.js';
import { PORT } from './constants/constants.js';
import connectDB from "./database/connection.js";
import fs from "fs";
import yaml from 'js-yaml';

dotenv.config();


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Static files for resume uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API routes
app.use('/auth', authRouter);
app.use('/technology', techRouter);
app.use('/candidate', candidateRouter);
app.use('/note', noteRouter);
app.use('/interview', interviewRouter);


const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.load(swaggerFile);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch-all route for handling 404 errors
app.all('*', (req, res, next) => {
    console.log("Unauthorized API access attempt");
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalError);

// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
