const posts = require("express").Router();
const fileUpload = require('express-fileupload');
const { v1: uuidv1 } = require("uuid");
const response = require("../models/response.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const cookieHandler = require("../helpers/cookieHandler.js");

posts.use(fileUpload());

//Handle /posts
posts.get("/", async (req, res) => {
  const [results, error] = await Post.getAll();

  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

//Handle get /posts/example_id
posts.get("/:id", async (req, res) => {
  const postId = req.params.id;

  const [results, error] = await Post.getById(postId);
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

//Handle /posts/example_id/comments
posts.get("/:id/comments", async (req, res) => {
  const postId = req.params.id;

  const [results, error] = await Comment.getByForeignId(postId);
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

//Handle creating a post
posts.post("/", async (req, res) => {
  const postId = uuidv1();
  const userId = cookieHandler.getCookie(res, "userId");
  const dateCreated = new Date().toLocaleString('en-GB');
  const dateUpdated = dateCreated;
  let bodyValues = [];
  let invalid = false;
  let picUpload;

  Post.fillable_properties.map(function (v) {
    if (req.body[v] === null || req.body[v] === undefined)
      invalid = true;
    bodyValues.push(req.body[v]);
  });

  bodyValues = [postId, ...bodyValues, userId, dateUpdated, dateCreated];

  if (!invalid) {
    const [results, error] = await Post.create(bodyValues);
    if (error.length == 0 && results.affectedRows == 1)
      res.status(201).json(response.prepare(201, results, error));
    else
      res.status(400).json(response.prepare(400, results, error));
  } else {
    res.status(400).json(response.prepare(400, [], [{ "message": "Missing data" }]));
  }
});

//Handle creating a comment
posts.post("/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = uuidv1();
  const dateCreated = new Date().toLocaleString('en-GB');
  const dateUpdated = dateCreated;
  let bodyValues = [];
  let invalid = false;

  Comment.fillable_properties.map(function (v) {
    if (req.body[v] === null || req.body[v] === undefined)
      invalid = true;
    bodyValues.push(req.body[v]);
  });

  bodyValues = [commentId, ...bodyValues, postId, dateUpdated, dateCreated];

  if (!invalid) {
    const [results, error] = await Comment.create(bodyValues);
    if (error.length == 0 && results.affectedRows == 1)
      res.status(201).json(response.prepare(201, results, error));
    else
      res.status(400).json(response.prepare(400, results, error));

  } else {
    res.status(400).json(response.prepare(400, [], [{ "message": "Missing data" }]));
  }
});

module.exports = posts;
