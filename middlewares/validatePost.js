const jwt = require('jsonwebtoken');
const { getCategoriesById } = require('../services/categories');
const { getByIdPost } = require('../services/posts');
const { getUserByEmail } = require('../services/user');

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

const postExits = async (req, res, next) => {
   const { id } = req.params;
    
    try {
        const post = await getByIdPost(id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

    next();
} catch (e) {
    next(e);
}
};

const validUpdate = async (req, res, next) => {
    const { categoryIds } = req.body;
    
    try {
        if (categoryIds) {
            return res.status(400).json({ message: 'Categories cannot be edited' });
        }
        next();
    } catch (e) {
        next(e);
    }
};

const validUser = async (req, res, next) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { email } = jwt.decode(authorization);
    try {
        const { dataValues } = await getUserByEmail(email);
        const { userId } = await getByIdPost(id);

            if (userId !== dataValues.id) {
                return res.status(401).json({ message: 'Unauthorized user' });
            }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    validPost,
    validCategory,
    postExits,
    validUpdate,
    validUser,
};