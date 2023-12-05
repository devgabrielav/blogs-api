const postServices = require('../services/post.service');

const httpMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  DELETED: 204,
  CONFLICT: 409,
  BAD_REQUEST: 400,
};

const postRouteController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;

  const { status, data } = await postServices.addNewPost({ title, content, categoryIds, id });
  const code = httpMap[status];

  return res.status(code).json(data);
};

const getAllPosts = async (_req, res) => {
  const { status, data } = await postServices.getAll();

  const code = httpMap[status];

  return res.status(code).json(data);
};

module.exports = {
  postRouteController,
  getAllPosts,
};