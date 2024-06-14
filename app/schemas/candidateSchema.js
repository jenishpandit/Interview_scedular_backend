import mongoose from "mongoose";
import technologies from './technologySchema.js';
// import Schema from mongoose.Schema;
// import ObjectId from Schema.ObjectId;

const candidate = mongoose.Schema(
    // {
    //     first_name :
    //     {
    //         type : String,
    //         required: true
    //     },
    //     last_name :
    //     {
    //         type : String,
    //         required: true
    //     },
        // email :
        // {
        //     type : String,
        //     required: true,
        //     // unique : true
        // },
    //     phone_number :
    //     {
    //         type : String,
    //         required: true
    //     },
    //     technology_id :
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : 'technologies',
    //         required : true 
    //     },
    //     type :
    //     {
    //         type : String,
    //         enum : [ 'WFH' , 'office'],
    //         required : true
    //     },
    {
        resume : 
        {
            type : String,
            required : true
        }
    }
    // },
    // {
    //     timestamps : true
    // }
)

const candidates = mongoose.model("candidates" , candidate);
export default candidates;


