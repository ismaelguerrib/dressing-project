const express = require("express");
const router = new express.Router();
const dayclothes = require("../models/day-clothes");

router.get("/homepage", (req, res, next) => {
  const day = new Date().getDay() - 1;

  dayclothes
    .find({
      day,
      user: req.user._id
    })
    .populate("current")
    .then(dbRes => {
      // console.log("@dayclothes get");
      console.log(dbRes);
      res.render("homepage", { dayclothes: dbRes });
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

module.exports = router;
