const db = require('../db/queries')

exports.getMessageBoard = async(req, res) => {
    const messages = await db.getAllMessages();
    messages.forEach(message => {
        const date = new Date(message.date)
        message.date = date.toLocaleString()
    })
    if (messages.length === 0){
        messages = null
    }
    // console.log(messages)
    res.render("messageBoard", {
        user: req.user,
        messages: messages,
        req: req,
    })
}