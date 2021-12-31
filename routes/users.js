const users = require("express").Router();
const { v1: uuidv1 } = require("uuid");
const response = require("../models/response.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");


//Handle creating a user