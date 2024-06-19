import mongoose from 'mongoose';
import candidates from './candidateSchema.js';
import users from './userSchema.js';
import interview_types from './interview_type_schema.js'
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
        user_id :
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
        interview_type_id :
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : interview_types,
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