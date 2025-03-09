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
app.use(express.urlencoded({ extended: false }));



app.use("/", indexRouter)
app.use("/login", loginRouter)
app.use("/signup", signUpRouter)
app.use("/message-board", messageBoardRouter)
app.use("/create-message", createMessageRouter)
app.use("/club-dash", clubRouter)
app.use("/mcreate-message", mobileCMRouter)
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