import mongoose from "mongoose";
// creating mongoose schema for candidate
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
            ref: 'Technology',
            required: true
        },
        type: {
            type: String,
            enum: ['WFH', 'office'],
            required: true
        },
        gender:{
            type:String,
            enum:["male","female","others"],
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

candidateSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
