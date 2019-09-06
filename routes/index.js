const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const sneakers = require("../models/Sneaker");
const tags = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/filter/tags", (req, res) => {
  const { tags } = req.body;
  // console.log(tags);
  // const filterid = req.params.filter_id;
  sneakers
    .find({ id_tags: tags })
    .then(sneakers => {
      res.send(sneakers);
    })
    .catch(dberr => {
      console.log(dberr);
    });
});

router.get("/sneakers/collection", (req, res) => {
  tags
    .find()
    .then(tags => {
      sneakers
        .find()
        .then(sneakers => {
          res.render("products", { sneakers, tags, scripts: ["filter.js"] }),
            console.log("sneakers");
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
          res.render("products", {
            sneakers,
            tags,
            category: cat,
            scripts: ["filter.js"]
          });
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
