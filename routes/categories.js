const express = require('express');
const { createNewCategories, getAllCategories } = require('../controllers/categories');
const { nameExists } = require('../middlewares/validateCategories');
const { validToken } = require('../middlewares/validateToken');
    
const routes = express.Router();

routes
    .route('/')
    .post(nameExists, validToken, createNewCategories)
    .get(validToken, getAllCategories);

module.exports = routes;