const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelSchema = new Schema({
  label: String
});

const labelModel = mongoose.model("Label", userSchema);

module.exports = labelModel;
