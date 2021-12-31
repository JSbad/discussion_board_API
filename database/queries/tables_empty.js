const database = require('../mysql-db.js');

async function execute() {
    await database.deleteFrom("posts");
    console.log("Posts emptied");
    await database.deleteFrom("comments");
    console.log("Comments emptied");

    database.closeConnection();
};

execute();
