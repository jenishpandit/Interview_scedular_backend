import {validationResult} from "express-validator";
import {errorResponse} from "../utils/ResponseHandler.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return errorResponse(res, error.msg, 409);
    }
    next();
};