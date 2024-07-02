import mongoose from 'mongoose';

// creating mongoose schema for interview
const interviewSchema = new mongoose.Schema(
    {
        candidate_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate',
            required: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        interview_date: {
            type: Date,
            required: true
        },
        interview_type: {
            type: String,
            enum: ['Online', 'Offline'],
            required: true
        },
        round: {
            type:String,
            enum: ["technical interview", "HR round", "reschedule"],
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

interviewSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
