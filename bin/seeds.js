const mongoose = require("mongoose");
const typeModel = require("../models/typeModel");

mongoose.connect("mongodb://localhost/dressingproject", {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () =>
  console.log("yay mongodb connected :)")
);

mongoose.connection.on("error", () => console.log("nay db error sorry :("));

const array = [
  {
    name: "Top"
  },
  {
    name: "Bottom"
  },
  {
    name: "Shoes"
  },
  {
    name: "Accessoires"
  }
];

typeModel
  .insertMany(array)
  .then(res => console.log(res))
  .catch(err => console.log(err));
