import notes from "../models/Note.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";


export class NoteController{
    constructor() {}

    async createNote( req, res){
        try
        {
            let rawData = req.body;
            console.log(rawData);
            await notes.create(rawData);
            successResponse(res , "data inserted");
        }
        catch(err)
        {
            // console.log('ERRoR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async readAllNote( req, res){
        try{
            let data = await notes.find({});
            successResponse(res , data);
        }
        catch(err){
            // console.log('ERRoR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async readNote( req, res) {
        try{
            let rawData = req.params.id;
            let data = await notes.findOne({_id : rawData});
            let resMessage = data;
            if(!data) resMessage = "invalid id";
            // console.log(data);
            successResponse(res , data);
        }
        catch(err)
        {
            // console.log('ERROR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async updateNote( req, res){
        try{
            let id = req.params.id;
            let rawData = req.body;
            let isNote = await notes.findOne({_id : id});
            // console.log('checking candidate : ', isNote);
            if(!isNote) return res.status(400).json({status : "error" , message : "invalid or repeated"})
            let data = await notes.findByIdAndUpdate(id, rawData);
            successResponse(res , "data updated");
        }catch(err){
            // console.log('ERRoR', err);
            errorResponse(res, err.message, 400);
        }
    }

    async deleteNote( req, res) {
        try{
            let id = req.params.id;
            console.log('id',id);
            let isNote = await notes.findOne({_id : id});
            // console.log('checking candidate : ', isNote);
            if(!isNote) return res.status(400).json({status : "error" , message : "invalid or repeated"})
            let data = await notes.findByIdAndDelete(id);
            successResponse(res , "data deleted");
        }
        catch(err){
            // console.log(err);
            errorResponse(res, err.message, 400);
        }
    }
}