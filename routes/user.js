const express = require('express');
const { createNewUser } = require('../controllers/User');
const {
    validDisplayName,
    validEmail,
    checkEmailExists,
    validPassword,
} = require('../middlewares/validateUser');
    
const routes = express.Router();

routes
    .route('/')
    .post(validDisplayName, validEmail, checkEmailExists, validPassword, createNewUser);

module.exports = routes;