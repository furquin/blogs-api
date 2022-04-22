const jwt = require('jsonwebtoken');
const servicePosts = require('../services/posts');
const serviceUser = require('../services/user');

const createNewPost = async (req, res, next) => {
    const { title, categoryIds, content } = req.body;
    const { authorization } = req.headers;
    const { email } = jwt.decode(authorization);
    const { dataValues: { id } } = await serviceUser.getUserByEmail(email);

    try {
        const [newPost] = await servicePosts.createNewPost(id, title, categoryIds, content);

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

const updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    
    try {
        const updatedPost = await servicePosts.updatePost(id, title, content);

        return res.status(200).json(updatedPost);
    } catch (e) {
        next(e);
    }
};

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        await servicePosts.deletePost(id);

        return res.status(204).end();
    } catch (e) {
        next(e);
    }
};
module.exports = {
    createNewPost,
    getAllPosts,
    getByIdPost,
    updatePost,
    deletePost,
};