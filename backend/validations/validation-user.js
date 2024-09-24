import { body } from "express-validator"

export const userValidationRules = () => {
    return [
        // Validation username  
        body("username")
        .notEmpty()
        .withMessage("Username is required!")
        .isLength({min: 2, max: 50})
        .withMessage("Username must be more than 2 characters and less than 50 characters!")
    ];
};
