const database = require('../mysql-db.js');

database.deleteFrom("posts", function(){ console.log("Posts emptied")});
database.deleteFrom("comments", function(){ console.log("Comments emptied")});

database.closeConnection();
