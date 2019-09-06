const express = require("express");
const router = new express.Router();
const Sneaker = require("../models/Sneaker.js");
const Tags = require("../models/Tag.js");
const uploadMiddleware = require("../config/cloudinary.js");

router.get("/prod-manage", (req, res, next) => {
  Sneaker.find()
    .then(sneakers => {
      console.log("the sneakers found are", sneakers);
      res.render("products_manage", {
        sneakers,
        scripts: ["client_delete.js"]
      });
    })
    .catch(dbErr => {
      console.log("error finding sneakers", dbErr);
    });
});

router.get("/prod-add", (req, res, next) => {
  Tags.find()
    .then(tags => {
      console.log("the tags are", tags);
      res.render("products_add", { tags, scripts: ["client.js"] });
      // client side script will execute for AJAX async gets and posts
      // this script will be used to update the tags in the dom
    })
    .catch(dbErr => {
      console.log("error finding the tags", dbErr);
    });
});

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
    } else console.log("pas de fichier");
    Sneaker.create(newSneaker)
      .then(createdSneaker => {
        console.log(createdSneaker, "was created");
        // res.redirect("/prod-add");
        res.redirect("/sneakers/collection");
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
      // we can use a res send because
      // the tag is added thanks to axios
      res.send(createdTag);
    })
    .catch(dbErr => {
      console.log("error creating a new tag", dbErr);
    });
});

router.get("/product-edit/:id", (req, res, next) => {
  const sneakerID = req.params.id;
  Sneaker.findById(sneakerID)
    .then(sneaker => {
      Tags.find()
        .then(tags => {
          res.render("product_edit", { sneaker, tags });
        })
        .catch(dbErr => {
          console.log("error during finding of all tags", tags);
        });
    })
    .catch(dbErr => {
      console.log("error during finding specific sneaker", dbErr);
    });
});

router.post("/product-edit/:id", (req, res, next) => {
  const sneakerID = req.params.id;
  const { name, ref, sizes, description, price, category, id_tags } = req.body;
  const sneakerUpdate = {
    name,
    ref,
    sizes,
    description,
    price,
    category,
    id_tags
  };

  Sneaker.findByIdAndUpdate(sneakerID, sneakerUpdate)
    .then(sneaker => {
      console.log(sneaker, "sneaker was updated");
      res.redirect("/prod-manage");
    })
    .catch(dbErr => {
      console.log("error editing the shoe", dbErr);
    });
});

router.get("/product-delete/:id", (req, res, next) => {
  Sneaker.findByIdAndDelete(req.params.id)
    .then(deletedSneaker => {
      console.log("sneaker deleted", deletedSneaker);
      res.send(deletedSneaker);
    })
    .catch(dbErr => {
      console.log("error during sneaker deletion", dbErr);
    });
});

module.exports = router;
