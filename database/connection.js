import mongoose from 'mongoose';
import { MONGO_DB_URL } from "../constants/constants.js";
import chalk from "chalk";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log(chalk.yellowBright(`MongoDB Connected Successfully`));
    } catch (error) {
        console.error(chalk.redBright(`MongoDB Error: ${error}`));
        process.exit(1);
    }
};

export default connectDB;
