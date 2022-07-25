const mysql = require("mysql2");
//Access the .env file for database information
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const promisePool = pool.promise();

//Handle SELECT
async function select(tableName, properties) {
  let queryBuilder = "SELECT " + properties.toString() + " FROM ??";
  let results = [];
  let error = [];

  try {
    const [rows, fields] = await promisePool.query(queryBuilder, tableName);
    results = rows;
  } catch (err) {
    error = [err];
  }

  return [results, error];
}

//Handle SELECT WHERE
async function selectWhere(tableName, properties, property, value) {
  let queryBuilder =
    "SELECT " + properties.toString() + " FROM ?? WHERE ?? = ?";
  let results = [];
  let error = [];

  try {
    const [rows, fields] = await promisePool.query(queryBuilder, [
      tableName,
      property,
      value,
    ]);
    results = rows;
  } catch (err) {
    error = [err];
  }

  return [results, error];
}

//Handle INSERT INTO
async function insertInto(tableName, properties, values) {
  let queryBuilder =
    "INSERT INTO ?? (" + properties.toString() + ") VALUES ( ? )";
  let results = [];
  let error = [];

  try {
    const [rows, fields] = await promisePool.query(queryBuilder, [
      tableName,
      values,
    ]);
    results = rows;
  } catch (err) {
    error = [err];
  }

  return [results, error];
}

//Handle CREATE TABLE
async function createTable(tableName, properties) {
  let queryBuilder = "CREATE TABLE ?? ( `id` INT NOT NULL AUTO_INCREMENT";
  properties.map((v) => (queryBuilder += ", " + v + " VARCHAR(256) NOT NULL"));
  queryBuilder += ", PRIMARY KEY (`id`)) ENGINE = InnoDB;";
  let results = [];
  let error = [];

  try {
    const [rows, fields] = await promisePool.query(queryBuilder, tableName);
    results = rows;
  } catch (err) {
    error = [err];
  }

  return [results, error];
}

//Handle DELETE FROM
async function deleteFrom(tableName) {
  let results = [];
  let error = [];

  try {
    const [rows, fields] = await promisePool.query("DELETE FROM ??", tableName);
    results = rows;
  } catch (err) {
    error = [err];
  }

  return [results, error];
}

//Handle DROP TABLE
async function dropTable(tableName) {
  let results = [];
  let error = [];

  try {
    const [rows, fields] = await promisePool.query("DROP TABLE ??", tableName);
    results = rows;
  } catch (err) {
    error = [err];
  }

  return [results, error];
}

//Handle closing the connection
function closeConnection() {
  promisePool.end();
}

module.exports = {
  selectWhere,
  createTable,
  closeConnection,
  dropTable,
  select,
  deleteFrom,
  insertInto,
};
