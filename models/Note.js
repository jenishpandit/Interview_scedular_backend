import mongoose from "mongoose";

// creating mongoose schema for notes
const noteSchema = new mongoose.Schema(
    {
        interview_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'interviews',
            required: true
        },
        note_text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

noteSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})

const Note = mongoose.model('Note', noteSchema);

export default Note;
