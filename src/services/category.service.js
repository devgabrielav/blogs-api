const { Category } = require('../models');

const addNewCategory = async (categoryName) => {
  const { id, name } = await Category.create({ name: categoryName });

  return { status: 'CREATED', data: { id, name } };
};

const getAll = async () => {
  const categories = await Category.findAll();

  return { status: 'SUCCESS', data: categories };
};

module.exports = {
  addNewCategory,
  getAll,
};