const database = require('../mysql-db.js');

database.dropTable("posts", function(){ console.log("Posts deleted")});
database.dropTable("comments", function(){ console.log("Comments created")});

database.closeConnection();
