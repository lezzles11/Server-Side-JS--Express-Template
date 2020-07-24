const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");

const fetch = require("node-fetch");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");

// express.static() specifies the path where the files are found
// This makes sure that you get all assets from the public folder
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log("\nMETHOD: " + req.method);
  console.log("\nPATH: " + req.path + "\n");
  next();
});

// Render the home page, with all the notes included already
app.get("/", (req, res) => {
  fetch("http://localhost:3001/notes")
    .then((response) =>
      response.json().then((json) => {
        res.render("home", {
          articles: json,
        });
      })
    )
    .catch((error) => {
      console.log(error);
    });
});

// Render the page, add_note
app.get("/add_note", (req, res) => {
  res.render("add_note");
});

// Render the page, edit note
app.get("/edit_note/:id", (req, res) => {
  fetch(`http://localhost:3001/notes/${req.params.id}`).then((response) => {
    response.json().then((json) => {
      res.render("edit_note", {
        articles: json,
      });
    });
  });
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

app.post("/api/add_note", cors(), (req, res) => {
  console.log("Posting a note");
  fetch("http://localhost:3001/notes", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    res.status(200).send();
  });
});

app.patch("/api/edit_note/:id", cors(), (req, res) => {
  console.log("Editing a note");
  const id = req.params.id;

  fetch(`http://localhost:3001/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    res.status(200).send();
  });
});
//DELETE
app.delete("/api/delete/:id", cors(), (req, res) => {
  console.log("Deleting a note");
  const id = req.params.id;
  fetch(`http://localhost:3001/notes/${id}`, {
    method: "DELETE",
  }).then((response) => {
    res.status(200).send();
  });
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
