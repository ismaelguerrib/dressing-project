const express = require("express");
const clothes = require("../models/clothes");
const collecModel = require("../models/collection");
const typeModel = require("../models/typeModel");
const hbs = require("hbs");
const router = new express.Router();
const Type = require("../models/collection");

///////AFFICHAGE DYNAMIQUE//////////
router.get("/viewall", (req, res) => {
  Promise.all([clothes.find(), collecModel.find(), typeModel.find()])
    .then(dbRes => {
      console.log(dbRes);
      const clothesRes = dbRes[0];
      const collecRes = dbRes[1];
      const typeRes = dbRes[2];
      res.render("viewall", { clothesRes, collecRes, typeRes });
    })
    .catch(err => console.log(err));
});

/////// AFFICHER TRI DES COLLECTIONS ////
router.get("/getByTag/:id", (req, res) => {
  Promise.all([
    clothes.find({ collec: req.params.id }),
    collecModel.find(),
    typeModel.find()
  ]).then(dbRes => {
    console.log("YEEEEEE", dbRes);
    const clothesRes = dbRes[0];
    const collecRes = dbRes[1];
    const typeRes = dbRes[2];
    res.render("viewall", { clothesRes, collecRes, typeRes });
  });
});

/////// AFFICHER TRI DES TYPES ////
router.get("/getByTypes/:id", (req, res) => {
  Promise.all([
    clothes.find({ typeCat: req.params.id }),
    collecModel.find(),
    typeModel.find()
  ]).then(dbRes => {
    const clothesRes = dbRes[0];
    const collecRes = dbRes[1];
    const typeRes = dbRes[2];
    res.render("viewall", { clothesRes, collecRes, typeRes });
  });
});

router.get("/clothes/api", (req, res) => {
  clothes
    .find()
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

module.exports = router;
