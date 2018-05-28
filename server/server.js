const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DATABASE, PORT } = require("./constants/index");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE);

const { Todo } = require("./models/todo");

app.use(bodyParser.json());

//GET ALL TODOS

app.get("/", (req, res) => {
  Todo.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

//CREATE NEW TODO

app.post("/", (req, res) => {
  const todo = new Todo(req.body);

  todo.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      todo: doc
    });
  });
});

//UPDATE TODO

app.post("/:id", (req, res) => {
  let id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

//DELETE TODO

app.delete("/:id", (req, res) => {
  let id = req.params.id;

  Todo.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(true);
  });
});

//LIKE TODO || COMPLETED TODO || COMMENT TODO

app.post("/:id/like", (req, res) => {
  let id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

app.post("/:id/complete", (req, res) => {
  let id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

app.post("/:id/comment", (req, res) => {
  let id = req.params.id;

  Todo.findByIdAndUpdate(id, { $push: req.body }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
