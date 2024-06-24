import {errorResponse, successResponse} from "../utils/ResponseHandler.js";
import interviews from "../models/Interview.js"

export class InterviewController{
    constructor() {}

    async createInterview( req, res){
        try
        {
            let rawData = req.body;
            console.log('rd : ',rawData);
            await interviews.create(rawData);
            successResponse(res , "data inserted");
        }
        catch(err)
        {
            // console.log('ERRoR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async readAllInterview( req, res){
            try{
                let data = await interviews.find({});
                successResponse(res , data)
            }
            catch(err){
                // console.log('ERRoR', err);
                errorResponse(res, err.message, 400);
            }
    }

    async readInterview( req, res){
        try{
            let rawData = req.params.id;
            let data = await interviews.findOne({_id : rawData});
            let resMessage = data;
            if(!data) resMessage = "invalid id";
            console.log(data);
            successResponse(res , data)
        }
        catch(err)
        {
            // console.log('ERROR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async updateInterview( req, res){
        try
        {
            let id = req.params.id;
            let rawData = req.body;
            let isInterview = await interviews.findOne({_id : id});
            console.log('checking candidate : ', isInterview);
            if(!isInterview) return res.status(400).json({status : "error" , message : "invalid or repeated"})
            let data = await interviews.findByIdAndUpdate(id, rawData);
            successResponse(res , "data updated")
        }
        catch(err)
        {
            // console.log('ERRoR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async deleteInterview( req, res) {
        try
        {
            let id = req.params.id;
            console.log('id',id);
            let isInterview = await interviews.findOne({_id : id});
            console.log('checking candidate : ', isInterview);
            if(!isInterview) return res.status(400).json({status : "error" , message : "invalid or repeated"})
            let data = await interviews.findByIdAndDelete(id);
            successResponse(res , "data deleted")
        }
        catch(err)
        {
            // console.log(err);
            errorResponse(res, err.message, 400);
        }
    }
}