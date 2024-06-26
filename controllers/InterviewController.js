import {errorResponse, successResponse} from "../utils/ResponseHandler.js";
import interviews from "../models/Interview.js"

export class InterviewController {
    constructor() {
    }

    async createInterview(req, res) {
        try {
            const {body} = req;

            await interviews.create(body);
            successResponse(res, body, "interview data inserted successfully");
        } catch (err) {
            console.log('CREATE INTERVIEW ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async getInterviews(req, res) {
        try {
            const data = await interviews.find({});
            successResponse(res, data, "All interviews data showed successfully");
        } catch (err) {
            console.log('READ ALL INTERVIEW ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async getInterview(req, res) {
        try {
            const {id} = req.params;
            const data = await interviews.findById(id);

            if (!data) return errorResponse(res, 'invalid ID', 400);
            successResponse(res, data);
        } catch (err) {
            console.log('READ INTERVIEW ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async updateInterview(req, res) {
        try {
            const {id} = req.params;
            const {body} = req;

            const isInterview = await interviews.findById(id);
            if (!isInterview) return errorResponse(res, 'invalid ID', 400);
            await interviews.findByIdAndUpdate(id, body);

            await interviews.findByIdAndUpdate(id, body);
            successResponse(res, isInterview, "data updated");
        } catch (err) {
            console.log('UPDATE INTERVIEW ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async deleteInterview(req, res) {
        try {
            const {id} = req.params;

            const isInterview = await interviews.findById(id);
            if (!isInterview) return errorResponse(res, 'invalid ID', 400);
            await interviews.findByIdAndDelete(id);

            successResponse(res, "data deleted")
        } catch (err) {
            console.log('DELETE INTERVIEW ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }
}