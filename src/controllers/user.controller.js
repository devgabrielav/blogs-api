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

const userGetAllController = async (_req, res) => {
  const { status, data } = await userServices.getAll();
  const code = httpMap[status];

  return res.status(code).json(data);
};

const userGetByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userServices.getById(id);
  const code = httpMap[status];

  if (status === 'NOT_FOUND') {
    return res.status(code).json({ message: data.message });
  }

  return res.status(code).json(data);
};

const deleteUserController = async (req, res) => {
  const { id } = res.locals.user;

  const { status } = await userServices.deleteUser(id);
  const code = httpMap[status];

  return res.status(code).end();
};

module.exports = {
  userPostController,
  userGetAllController,
  userGetByIdController,
  deleteUserController,
};