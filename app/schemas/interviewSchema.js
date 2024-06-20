import mongoose from 'mongoose';
import candidates from './candidateSchema.js';
import users from './userSchema.js';
// import { date, required } from 'joi';
// import { Timestamp } from 'typeorm';

const interviewSchema = mongoose.Schema(
    {
        candidate_id :
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : candidates,
            required : true
        },
        created_by :
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : users,
            required : true
        },
        interview_date :
        {
            type : Date,
            required : true
        },
        interview_type :
        {
            type : String,
            enum : ['Online', 'Offline'],
            required : true
        },
        location :
        {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

const interviews = mongoose.model('interviews', interviewSchema)
export default interviews;