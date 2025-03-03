const { validationResult } = require("express-validator")
const { validateClub } = require("../validation/clubValidator")
const bcrypt = require("bcryptjs")
const db = require('../db/queries')
exports.getClubDash = (req, res) => {
    res.render("club", {
        req: req,
        user: req.user
    })
}

exports.updateMember = [
    validateClub,
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).render("club", {
                errors: errors.array(),
                req: req,
                user: req.user
            })
        }
        const answer = req.body.answer
        const match = await bcrypt.compare(answer, "$2y$10$idRyL3AOc2p2FgLZnIaoAONzXv6bbRah/KsjsLWegF7NLpz7JCGqK")
        try{
            if (match){
                await db.becomeMember(req.user.id)
                console.log("match")
            } else {
                console.log("You wrong")
            }
            res.redirect("/club-dash")
        } catch (e) {
            console.log(e)
        }
    }
]