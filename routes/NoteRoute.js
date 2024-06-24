import express from 'express';
import { NoteController } from "../controllers/NoteController.js";
import AsyncHandler from "../middlewares/AsyncHandler.js";

const noteRouter = express.Router();
const noteController = new NoteController();

noteRouter.post('/create', AsyncHandler(noteController.createNote.bind(noteController)));
noteRouter.get('/readAll', AsyncHandler(noteController.readAllNote.bind(noteController)));
noteRouter.get('/read/:id', AsyncHandler(noteController.readNote.bind(noteController)));
noteRouter.put('/update/:id', AsyncHandler(noteController.updateNote.bind(noteController)));
noteRouter.delete('/delete/:id', AsyncHandler(noteController.deleteNote.bind(noteController)));

export default noteRouter;