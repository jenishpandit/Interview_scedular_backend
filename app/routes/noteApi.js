import express from "express";
// import { deleteModel } from "mongoose";
import {createNote, readNotes, readNote, updateNote, deleteNote} from '../controllers/note.js'

const noteRouter = express.Router();

//creating notes
noteRouter.post('/', createNote);

//reading all notes
noteRouter.get('/', readNotes);

//reading notes by id
noteRouter.get('/:id', readNote);

//updating note by id
noteRouter.put('/:id', updateNote);

//deleting note by id
noteRouter.delete('/:id', deleteNote);

export default noteRouter;