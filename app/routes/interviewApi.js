import express from 'express';
import {createInterview, readInterviews, readInterview, updateInterview, deleteInterview} from '../controllers/interview.js';
const interviewRouter = express.Router();

//creating interview
interviewRouter.post('/', createInterview);

// reading all interviews
interviewRouter.get('/', readInterviews);

//reading interview by id
interviewRouter.get('/:id', readInterview);

//updating interview by id
interviewRouter.put('/:id', updateInterview);

//deleting interview by id
interviewRouter.delete('/:id', deleteInterview);

export default interviewRouter;