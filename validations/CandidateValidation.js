import { body , param } from 'express-validator';

// Validation middleware for checking candidate creating body
export const candidateValidate = [
    body('first_name')
        .notEmpty().withMessage('please enter first name')
        .trim()
        .matches(/^([a-zA-Z]+)$/).trim().withMessage('please use only alphabets in first name') ,
    body('last_name')
        .notEmpty().withMessage('please enter last name')
        .trim()
        .matches(/^([a-zA-Z]+)$/).trim().withMessage('please use only alphabets in last name') ,
    body('email')
        .isEmail().withMessage('please enter a valid email address')
        .notEmpty().withMessage('please enter email address') ,
    body('phone_number')
        .notEmpty().withMessage('please enter your phone number')
]

// Validation middleware for checking candidate ID parameter
export const candidateIDValidate = [
    param('id')
        .isMongoId().withMessage('Invalid ID')
]

// Validation middleware for checking update in candidate
export const candidateUpdateValidate = [
    body('first_name')
        .optional()
        .notEmpty().withMessage('please enter first name')
        .matches(/^([a-zA-Z]+)$/).withMessage('please use only alphabets in first name') ,

    body('last_name')
        .optional()
        .notEmpty().withMessage('please enter last name')
        .matches(/^([a-zA-Z]+)$/).withMessage('please use only alphabets in last name') ,

    body('email')
        .optional()
        .isEmail().withMessage('please enter a valid email address')
        .notEmpty().withMessage('please enter email address') ,
    body('phone_number')
        .optional()
        .notEmpty().withMessage('please enter your phone number')
]