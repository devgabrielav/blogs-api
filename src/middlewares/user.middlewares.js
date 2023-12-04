const requiredFieldsMiddleware = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const emailValidationMiddleware = (req, res, next) => {
  const { email } = req.body;
  const validateEmailRegex = /^\S+@\S+\.\S+$/;
  const validate = validateEmailRegex.test(email);

  if (!validate) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  
  next();
};

const lengthValidationMiddleware = (req, res, next) => {
  const { displayName, password } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }

  if (password.length < 6) {
    return res.status(400).json(
      { message: '"password" length must be at least 6 characters long' },
    );
  }

  next();
};

module.exports = {
  requiredFieldsMiddleware,
  lengthValidationMiddleware,
  emailValidationMiddleware,
};