const express = require('express');
const { login } = require('../controllers/user');
const {
    validEmail,
    validPassword,
    validLogin,
} = require('../middlewares/validateUser');
    
const routes = express.Router();

routes
    .route('/')
    .post(validEmail, validPassword, validLogin, login);

module.exports = routes;