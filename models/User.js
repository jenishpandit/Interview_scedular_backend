import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }
})


const User = mongoose.model("User", userSchema);
export default User;
