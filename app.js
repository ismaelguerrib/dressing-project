require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const User = require("./models/users");

const session = require("express-session");

const passport = require("passport");

mongoose
  .connect("mongodb://localhost/dressingproject", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

function checkLoginStatus(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  if (!req.user) {
    req.user = {
      _id: "5d1c98b236f67d1615711266"
    };
  }
  res.locals.user = req.user;
  // console.log(req.user);
  next();
}

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(checkLoginStatus);

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);
console.log("hello");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
hbs.registerPartials(__dirname + "/views/partials");

// default value for title local and url variables
app.locals.title = "Dressing Project";
app.locals.site_url = process.env.SITE_URL;

///// CONFIG /////////
const index = require("./routes/index");
const dayclothes = require("./routes/dayclothes");
const manage = require("./routes/manage");
const login = require("./routes/login");
const homepage = require("./routes/homepage");
const viewall = require("./routes/viewall.js");
const viewone = require("./routes/viewone.js");
const dashboard = require("./routes/dashboard.js");
const collection = require("./routes/collection");
const map = require("./routes/map");

app.use("/", index);
app.use(dayclothes);
app.use(manage);
app.use(login);
app.use(homepage);
app.use(viewall);
app.use(viewone);
app.use(dashboard);
app.use(collection);
app.use(map);

module.exports = app;
