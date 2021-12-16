const database = require('../mysql-db.js');
const post = require('../../models/post.js');
const comment = require('../../models/comment.js');

database.createTable("posts", post.properties,function(){ console.log("Posts created")});
database.createTable("comments", comment.properties, function(){ console.log("Comments created")});

database.closeConnection();
