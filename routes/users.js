const users = require("express").Router();
const { v1: uuidv1 } = require("uuid");
const response = require("../models/response.js");
const cookieParser = require("cookie-parser");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");

users.use(cookieParser());

//Handle creating a user
users.post("/", async (req, res) => {
    const userId= uuidv1();
    const dateCreated = new Date().toLocaleString('en-GB');
    const dateUpdated = dateCreated;
    let bodyValues = [];
    let invalid = false;
  
    User.fillable_properties.map(function (v) {
      if (req.body[v] === null || req.body[v] === undefined)
        invalid = true;
      bodyValues.push(req.body[v]);
    });
  
    bodyValues = [userId, ...bodyValues, dateUpdated, dateCreated];
  
    if (!invalid) {
      const [results, error] = await User.create(bodyValues);
      if (error.length == 0 && results.affectedRows == 1) {
        res.status(201).json(response.prepare(201, results, error));
        res.cookie('userId', userId, {
          expires: new Date('01 01 2100'),
          secure: true,
          httpOnly: true,
          sameSite: 'strict'
        });
      }
      else
        res.status(400).json(response.prepare(400, results, error));
    } else {
      res.status(400).json(response.prepare(400, [], [{ "message": "Missing data" }]));
    }
  });
  
//Handle /users/example_id
users.get("/users/:id", async(req, res) => {
  const userId = req.params.id;
  const [results, error] = await User.getById(userId);
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

//Handle users/example_id/posts
users.get("/users/:id/posts", async(req, res) => {
  const [results, error] = await Post.getByForeignId(userId);
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});
