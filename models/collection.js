const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  label: { type: String, unique: true }
});

const collectionModel = mongoose.model("collection", collectionSchema);
module.exports = collectionModel;
