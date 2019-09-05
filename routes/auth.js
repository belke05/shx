const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/User");



router.post("/signup", (req, res, next) => {
    const user = req.body; 
    if (!user.email || !user.password) {
      res.render("signup", { errorMsg: "All fields are required." });
      return;
    } else {
      userModel
        .findOne({ email: user.email })
        .then(dbRes => {
          if (dbRes) {
            res.render("signup", { errorMsg: "User already exists !" });
            return;
          }
          const salt = bcrypt.genSaltSync(10); 
          const hashed = bcrypt.hashSync(user.password, salt);
          user.password = hashed;
          userModel
            .create(user)
            .then(() => {
              res.redirect("/signin")
            })
            .catch(err => next(err));
        })
        .catch(dbErr => {
          next(dbErr);
        });
    }
  });
  
  //Authenticating
  
  router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.password) {
      res.render("signin", { errorMsg: "Please fill in all the fields" });
    }
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (!dbRes) {
          res.render("signin", { errorMsg: "Bad username or password" });
          return;
        }
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          req.session.currentUser = user;
          res.redirect("/");
          return;
        } else {
          res.render("signin", { errorMsg: "Bad username or password" });
          return;
        }
      })
      .catch(dbErr => {
        req.session.destroy();
        next(dbErr);
      });
  });

module.exports = router;
