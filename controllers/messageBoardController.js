const db = require('../db/queries')

exports.getMessageBoard = async(req, res) => {
    const messages = await db.getAllMessages();
    // console.log(messages)
    res.render("messageBoard", {
        user: req.user,
        messages: messages
    })
}