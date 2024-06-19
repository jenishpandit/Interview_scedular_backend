// import { required } from "joi";
import mongoose from "mongoose";
import interviews from "./interviewSchema.js";

const noteSchema = mongoose.Schema(
    {
        interview_id :
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : interviews,
            required : true
        },
        note_text :
        {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

const notes = mongoose.model('notes', noteSchema);

export default notes;