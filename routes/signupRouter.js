const { Router } = require("express")
const { getSignUp, signUpUser } = require("../controllers/signupController")
const signUpRouter = Router()

signUpRouter.get("/", getSignUp)

signUpRouter.post("/", signUpUser)

module.exports = signUpRouter