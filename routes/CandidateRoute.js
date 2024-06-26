import express from "express";
// importing api controllers
import { CandidateController } from "../controllers/CandidateController.js";
// importing other necessary middlewares
import AsyncHandler from "../middlewares/AsyncHandler.js";
import multerHandler from "../middlewares/MulterMiddleware.js";
// importing validator middlewares
import {candidateIDValidate, candidateUpdateValidate, candidateValidate} from "../validations/CandidateValidation.js";
import {validate} from "../middlewares/Validator.js";

const candidateRouter = express.Router();
const candidateController = new CandidateController();

// api routes
candidateRouter.post('/create', multerHandler, candidateValidate, validate, AsyncHandler(candidateController.createCandidate.bind(candidateController)));
candidateRouter.get('/all', AsyncHandler(candidateController.getCandidates.bind(candidateController)));
candidateRouter.get('/:id', candidateIDValidate, validate,AsyncHandler(candidateController.getCandidate.bind(candidateController)));
candidateRouter.put('/update/:id', multerHandler, candidateIDValidate, candidateUpdateValidate, validate, AsyncHandler(candidateController.updateCandidate.bind(candidateController)));
candidateRouter.delete('/delete/:id', candidateIDValidate, validate, AsyncHandler(candidateController.deleteCandidate.bind(candidateController)))

export default candidateRouter;