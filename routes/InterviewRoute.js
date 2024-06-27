import express from "express";
// importing api controllers
import { InterviewController } from "../controllers/InterviewController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
// importing validator middlewares
import {interviewParamsValidation, interviewValidate} from "../validations/InterviewValidation.js";
import {validate} from "../middlewares/Validator.js";
import {authMiddleware} from "../middlewares/AuthMiddleware.js";

const interviewRouter = express.Router();
const interviewController = new InterviewController();

// api routes
interviewRouter.post('/',interviewValidate,validate, authMiddleware,AsyncHandler(interviewController.createInterview.bind(interviewController)));
interviewRouter.get('/', AsyncHandler(interviewController.getInterviews.bind(interviewController)));
interviewRouter.get('/:id', interviewParamsValidation, validate, AsyncHandler(interviewController.getInterview.bind(interviewController)));
interviewRouter.put('/:id', interviewParamsValidation, validate, AsyncHandler(interviewController.updateInterview.bind(interviewController)));
interviewRouter.delete('/:id', interviewParamsValidation, validate,AsyncHandler(interviewController.deleteInterview.bind(interviewController)));

export default interviewRouter;