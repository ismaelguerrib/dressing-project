const express = require("express");
const router = new express.Router();
const clothes = require("../models/clothes");
const collection = require("../models/collection");
const user = require("../models/users");

router.post("/collection", (req, res, next) => {
  collection
    .create(req.body)
    .then(() => res.redirect("/viewall"))
    .catch(err => res.redirect("/manage"));
});

module.exports = router;
