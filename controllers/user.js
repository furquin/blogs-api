const jwt = require('jsonwebtoken');
const serviceUser = require('../services/user');
const jwtConfig = require('../config/jwtConfig');
require('dotenv').config();

const createNewUser = async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const payload = { isAdmin: false };
    
    try {
        await serviceUser.createNewUser(displayName, email, password, image);

        const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

       return res.status(201).json(token);
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const payload = { isAdmin: false, email };

    try {
        await serviceUser.login(email, password);

        const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

        return res.status(200).json({ token });
    } catch (e) {
        next(e);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await serviceUser.getAllUsers();
        
        return res.status(200).json(allUsers);
    } catch (e) {
        next(e);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const userId = await serviceUser.getUserById(id);
        return res.status(200).json(userId);
    } catch (e) {
        next(e);
    }
};

const deleteCurrentUser = async (req, res, next) => {
    const { authorization } = req.headers;
    const { email } = jwt.decode(authorization);
    try {
        await serviceUser.deleteCurrentUser(email);
        
        return res.status(204).end();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createNewUser,
    login,
    getAllUsers,
    getUserById,
    deleteCurrentUser,
};