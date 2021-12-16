const posts = require("express").Router();
const {v1: uuidv1} = require('uuid');
const response = require("../models/response.js");
const post = require("../models/post.js");
const comment = require("../models/comment.js");
const res = require("express/lib/response");

//Handle /posts
posts.get("/", (req, res) => {
  post.getAll((results) => {
    if (results.length != 0)
      res.status(200).json(response.prepare("OK", results));
    else res.status(404).json(response.prepare("ERROR", "Not Found"));
  });
});

//Handle get /posts/example_id
posts.get("/:id", (req, res) => {
  const _id = req.params.id;

  post.get("postId", _id, (results) => {
    if (results.length != 0)
      res.status(200).json(response.prepare("OK", results));
    else res.status(404).json(response.prepare("ERROR", "Not Found"));
  });
});

//Handle /posts/example_id/comments
posts.get("/:id/comments", (req, res) => {
  const _id = req.params.id;

  comment.get("postId", _id, (results) => {
    if (results.length != 0)
      res.status(200).json(response.prepare("OK", results));
    else res.status(404).json(response.prepare("ERROR", "Not Found"));
  });
});

//Handle post /posts/example_id co z tym mam kurwa zrobic
posts.post("/", (req, res) => {
  const _id = uuid
  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image;
  const date = req.body.date;
  if (_id && author && title && content && date) {
    post.create({ _id, title, author, image, content, date }, (results) => {
      if (results.affectedRows)
        res.status(201).json(response.prepare("OK", results));
      else
        res.status(400).json(response.prepare("ERROR", "Couldnt create post"));
    });
  }
});

module.exports = posts;
