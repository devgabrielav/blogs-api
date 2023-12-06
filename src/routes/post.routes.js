const { Router } = require('express');
const { tokenMiddleware } = require('../middlewares/token.middleware');
const { requiredFieldsMiddleware, 
  requiredToUpdate, postExists,
  authorizedUser, emptyQuery,
  categoriesExist } = require('../middlewares/post.middleware');
const postControllers = require('../controllers/post.controller');

const postRoutes = Router();

postRoutes.post(
  '/', 
  tokenMiddleware,
  requiredFieldsMiddleware,
  categoriesExist,
  postControllers.postRouteController,
);

postRoutes.get('/', tokenMiddleware, postControllers.getAllPosts);

postRoutes.get('/search', tokenMiddleware, emptyQuery, postControllers.getPostBySearch);

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