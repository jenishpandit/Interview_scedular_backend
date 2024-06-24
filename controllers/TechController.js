import technologies from "../models/Technology.js";
import candidates from "../models/Candidate.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";

export class TechController{
    constructor() {}

    async createTechnology( req, res){
        try{
            const rawData = req.body;
            await technologies.create(rawData);
            successResponse(res , "data inserted")
        }
        catch(err){
            errorResponse(res, err.message, 400);
        }
    }

    async readAllTechnology( req, res){
        try{
            const data = await technologies.find({});
            successResponse(res ,{code : 200,} ,{data : data})
        }catch(err){
            // console.log("Error : ", err)
            errorResponse(res, err.message, 400);
        }
    }

    async readTechnology( req, res) {
        try{
            const rawData = req.params.id;
            const data = await technologies.findOne({_id : rawData});
            let resMessage = data;
            if(!data) resMessage = "invalid id";
            console.log(data);
            successResponse(res ,{code : 200,} ,{data : resMessage})
        }catch(err){
                // console.log("Error : ", err)
            errorResponse(res, err.message, 400);
            }
        }

    async updateTechnolgy( req, res) {
        try{
            const id = req.params.id;
            const rawData = req.body;
            const isTechnology = await technologies.findOne({_id : id});
            console.log('checking candidate : ', isTechnology);
            if(!isTechnology) return res.status(400).json({status : "error" , message : "invalid or repeated"})
            await technologies.findByIdAndUpdate(id, rawData);
            successResponse(res ,{code : 200,} ,{message : "data updated"})
        }catch(err){
            // console.log("Error : ", err)
            errorResponse(res, err.message, 400);
        }
    }

    async deleteTechnology( req, res) {
        try{
            const id = req.params.id;
            console.log('id',id);
            const isTechnology = await technologies.findOne({_id : id});
            console.log('checking candidate : ', isTechnology);
            if(!isTechnology) return res.status(400).json({status : "error" , message : "invalid or repeated"})
            const isTech = await candidates.findOne({technology_id : id});
            let message = 'data not deleted'
            if(!isTech)
            {
                    await technologies.findByIdAndDelete(id);
                    message = 'data deleted';
            }
            successResponse(res ,{code : 200,} ,{message : message})

        }
        catch(err){
            console.log("Error : ", err)
            errorResponse(res, err.message, 400);
        }
    }
}