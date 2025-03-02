const { Router } = require("express")
const { getDashBoard } = require("../controllers/indexController")

const indexRouter = Router()

indexRouter.get("/", getDashBoard)

module.exports = indexRouter