import Technology from "../models/Technology.js";
import Candidate from "../models/Candidate.js";
import { errorResponse, successResponse } from "../utils/ResponseHandler.js";
import { CANDIDATE_ROLES } from "../constants/candidateRoles.js";
import Interview from "../models/Interview.js";

export class CandidateController {
  constructor() {}

  async createCandidate(req, res) {
    try {
      const { body } = req;
      console.log(req);
      const image = req.file.path;

      if (!image) return errorResponse(res, "please enter your resume!", 404);
      const {
        first_name,
        last_name,
        email,
        phone_number,
        // technology_id,
        type,
        gender,
        skills,
        job_role,
      } = body;
      console.log(body, "=========");

      // const isTech = await Technology.findById(technology_id);
      // if (!isTech) return errorResponse(res, "Technology not found!", 400);

      const isCandidate = await Candidate.findOne({ email });
      if (isCandidate)
        return errorResponse(res, "Please try unique email address!", 400);

      let skillsArray;
      if (typeof skills === "string") {
        skillsArray = skills.split(",").map((skill) => skill.trim());
      } else if (Array.isArray(skills)) {
        skillsArray = skills;
      } else {
        return errorResponse(res, "Invalid format for skills!", 400);
      }
      let candidateData = {
        first_name,
        last_name,
        email,
        phone_number,
        // technology_id,
        type,
        gender,
        job_role,
        skills: skillsArray,
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
    const { filters } = req.query;
    try {
      let filter = {}; // Default empty query

      // Construct the query based on the provided filters parameter
      if (filters) {
        const regex = new RegExp(filters, "i"); // Case-insensitive search
        filter = {
          $or: [
            { first_name: regex },  
            { last_name: regex }, 
            { email: regex },
            { job_role: regex },
          ],
        };
      }
      const data = await Candidate.find(filter);
      const newData = data.map((item) => {
        const newObject = item.toObject();
        return {
          ...newObject,
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

      const data = await Candidate.findById(id);
      // .populate({
      //   path: "technology_id",
      //   select: "technology_name",
      // });
      if (!data) return errorResponse(res, "Technology not found!", 400);

      let newObject = data.toObject();
      // const technology = newObject.technology_id;
      // delete newObject.technology_id;
      const newData = {
        ...newObject,
        // technology,
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
      if (body.skills) {
        if (typeof body.skills === "string") {
          candidateData.skills = body.skills
            .split(",")
            .map((skill) => skill.trim());
        } else if (Array.isArray(body.skills)) {
          candidateData.skills = body.skills;
        } else {
          return errorResponse(res, "Invalid format for skills!", 400);
        }
      }

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
     const InterviewData = await Interview.find({candidate_id:id})

     await Interview.deleteMany({ candidate_id: id });
     console.log(InterviewData, "ssfssfsfs");
      if (!isCandidate) return errorResponse(res, "invalid ID", 400);

      await Candidate.findByIdAndDelete(id);
      successResponse(res, null, "candidates data deleted successfully");
    } catch (err) {
      console.log(" DELETED CANDIDATE ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async CandidateRoles(req, res) {
    try {
      successResponse(
        res,
        CANDIDATE_ROLES,
        "Candidate Roles data Showed successfully"
      );
    } catch (err) {
      console.log(" CANDIDATE ROLE ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }
}
