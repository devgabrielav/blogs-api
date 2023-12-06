const { Router } = require('express');
const { tokenMiddleware } = require('../middlewares/token.middleware');
const { requiredFieldsMiddleware, 
  requiredToUpdate, postExists, authorizedUser } = require('../middlewares/post.middleware');
const postControllers = require('../controllers/post.controller');

const postRoutes = Router();

postRoutes.post(
  '/', 
  tokenMiddleware,
  requiredFieldsMiddleware,
  postControllers.postRouteController,
);

postRoutes.get('/', tokenMiddleware, postControllers.getAllPosts);

postRoutes.get('/:id', tokenMiddleware, postExists, postControllers.getPostById);

postRoutes.put(
  '/:id', 
  tokenMiddleware,
  requiredToUpdate, 
  postExists, 
  authorizedUser, 
  postControllers.updatePost,
);

postRoutes.delete('/:id', tokenMiddleware, postExists, authorizedUser, postControllers.deletePost);

module.exports = postRoutes;