const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({});

const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;
