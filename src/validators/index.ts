import { body } from "express-validator";

export const userValidators = {
    createUser: [
        body('Firstname').exists().withMessage('Firstname is required.'),
        // body('Lastname').exists().withMessage('Lastname is required.'),
        body('City').exists().withMessage('City is required.'),
        body('Gender').exists().withMessage('Gender is required.'),
        body('Birthdate').exists().withMessage('Birthdate is required.'),
        body('Mobileno').exists().withMessage('Mobileno is required.')
    ]
}