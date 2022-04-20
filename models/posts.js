module.exports = (sequelize, DataTypes) => {
    const BlogPosts = sequelize.define('BlogPosts', {
        userId: { type: DataTypes.INTEGER, defaultValue: 1 },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.STRING, allowNull: false },
        published: { type: DataTypes.DATE, defaultValue: new Date(), allowNull: false },
        updated: { type: DataTypes.DATE, defaultValue: new Date(), allowNull: false },
    }, { timestamps: false });
    
    BlogPosts.associate = (models) => {
        BlogPosts.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'Users',
        });
    };
  return BlogPosts;
};
