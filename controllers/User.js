const serviceUser = require('../services/user');

const createNewUser = async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    
    try {
        const newUser = await serviceUser.createNewUser(displayName, email, password, image);

        res.status(201).json(newUser);
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createNewUser,
};