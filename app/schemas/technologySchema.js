import mongoose from "mongoose";  

const technology = mongoose.Schema(
    {
        technology_name : 
        {
            type : String,
            required : true,
            unique : true
        }
    }
)

const technologies = mongoose.model("technologies" , technology);
export default technologies;