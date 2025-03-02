const db = require("../db/queries")
const { body, validationResult } = require("express-validator");

exports.validateSignUp = [
    body("username")
        .trim()
        .isAlpha().withMessage('Username must contain only letters')
        .isLength({ min: 1}).withMessage("Must be more the one character")
        .custom(async (username) => {
            const name = await db.checkDuplicateUser(username)
            if (name.length > 0){
                throw new Error("Username Already Exists")
            }
            return true
        }),
    body("password")
        .trim()
        .isLength( {min: 12 }).withMessage("Password must be at least 12 characters")
        .escape(),
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password){
                throw new Error("Passwords dont match")
            }
            return true
        })
]

