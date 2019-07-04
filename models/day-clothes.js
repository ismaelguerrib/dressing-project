const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dayClothes = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  current: [{ type: Schema.Types.ObjectId, ref: "clothes" }],
  day: { type: Date, required: true }
});

const dayClothesModel = mongoose.model("dayClothes", dayClothes);
module.exports = dayClothesModel;
