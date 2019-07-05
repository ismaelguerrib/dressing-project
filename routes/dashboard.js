const express = require("express");
const router = new express.Router();
var clothes = require("../models/clothes");
var dayClothes = require("../models/day-clothes");

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard");
});

router.get("/api/dashboard", (req, res, next) => {
  clothes
    .find()
    .populate("typeCat")
    .then(resultat => {
      res.send(resultat);
    })
    .catch();
});

router.get("/api2/dashboard", (req, res, next) => {
  dayClothes
    .find()
    .populate("current")
    .then(dbRes => {
      console.log("-------------");
      console.log(dbRes);

      console.log("-------------");
      res.send({ dayClothes: dbRes });
    })
    .catch();
});

module.exports = router;
