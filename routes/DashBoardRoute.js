import express from "express";
import AsyncHandler from "../middlewares/AsyncHandler.js";
import { DashBoardController } from "../controllers/DashBoardController.js";

const DashBoardRouter = express.Router();
const dashBoardController = new DashBoardController();

DashBoardRouter.get('/total', AsyncHandler(dashBoardController.getTotal.bind(dashBoardController)));

export default DashBoardRouter;