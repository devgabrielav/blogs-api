const { Category, User } = require('../models');

const httpMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  DELETED: 204,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

const generator = (code, message) => {
  const response = { status: code, data: { message } };
  return response;
};

const includeKey = {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] };

const generateObject = ({ title, content, id, date }) => ({
  title,
  content,
  userId: id,
  updated: date,
  published: date,
});

const generateHttpCode = (status) => httpMap[status];

module.exports = {
  generator,
  includeKey,
  generateObject,
  generateHttpCode,
};