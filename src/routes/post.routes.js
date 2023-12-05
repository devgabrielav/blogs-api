const { Router } = require('express');
const { tokenMiddleware } = require('../middlewares/token.middleware');
const { requiredFieldsMiddleware } = require('../middlewares/post.middleware');
const postControllers = require('../controllers/post.controller');

const postRoutes = Router();

postRoutes.post(
  '/', 
  tokenMiddleware,
  requiredFieldsMiddleware, 
  postControllers.postRouteController,
);

module.exports = postRoutes;