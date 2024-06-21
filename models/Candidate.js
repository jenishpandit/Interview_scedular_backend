import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
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
        technology_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'technologies',
            required: true
        },
        type: {
            type: String,
            enum: ['WFH', 'office'],
            required: true
        },
        resume: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
