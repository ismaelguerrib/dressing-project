const express = require("express");
const router = new express.Router();
const clothes = require("../models/clothes");
const collectionName = require("../models/collection");
const hbs = require("hbs");
const uploadCloud = require("../config/cloudinary");
const typeModel = require("../models/typeModel");

router.get("/manage", (req, res) => {
  collectionName
    .find()
    .then(collection => {
      typeModel
        .find()
        .then(types => {
          res.render("manage", { collection, types });
        })
        .catch(err => {
          res.redirect("/");
        });
    })
    .catch(err => console.log(err));
});

router.post("/manage", uploadCloud.single("image"), (req, res) => {
  const {
    name,
    brand,
    size,
    typeCat,
    price,
    addeddate,
    season,
    collec
  } = req.body;
  console.log(req.body);
  if (req.file) var imgPath = req.file.url;
  // if (
  //   !name ||
  //   !brand ||
  //   !size ||
  //   !type ||
  //   !category ||
  //   !price ||
  //   !addeddate ||
  //   weareddate ||
  //   season
  // ) {
  //   res.render("manage", { error: "Invalid input" });
  //   return;
  // }
  clothes
    .create({
      name,
      brand,
      size,
      typeCat,
      price,
      addeddate,
      season,
      collec,
      image: imgPath
    })
    .then(dbRes => res.redirect("/viewall"))
    .catch(err => console.log(err));
});

module.exports = router;
