import express from 'express';
// importing api controllers
import { NoteController } from "../controllers/NoteController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";
// importing validator middlewares
import {noteValidate, noteIDValidate} from "../validations/NoteValidation.js";
import {validate} from "../middlewares/Validator.js";

const noteRouter = express.Router();
const noteController = new NoteController();

// api routes
noteRouter.post('/create',noteValidate, validate, AsyncHandler(noteController.createNote.bind(noteController)));
noteRouter.get('/all',AsyncHandler(noteController.getNotes.bind(noteController)));
noteRouter.get('/:id', noteIDValidate, validate, AsyncHandler(noteController.getNote.bind(noteController)));
noteRouter.put('/update/:id',noteIDValidate,noteValidate, validate, AsyncHandler(noteController.updateNote.bind(noteController)));
noteRouter.delete('/delete/:id', noteIDValidate, validate, AsyncHandler(noteController.deleteNote.bind(noteController)));

export default noteRouter;