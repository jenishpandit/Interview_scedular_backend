import notes from "../models/Note.js";
import Candidate from "../models/Candidate.js";
import Interview from "../models/Interview.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";

export class NoteController {
    constructor() {
    }

    async createNote(req, res) {
        try {
            const {body} = req;

            const isInterview = await Interview.findById(body.interview_id);
            if(!isInterview) return errorResponse(res, "Interview Not Found !!", 400);

            const isCandidate = await Candidate.findById(body.candidate);
            if(!isCandidate) return errorResponse(res, "Candidate Not Found !!", 400);

            await notes.create(body);
            successResponse(res, body, "Notes  Created Successfully.");

        } catch (err) {
            console.log('CREATE NOTE ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async getNotes(req, res) {
        try {
            const data = await notes.find({});
            successResponse(res, data,"All Notes Data Showed Successfully");

        } catch (err) {
            console.log('GET ALL NOTE ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async getNote(req, res) {
        try {
            const {id} = req.params;

            const data = await notes.find({interview_id:id});

            if (!data) return errorResponse(res, "invalid ID", 400);
            successResponse(res, data,"Notes Data Showed by ID Successfully");

        } catch (err) {
            console.log('GET NOTE BY ID ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async updateNote(req, res) {
        try {
            const {id} = req.params;
            const { body } = req;

            const isNote = await notes.findById(id);
            if (!isNote) return errorResponse(res, 'invalid ID', 400);

            await notes.findByIdAndUpdate(id, body);
            const data = await notes.findOne({_id : id})
            successResponse(res, data,"Notes Data Updated Successfully");

        } catch (err) {
            console.log('UPDATE NOTE ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async deleteNote(req, res) {
        try {
            const {id} = req.params;

            const isNote = await notes.findById(id);
            if (!isNote) return errorResponse(res, 'invalid ID', 400);

            await notes.findByIdAndDelete(id);
            successResponse(res, null,"notes data deleted successfully");

        } catch (err) {
            console.log('DELETE NOTE ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }

    async getLatestNote(req, res){
        try{
            const { id } = req.params;
            const data = await notes.findOne({ candidate :id })
            .sort({ createdAt: -1 }) // Replace with your timestamp field
            .limit(1);
            // const data = await notes.findOne().sort({createdAt:-1}).limit(1).populate("");
            successResponse(res, data,"Latest Notes Data Successfully");
        }catch(err){
            console.log(' getLatestNote ERROR : ', err);
            errorResponse(res, err.message, 400);
        }
    }
}
