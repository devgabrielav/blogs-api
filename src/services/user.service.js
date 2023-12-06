const { User } = require('../models');
const generateToken = require('../helpers/loginHelper');

const createUser = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const { id } = await User.create({ displayName, email, password, image });
  const token = generateToken(id);

  return { status: 'CREATED', data: { token } };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { status: 'SUCCESS', data: users };
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }

  return { status: 'SUCCESS', data: user };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return { status: 'DELETED' };
};

module.exports = { 
  createUser,
  getAll,
  getById,
  deleteUser,
};