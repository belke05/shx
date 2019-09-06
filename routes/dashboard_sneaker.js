const express = require("express");
const router = new express.Router();
const Sneaker = require("../models/Sneaker.js");
const Tags = require("../models/Tag.js");
const uploadMiddleware = require("../config/cloudinary.js");

router.get("/prod-add", (req, res, next) => {
  Tags.find()
    .then(tags => {
      console.log("the tags are", tags);
      res.render("products_add", { tags });
    })
    .catch(dbErr => {
      console.log("error finding the tags", dbErr);
    });
});
// ENDNENENENENENENEENE HERE
router.post(
  "/prod-add",
  uploadMiddleware.single("sneaker_img"),
  (req, res, next) => {
    const {
      name,
      ref,
      sizes,
      description,
      price,
      category,
      id_tags
    } = req.body;
    const newSneaker = {
      name,
      ref,
      sizes,
      description,
      price,
      category,
      id_tags
    };
    if (req.file) {
      newSneaker.imgName = req.file.originalname;
      newSneaker.imgPath = req.file.secure_url;
    }
    Sneaker.create(newSneaker)
      .then(createdSneaker => {
        console.log(createdSneaker, "was created");
        res.redirect("/prod-add");
      })
      .catch(dbErr => {
        console.log("error during creation of new sneaker", dbErr);
      });
  }
);

// route to add tags redirecting back to prod-add so that the new tag can be selected
// for the shoe
router.post("/tag-add", (req, res, next) => {
  const { label } = req.body;
  console.log(req.body);
  const newTag = { label };
  Tags.create(newTag)
    .then(createdTag => {
      console.log(createdTag, "was created as a tag");
      res.redirect("/prod-add");
    })
    .catch(dbErr => {
      console.log("error creating a new tag", dbErr);
    });
});

module.exports = router;
