const express = require("express");
const router = express.Router();
const userModel = require ("../models/User");
const sneakers = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  const cat = req.params.cat;
  sneakers.find({ category: cat })
  .then(category =>{
    res.render("products",{ category });
  })
  .catch(err =>{console.log(err);
  });
  
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

router.get("/logout", (req,res)=>{
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;

