const mysql = require('mysql2');
//Access the .env file for database information
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
});

//Handle SELECT
function select(tableName, properties, callback) {
    const queryBuilder = 'SELECT ' + properties.toString() + ' FROM ??';
    connection.query(queryBuilder, tableName, function (error, results) {
        if (error) {
            throw error;
        } else {
            return callback(convertToJSON(results));
        }
    });
}

//Handle SELECT WHERE
function selectWhere(tableName, properties, property, value, callback) {
    const queryBuilder = 'SELECT ' + properties.toString() + ' FROM ?? WHERE ?? = ?';
    connection.query(queryBuilder, [tableName, property, value], function (error, results) {
        if (error) {
            throw error;
        } else {
            return callback(convertToJSON(results));
        }
    });
}

//Handle INSERT INTO
function insertInto(tableName, properties, values, callback) {
    const queryBuilder = 'INSERT INTO ?? (' + properties.toString() + ') VALUES ( ? )';
    connection.query(queryBuilder, [tableName, values], function (error, results) {
        if (error) {
            throw error;
        } else {
            return callback();
        }
    });
}

//Handle CREATE TABLE
function createTable(tableName, properties, callback) {
    const queryBuilder = 'CREATE TABLE ?? ( `id` INT NOT NULL AUTO_INCREMENT';
    properties.map(v => queryBuilder += ", " + v + " VARCHAR(256) NOT NULL");
    queryBuilder += ', PRIMARY KEY (`id`)) ENGINE = InnoDB;';
    connection.query(queryBuilder, tableName, function (error, results) {
        if (error) {
            throw error;
        } else {
            return callback();
        }
    });
}

//Handle DELETE FROM
function deleteFrom(tableName, callback) {
    connection.query('DELETE FROM ??', tableName, function (error, results) {
        if (error) {
            throw error;
        } else {
            return callback();
        }
    });
}

//Handle DROP TABLE
function dropTable(tableName, callback) {
    connection.query('DROP TABLE ??', tableName, function (error, results) {
        if (error) {
            throw error;
        } else {
            return callback();
        }
    });
}

//Handle RowDataPacket conversion to JSON
function convertToJSON(data) {
    return data.map(v => Object.assign({}, v));
}

//Handle closing the connection
function closeConnection() {
    connection.end();
}

module.exports = { selectWhere, createTable, closeConnection, dropTable, select, deleteFrom, insertInto }
