const mongoose = require("mongoose");

const beachSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  popularity: Number,
});

module.exports = mongoose.model("Beach", beachSchema);
