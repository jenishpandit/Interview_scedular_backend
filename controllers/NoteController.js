import notes from "../models/Note.js";
// importing response handler
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";

export class NoteController {
    constructor() {
    }

    async createNote(req, res) {
        try {
            const {body} = req;
            await notes.create(body);

            successResponse(res, body, "Notes Created Successfully.");

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

            const data = await notes.findById(id);

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
}