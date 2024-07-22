import mongoose from "mongoose";
import Technology from "./Technology.js";

// creating mongoose schema for candidate
const candidateSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim:true,
            required: true
        },
        last_name: {
            type: String,
            trim:true,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone_number: {
            type: String,
            required: true
        },
        // technology_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: Technology,
        //     required: true
        // },
        skills:{
            type:[String],
            required:true,
        },
        type: {
            type: String,
            enum: ['WFH', 'office'],
            required: true
        },
        gender:{
            type:String,
            enum:["male", "female", "others"],
            required: true
        },
        job_role:{
            type:String,
            required:true
        },
        resume: {
            type: String,
            required: true
        },
        candidate_status :{
            type:String,
            enum :["selected" , "rejected" , "not_joining"],
        }
    },
    {
        timestamps: true
    }
);

candidateSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
