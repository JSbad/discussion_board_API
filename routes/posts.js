const posts = require('express').Router();

const response = require('../models/response.js');
const post = require('../models/post.js');
const comment = require('../models/comment.js');

//Handle /posts
posts.get('/', (req, res) => {
    post.getAll((results) => {
        if(results.length != 0)
        res.status(200).json(response.prepare('OK', results));
        else
        res.status(404).json(response.prepare('ERROR', 'Not Found'));
    });
});

//Handle /posts/example_id
posts.get('/:id', (req, res) => {
    const _id = req.params.id;

    post.get('postId', _id, (results) => {
        if(results.length != 0)
        res.status(200).json(response.prepare('OK', results));
        else
        res.status(404).json(response.prepare('ERROR', 'Not Found'));
    });
});

//Handle /posts/example_id/comments
posts.get('/:id/comments', (req, res) => {
    const _id = req.params.id;

    comment.get('postId', _id, (results) => {
        if(results.length != 0)
        res.status(200).json(response.prepare('OK', results));
        else
        res.status(404).json(response.prepare('ERROR', 'Not Found'));
    });
});

module.exports = posts;
