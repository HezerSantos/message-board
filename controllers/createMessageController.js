const { validateMessage } = require("../validation/messageValidator")
const { body, validationResult } = require("express-validator");
const db = require('../db/queries')

exports.createMessage = [
    validateMessage,
    async(req, res) => {
        const errors = validationResult(req)
        let messages = null
        if (req.user){
            messages = await db.getUserMessages(req.user.id)
            messages.forEach(message => {
                const date = new Date(message.date)
                message.date = date.toLocaleString()
            })
            if (messages.length === 0){
                messages = null
            }
        }
        if (!errors.isEmpty()){
            console.log(errors.array())
            return res.status(400).render("index",{
                user: req.user,
                messages: messages,
                errors: errors.array(),
                req: req
            })
        }
        const { message } = req.body
        const date = new Date()
        await db.postMessage(req.user.id, message, date.toISOString())
        res.redirect("/")
    }
]