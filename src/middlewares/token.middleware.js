const jwt = require('jsonwebtoken');

const tokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const [, token] = authorization.split(' ');

  try {
    const claims = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = {
      id: claims.sub,
      role: claims.role,
    };
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenMiddleware };