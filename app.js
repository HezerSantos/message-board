const express = require("express")
const app = express()
const path = require('path');
const assetsPath = path.join(__dirname, "public")
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

app.use(session({ secret: "cat", resave: false, saveUninitialized: false, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });


app.use("/", indexRouter)
app.use("/login", loginRouter)
app.use("/signup", signUpRouter)
app.use("/message-board", messageBoardRouter)
app.use("/create-message", createMessageRouter)
app.use("/club-dash", clubRouter)
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