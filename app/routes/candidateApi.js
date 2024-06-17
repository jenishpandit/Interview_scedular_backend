import express from "express";
import {createCandidate, readCandidates, readCandidate, updatingCandidate, deletingCandidate} from "../apiLogic/candidate.js";
const candidateRouter = express.Router();
import imageupload from '../controllers/multer.js';

//creating candidate
candidateRouter.post('/candidate',imageupload, createCandidate)

//reading all candidate
candidateRouter.get('/candidates', async (req, res) => {
    readCandidates(req, res);
    console.log('all data showed successfully');
})

//reading by id of candidate
candidateRouter.get('/candidate/:id', async (req, res) => {
    readCandidate(req, res);
    console.log('data showed by id successfully');
})

//updating candidate by id
candidateRouter.put('/candidate/:id', async (req, res) => {
    updatingCandidate(req, res);
    console.log('data updated by id successfully');
})

//deleting candidate by id
candidateRouter.delete('/candidate/:id', async (req, res) => {
    deletingCandidate(req, res);
    console.log('data deleted by id successfully');
})

export default candidateRouter;