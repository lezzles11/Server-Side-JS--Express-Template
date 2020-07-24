const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const Router = express.Router();
var cors = require("cors");
const https = require("https");
const fs = require("fs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// express.static() specifies the path where the files are found
// This makes sure that you get all assets from the public folder
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log("\nMETHOD: " + req.method);
  console.log("\nPATH: " + req.path + "\n");
  next();
});

app.get("/notes", cors(), (req, res) => {
  console.log("getting all notes- expect to be /api/notes!");
  console.log(req.body);
  res.send("Get all notes");
});

app.get("/notes/:id", cors(), (req, res) => {
  console.log("Getting one singular note");
  res.send(`Get one note with ${req.params.id}`);
});

app.post("/notes", cors(), (req, res) => {
  console.log("Posting a note");
  res.send(`Posting note`);
});

app.put("/notes/:id", cors(), (req, res) => {
  console.log("Editing a note");
  res.send(`Changing note with ${req.params.id}`);
});

app.delete("/notes/:id", cors(), (req, res) => {
  console.log("Deleting a note");
  res.send(`Deleting notes with ${req.params.id}`);
});

app.use((req, res, next) => {
  res.send("Server alive, with Express!");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Error....", err.message);
  res.status(500).send("INTERNAL SERVER ERROR");
});

app.listen(3000, () => console.log("Running on 3000"));
