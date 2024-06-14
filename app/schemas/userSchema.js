import mongoose from "mongoose";
// import { Timestamps, Unique } from "typeorm";

const users = mongoose.Schema(
    {
        email : 
        {
            type : String,
            required : true,
            Unique : true
        },
        password :
        {
            type : String,
            required : true,
            select : false
        }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model("users", users);
export default user;