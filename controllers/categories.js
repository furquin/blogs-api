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

module.exports = {
    createNewCategories,
};