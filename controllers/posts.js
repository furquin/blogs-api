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

const getAllPosts = async (_req, res, next) => {
    try {
        const allUsers = await servicePosts.getAllPosts();
        
        return res.status(200).json(allUsers);
    } catch (e) {
        next(e);
    }
};

const getByIdPost = async (req, res, next) => {
   const { id } = req.params;
   
    try {
        const postById = await servicePosts.getByIdPost(id);

    return res.status(200).json(postById);
   } catch (e) {
       next(e);
   }
};
module.exports = {
    createNewPost,
    getAllPosts,
    getByIdPost,
};