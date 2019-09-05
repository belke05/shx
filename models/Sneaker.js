const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: { type: String },
  ref: { type: String },
  sizes: { type: Number },
  description: { type: String },
  price: { type: String },
  category: { type: Array, enum: ["women", "men", "children"] },
  id_tags: { type: Schema.Types.ObjectId },
  ref: "Tag"
  // how to link document from different collections ?
  // tells Mongoose this ID connects to the "Category" model
});

productSchema.index({ ref: 1 }, { unique: true }); // ensure unique ref
const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;
