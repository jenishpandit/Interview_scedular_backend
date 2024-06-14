import mongoose from "mongoose";
// import Schema from 'mongoose.Schema';
// import ObjectId from 'Schema.ObjectId';

const candidate = mongoose.Schema(
    {
        first_name :
        {
            type : String,
            required: true
        },
        last_name :
        {
            type : String,
            required: true
        },
        email :
        {
            type : String,
            required: true,
            Unique : true
        },
        phone_number :
        {
            type : String,
            required: true
        },
        technology_id :
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true 
        },
        type :
        {
            type : String,
            enum : [ 'WFH' , 'office']
        },
        resume : 
        {
            data : Buffer,
            type : String
        }
    },
    {
        timeStamps : true
    }
)

const candidates = mongoose.model("candidates" , candidate);
export default candidates;


