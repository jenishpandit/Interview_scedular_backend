import express from "express";
// import { deleteModel } from "mongoose";
import {createNote, readNotes, readNote, updateNote, deleteNote} from '../apiLogic/note.js'

const noteRouter = express.Router();

//creating notes
noteRouter.post('/note', createNote);

//reading all notes
noteRouter.get('/notes', readNotes);

//reading notes by id
noteRouter.get('/note/:id', readNote);

//updating note by id
noteRouter.put('/note/:id', updateNote);

//deleting note by id
noteRouter.delete('/note/:id', deleteNote);

export default noteRouter;