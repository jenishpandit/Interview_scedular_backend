import {QuestionsController} from "../controllers/QuestionsController.js";
import express from "express";
import AsyncHandler from "../middlewares/AsyncHandler.js";

const QuestionsRouter = express.Router();
const questionsController = new QuestionsController();

QuestionsRouter.post("/", AsyncHandler(questionsController.createQnA.bind(questionsController)))
QuestionsRouter.get("/", AsyncHandler(questionsController.getQnAs.bind(questionsController)))
QuestionsRouter.get("/:id", AsyncHandler(questionsController.getQnA.bind(questionsController)))
QuestionsRouter.put("/:id", AsyncHandler(questionsController.updateQnA.bind(questionsController)))
QuestionsRouter.delete("/:id", AsyncHandler(questionsController.deleteQnA.bind(questionsController)))

export default QuestionsRouter;