const { validateMessage } = require("../validation/messageValidator")
const { body, validationResult } = require("express-validator");
const db = require('../db/queries')

exports.createMessage = [
    validateMessage,
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).render("/",{
                errors: errors.array()
            })
        }
        const { message } = req.body
        const date = new Date()
        await db.postMessage(req.user.id, message, date.toISOString())
        res.redirect("/")
    }
]