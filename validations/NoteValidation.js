import { body , param } from 'express-validator';

export const noteValidate = [
    body('note_text')
        .notEmpty().withMessage('please enter your note')
]

// Validation middleware for checking note ID parameter
export const noteIDValidate = [
    param('id')
        .isMongoId().withMessage('Invalid ID')
]
