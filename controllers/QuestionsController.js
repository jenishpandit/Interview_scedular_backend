import Technology from "../models/Technology.js";
import {errorResponse, successResponse} from "../utils/ResponseHandler.js";
import {Questions} from "../models/Questions.js";

export class QuestionsController {
    constructor() {}

        async createQnA(req, res) {
            try{
                const { body } = req;

                const isTech = await Technology.findById(body.technology);
                if(!isTech) return errorResponse(res, 'Technology Not Found !!', 400);

                await Questions.create(body);
                successResponse(res, body, "Question and Answer are Created Successfully", 201);
            }catch(err){
                console.log("CREATE QUESTION AND ANSWER ERROR : ", err);
                errorResponse(res, 'Question and Answer Not Found !!', 400);
            }
        }

        async getQnAs(req, res){
            try{
                const AllQuestions = await Questions.find({});

                const QCount = await Questions.countDocuments();
                console.log(QCount);
                const resData = { AllQuestions,"total count":QCount};
                successResponse(res, resData,"All Question and Answer data Successfully" , 201);
            }catch(err){
                console.log("GET ALL QUESTION AND ANSWER ERROR : ", err);
                errorResponse(res, 'Question and Answer Not Found !!', 400);
            }
        }

        async getQnA(req, res){
            try{
                const { id } = req.params;

                const resData = await Questions.findById(id);

                successResponse(res, resData, "Question and Answer Showed By Id Successfully", 201);
            }catch(err){
                console.log("GET BY ID QUESTION AND ANSWER ERROR : ", err);
                errorResponse(res, 'Question and Answer Not Found !!', 400);
            }
        }

        async updateQnA(req, res){
            try{
                const { id } = req.params;
                const { body } = req;

                const isQnA = await Questions.findById(id);
                if(!isQnA) return errorResponse(res, 'Question and Answer Not Found !!', 400);

                await Questions.findByIdAndUpdate(id, body);
                const resData = await Questions.findById(id);

                successResponse(res, resData, "Question and Answer Updated Successfully", 201);
            }catch(err){
                console.log("UPDATE QUESTION AND ANSWER ERROR : ", err);
                errorResponse(res, 'Question and Answer Not Found !!', 400);
            }
        }

        async deleteQnA(req, res){
            try{
                const { id } = req.params;

                const isQnA = await Questions.findById(id);
                if(!isQnA) return errorResponse(res, 'Question and Answer Not Found !!', 400);
                await Questions.findByIdAndDelete(id);

                successResponse(res, "Question and Answer Deleted Successfully", 201);
            }catch(err){
                console.log("DELETE QUESTION AND ANSWER ERROR : ", err);
                errorResponse(res, 'Question and Answer Not Found !!', 400);
            }
        }

}