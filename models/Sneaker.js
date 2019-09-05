const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: { type: String },
  ref: { type: String },
  sizes: { type: Number },
  description: { type: String },
  price: { type: String },
  category: { type: String, enum: ["women", "men", "children"] },
  imgName: String,
  imgPath: String,
  id_tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
  // how to link document from different collections ?
  // tells Mongoose this ID connects to the "Category" model
});

const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;
