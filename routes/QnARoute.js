import {QnAController} from "../controllers/QnAController.js";
import express from "express";
import AsyncHandler from "../middlewares/AsyncHandler.js";

const QnARouter = express.Router();
const qnaController = new QnAController();

QnARouter.post("/", AsyncHandler(qnaController.createQnA.bind(qnaController)))
QnARouter.get("/", AsyncHandler(qnaController.getQnAs.bind(qnaController)))
QnARouter.get("/:id", AsyncHandler(qnaController.getQnA.bind(qnaController)))
QnARouter.put("/:id", AsyncHandler(qnaController.updateQnA.bind(qnaController)))
QnARouter.delete("/:id", AsyncHandler(qnaController.deleteQnA.bind(qnaController)))

export default QnARouter;