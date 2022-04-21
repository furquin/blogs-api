module.exports = (sequelize, DataTypes) => {
    const PostsCategories = sequelize.define('PostsCategories', {
        postId: { type: DataTypes.INTEGER },
      categoryId: { type: DataTypes.INTEGER } }, { timestamps: false });
    PostsCategories.associate = (models) => {
        models.Categories.belongsToMany(models.BlogPosts, {
            as: 'blogPost',
            through: PostsCategories,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
        models.BlogPosts.belongsToMany(models.Categories, {
            as: 'categories',
            through: PostsCategories,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    };
  return PostsCategories;
};