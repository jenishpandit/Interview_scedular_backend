import { body, param } from 'express-validator';

// Validation middleware for creating a technology
export const techValidation = [
    body('technology_name')
        .notEmpty().trim().withMessage('Please enter a technology name')
        .isString().trim().withMessage('Please use valid alphabets in technology name')
];

// Validation middleware for checking technology ID parameter
export const techParamsValidation = [
    param('id')
        .isMongoId().withMessage('Invalid ID')
];
