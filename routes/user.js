const express = require('express');
const { createNewUser, getAllUsers, getUserById } = require('../controllers/User');
const {
    validDisplayName,
    validEmail,
    checkEmailExists,
    validPassword,
    userIdExists,
} = require('../middlewares/validateUser');

const { validToken } = require('../middlewares/validateToken');
    
const routes = express.Router();

routes
    .route('/')
    .post(validDisplayName, validEmail, validPassword, checkEmailExists, createNewUser)
    .get(validToken, getAllUsers);

routes
    .route('/:id')
    .get(userIdExists, validToken, getUserById);

module.exports = routes;