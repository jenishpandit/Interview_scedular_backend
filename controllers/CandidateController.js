import technologies from "../models/Technology.js";
import candidates from "../models/Candidate.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";

export class CandidateController {
    constructor() {}

    async createCandidate(req, res) {
        try {
            let requestBody = req.body;
            let image = req.file.path;
            console.log(requestBody);
            let {first_name, last_name, email, phone_number, technology_id, type} = requestBody;
            if (!image) return res.status(400).json({message: "resume is not inserted"});
            let isTech = await technologies.findOne({_id: technology_id});
            console.log('istech : ', isTech);
            if (!isTech) return res.status(400).json({
                status: "error",
                message: 'technology_id is incorrect or null'
            });
            let candidateData = {
                first_name, last_name, email, phone_number, technology_id, type,
                resume: image
            };
            await candidates.create(candidateData);
            successResponse(res, "data inserted")
        } catch (err) {
            errorResponse(res, err.message, 400);
        }
    }

    async readAllCandidate(req, res) {
        try {
            // let data = await candidates.find({});
            let data = await candidates.aggregate(
                [
                    {
                        $lookup:
                            {
                                from: "technologies",
                                localField: "technology_id",
                                foreignField: "_id",
                                as: "tech"
                            }
                    },
                    {
                        $addFields:
                            {
                                candidate_technology:
                                    {
                                        "$arrayElemAt": ["$tech.technology_name", 0]
                                    }
                            }
                    },
                    {
                        $project:
                            {
                                tech: 0
                            }
                    }
                ])
            successResponse(res, data)
        } catch (err) {
            // console.log(err);
            errorResponse(res, err.message, 400);
        }
    }

    async readCandidate(req, res) {
        try {
            let rawData = req.params.id;
            console.log(rawData)
            let data = await candidates.findOne({_id: rawData});
            let resMessage = data;
            if (!data) resMessage = "invalid id";
            // console.log(data);
            successResponse(res,  resMessage)
        } catch (err) {
            // console.log('ERRoR', err.message);
            errorResponse(res, err.message, 400);
        }
    }

    async updateCandidate(req, res) {
        try {
            let id = req.params.id;
            let rawData = req.body;
            let image = req.file;
            let isCandidate = await candidates.findOne({_id: id});
            console.log('checking candidate : ', isCandidate);
            if (!isCandidate) return res.status(400).json({status: "error", message: "invalid or repeated"})
            let candidateData = {...rawData};
            if (image) {
                image = req.file.path;
                candidateData.resume = image;
            }
            // console.log('rd', rawData, "rf", image);

            // console.log("=============req========", req);
            let data = await candidates.findByIdAndUpdate(id, candidateData);
            let resMessage = 'data updated';
            if (!data) resMessage = "invalid id";
            console.log(data);
            successResponse(res,  resMessage)
        } catch (err) {
            // console.log(err);
            errorResponse(res, err.message, 400);
        }
    }

    async deleteCandidate(req, res) {
        try {
            let id = req.params.id;
            console.log(id);
            let isCandidate = await candidates.findOne({_id: id});
            console.log('checking candidate : ', isCandidate);
            if (!isCandidate) return res.status(400).json({status: "error", message: "invalid or repeated"})
            let data = await candidates.findByIdAndDelete(id);
            let resMessage = 'data deleted';
            if (!data) resMessage = "invalid id";
            console.log(data);
            successResponse(res, resMessage)
        } catch (err) {
            // console.log(err);
            let errMessage = 'internal server error';
            if (err.kind === "ObjectId") {
                errMessage = 'Invalid ID';
            }
            errorResponse(res, err.message, 400);
        }
    }
}