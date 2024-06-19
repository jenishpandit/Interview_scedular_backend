import express from 'express';
import {createInterviewType, readInterviewsType, readInterviewType, updateInterviewType, deleteInterviewType} from '../apiLogic/interview_type.js';
const interviewTypeRouter = express.Router();

//creating interview_type
interviewTypeRouter.post('/interviewType', createInterviewType);

// reading all interview_type
interviewTypeRouter.get('/interviewsType', readInterviewsType);

//reading interview_type by id
interviewTypeRouter.get('/interviewType/:id', readInterviewType);

//updating interview_type by id
interviewTypeRouter.put('/interviewType/:id', updateInterviewType);

//deleting interview_type by id
interviewTypeRouter.delete('/interviewType/:id', deleteInterviewType);

export default interviewTypeRouter;