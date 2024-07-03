import { errorResponse, successResponse } from "../utils/ResponseHandler.js";
import interviews from "../models/Interview.js";
import moment from "moment";

export class InterviewController {
  constructor() {}

  async createInterview(req, res) {
    try {
      const { body } = req;

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
        populate: {
          path: 'technology_id',
          model: 'Technology'
        }
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
      const { body } = req;

      const isInterview = await interviews.findById(id);
      if (!isInterview) return errorResponse(res, "invalid ID", 400);
      await interviews.findByIdAndUpdate(id, body);

      let resData = await interviews.findById(id);
      successResponse(res, resData, "Interview Data Updated Successfully");
    } catch (err) {
      console.log("UPDATE INTERVIEW ERROR : ", err);
      errorResponse(res, err.message, 400);
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
