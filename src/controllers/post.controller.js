const postServices = require('../services/post.service');
const { generateHttpCode } = require('../helpers/postHelpers');

const postRouteController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;

  const { status, data } = await postServices.addNewPost({ title, content, categoryIds, id });

  return res.status(generateHttpCode(status)).json(data);
};

const getAllPosts = async (_req, res) => {
  const { status, data } = await postServices.getAll();

  return res.status(generateHttpCode(status)).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await postServices.getById(id);

  return res.status(generateHttpCode(status)).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  const { status, data } = await postServices.updatePost(id, title, content);

  return res.status(generateHttpCode(status)).json(data);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const { status } = await postServices.deletePost(id);

  return res.status(generateHttpCode(status)).end();
};

const getPostBySearch = async (req, res) => {
  const { q } = req.query;

  const { status, data } = await postServices.getByQuery(q);

  return res.status(generateHttpCode(status)).json(data);
};

module.exports = {
  postRouteController,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostBySearch,
};