const express = require('express');
const {
    createNewUser,
    getAllUsers,
    getUserById,
    deleteCurrentUser,
} = require('../controllers/user');
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

routes
    .route('/me')
    .delete(validToken, deleteCurrentUser);

module.exports = routes;