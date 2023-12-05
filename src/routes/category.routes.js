const { Router } = require('express');
const { tokenMiddleware } = require('../middlewares/token.middleware');
const categoryControllers = require('../controllers/category.controller');

const categoryRoutes = Router();

categoryRoutes.post('/', tokenMiddleware, categoryControllers.addCategoryController);

module.exports = categoryRoutes;