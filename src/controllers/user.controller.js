const userServices = require('../services/user.service');

const httpMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  DELETED: 204,
  CONFLICT: 409,
};

const userPostController = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await userServices.createUser(displayName, email, password, image);

  const code = httpMap[status];

  if (status === 'CONFLICT') {
    return res.status(code).json({ message: data.message });
  }

  return res.status(code).json(data);
};

module.exports = {
  userPostController,
};