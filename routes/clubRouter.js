const { Router } = require('express')
const { getClubDash, updateMember } = require('../controllers/clubController')

const clubRouter = Router()

clubRouter.get("/", getClubDash)

clubRouter.post("/", updateMember)

module.exports = clubRouter