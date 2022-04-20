const { Categories } = require('../models');

const createNewCategories = async (name) => {
    const newCategories = await Categories.create({ name });

    return newCategories;
};

const getAllCategories = async () => {
    const allCategories = await Categories.findAll();
    
    return allCategories;
};

const getCategoriesById = async (id) => {
    const categoryById = await Categories.findByPk(id);

    return categoryById;
};

module.exports = {
    createNewCategories,
    getAllCategories,
    getCategoriesById,
};