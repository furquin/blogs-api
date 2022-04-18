const express = require('express');
const { createNewUser, getAllUsers } = require('../controllers/User');
const {
    validDisplayName,
    validEmail,
    checkEmailExists,
    validPassword,
} = require('../middlewares/validateUser');

const { validToken } = require('../middlewares/validateToken');
    
const routes = express.Router();

routes
    .route('/')
    .post(validDisplayName, validEmail, validPassword, checkEmailExists, createNewUser)
    .get(validToken, getAllUsers);

module.exports = routes;