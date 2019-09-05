const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("index");
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("one_product");
});

router.get("/signup", (req, res) => {
  res.send("signup");
});

router.get("/signin", (req, res) => {
  res.send("signin");
});


module.exports = router;
