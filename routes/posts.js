const express = require('express');
const { validToken } = require('../middlewares/validateToken');
const { createNewPost } = require('../controllers/posts');
const { validPost, validCategory } = require('../middlewares/validatePost');

const routes = express.Router();

routes
    .route('/')
    .post(validToken, validPost, validCategory, createNewPost);
    
module.exports = routes;