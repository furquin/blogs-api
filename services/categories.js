const { Categories } = require('../models');

const createNewCategories = async (name) => {
    const newCategories = await Categories.create({ name });

    return newCategories;
};

const getAllCategories = async () => {
    const allCategories = await Categories.findAll();
    
    return allCategories;
};

module.exports = {
    createNewCategories,
    getAllCategories,
};