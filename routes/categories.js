const express = require('express');
const { createNewCategories } = require('../controllers/categories');
const { nameExists } = require('../middlewares/validateCategories');
const { validToken } = require('../middlewares/validateToken');
    
const routes = express.Router();

routes
    .route('/')
    .post(nameExists, validToken, createNewCategories);

module.exports = routes;