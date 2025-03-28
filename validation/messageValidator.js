const { body, validationResult } = require("express-validator");

exports.validateMessage =[
    body("message")
        .trim()
        .isLength({min: 10}).withMessage("Message Cannot be Empty")
        .escape()
]