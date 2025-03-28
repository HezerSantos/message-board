const { body, validationResult } = require("express-validator");

exports.validateMessage =[
    body("message")
        .trim()
        .isLength({min: 10}).withMessage("Message must be at least 10 characters")
        .escape()
]