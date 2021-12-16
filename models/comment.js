const database = require('../database/mysql-db.js');

const public_properties = ['commentId', 'author', 'content', 'postId'];
const private_properties = [];
const properties = public_properties.concat(private_properties);

//Return all comments
function getAll(callback){
    database.select('comments', public_properties, (results) => {
        return callback(results);
    });
};

//Return comments where property is equal to value
function get(property, value, callback){
    database.selectWhere('comments', public_properties, property, value, (results) => {
        return callback(results);
    });
};

//Post comment
function post(property, value, callback) {
    database.insertInto('comments', public_properties, value, (results) => {
        return callback(results);
    })
}

module.exports = {getAll, get, public_properties, private_properties, properties};
