const { getCategoriesById } = require('../services/categories');

const validPost = (req, res, next) => {
    const { title, content } = req.body;
  
    try {
        if (!title) {
            return res.status(400).json({ message: '"title" is required' });
        }
        if (!content) {
            return res.status(400).json({ message: '"content" is required' });
        }
        next();
    } catch (e) {
        next(e);
    }
};

const validCategory = async (req, res, next) => {
    const { categoryIds } = req.body;
    try {
        if (!categoryIds) { return res.status(400).json({ message: '"categoryIds" is required' }); }
        
        const categoryExits = categoryIds.map(async (id) => {
                const category = await getCategoriesById(id); 
                
                if (category === null) {
                    return res.status(400).json({ message: '"categoryIds" not found' });
                }
            });            
        await Promise.all(categoryExits);
        
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    validPost,
    validCategory,
};