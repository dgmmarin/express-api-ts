import { NextFunction, Response, Request } from 'express';
import { body, validationResult } from 'express-validator';

const userCreateValidations = [
    body('firstName')
        .notEmpty().withMessage('firstName is required')
        .isLength({ min: 3, max: 20 }).withMessage('firstName must be between 3 and 20 characters long'),
    body('lastName')
        .notEmpty().withMessage('lastName is required')
        .isLength({ min: 3, max: 20 }).withMessage('lastName must be between 3 and 20 characters long'),
    body('email')
        .isEmail().withMessage('email must be a valid email address')
        .notEmpty().withMessage('eescription is required'),
    body('password')
        .isAlphanumeric().withMessage('Password must be filled with alphanumeric characters')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 6, max: 10 }).withMessage('Password must be between 6 and 10 characters long'),
];

const userUpdateValidations = [
    body('firstName')
    .optional()
    .isLength({ min: 3, max: 20 }).withMessage('firstName must be between 3 and 20 characters long'),
    body('lastName')
    .optional()
    .isLength({ min: 3, max: 20 }).withMessage('lastName must be between 3 and 20 characters long'),
    body('email')
    .optional()
    .isEmail().withMessage('email must be a valid email address'),
];


const validateUserCreate = async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(userCreateValidations.map(validation => validation.run(req)));
    const vr = validationResult(req);
    if (!vr.isEmpty()) {
        return res.status(400).json({ errors: vr.array() });
    }
    next();
}

const validateUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(userUpdateValidations.map(validation => validation.run(req)));
    const vr = validationResult(req);
    if (!vr.isEmpty()) {
        return res.status(400).json({ errors: vr.array() });
    }
    next();
}

export { validateUserCreate, validateUserUpdate };
