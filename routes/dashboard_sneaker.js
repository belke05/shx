const express = require("express");
const router = new express.Router();
const Sneaker = require("../models/Sneaker.js");
const Tags = require("../models/Tag.js");

router.get("/prod-add", (req, res, next) => {
  Tags.find()
    .then(tags => {
      res.render("products_add", { tags });
    })
    .catch(dbErr => {
      console.log("error rendering the tags", dbErr);
    });
});
// ENDNENENENENENENEENE HERE
router.post("/prod-add", (req, res, next) => {
  const { sneaker } = body.req;
});

module.exports = router;
