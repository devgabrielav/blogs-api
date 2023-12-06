const { Router } = require('express');
const { tokenMiddleware } = require('../middlewares/token.middleware');
const { requiredFieldsMiddleware, requiredToUpdate } = require('../middlewares/post.middleware');
const postControllers = require('../controllers/post.controller');

const postRoutes = Router();

postRoutes.post(
  '/', 
  tokenMiddleware,
  requiredFieldsMiddleware, 
  postControllers.postRouteController,
);

postRoutes.get('/', tokenMiddleware, postControllers.getAllPosts);

postRoutes.get('/:id', tokenMiddleware, postControllers.getPostById);

postRoutes.put('/:id', tokenMiddleware, requiredToUpdate, postControllers.updatePost);

module.exports = postRoutes;