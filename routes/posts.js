const express = require('express');
const { validToken } = require('../middlewares/validateToken');
const { createNewPost, getAllPosts, getByIdPost } = require('../controllers/posts');
const { validPost, validCategory, postExits } = require('../middlewares/validatePost');

const routes = express.Router();

routes
    .route('/')
    .post(validToken, validPost, validCategory, createNewPost)
    .get(validToken, getAllPosts);

routes
    .route('/:id')
    .get(validToken, postExits, getByIdPost);
    
module.exports = routes;