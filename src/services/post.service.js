const { Category, BlogPost, PostCategory } = require('../models');

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

module.exports = {
  addNewPost,
};