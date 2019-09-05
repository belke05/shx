const express = require("express");
const router = express.Router();
const userModel = require ("../models/User");
const sneakers = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  sneakers.find()
  res.render("products"); 
});

router.get("/sneakers",(req,res)=>{
  sneakers.find().then(
    sneakers => res.render("products",{sneakers}),
    console.log("sneakers")
  ).catch( err =>{
    console/log(err);
  });
});

router.get("/one-product/:id", (req, res) => {
  res.render("one-product");
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



module.exports = router;