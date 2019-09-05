const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req,res)=>{
  res.render("index");
})

router.get("/sneakers/:cat", (req, res) => {
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/home", (req,res)=>{
  res.redirect("/");
});

router.get("/logout", (req,res)=>{
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
