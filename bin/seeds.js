const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dressingproject", {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () =>
  console.log("yay mongodb connected :)")
);

mongoose.connection.on("error", () => console.log("nay db error sorry :("));

const typeModel = require("../models/typeModel");

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
  .create(array)
  .then(res => console.log(res))
  .catch(err => console.log(err));
