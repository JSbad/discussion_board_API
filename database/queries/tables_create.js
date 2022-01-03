const database = require('../mysql-db.js');
const Post = require('../../models/post.js');
const Comment = require('../../models/comment.js');
const User = require('../../models/user.js');

async function execute(){
    await database.createTable("posts", Post.public_properties);
    console.log("Posts created");
    await database.createTable("comments", Comment.public_properties);
    console.log("Comments created");
    await database.createTable("users", User.public_properties);
    console.log("Users created");
    
    database.closeConnection();
};

execute();

