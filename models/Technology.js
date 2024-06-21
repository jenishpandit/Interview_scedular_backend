import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
    {
        technology_name: {
            type: String,
            required: true,
            unique: true
        }
    }
);

const Technology = mongoose.model("Technology", technologySchema);
export default Technology;
