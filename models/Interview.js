import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
    {
        candidate_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidates',
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
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
