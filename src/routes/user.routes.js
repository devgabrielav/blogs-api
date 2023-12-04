const { Router } = require('express');
const { requiredFieldsMiddleware,
  lengthValidationMiddleware,
  emailValidationMiddleware } = require('../middlewares/user.middlewares');
const userController = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post(
  '/', 
  requiredFieldsMiddleware,
  lengthValidationMiddleware, 
  emailValidationMiddleware, 
  userController.userPostController,
);

module.exports = userRoutes;