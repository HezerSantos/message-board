const { Router } = require("express")
const { getMessageBoard } = require("../controllers/messageBoardController")

const messageBoardRouter = Router()

messageBoardRouter.get("/", getMessageBoard)

module.exports = messageBoardRouter