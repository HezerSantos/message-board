const { body, validationResult } = require("express-validator");

exports.validateMessage =[
    body("message")
        .trim()
        .notEmpty().withMessage("Message cannot be empty")
        .escape()
]