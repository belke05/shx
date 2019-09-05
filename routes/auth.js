const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
module.exports = router;

router.post("/signup", (req, res, next) => {
    const user = req.body; 
    if (!user.username || !user.password) {
      res.render("signup", { errorMsg: "All fields are required." });
      return;
    } else {
      userModel
        .findOne({ username: user.username })
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
            .then(() => res.redirect("/home"))
            .catch(next(err));
        })
        .catch(dbErr => {
          next(dbErr);
        });
    }
  });
  
  //Authenticating
  
  router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.username || !user.password) {
      res.render("login", { errorMsg: "Please fill in all the fields" });
    }
    userModel
      .findOne({ username: user.username })
      .then(dbRes => {
        if (!dbRes) {
          res.render("login", { errorMsg: "Bad username or password" });
          return;
        }
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          req.session.currentUser = user;
          res.redirect("/");
          return;
        } else {
          res.render("login", { errorMsg: "Bad username or password" });
          return;
        }
      })
      .catch(dbErr => {
        next(dbErr);
      });
  });
