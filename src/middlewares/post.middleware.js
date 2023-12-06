const { BlogPost, Category } = require('../models');
const { includeKey } = require('../helpers/postHelpers');

const requiredFieldsMiddleware = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const requiredToUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const postExists = async (req, res, next) => {
  const { id } = req.params;
  const getPost = await BlogPost.findByPk(id, includeKey);
  if (!getPost) return res.status(404).json({ message: 'Post does not exist' });
  next();
};

const authorizedUser = async (req, res, next) => {
  const { id } = req.params;
  const { user } = res.locals;
  const getPost = await BlogPost.findByPk(id, includeKey);
  if (getPost.user.id !== user.id) return res.status(401).json({ message: 'Unauthorized user' });
  next();
};

const emptyQuery = async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    const allPosts = await BlogPost.findAll(includeKey);
    return res.status(200).json(allPosts);
  }
  next();
};

const categoriesExist = async (req, res, next) => {
  const { categoryIds } = req.body;
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  if (count < categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

module.exports = {
  requiredFieldsMiddleware,
  requiredToUpdate,
  postExists,
  authorizedUser,
  emptyQuery,
  categoriesExist,
};