const express = require("express");
const router = new express.Router();

router.get("/map", (req, res, next) => {
  res.render("map");
});

module.exports = router;
