const comments = require('express').Router();

const response = require('../models/response.js');
const post = require('../models/post.js');
const comment = require('../models/comment.js');

//Handle /comments
comments.get('/', (req, res) => {
    comment.getAll((results) => {
        if(results.length != 0)
        res.status(200).json(response.prepare('OK', results));
        else
        res.status(404).json(response.prepare('ERROR', 'Not Found'));
    });
});

//Handle /comments/example_id
comments.get('/:id', (req, res) => {
    const _id = req.params.id;

    comment.get('commentId', _id, (results) => {
        if(results.length != 0)
        res.status(200).json(response.prepare('OK', results));
        else
        res.status(404).json(response.prepare('ERROR', 'Not Found'));
    });
});

module.exports = comments;
