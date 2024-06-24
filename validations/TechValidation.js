import { body, param } from 'express-validator';
import technologies from '../models/Technology.js';

// Custom validator to check if the technology name is unique
const checkUniqueTechnologyName = async (value) => {
    const tech = await technologies.findOne({ technology_name: value });
    if (tech) {
        throw new Error('Technology name must be unique');
    }
    return true;
};

// Validation middleware for creating a technology
export const techCreateValidation = [
    body('technology_name')
        .isString().withMessage('Technology name should be a string')
        .notEmpty().withMessage('Please enter a technology name')
        .custom(checkUniqueTechnologyName)
];

// Validation middleware for checking technology ID parameter
export const techParamsValidation = [
    param('id')
        .isMongoId().withMessage('Invalid ID')
];
