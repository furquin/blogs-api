const { Categories } = require('../models');

const createNewCategories = async (name) => {
    const newCategories = await Categories.create({ name });

    return newCategories;
};

module.exports = {
    createNewCategories,
};