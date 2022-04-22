const { Op } = require('sequelize');
const { BlogPosts, Users, Categories } = require('../models');

const createNewPost = async (userId, title, categoryIds, content) => {
    const { dataValues: { id } } = await BlogPosts.create({ userId, title, categoryIds, content });

    const newPost = await BlogPosts.findAll({
        where: { id },
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

const updatePost = async (id, title, content) => {
    const updatedPost = await BlogPosts
        .findByPk(id, {
            attributes: { exclude: ['published', 'updated'] },
            include: [
            { model: Categories, as: 'categories', through: { attributes: [] } },
        ] },
        {
        
    });

    await updatedPost.update({ title, content });

    return updatedPost;
};

const deletePost = async (id) => {
    await BlogPosts.destroy({ where: { id } });
};

const getSearchTerm = async (search) => {
    const post = await BlogPosts.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } },
      ],
        },
        include: [
            { model: Users, as: 'user' },
            { model: Categories, as: 'categories', through: { attributes: [] } },
        ],
    });

    return post;
};

module.exports = {
    createNewPost,
    getAllPosts,
    getByIdPost,
    updatePost,
    deletePost,
    getSearchTerm,
};