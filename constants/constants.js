import dotenv from 'dotenv';
dotenv.config();

export const MONGO_DB_URL = process.env.MONGO_DB_URL;
export const PORT = process.env.PORT || 4000;
export const SECRET_KEY = process.env.SECRET_KEY || "interview_scheduler";

// console.log('MONGO_DB_URL : ', MONGO_DB_URL);
// console.log('PORT : ', PORT);
// console.log('SECRET_KEY : ', SECRET_KEY);