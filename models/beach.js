const mongoose = require("mongoose");

const beachSchema = new mongoose.Schema({
  name: String,
  image: [String],
  location: String,
  popularity: Number,
  index: Number,
  comments: String
});

module.exports = mongoose.model("Beach", beachSchema);
