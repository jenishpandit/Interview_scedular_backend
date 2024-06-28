import Candidate from "../models/Candidate.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";
import Technology from "../models/Technology.js";
import Interview from "../models/Interview.js";

export class DashBoardController {
    constructor() {}

    async getTotal(req, res) {
        try {
            const candidateTotal = await Candidate.countDocuments();
            const technologyTotal = await Technology.countDocuments();
            const interviewTotal = await Interview.countDocuments();

            successResponse(res, {candidateTotal, technologyTotal, interviewTotal}, " All Total Showed Successfully");
        }catch(err) {
           console.log(" DASHBOARD ERROR : ", err);
           errorResponse(res, err.message, 400);
        }
    }
}