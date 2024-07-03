import mongoose from "mongoose";
import Candidate from "./Candidate.js";
import Interview from "./Interview.js";

// creating mongoose schema for notes
const noteSchema = new mongoose.Schema(
    {
        interview_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Interview,
            required: true
        },
        candidate:{
            type:mongoose.Schema.Types.ObjectId,
            ref: Candidate,
            required: true
        },
        note_text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

noteSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})

const Note = mongoose.model('Note', noteSchema);

export default Note;
