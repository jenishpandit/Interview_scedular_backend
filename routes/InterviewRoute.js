import express from "express";
import { InterviewController } from "../controllers/InterviewController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";

const interviewRouter = express.Router();
const interviewController = new InterviewController();

interviewRouter.post('/create', AsyncHandler(interviewController.createInterview.bind(interviewController)));
interviewRouter.get('/readAll', AsyncHandler(interviewController.readAllInterview.bind(interviewController)));
interviewRouter.get('/read/:id', AsyncHandler(interviewController.readInterview.bind(interviewController)));
interviewRouter.put('/update/:id', AsyncHandler(interviewController.updateInterview.bind(interviewController)));
interviewRouter.delete('/delete/:id', AsyncHandler(interviewController.deleteInterview.bind(interviewController)));

export default interviewRouter;