const { BlogPosts, Users, Categories } = require('../models');

const createNewPost = async (title, categoryIds, content) => {
    await BlogPosts.create({ title, categoryIds, content });

    const newPost = await BlogPosts.findAll({
        where: { title },
        attributes: { exclude: ['published', 'updated'] },
    });
    
    return newPost;
};

const getAllPosts = async () => {
    const allPosts = await BlogPosts.findAll({
        include: [
            { model: Users, as: 'user' },
            { model: Categories, as: 'categories', through: { attributes: [] } },
        ],
    });

    return allPosts;
};

const getByIdPost = async (id) => {
    const postById = await BlogPosts.findByPk(id, {
        include: [
            { model: Users, as: 'user' },
            { model: Categories, as: 'categories', through: { attributes: [] } },
        ],
    });

    return postById;
};

module.exports = {
    createNewPost,
    getAllPosts,
    getByIdPost,
};