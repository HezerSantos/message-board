const db = require("../db/queries")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator");
const { validateSignUp } = require("../validation/signUpValidator")
exports.getSignUp = (req, res) => {
    res.render("signup")
}

exports.signUpUser = [
    validateSignUp,
    async(req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            // console.log(errors.array())
            return res.status(400).render("signup",{
                errors: errors.array()
            })
        }
        const username = req.body.username
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        try{
            await db.signUpUser(username, hashedPassword)
            res.redirect("/login")
        } catch (error){
            console.error(error);
            next(error)
        }
            
    }
]
