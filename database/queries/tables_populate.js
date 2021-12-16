const database = require('../mysql-db.js');
const static_database = require('../json-db.js');
const post = require('../../models/post.js');
const comment = require('../../models/comment.js');

static_database.getAll('posts').map(v => database.insertInto('posts', post.properties, Object.values(v), function(){ console.log("Post created.")}));
static_database.getAll('comments').map(v => database.insertInto('comments', comment.properties, Object.values(v), function(){ console.log("Comment created.")}));

database.closeConnection();
