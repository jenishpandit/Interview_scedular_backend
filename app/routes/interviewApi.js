import express from 'express';
import {createInterview, readInterviews, readInterview, updateInterview, deleteInterview} from '../apiLogic/interview.js';
const interviewRouter = express.Router();

//creating interview
interviewRouter.post('/interview', createInterview);

// reading all interviews
interviewRouter.get('/interviews', readInterviews);

//reading interview by id
interviewRouter.get('/interview/:id', readInterview);

//updating interview by id
interviewRouter.put('/iterview/:id', updateInterview);

//deleting interview by id
interviewRouter.delete('/interview/:id', deleteInterview);

export default interviewRouter;