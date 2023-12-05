const { Category } = require('../models');

const addNewCategory = async (categoryName) => {
  const { id, name } = await Category.create({ name: categoryName });

  return { status: 'CREATED', data: { id, name } };
};

module.exports = {
  addNewCategory,
};