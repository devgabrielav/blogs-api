const categoryServices = require('../services/category.service');

const httpMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  DELETED: 204,
  CONFLICT: 409,
};

const addCategoryController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const { status, data } = await categoryServices.addNewCategory(name);
  const code = httpMap[status];

  return res.status(code).json(data);
};

module.exports = {
  addCategoryController,
};