const { BlogPosts } = require('../models');

const createNewPost = async (title, categoryIds, content) => {
    await BlogPosts.create({ title, categoryIds, content });

    const newPost = await BlogPosts.findAll({
        where: { title },
        attributes: { exclude: ['published', 'updated'] },
    });
    
    return newPost;
};

module.exports = {
    createNewPost,
};