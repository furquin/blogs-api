const { Users } = require('../models');

const createNewUser = async (displayName, email, password, image) => {
    const newUser = await Users.create({ displayName, email, password, image });

    return newUser;
};

const emailExists = async (email) => {
    const exists = await Users.findOne({ where: { email } });

    return exists;
};

const login = async (email, password) => {
    const userLogin = await Users.findOne({ where: { email, password } });

    return userLogin;
};

const getAllUsers = async () => {
    const allUsers = await Users.findAll({ attributes: { exclude: ['password'] } });

    return allUsers;
};

const getUserById = async (id) => {
    const userById = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
    
    return userById;
};

module.exports = {
    createNewUser,
    emailExists,
    login,
    getAllUsers,
    getUserById,
};
