const { Router } = require('express')
const { createMessage } = require('../controllers/createMessageController')

const createMessageRouter = Router()

createMessageRouter.post("/", createMessage)

module.exports = createMessageRouter