const express = require("express");
const router = new express.Router();
const cloth = require("../models/clothes");
const dayClothes = require("../models/day-clothes");
const user = require("../models/users");

router.get("/viewone/:id", (req, res, next) => {
  cloth
    .findById(req.params.id)
    .then(wear => res.render("viewone", wear))
    .catch();
});

router.get("/delete/:id", (req, res) => {
  cloth
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/viewall").catch(err => console.log(err)));
});

router.get("/add/:id", (req, res) => {
  const day = new Date().getDay();
  dayClothes
    .findOne({
      day,
      user: req.user._id
    })
    .then(dbRes => {
      if (!dbRes) {
        dayClothes.create({
          user: req.user._id,
          current: req.params.id,
          day
        });
        res.redirect("/viewall");
      } else {
        dayClothes.findByIdAndUpdate(
          dbRes,
          {
            $push: { current: req.params.id }
          },
          { safe: true, upsert: true },
          function(err, doc) {
            if (err) {
              console.log(err);
            } else {
              console.log("blablabla");
            }
          }
        );
        res.redirect("/viewall");
      }
    })
    .catch(dbErr => console.log(dbErr));
});

// router.get("/add/:id", (req, res) => {
//   console.log(req.params);
//   const id = req.params.id;
//   dayClothes
//     .create({
//       id
//     })
//     .then(() => res.redirect("/viewall"))
//     .catch(err => console.log(err));
// });

module.exports = router;
