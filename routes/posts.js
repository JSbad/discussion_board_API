const posts = require("express").Router();
const multer = require("multer");
const { v1: uuidv1 } = require("uuid");
const response = require("../models/response.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");


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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'images/')
},
  filename: (req,file,cb) => {
    cb(null, file.originalname)
}
})

const upload = multer({storage: storage,limits:{fileSize: 10000000}})
posts.post("/", upload.single('image'), async (req, res) => {
  const postId = uuidv1();
  const userId = req.query.userId;
  let checkUser = await User.getById(userId);

  if(checkUser.length === 0) {
    User.create(userId);
  }
  const dateCreated = new Date().toLocaleString('en-GB');
  const dateUpdated = dateCreated;
  let bodyValues = [];
  let invalid = false;
console.log(process.cwd())
console.log(req.body)
console.log(req.file)
  Post.fillable_properties.map(function (v) {
    if (req.body[v] === null || req.body[v] === undefined)
      invalid = true;
    else bodyValues.push(req.body[v]);
  });

  bodyValues = [postId, ...bodyValues, userId, dateUpdated, dateCreated];

  if (!invalid) {
    const [results, error] = await Post.create(bodyValues);
    if (error.length == 0 && results.affectedRows == 1)
      res.status(201).json(response.prepare(201, results, error));
    else
      res.status(400).json(response.prepare(400, results, error));
  } else {
    res.status(400).json(response.prepare(400, [], [{ "message": "Missing data" }, bodyValues]));
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
    else bodyValues.push(req.body[v]);
  });

  bodyValues = [commentId,  ...bodyValues,   postId, dateUpdated, dateCreated];

  if (!invalid) {
    const [results, error] = await Comment.create(bodyValues);
    if (error.length == 0 && results.affectedRows == 1)
      res.status(201).json(response.prepare(201, [req.body], error));
    else
      res.status(400).json(response.prepare(400, results, error));

  } else {
    res.status(400).json(response.prepare(400, [req.body], [{ "message": "Missing data" }]));
  }
});

module.exports = posts;
