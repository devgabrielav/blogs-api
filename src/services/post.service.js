const { Category, BlogPost, PostCategory } = require('../models');
const { generator, includeKey, generateObject } = require('../helpers/postHelpers');

const addNewPost = async ({ title, content, categoryIds, id }) => {
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (count < categoryIds.length) {
    return generator('BAD_REQUEST', 'one or more "categoryIds" not found');
  }

  const date = new Date();

  const newPost = generateObject({ title, content, id, date });

  const { dataValues } = await BlogPost.create(newPost);

  const postId = dataValues.id;

  const newPostCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(newPostCategories);

  return { status: 'CREATED', data: dataValues };
};

const getAll = async () => {
  const posts = await BlogPost.findAll(includeKey);

  return { status: 'SUCCESS', data: posts };
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, includeKey);

  return { status: 'SUCCESS', data: post };
};

const updatePost = async (id, title, content) => {
  const updateDate = new Date();

  await BlogPost.update({ title, content, updated: updateDate }, { where: { id } });

  const updatedPost = await BlogPost.findByPk(id, includeKey);
  
  return { status: 'SUCCESS', data: updatedPost };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });

  return { status: 'DELETED' };
};

module.exports = {
  addNewPost,
  getAll,
  getById,
  updatePost,
  deletePost,
};