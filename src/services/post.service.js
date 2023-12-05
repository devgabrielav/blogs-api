const { Category, BlogPost, PostCategory, User } = require('../models');

const addNewPost = async ({ title, content, categoryIds, id }) => {
  const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (rows.length < categoryIds.length) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }

  const date = new Date();

  const { dataValues } = await BlogPost.create({
    title,
    content,
    userId: id,
    updated: date,
    published: date,
  });

  const postId = dataValues.id;

  const newPostCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(newPostCategories);

  return { status: 'CREATED', data: dataValues };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { status: 'SUCCESS', data: posts };
};

module.exports = {
  addNewPost,
  getAll,
};