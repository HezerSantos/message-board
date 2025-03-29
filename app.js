const express = require("express")
const app = express()
const path = require('path');
const assetsPath = path.join(__dirname, "public")
const helmet = require('helmet');
app.set('trust proxy', 1);
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const loginRouter = require("./routes/loginRouter");
const signUpRouter = require("./routes/signupRouter");
const indexRouter = require("./routes/indexRouter");
//authentication

const session = require("express-session");
const passport = require("./passport");
const messageBoardRouter = require("./routes/messageBoardRouter");
const createMessageRouter = require("./routes/createMessageRouter");
const clubRouter = require("./routes/clubRouter");
const mobileCMRouter = require("./routes/mobileCMRouter");
const e = require("express");

app.use(helmet());
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Only use secure cookies in production
    httpOnly: true,  // Prevents JavaScript access to the cookie (helps prevent XSS)
    sameSite: 'strict'  // Helps prevent CSRF attacks
  }

}));
app.use(passport.initialize());
app.use(passport.session());
const limiter = rateLimit({
  windowMs: 60 * 15000, 
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many messages, please try again later.',
  headers: true, // Add rate limit info to response headers
  handler: (req, res) => {
    res.status(429).render("error")
  },
  keyGenerator: (req) => {
    // Use forwarded IP if available, fallback to direct IP
    return req.ip || req.connection.remoteAddress;
  }
});

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  headers: true, // Add rate limit info to response headers
  handler: (req, res) => {
    res.status(429).render("error")
  },
  keyGenerator: (req) => {
    // Use forwarded IP if available, fallback to direct IP
    return req.ip || req.connection.remoteAddress;
  }
});

const signupLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  headers: true, // Add rate limit info to response headers
  handler: (req, res) => {
    res.status(429).render("error")
  },
  keyGenerator: (req) => {
    // Use forwarded IP if available, fallback to direct IP
    return req.ip || req.connection.remoteAddress;
  }
});


app.use("/", indexRouter)
app.use("/login", loginLimiter, loginRouter)
app.use("/signup", signupLimiter, signUpRouter)
app.use("/message-board", messageBoardRouter)
app.use("/create-message", limiter, createMessageRouter)
app.use("/club-dash", clubRouter)
app.use("/mcreate-message", limiter, mobileCMRouter)
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    if (req.user){
      console.log("logout")
    } else {
      console.log("null")
    }
    res.redirect("/login");
  });
});


app.listen(3000, () => {
    console.log('Running App')
})