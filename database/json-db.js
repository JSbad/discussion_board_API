const data = require('./data.json');

function getAll(tableName){
    return data[tableName];
}

module.exports = { getAll };
