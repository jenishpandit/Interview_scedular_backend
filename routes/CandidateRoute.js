import express from "express";
import {CandidateController} from "../controllers/CandidateController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
import multerHandler from "../middlewares/MulterMiddleware.js";
// import { techCreateValidation , techParamsValidation } from "../validations/TechValidation.js";
import {validate} from "../middlewares/Validator.js";

const candidateRouter = express.Router();
const candidateController = new CandidateController();

candidateRouter.post('/create', multerHandler, AsyncHandler(candidateController.createCandidate.bind(candidateController)));
candidateRouter.get('/readAll', AsyncHandler(candidateController.readAllCandidate.bind(candidateController)));
candidateRouter.get('/read/:id', AsyncHandler(candidateController.readCandidate.bind(candidateController)));
candidateRouter.put('/update/:id', multerHandler, AsyncHandler(candidateController.updateCandidate.bind(candidateController)));
candidateRouter.delete('/delete/:id', AsyncHandler(candidateController.deleteCandidate.bind(candidateController)))

export default candidateRouter;