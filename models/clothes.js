const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: { type: String },
  brand: String,
  size: String,
  typeCat: { type: Schema.Types.ObjectId, ref: "type" },
  price: { type: Number },
  addeddate: { type: Date },
  season: { type: String },
  image: String,
  collec: { type: Schema.Types.ObjectId, ref: "collection" }
});

const Clothes = mongoose.model("clothes", clothesSchema);
module.exports = Clothes;
