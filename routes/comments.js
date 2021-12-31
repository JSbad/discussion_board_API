const comments = require('express').Router();
const response = require('../models/response.js');
const Comment = require('../models/comment.js');

//Handle /comments
comments.get('/', async (req, res) => {
    const [results, error] = await Comment.getAll();

    if (results.length != 0 && error.length == 0)
        res.status(200).json(response.prepare(200, results, error));
    else res.status(404).json(response.prepare(404, results, error));
});

//Handle /comments/example_id
comments.get('/:id', async (req, res) => {
    const commentId = req.params.id;

    const [results, error] = await Comment.getById(commentId);
    if (results.length != 0 && error.length == 0)
        res.status(200).json(response.prepare(200, results, error));
    else res.status(404).json(response.prepare(404, results, error));
});

module.exports = comments;
