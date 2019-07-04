const express = require("express");
const router = new express.Router();
var clothes = require("../models/clothes");

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard");
});

// function getClothesData() {
//   router.get("/dashboard", (req, res, next) => {
//     clothes
//       .find()
//       .then(resultat => res.render("dashboard", console.log(resultat))
//       .catch();
//   });
// }

router.get("/api/dashboard", (req, res, next) => {
  clothes
    .find()
    .then(resultat => {
      res.send(resultat);
    })
    .catch();
});

module.exports = router;
