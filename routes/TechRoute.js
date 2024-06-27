import express from "express";
// importing api controllers
import { TechController } from "../controllers/TechController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
// importing validator middlewares
import {techValidation, techParamsValidation} from "../validations/TechValidation.js";
import {validate} from "../middlewares/Validator.js";

const techRouter = express.Router();
const techController = new TechController();

// api routes
techRouter.post('/', techValidation, validate, AsyncHandler(techController.createTechnology.bind(techController)))
techRouter.get('/',  AsyncHandler(techController.getTechnologies.bind(techController)))
techRouter.get('/:id', techParamsValidation, validate, AsyncHandler(techController.getTechnology.bind(techController)))
techRouter.put('/:id', techParamsValidation, techValidation, validate, AsyncHandler(techController.updateTechnology.bind(techController)))
techRouter.delete('/:id', techParamsValidation, validate, AsyncHandler(techController.deleteTechnology.bind(techController)))

export default techRouter;