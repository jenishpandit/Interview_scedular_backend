import Technology from "../models/Technology.js";
import candidates from "../models/Candidate.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";

export class TechController {
    constructor() {
    }

    async createTechnology(req, res) {
        try {
            const {body} = req;

            let isTech = await Technology.findOne({technology_name : body.technology_name});
            if(isTech) return errorResponse(res, 'Technology name must be unique', 400);

            const data = await Technology.create(body);
            successResponse(res, data, "Technology Created Successfully.", 201)
        } catch (err) {
            console.log("CREATE TECHNOLOGY Error: ", err)
            errorResponse(res, err.message, 400);
        }
    }

    async getTechnologies(req, res) {
        try {
            const data = await Technology.find();
            successResponse(res, data, "All Technology Showed Successfully")
        } catch (err) {
            console.log("GET ALL TECHNOLOGIES Error: ", err)
            errorResponse(res, err.message, 400);
        }
    }

    async getTechnology(req, res) {
        try {
            const {id} = req.params;

            const data = await Technology.findById(id);
            if (!data) return errorResponse(res, "Technology not found!", 404);

            successResponse(res, data, "Technology Data Showed by ID Successfully")
        } catch (err) {
            console.log("GET TECHNOLOGY Error: ", err)
            errorResponse(res, err.message, 400);
        }
    }

    async updateTechnology(req, res) {
        try {
            const {id} = req.params;
            const {body} = req;

            const isTechnology = await Technology.findOne({technology_name : "body.technology_name"});
            if (isTechnology) return errorResponse(res, "Technology is in already use!", 404);

            await Technology.findByIdAndUpdate(id, body);
            let data = await Technology.findById(id)
            successResponse(res, data,"Technology Data Updated Successfully.")
        } catch (err) {
            console.log("UPDATE TECHNOLOGY Error: ", err)
            errorResponse(res, err.message, 400);
        }
    }

    async deleteTechnology(req, res) {
        try {
            const { id } = req.params;

            const isTechnology = await Technology.findById(id);
            if (!isTechnology) return errorResponse(res, "Technology not found!", 404);

            const isTech = await candidates.findOne({technology_id: id});
            if (isTech) return errorResponse(res, "Technology is in use in Candidate document !", 400);

            await Technology.findByIdAndDelete(id);
            successResponse(res, null,"Technology Deleted Successfully.")

        } catch (err) {
            console.log("DELETE TECHNOLOGY Error: ", err)
            errorResponse(res, err.message, 400);
        }
    }
}