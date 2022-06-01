//___________________
//Dependencies
//___________________
const express = require("express");
// const methodOverride  = require('method-override');
const mongoose = require("mongoose");
const app = express();
const Beach = require("./models/beach.js");
const Seed = require("./models/seed.js");
const Comment = require("./models/comment.js");
const cors = require("cors");
const db = mongoose.connection;
require("dotenv").config();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log("The connection with mongod is established");
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets
// app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
app.use(cors());
//use method override
// app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000
app.get("/", (req, res) => {
  Beach.find({}, (err, foundBeach) => {
    res.json(foundBeach);
  });
});
// get comment
app.get("/", (req, res) => {
  Comment.find({}, (err, foundComment) => {
    res.json(foundComment);
  });
});

// Post Route
app.post("/", (req, res) => {
  Beach.create(req.body, (err, createdBeach) => {
    res.json(createdBeach);
  });
});

// Post Route for Comment
app.post("/", (req, res) => {
  Comment.create(req.body, (err, createdComment) => {
    res.json(createdComment);
  });
});

// Delete Route
app.delete("/:id", (req, res) => {
  Beach.findByIdAndRemove(req.params.id, (err, deletedBeach) => {
    res.json(deletedBeach);
  });
});

// Edit Route
app.put("/:id", (req, res) => {
  Beach.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBeach) => {
      res.json(updatedBeach);
    }
  );
});

app.get("/seed", (req, res) => {
  Beach.create(Seed, (err, createdSeedData) => {
    console.log("data imported");
    res.redirect("/");
  });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));
