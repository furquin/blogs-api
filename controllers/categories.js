const serviceCategories = require('../services/categories');

const createNewCategories = async (req, res, next) => {
    const { name } = req.body;
    try {
        const newCategories = await serviceCategories.createNewCategories(name);

        return res.status(201).json(newCategories);
    } catch (e) {
        next(e);
    }
};

const getAllCategories = async (_req, res, next) => {
    try {
        const allCategories = await serviceCategories.getAllCategories();

        return res.status(200).json(allCategories);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createNewCategories,
    getAllCategories,
};