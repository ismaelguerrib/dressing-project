const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
});

const typeModel = mongoose.model("type", typeSchema);
module.exports = typeModel;
