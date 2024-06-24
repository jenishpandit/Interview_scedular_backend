import express from "express";
import { TechController } from "../controllers/TechController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
import {techCreateValidation, techParamsValidation} from "../validations/TechValidation.js";
import {validate} from "../middlewares/Validator.js";

const techRouter = express.Router();
const techController = new TechController();

techRouter.post('/create', techCreateValidation, validate, AsyncHandler(techController.createTechnology.bind(techController)))
techRouter.get('/readAll',  AsyncHandler(techController.readAllTechnology.bind(techController)))
techRouter.get('/read/:id', techParamsValidation, validate, AsyncHandler(techController.readTechnology.bind(techController)))
techRouter.put('/update/:id', techParamsValidation, validate, AsyncHandler(techController.updateTechnolgy.bind(techController)))
techRouter.delete('/delete/:id', techParamsValidation, validate, AsyncHandler(techController.deleteTechnology.bind(techController)))

export default techRouter;