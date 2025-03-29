const { body, validationResult } = require("express-validator");

exports.validateMessage =[
    body("message")
        .notEmpty().withMessage("Message Cannot be empty")
        .trim()
        .escape()
]

//.isLength({min: 10}).withMessage("Message must be at least 10 characters")