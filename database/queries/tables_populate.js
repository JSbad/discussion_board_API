const database = require("../mysql-db.js");
const static_database = require("../json-db.js");
const Post = require("../../models/post.js");
const Comment = require("../../models/comment.js");
const User = require("../../models/user.js");

async function execute() {
  const posts = await static_database.getAll("posts");
  for (const post of posts)
    await database.insertInto(
      "posts",
      Post.public_properties,
      Object.values(post)
    );
  console.log("Posts created.");

  const comments = await static_database.getAll("comments");
  for (const comment of comments)
    await database.insertInto(
      "comments",
      Comment.public_properties,
      Object.values(comment)
    );
  console.log("Comments created.");

  const users = await static_database.getAll("users");
  for (const user of users)
    await database.insertInto(
      "users",
      User.public_properties,
      Object.values(user)
    );
  console.log("Users created.");

  database.closeConnection();
}

execute();
