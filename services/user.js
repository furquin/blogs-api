const { Users } = require('../models');

const createNewUser = async (displayName, email, password, image) => {
    const newUser = await Users.create({ displayName, email, password, image });

    return newUser;
};

const emailExists = async (email) => {
    const exists = await Users.findOne({ where: { email } });

    return exists;
};

module.exports = {
    createNewUser,
    emailExists,
};
