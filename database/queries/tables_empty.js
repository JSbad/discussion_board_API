const database = require('../mysql-db.js');

async function execute() {
    await database.deleteFrom("posts");
    console.log("Posts emptied");
    await database.deleteFrom("comments");
    console.log("Comments emptied");
    await database.deleteFrom("users");
    console.log("Users emptied");
    database.closeConnection();
};

execute();
