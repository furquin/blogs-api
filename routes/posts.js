const express = require('express');
const { validToken } = require('../middlewares/validateToken');
const {
    createNewPost,
    getAllPosts,
    getByIdPost,
    updatePost,
    deletePost,
    getSearchTerm,
} = require('../controllers/posts');
const {
    validPost,
    validCategory,
    postExits,
    validUpdate,
    validUser,
} = require('../middlewares/validatePost');

const routes = express.Router();

routes
    .route('/search')
    .get(validToken, getSearchTerm); 

routes
    .route('/')
    .post(validToken, validPost, validCategory, createNewPost)
    .get(validToken, getAllPosts);

routes
    .route('/:id')
    .get(validToken, postExits, getByIdPost)
    .put(validToken, validPost, validUpdate, validUser, updatePost)
    .delete(validToken, postExits, validUser, deletePost); 
    
module.exports = routes;