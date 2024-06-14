import express from "express";
import {createTechnology, readtechnologies, readtechnology, updatingTechnology, deletingTechnology} from '../services/technology.js';
const techRouter = express.Router();

//creating technology
techRouter.post('/technology', async (req, res) => {
    createTechnology(req, res);
    console.log('data inserted successfully');
})

//reading all
techRouter.get('/technologies', async (req, res) => {
    readtechnologies(req, res);
    console.log('all data showed successfully');
})

//reading by id
techRouter.get('/technology/:id', async (req, res) => {
    readtechnology(req, res);
    console.log('data showed by id successfully');
})

//updating 
techRouter.put('/technology/:id', async (req, res) => {
    updatingTechnology(req, res);
    console.log('data updated by id successfully');
})

//deleting
techRouter.delete('/technology/:id', async (req, res) => {
    deletingTechnology(req, res);
    console.log('data deleted by id successfully');
})

export default techRouter;