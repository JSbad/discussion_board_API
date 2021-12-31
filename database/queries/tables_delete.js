const database = require('../mysql-db.js');

async function execute() {
    await database.dropTable("posts");
    console.log("Posts deleted");
    await database.dropTable("comments");
    console.log("Comments deleted");

    database.closeConnection();
};

execute();
