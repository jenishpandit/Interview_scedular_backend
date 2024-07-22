import { body , param } from "express-validator";

// Validation middleware for checking interview creating body
export const interviewValidate = [
    body('location')
        .notEmpty().trim().withMessage('please enter your city')
        .matches(/^([a-zA-Z]+)$/).trim().withMessage('please enter only alphabets in City ')
]

// Validation middleware for checking interview ID parameter
export const interviewParamsValidation = [
    param('id')
        .isMongoId().withMessage('Invalid ID')
];