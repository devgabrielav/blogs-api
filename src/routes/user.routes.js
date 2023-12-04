const { Router } = require('express');
const { requiredFieldsMiddleware,
  lengthValidationMiddleware,
  emailValidationMiddleware } = require('../middlewares/user.middlewares');
const { tokenMiddleware } = require('../middlewares/token.middleware');
const userController = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post(
  '/', 
  requiredFieldsMiddleware,
  lengthValidationMiddleware, 
  emailValidationMiddleware, 
  userController.userPostController,
);

userRoutes.get('/', tokenMiddleware, userController.userGetAllController);

module.exports = userRoutes;