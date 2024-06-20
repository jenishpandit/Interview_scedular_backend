import express from "express";
import {createTechnology, readtechnologies, readtechnology, updatingTechnology, deletingTechnology} from '../controllers/technology.js';
const techRouter = express.Router();

//creating technology
techRouter.post('/technology', createTechnology)

//reading all
techRouter.get('/technologies', readtechnologies)

//reading by id
techRouter.get('/technology/:id', readtechnology)

//updating 
techRouter.put('/technology/:id', updatingTechnology)

//deleting
techRouter.delete('/technology/:id', deletingTechnology)

export default techRouter;