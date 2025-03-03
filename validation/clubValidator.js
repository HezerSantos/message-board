const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
exports.validateClub = [
    body("answer").trim()
        .custom(async (answer) => {
        const match = await bcrypt.compare(answer, "$2y$10$idRyL3AOc2p2FgLZnIaoAONzXv6bbRah/KsjsLWegF7NLpz7JCGqK")
        if (match){
            return true
        } else {
            throw new Error("Wrong Password :(")
        }
        })
        .escape()
]