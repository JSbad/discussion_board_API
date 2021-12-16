const database = require('../database/mysql-db.js');

const public_properties = ['postId', 'title', 'author', 'image', 'content'];
const private_properties = [];
const properties = public_properties.concat(private_properties);

//Return all posts
function getAll(callback){
    database.select('posts', public_properties, (results) => {
        return callback(results);
    });
};

//Return posts where property is equal to value
function get(property, value, callback){
    database.selectWhere('posts', public_properties, property, value, (results) => {
        return callback(results);
    });
}

module.exports = {getAll, get, public_properties, private_properties, properties};
