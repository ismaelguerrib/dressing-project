const express = require("express");
const router = express.Router();
const app = express();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");

/* GET sign in page */

// signup : register new user
router.post("/", (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.pass;
  if (
    name === "" ||
    lastname === "" ||
    email === "" ||
    username === "" ||
    password === ""
  ) {
    res.render("/", { message: "fill out all the form to sign up" });
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name: name,
    lastname: lastname,
    email: email,
    username: username,
    password: hashPass
  });

  newUser
    .save()
    .then(() => res.render("homepage"))
    .catch(err => console.log(err));
});

router.get("/", (req, res, next) => {
  res.render("signin");
});
/* GET home page */

module.exports = router;
