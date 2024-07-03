import express from "express";
import { CandidateController } from "../controllers/CandidateController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
import multerHandler from "../middlewares/MulterMiddleware.js";
import {candidateIDValidate, candidateUpdateValidate, candidateValidate} from "../validations/CandidateValidation.js";
import {validate} from "../middlewares/Validator.js";

const candidateRouter = express.Router();
const candidateController = new CandidateController();

candidateRouter.post('/', multerHandler, candidateValidate, validate, AsyncHandler(candidateController.createCandidate.bind(candidateController)));
candidateRouter.get('/roles', AsyncHandler(candidateController.CandidateRoles.bind(candidateController)))
candidateRouter.get('/', AsyncHandler(candidateController.getCandidates.bind(candidateController)));
candidateRouter.get('/:id', candidateIDValidate, validate,AsyncHandler(candidateController.getCandidate.bind(candidateController)));
candidateRouter.put('/:id', multerHandler, candidateIDValidate, candidateUpdateValidate, validate, AsyncHandler(candidateController.updateCandidate.bind(candidateController)));
candidateRouter.delete('/:id', candidateIDValidate, validate, AsyncHandler(candidateController.deleteCandidate.bind(candidateController)));

export default candidateRouter;