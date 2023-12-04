const { Router } = require('express');
const generateToken = require('../helpers/loginHelper');
const { User } = require('../models');
const loginMiddleware = require('../middlewares/login.middleware');

const loginRoutes = Router();

loginRoutes.post('/', loginMiddleware, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(user.id);

  return res.status(200).json({ token });
});

module.exports = loginRoutes;