const { Router } = require('express')
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const { validateLogIn } = require("../validation/loginValidator")
const  { getLogin } = require("../controllers/loginController")
const loginRouter = Router()

loginRouter.get("/", getLogin)

loginRouter.post(
    "/", 
    validateLogIn,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).render("login", {
                errors: errors.array(),
            })
        }
        next();
    },
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.session.flashMessage = info.message || 'Login failed';
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    }
)

module.exports = loginRouter