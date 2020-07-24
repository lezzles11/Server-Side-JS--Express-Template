const express = require("express");

const Router = express.Router();

Router.get("/", (req, res) => {
  console.log("getting all notes- expect to be /api/notes!");
  res.send("Get all notes");
});

Router.get("/:id", (req, res) => {
  res.send(`Get one note with ${req.params.id}`);
});

Router.post("/", (req, res) => {
  res.send(`Posting note`);
});

Router.put("/:id", (req, res) => {
  res.send(`Changing note with ${req.params.id}`);
});

Router.delete("/:id", (req, res) => {
  res.send(`Deleting notes with ${req.params.id}`);
});

module.exports = Router;
