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

module.exports = { createUser };