const routes = require('express').Router();
const posts = require('./posts.js');
const comments = require('./comments.js');
const response = require('../models/response.js');

//Handle all /comments requests in comments.js
routes.use('/comments', comments);
//Handle all /posts requests in posts.js
routes.use('/posts', posts);

//Handle /
routes.get("/", (req, res) => {
    res.status(200).json(response.prepare(200, [], []));
});

//Handle all other paths
routes.get('*', (req, res) => {
    res.status(404).json(response.prepare(404, [], [{ "message": "Endpoint not found" }]));
});

module.exports = routes;
