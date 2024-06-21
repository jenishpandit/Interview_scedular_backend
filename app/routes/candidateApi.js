import express from "express";
import {createCandidate, readCandidates, readCandidate, updatingCandidate, deletingCandidate} from "../controllers/candidate.js";
const candidateRouter = express.Router();
import imageupload from '../middlewares/multer.js';

//creating candidate
candidateRouter.post('/',imageupload, createCandidate)

//reading all candidate
candidateRouter.get('/', async (req, res) => {
    readCandidates(req, res);
    console.log('all data showed successfully');
})

//reading by id of candidate
candidateRouter.get('/:id', readCandidate)

//updating candidate by id
candidateRouter.put('/:id', imageupload, updatingCandidate);

//deleting candidate by id
candidateRouter.delete('/:id', async (req, res) => {
    deletingCandidate(req, res);
    console.log('data deleted by id successfully');
})

export default candidateRouter;