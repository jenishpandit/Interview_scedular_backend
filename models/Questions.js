import mongoose from"mongoose";
import Technology from "./Technology.js";

const qnaSchema = new mongoose.Schema(
    {
        technology: {
            type:mongoose.Schema.Types.ObjectId,
            ref:Technology,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        show: {
            type:Boolean,
            required:false,
            default:true
        }
    }
);
export const Questions = mongoose.model("QuestionAndAnswer", qnaSchema);
