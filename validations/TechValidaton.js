import { body , param } from 'express-validator';
import technologies from "../models/Technology.js";

const checkUniqueTechnologyName = async (Value) => {
    const user = await technologies.findOne({technology_name : Value});
    if(user){
        throw new Error('technology name must be unique');
    }
    else return true;
}

export const techCreateValidation = [
 body('technology_name')
     .isString().withMessage('technology name should be in string')
     .notEmpty().withMessage('please enter technology name')
     .custom(checkUniqueTechnologyName)
]

export const techParamsValidation = [
    param('id')
        .isMongoId().withMessage('invalid ID')
]