import express from "express";
import createCandidate from "../services/candidate.js";
const candidateRouter = express.Router();

//creating candidate
candidateRouter.post('/candidate', async (req, res) => {
    createCandidate(req, res);
    console.log('data inserted successfully');
})

//reading all candidate
candidateRouter.get('/candidates', async (req, res) => {
    // readtechnologies(req, res);
    console.log('all data showed successfully');
})

//reading by id of candidate
candidateRouter.get('/candidate/:id', async (req, res) => {
    // readtechnology(req, res);
    console.log('data showed by id successfully');
})

//updating candidate by id
candidateRouter.put('/candidate/:id', async (req, res) => {
    // updatingTechnology(req, res);
    console.log('data updated by id successfully');
})

//deleting candidate by id
candidateRouter.delete('/candidate/:id', async (req, res) => {
    // deletingTechnology(req, res);
    console.log('data deleted by id successfully');
})

export default candidateRouter;