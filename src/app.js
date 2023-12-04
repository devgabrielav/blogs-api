const express = require('express');
const generateToken = require('./helpers/loginHelper');
const { User } = require('./models');
const loginMiddleware = require('./middlewares/login.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginMiddleware, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(user.id);

  return res.status(200).json({ token });
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
