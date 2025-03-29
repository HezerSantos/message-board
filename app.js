const express = require("express")
const app = express()
const path = require('path');
const assetsPath = path.join(__dirname, "public")
const helmet = require('helmet');
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

function checkOrigin(req, res, next) {
  const allowedDomain = "https://message-board-mem.up.railway.app"; 
  const origin = req.get('Origin') || req.get('Referer'); 

  // Allow same-origin requests (where Origin is null or not set)
  if (!origin || origin === 'null' || origin.startsWith(allowedDomain)) {
    return next(); 
  } else {
    console.log("Headers:", req.headers)
    console.log(`Blocked request with origin: ${origin}`);
    return res.status(403).json({ error: 'Forbidden: Invalid Origin' });
  }
}

app.use(checkOrigin)

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
  windowMs: 60 * 15000, // 1 minute window
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many messages, please try again later.',
  headers: true, // Add rate limit info to response headers
  handler: (req, res) => {
    res.status(429).render("error")
  }
});

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  headers: true, // Add rate limit info to response headers
  handler: (req, res) => {
    res.status(429).render("error")
  }
});

const signupLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  headers: true, // Add rate limit info to response headers
  handler: (req, res) => {
    res.status(429).render("error")
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