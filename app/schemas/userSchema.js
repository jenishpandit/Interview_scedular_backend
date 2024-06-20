import mongoose from "mongoose";
// import { Timestamps, Unique } from "typeorm";

const userSchema = mongoose.Schema(
    {
        email : 
        {
            type : String,
            required : true,
            unique : true
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

const users = mongoose.model("users", userSchema);
export default users;