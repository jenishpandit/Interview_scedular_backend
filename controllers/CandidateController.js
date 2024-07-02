import Technology from "../models/Technology.js";
import Candidate from "../models/Candidate.js";
import { errorResponse, successResponse } from "../utils/ResponseHandler.js";

export class CandidateController {
  constructor() {}

  async createCandidate(req, res) {
    try {
      const { body } = req;
      const image = req.file.path;

      if (!image) return errorResponse(res, "please enter your resume!", 404);
      const {
        first_name,
        last_name,
        email,
        phone_number,
        technology_id,
        type,
        gender
      } = body;

      const isTech = await Technology.findById(technology_id);
      if (!isTech) return errorResponse(res, "Technology not found!", 400);

      const isCandidate = await Candidate.findOne({ email });
      if (isCandidate)
        return errorResponse(res, "Please try unique email address!", 400);

      let candidateData = {
        first_name,
        last_name,
        email,
        phone_number,
        technology_id,
        type,
        gender,
        resume: image,
      };

      await Candidate.create(candidateData);
      successResponse(res, candidateData, "Candidate Created Successfully.");
    } catch (err) {
      console.log(" CREATE CANDIDATE err : ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async getCandidates(req, res) {
    try {
      const data = await Candidate.find().populate({
        path: "technology_id",
        select: "technology_name",
      });

      const newData = data.map((item) => {
        const newObject = item.toObject();
        const technology = newObject.technology_id;
        delete newObject.technology_id;
        return {
          ...newObject,
          technology,
        };
      });

      successResponse(res, newData, "All Candidates Showed Successfully");
    } catch (err) {
      console.log("GET ALL CANDIDATE ERROR: ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async getCandidate(req, res) {
    try {
      const { id } = req.params;

      const data = await Candidate.findById(id).populate({
        path: "technology_id",
        select: "technology_name",
      });
      if (!data) return errorResponse(res, "Technology not found!", 400);

      let newObject = data.toObject();
      const technology = newObject.technology_id;
      delete newObject.technology_id;
      const newData = {
        ...newObject,
        technology,
      };

      successResponse(res, newData, "Candidate Data Showed by ID Successfully");
    } catch (err) {
      console.log("READ CANDIDATE ERROR: ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async updateCandidate(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const image = req.file ? req.file.path : null;

      const isCandidate = await Candidate.findById(id);
      if (!isCandidate) return errorResponse(res, "Candidate not found!", 404);

      let candidateData = { ...body };
      if (image) candidateData.resume = image;

      await Candidate.findByIdAndUpdate(id, candidateData);
      let data = await Candidate.findOne({ _id: id });

      successResponse(res, data, "Candidates Data Updated Successfully");
    } catch (err) {
      console.log("CANDIDATE UPDATE error : ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async deleteCandidate(req, res) {
    try {
      const { id } = req.params;
      const isCandidate = await Candidate.findById(id);

      if (!isCandidate) return errorResponse(res, "invalid ID", 400);

      await Candidate.findByIdAndDelete(id);
      successResponse(res, null, "candidates data deleted successfully");
    } catch (err) {
      console.log(" DELETED CANDIDATE ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }
}
