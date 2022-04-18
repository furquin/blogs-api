const jwt = require('jsonwebtoken');
const serviceUser = require('../services/user');
const jwtConfig = require('../config/jtwConfig');
require('dotenv').config();

const createNewUser = async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const payload = { isAdmin: false };
    
    try {
        await serviceUser.createNewUser(displayName, email, password, image);

        const token = jwt.sign(payload, process.env.SEGREDO, jwtConfig);

       return res.status(201).json(token);
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const payload = { isAdmin: false };

    try {
        await serviceUser.login(email, password);

        const token = jwt.sign(payload, process.env.SEGREDO, jwtConfig);

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

module.exports = {
    createNewUser,
    login,
    getAllUsers,
};