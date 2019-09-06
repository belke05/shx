const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const sneakers = require("../models/Sneaker");
const tags = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers", (req, res) => {
    tags
    .find()
    .then(tags => {
      sneakers
        .find()
        .then(sneakers => {
          res.render("products", { sneakers, tags }), console.log("sneakers");
        })
        .catch(console.log("error looking up sneakers"));
    })
    .catch(err => {
      console.log("error looking up tags", err);
    });
});


router.get("/sneakers/:cat", (req, res) => {
  const cat = req.params.cat;
  const sneak = req.params.name;
  tags
    .find()
    .then(tags => {
      sneakers
        .find({ sneakers: sneak, category: cat })
        .then(sneakers => {
          console.log("the shoes in the category are", sneakers);
          res.render("products", { sneakers, tags, category: cat });
        })
        .catch(console.log("error looking up sneakers"));
    })
    .catch(err => {
      console.log("error looking up tags", err);
    });
});

router.get("/one-product/:id", (req, res) => {
  const id = req.params.id;
  sneakers
    .findById(id)
    .then(sneaker => {
      res.render("one_product", { sneaker });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
