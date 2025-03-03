const { body, validationResult } = require("express-validator");

exports.validateMessage =[
    body("message")
        .trim()
        .escape()
]