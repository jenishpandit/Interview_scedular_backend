import mongoose from 'mongoose';
import User from "./User.js";
import Candidate from "./Candidate.js";

// creating mongoose schema for interview
const interviewSchema = new mongoose.Schema(
    {
        candidate_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Candidate,
            required: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        interview_date: {
            type: Date,
            required: true
        },
        interview_type: {
            type: String,
            enum: ['Online', 'Offline'],
            required: true
        },
        round: {
            type:String,
            enum: ["technical interview","practical interview", "HR round", "reschedule"],
            required: true
        },
       
        location: {
            type: String,
            required: true
        },
        status:{
            type:String,
            enum:['create','complete','reschedule','rejected'],
            default:'create',
        },
    },
    {
        timestamps: true
    }
);

interviewSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
