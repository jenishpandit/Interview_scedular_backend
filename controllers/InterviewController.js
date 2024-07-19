import { errorResponse, successResponse } from "../utils/ResponseHandler.js";
import interviews from "../models/Interview.js";
import moment from "moment";

export class InterviewController {
  constructor() {}

  async createInterview(req, res) {
    try {
      const { body } = req;
      console.log(req.body);

      await interviews.create(body);
      successResponse(res, body, "interview Created successfully");
    } catch (err) {
      console.log("CREATE INTERVIEW ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async getInterviews(req, res) {
    try {
      const filter = req.query.filter;
      let condition = {};
      const startOfDay = moment().startOf("day");
      const endOfDay = moment().endOf("day");
      if (filter === "today") {

        condition.interview_date = {
          $gte: startOfDay.toDate(),
          $lt: endOfDay.toDate(),
        };
      }  else if (filter === "upcoming") {
        const startOfToday = moment().add(1, "days").startOf("day");

        condition.interview_date = {
          $gte: startOfToday.toDate(),
        };
      } else {
        condition = {};
      }

      const data = await interviews.find(condition).populate({
        path: "candidate_id",
        // populate: {
        //   path: 'technology_id',
        //   model: 'Technology'
        // }

        path: "candidate_id"
      });
      successResponse(res, data, "All interviews data showed successfully");
    } catch (err) {
      console.log("READ ALL INTERVIEW ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async getInterview(req, res) {
    try {
      const { id } = req.params;
      const data = await interviews.find({ candidate_id: id });
      //   console.log(id);
      //   console.log("data =", data);

      if (!data) return errorResponse(res, "invalid ID", 400);
      successResponse(res, data, "Interview Data Showed by ID Successfully");
    } catch (err) {
      console.log("READ INTERVIEW ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }

  async updateInterview(req, res) {
    try {
      const { id } = req.params;
      // const { status } = req.body; // Assuming status is passed in the request body
  
      const isInterview = await interviews.findById(id);
      if (!isInterview) {
        return res.status(400).json({ error: "Invalid ID" });
      }
  
      // Validate the status against enum values
      // if (!['create', 'complete', 'reschedule', 'rejected'].includes(status)) {
      //   return res.status(400).json({ error: "Invalid status value" });
      // }
  
      // Update only the status field using findByIdAndUpdate
      await interviews.findByIdAndUpdate(id, req.body);
  
      // Fetch the updated data
      const updatedInterview = await interviews.findById(id);
  
      return res.status(200).json({
        message: "Interview Data updated successfully",
        data: updatedInterview
      });
    } catch (err) {
      console.log("UPDATE INTERVIEW ERROR : ", err);
      return res.status(400).json({ error: err.message });
    }
  }

  async deleteInterview(req, res) {
    try {
      const { id } = req.params;

      const isInterview = await interviews.findById(id);
      if (!isInterview) return errorResponse(res, "invalid ID", 400);
      await interviews.findByIdAndDelete(id);

      successResponse(res, null, "interview data deleted successfully");
    } catch (err) {
      console.log("DELETE INTERVIEW ERROR : ", err);
      errorResponse(res, err.message, 400);
    }
  }
}
