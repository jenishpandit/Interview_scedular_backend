import mongoose from "mongoose";

const interviewTypeSchema = mongoose.Schema(
    {
        type : 
        {
            type : String,
            enum : ['Online', 'Offline'],
            required : true
        }
    }
)

const interview_types = mongoose.model('interview_types', interviewTypeSchema);
export default interview_types;