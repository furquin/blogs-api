const servicePosts = require('../services/posts');

const createNewPost = async (req, res, next) => {
    const { title, categoryIds, content } = req.body;

    try {
        const [newPost] = await servicePosts.createNewPost(title, categoryIds, content);

        return res.status(201).json(newPost);
    } catch (e) {
        next(e);
    }
};  

module.exports = {
    createNewPost,
};