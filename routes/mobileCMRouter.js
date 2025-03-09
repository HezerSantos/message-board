const { Router } = require('express')
const { getMCM } = require('../controllers/mobileCMController')

const mobileCMRouter = Router()

mobileCMRouter.get("/", getMCM)

module.exports = mobileCMRouter
