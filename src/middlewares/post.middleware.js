const { BlogPost } = require('../models');
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

module.exports = {
  requiredFieldsMiddleware,
  requiredToUpdate,
  postExists,
  authorizedUser,
};