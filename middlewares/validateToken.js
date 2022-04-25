const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jtwConfig');
require('dotenv').config();

const validToken = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            return res.status(401).json({ message: 'Token not found' });
        }

        jwt.verify(authorization, process.env.JTW_SECRET, jwtConfig);

        next();
    } catch (e) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = { validToken };