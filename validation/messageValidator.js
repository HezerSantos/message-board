const { body, validationResult } = require("express-validator");

exports.validateMessage =[
    body("message")
        .isLength({min: 10}).withMessage("Message must be at least 10 characters")
        .notEmpty().withMessage("Message Cannot be empty")
        .trim()
        .escape()
]

//