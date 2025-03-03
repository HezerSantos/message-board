const db = require("../db/queries")

exports.getDashBoard = async(req, res) => {
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
    res.render("index", { 
        user: req.user,
        messages: messages,
        errors: null,
        req: req
    })
}